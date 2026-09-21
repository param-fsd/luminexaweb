/**
 * Visitor tracking ingest.
 *
 * The browser (src/lib/siteAnalytics.js) posts device and acquisition signals
 * here; this route adds what only the server can see — geolocation and a
 * hashed IP — and writes two things to the Firestore the CRM already reads:
 *
 *   siteVisits/{eventId}     one document per pageview
 *   siteSessions/{sessionId} a rolling roll-up, so the CRM can list "people"
 *                            without reading every pageview
 *
 * Raw IPs are never stored. They are salted and hashed so repeat visits can be
 * correlated without the address itself being recoverable from the database.
 */

import { NextResponse } from "next/server";
import { createHash } from "crypto";
import {
  doc,
  setDoc,
  increment,
  serverTimestamp,
  collection,
  addDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

// Geo comes from request headers, so this can never be statically rendered.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const IP_SALT = process.env.ANALYTICS_IP_SALT || "luminexa-site-analytics";

const hashIp = (ip) =>
  ip ? createHash("sha256").update(`${IP_SALT}:${ip}`).digest("hex").slice(0, 16) : "";

/** Cheap guard against junk from an open endpoint. */
const str = (value, max = 200) =>
  typeof value === "string" ? value.slice(0, max) : "";

const num = (value, max = Number.MAX_SAFE_INTEGER) => {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? Math.min(n, max) : 0;
};

/**
 * Crawlers are most of the traffic on a marketing site and none of the
 * customers. They are dropped rather than flagged so the CRM's numbers mean
 * "people".
 */
const BOT_RE =
  /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|monitor|curl|wget|python-requests|axios|facebookexternalhit|whatsapp|telegram|embedly|semrush|ahrefs|mj12|dotbot|petalbot|bytespider|gptbot|claudebot|ccbot|perplexity/i;

function clientIp(headers) {
  // Netlify and Vercel both front the function; x-forwarded-for is the general case.
  const candidates = [
    headers.get("x-nf-client-connection-ip"),
    headers.get("x-real-ip"),
    headers.get("cf-connecting-ip"),
    (headers.get("x-forwarded-for") || "").split(",")[0],
  ];
  return candidates.map((v) => (v || "").trim()).find(Boolean) || "";
}

/**
 * Geolocation from whatever the hosting platform provides. Netlify puts a
 * base64 JSON blob on `x-nf-geo`; Vercel uses discrete headers. Both are free
 * and add no latency, unlike an outbound IP-lookup call.
 */
function geoFromHeaders(headers) {
  const nf = headers.get("x-nf-geo");
  if (nf) {
    try {
      const parsed = JSON.parse(Buffer.from(nf, "base64").toString("utf8"));
      return {
        country: str(parsed?.country?.name) || "",
        countryCode: str(parsed?.country?.code, 4) || "",
        region: str(parsed?.subdivision?.name) || "",
        city: str(parsed?.city) || "",
        lat: Number(parsed?.latitude) || null,
        lng: Number(parsed?.longitude) || null,
        source: "netlify",
      };
    } catch {
      /* fall through */
    }
  }

  const vercelCountry = headers.get("x-vercel-ip-country");
  if (vercelCountry) {
    const decode = (v) => {
      try {
        return decodeURIComponent(v || "");
      } catch {
        return v || "";
      }
    };
    return {
      country: "",
      countryCode: str(vercelCountry, 4),
      region: str(decode(headers.get("x-vercel-ip-country-region")), 80),
      city: str(decode(headers.get("x-vercel-ip-city")), 80),
      lat: Number(headers.get("x-vercel-ip-latitude")) || null,
      lng: Number(headers.get("x-vercel-ip-longitude")) || null,
      source: "vercel",
    };
  }

  return null;
}

/* A single lookup serves every visitor behind one NAT, so caching it keeps the
   fallback from becoming a per-pageview outbound request. */
const geoCache = new Map();
const GEO_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const GEO_CACHE_MAX = 500;

async function geoFromIp(ip) {
  if (!ip || ip.startsWith("127.") || ip.startsWith("::1") || ip.startsWith("192.168.")) return null;

  const cached = geoCache.get(ip);
  if (cached && Date.now() - cached.at < GEO_CACHE_TTL_MS) return cached.geo;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 1500);
    const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;

    const data = await res.json();
    if (!data?.success) return null;

    const geo = {
      country: str(data.country),
      countryCode: str(data.country_code, 4),
      region: str(data.region),
      city: str(data.city),
      lat: Number(data.latitude) || null,
      lng: Number(data.longitude) || null,
      source: "ipwho.is",
    };

    if (geoCache.size >= GEO_CACHE_MAX) geoCache.delete(geoCache.keys().next().value);
    geoCache.set(ip, { at: Date.now(), geo });
    return geo;
  } catch {
    return null; // lookup is best-effort; an unknown location beats a failed pageview
  }
}

const UNKNOWN_GEO = {
  country: "",
  countryCode: "",
  region: "",
  city: "",
  lat: null,
  lng: null,
  source: "unknown",
};

/* -------------------------------------------------------------------------- */
/*  Handler                                                                    */
/* -------------------------------------------------------------------------- */
export async function POST(request) {
  // Always answer 204: a tracking beacon has nothing to do with a failure, and
  // a visible error would be worse than a lost datapoint.
  const ok = () => new NextResponse(null, { status: 204 });

  try {
    const body = await request.json();
    const headers = request.headers;
    const ua = headers.get("user-agent") || "";

    if (BOT_RE.test(ua)) return ok();

    const eventId = str(body.eventId, 48);
    const sessionId = str(body.sessionId, 48);
    if (!eventId || !sessionId) return ok();

    /* ---- engagement close-out for a pageview already written -------------- */
    if (body.type === "end") {
      await setDoc(
        doc(db, "siteVisits", eventId),
        {
          durationMs: num(body.durationMs, 6 * 60 * 60 * 1000),
          scrollDepth: num(body.scrollDepth, 100),
          clicks: num(body.clicks, 10000),
          endedAt: serverTimestamp(),
        },
        { merge: true }
      );

      await setDoc(
        doc(db, "siteSessions", sessionId),
        {
          lastSeenAt: serverTimestamp(),
          totalDurationMs: increment(num(body.durationMs, 6 * 60 * 60 * 1000)),
        },
        { merge: true }
      );

      return ok();
    }

    /* ---- conversions ------------------------------------------------------ */
    if (body.type === "conversion") {
      await addDoc(collection(db, "siteConversions"), {
        visitorId: str(body.visitorId, 48),
        sessionId,
        name: str(body.name, 80),
        path: str(body.path, 300),
        details: typeof body.details === "object" && body.details !== null ? body.details : {},
        createdAt: serverTimestamp(),
      });

      await setDoc(
        doc(db, "siteSessions", sessionId),
        {
          converted: true,
          conversions: increment(1),
          lastConversion: str(body.name, 80),
          lastSeenAt: serverTimestamp(),
        },
        { merge: true }
      );

      return ok();
    }

    if (body.type !== "pageview") return ok();

    /* ---- pageview --------------------------------------------------------- */
    const ip = clientIp(headers);
    const geo = geoFromHeaders(headers) || (await geoFromIp(ip)) || UNKNOWN_GEO;

    const device = body.device && typeof body.device === "object" ? body.device : {};
    const utm = body.utm && typeof body.utm === "object" ? body.utm : {};

    const normalisedDevice = {
      type: ["mobile", "tablet", "desktop"].includes(device.type) ? device.type : "desktop",
      os: str(device.os, 40) || "Unknown",
      browser: str(device.browser, 40) || "Unknown",
      browserVersion: str(device.browserVersion, 12),
      screen: str(device.screen, 20),
      viewport: str(device.viewport, 20),
      dpr: num(device.dpr, 10),
      touch: Boolean(device.touch),
    };

    const visit = {
      visitorId: str(body.visitorId, 48),
      sessionId,
      path: str(body.path, 300) || "/",
      query: str(body.query, 500),
      title: str(body.title, 200),
      referrer: str(body.referrer, 500),
      referrerHost: str(body.referrerHost, 120),
      channel: str(body.channel, 20) || "direct",
      utm: {
        source: str(utm.source, 80),
        medium: str(utm.medium, 80),
        campaign: str(utm.campaign, 120),
        term: str(utm.term, 120),
        content: str(utm.content, 120),
      },
      isNewVisitor: Boolean(body.isNewVisitor),
      isEntry: Boolean(body.isEntry),
      ephemeral: Boolean(body.ephemeral),
      device: normalisedDevice,
      lang: str(body.lang, 20),
      timezone: str(body.timezone, 60),
      geo,
      ipHash: hashIp(ip),
      ua: str(ua, 300),
      createdAt: serverTimestamp(),
      // A client-readable millisecond stamp: the CRM sorts on createdAt, but a
      // serverTimestamp() is momentarily null in a local listener's first echo.
      ts: Date.now(),
      durationMs: 0,
      scrollDepth: 0,
      clicks: 0,
    };

    await setDoc(doc(db, "siteVisits", eventId), visit);

    // Session roll-up. Fields that describe the session as a whole are only
    // written on its first pageview, so a deep link doesn't overwrite the
    // landing page or the campaign that brought the visitor in.
    const sessionPatch = {
      visitorId: visit.visitorId,
      lastSeenAt: serverTimestamp(),
      lastTs: visit.ts,
      exitPath: visit.path,
      pageviews: increment(1),
      geo,
      device: normalisedDevice,
      ipHash: visit.ipHash,
    };

    if (body.isEntry) {
      Object.assign(sessionPatch, {
        startedAt: serverTimestamp(),
        startTs: visit.ts,
        entryPath: visit.path,
        channel: visit.channel,
        referrer: visit.referrer,
        referrerHost: visit.referrerHost,
        utm: visit.utm,
        isNewVisitor: visit.isNewVisitor,
        lang: visit.lang,
        timezone: visit.timezone,
        ua: visit.ua,
      });
    }

    await setDoc(doc(db, "siteSessions", sessionId), sessionPatch, { merge: true });

    return ok();
  } catch (error) {
    console.error("[track] ingest failed:", error);
    return ok();
  }
}
