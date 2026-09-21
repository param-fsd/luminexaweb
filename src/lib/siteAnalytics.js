"use client";

/**
 * First-party visitor tracking.
 *
 * GA4 (gtag) already runs on this site, but GA4 is a one-way pipe: the data
 * lands in Google's property and can only be read back as aggregates through
 * the Data API — never as individual visitors, and never with the device and
 * location detail the CRM wants sitting next to a lead. So this module collects
 * the same signals ourselves and posts them to /api/track, which enriches them
 * with server-side geo and writes them to the same Firestore the CRM reads.
 *
 * Nothing here identifies a person: the visitor id is a random string in
 * localStorage, and the IP never leaves the server unhashed.
 */

const VISITOR_KEY = "lx_vid";
const SESSION_KEY = "lx_sid";
const SESSION_TS_KEY = "lx_sid_ts";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // GA's convention: 30 idle minutes
const CONSENT_KEY = "cookieConsent";

const randomId = () =>
  (crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`)
    .replace(/-/g, "")
    .slice(0, 24);

/* Storage throws in private mode and blocked-cookie contexts — analytics must
   never take the page down with it. */
const safeGet = (store, key) => {
  try {
    return store.getItem(key);
  } catch {
    return null;
  }
};

const safeSet = (store, key, value) => {
  try {
    store.setItem(key, value);
  } catch {
    /* ignore */
  }
};

/** Has the visitor actively rejected analytics in the cookie banner? */
function analyticsRejected() {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return false; // undecided — the banner is still showing
    return JSON.parse(stored).analytics === false;
  } catch {
    return false;
  }
}

/**
 * A stable id for this browser. When analytics consent was declined we fall
 * back to a session-scoped id, so the visit is still counted but nothing is
 * persisted across visits.
 */
function getVisitorId() {
  if (analyticsRejected()) {
    let id = safeGet(sessionStorage, VISITOR_KEY);
    if (!id) {
      id = randomId();
      safeSet(sessionStorage, VISITOR_KEY, id);
    }
    return { visitorId: id, isNew: true, ephemeral: true };
  }

  let id = safeGet(localStorage, VISITOR_KEY);
  const isNew = !id;
  if (!id) {
    id = randomId();
    safeSet(localStorage, VISITOR_KEY, id);
  }
  return { visitorId: id, isNew, ephemeral: false };
}

/** Rolling 30-minute session, the same rule GA4 uses. */
function getSessionId() {
  const now = Date.now();
  const last = Number(safeGet(sessionStorage, SESSION_TS_KEY)) || 0;
  let id = safeGet(sessionStorage, SESSION_KEY);
  const expired = !id || now - last > SESSION_TIMEOUT_MS;

  if (expired) {
    id = randomId();
    safeSet(sessionStorage, SESSION_KEY, id);
  }
  safeSet(sessionStorage, SESSION_TS_KEY, String(now));
  return { sessionId: id, isNewSession: expired };
}

/* -------------------------------------------------------------------------- */
/*  Device                                                                     */
/* -------------------------------------------------------------------------- */
function parseDevice() {
  const ua = navigator.userAgent || "";
  const uaData = navigator.userAgentData;

  const isTablet =
    /iPad/i.test(ua) ||
    (/Android/i.test(ua) && !/Mobile/i.test(ua)) ||
    // iPadOS 13+ reports itself as a Mac — the touch points give it away
    (/Macintosh/i.test(ua) && (navigator.maxTouchPoints || 0) > 1);

  const isMobile =
    uaData?.mobile ?? (/Mobi|Android|iPhone|iPod|Windows Phone/i.test(ua) && !isTablet);

  const type = isTablet ? "tablet" : isMobile ? "mobile" : "desktop";

  let os = "Unknown";
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/i.test(ua) || (isTablet && /Macintosh/i.test(ua))) os = "iOS";
  else if (/Mac OS X/i.test(ua)) os = "macOS";
  else if (/CrOS/i.test(ua)) os = "ChromeOS";
  else if (/Linux/i.test(ua)) os = "Linux";

  // Order matters: Edge and Opera both claim to be Chrome, Chrome claims Safari.
  const NAMES = {
    Edg: "Edge",
    EdgA: "Edge",
    EdgiOS: "Edge",
    OPR: "Opera",
    Opera: "Opera",
    SamsungBrowser: "Samsung Internet",
    Firefox: "Firefox",
    FxiOS: "Firefox",
    CriOS: "Chrome",
    Chrome: "Chrome",
    Safari: "Safari",
  };

  let browser = "Unknown";
  let browserVersion = "";
  const match =
    /(Edg|EdgA|EdgiOS)\/([\d.]+)/.exec(ua) ||
    /(OPR|Opera)\/([\d.]+)/.exec(ua) ||
    /(SamsungBrowser)\/([\d.]+)/.exec(ua) ||
    /(Firefox|FxiOS)\/([\d.]+)/.exec(ua) ||
    /(CriOS|Chrome)\/([\d.]+)/.exec(ua) ||
    /Version\/([\d.]+).*(Safari)/.exec(ua);

  if (match) {
    // The Safari branch captures version first and the name second
    const [, a, b] = match;
    const nameToken = NAMES[a] ? a : b;
    browser = NAMES[nameToken] || "Unknown";
    browserVersion = String((NAMES[a] ? b : a) || "").split(".")[0];
  }

  return {
    type,
    os,
    browser,
    browserVersion,
    screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    dpr: Math.round((window.devicePixelRatio || 1) * 100) / 100,
    touch: (navigator.maxTouchPoints || 0) > 0,
  };
}

/* -------------------------------------------------------------------------- */
/*  Acquisition                                                                */
/* -------------------------------------------------------------------------- */
const SEARCH_HOSTS = /google\.|bing\.|duckduckgo\.|yahoo\.|yandex\.|ecosia\.|baidu\./i;
const SOCIAL_HOSTS =
  /facebook\.|instagram\.|linkedin\.|t\.co|twitter\.|x\.com|youtube\.|pinterest\.|reddit\.|whatsapp|t\.me|telegram/i;

function parseAcquisition() {
  const params = new URLSearchParams(window.location.search);
  const utm = {
    source: params.get("utm_source") || "",
    medium: params.get("utm_medium") || "",
    campaign: params.get("utm_campaign") || "",
    term: params.get("utm_term") || "",
    content: params.get("utm_content") || "",
  };

  const referrer = document.referrer || "";
  let referrerHost = "";
  try {
    if (referrer) referrerHost = new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    /* malformed referrer */
  }

  // Navigation within the site is not an acquisition source
  const external = Boolean(
    referrerHost && referrerHost !== window.location.hostname.replace(/^www\./, "")
  );

  let channel;
  if (params.get("gclid") || params.get("fbclid") || /cpc|ppc|paid/i.test(utm.medium)) channel = "paid";
  else if (/email|newsletter/i.test(utm.medium) || /mail\./i.test(referrerHost)) channel = "email";
  else if (utm.source || utm.medium) channel = "campaign";
  else if (external && SEARCH_HOSTS.test(referrerHost)) channel = "organic";
  else if (external && SOCIAL_HOSTS.test(referrerHost)) channel = "social";
  else if (external) channel = "referral";
  else channel = "direct";

  return {
    utm,
    referrer: external ? referrer.slice(0, 500) : "",
    referrerHost: external ? referrerHost : "",
    channel,
  };
}

/* -------------------------------------------------------------------------- */
/*  Transport                                                                  */
/* -------------------------------------------------------------------------- */
const ENDPOINT = "/api/track";

function send(payload, { beacon = false } = {}) {
  const body = JSON.stringify(payload);

  // sendBeacon survives the page unloading; fetch does not.
  if (beacon && navigator.sendBeacon) {
    try {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "application/json" }));
      return;
    } catch {
      /* fall through to fetch */
    }
  }

  fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    /* analytics must never surface an error to the visitor */
  });
}

/* -------------------------------------------------------------------------- */
/*  Per-pageview engagement                                                    */
/* -------------------------------------------------------------------------- */
let current = null;

function closeCurrent() {
  if (!current || current.closed) return;
  current.closed = true;

  const activeMs =
    current.activeMs +
    (document.visibilityState === "visible" ? Date.now() - current.lastResume : 0);

  send(
    {
      type: "end",
      eventId: current.eventId,
      sessionId: current.sessionId,
      durationMs: Math.min(activeMs, 6 * 60 * 60 * 1000), // clamp tabs left open overnight
      scrollDepth: current.maxScroll,
      clicks: current.clicks,
    },
    { beacon: true }
  );
}

/**
 * Record a pageview. Called on first load and on every client-side route
 * change; closes the previous pageview's engagement record first.
 */
export function trackPageview(path) {
  if (typeof window === "undefined") return;

  closeCurrent();

  const { visitorId, isNew, ephemeral } = getVisitorId();
  const { sessionId, isNewSession } = getSessionId();
  const acquisition = parseAcquisition();

  const eventId = randomId();
  current = {
    eventId,
    sessionId,
    closed: false,
    activeMs: 0,
    lastResume: Date.now(),
    maxScroll: 0,
    clicks: 0,
  };

  send({
    type: "pageview",
    eventId,
    visitorId,
    sessionId,
    isNewVisitor: isNew,
    isEntry: isNewSession,
    ephemeral,
    path: path || window.location.pathname,
    query: window.location.search.slice(0, 500),
    title: document.title,
    device: parseDevice(),
    lang: navigator.language || "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    ...acquisition,
  });
}

/** One-off listeners for engagement signals and the final flush. */
export function startEngagementTracking() {
  if (typeof window === "undefined") return () => {};

  const onScroll = () => {
    if (!current) return;
    const doc = document.documentElement;
    const depth =
      doc.scrollHeight > window.innerHeight
        ? Math.round(((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100)
        : 100;
    current.maxScroll = Math.min(100, Math.max(current.maxScroll, depth));
  };

  const onClick = () => {
    if (current) current.clicks++;
  };

  // A backgrounded tab shouldn't accrue "time on page"
  const onVisibility = () => {
    if (!current) return;
    if (document.visibilityState === "hidden") {
      current.activeMs += Date.now() - current.lastResume;
      // Safari may never fire pagehide — treat a hide as a possible goodbye
      closeCurrent();
    } else {
      current.lastResume = Date.now();
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("click", onClick, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", closeCurrent);

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("click", onClick);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pagehide", closeCurrent);
  };
}

/**
 * Attach a conversion (form submit, call click, …) to the current session, so
 * the CRM can show a lead alongside the journey that produced it.
 */
export function trackConversion(name, details = {}) {
  if (typeof window === "undefined") return;
  const { visitorId } = getVisitorId();
  const { sessionId } = getSessionId();
  send({
    type: "conversion",
    eventId: randomId(),
    visitorId,
    sessionId,
    name,
    path: window.location.pathname,
    details,
  });
}

/** The ids to stamp onto a lead/contact document so the CRM can join them. */
export function getTrackingIds() {
  if (typeof window === "undefined") return { visitorId: "", sessionId: "" };
  return { visitorId: getVisitorId().visitorId, sessionId: getSessionId().sessionId };
}
