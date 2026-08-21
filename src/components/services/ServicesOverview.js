"use client";

/**
 * The services overview, rendered in two variants:
 *
 *   variant="full"     the /services route — every service, with working filters.
 *   variant="preview"  the homepage section — a short pick plus a link through.
 *
 * Structure is an editorial index rather than a card grid: numbered full-width rows
 * on the left, and from lg up a sticky preview panel on the right.
 *
 * The panel follows the list two ways: an IntersectionObserver tracks whichever row
 * is crossing the upper third of the viewport as you scroll, and hovering or
 * focusing a row selects it immediately. Scroll tracking matters because most
 * visitors never hover a row on the way down the page.
 *
 * Previously this lived in src/app/services/page.js and was imported straight into
 * the homepage. It also rendered `slice(1, 4)`, so four of the eight services had
 * no route in from /services at all.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import services from "@/data/serviceData";
import {
  INNER,
  Mono,
  PAD,
  PRIMARY_BTN,
  SECONDARY_BTN,
  THEME,
} from "./editorial/shell";

/**
 * Explicit slug → category. The previous version inferred this from substring
 * matches on the title ("ar", "3d", "web"), which misfires on ordinary words.
 */
const CATEGORY = {
  mapping: "mapping",
  "augmented-reality": "immersive",
  "360-virtual-tour": "immersive",
  "3d-visualization": "immersive",
  "artificial-intelligence": "ai",
  "website-app-development": "web",
  "custom-web-application": "web",
  "crm-erp": "systems",
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "mapping", label: "Mapping" },
  { key: "immersive", label: "Immersive" },
  { key: "ai", label: "AI" },
  { key: "web", label: "Web" },
  { key: "systems", label: "Systems" },
];

/* Services with a hand-built page — worth signalling in the index. */
const BESPOKE = new Set([
  "crm-erp",
  "website-app-development",
  "custom-web-application",
  "artificial-intelligence",
  "3d-visualization",
  "360-virtual-tour",
]);

const subCountOf = (service) =>
  Array.isArray(service?.subServices) ? service.subServices.length : 0;

/* ── one row of the index ────────────────────────────────────────────────── */

const IndexRow = ({ service, index, onEnter, isActive, innerRef }) => (
  <Link
    ref={innerRef}
    href={`/services/${service.slug}`}
    className="group block border-b border-[var(--im-line-strong)] outline-none"
    onMouseEnter={onEnter}
    onFocus={onEnter}
  >
    <div className="relative flex items-start gap-4 py-5 md:gap-7 md:py-7">
      {/* the lumen wash that marks the active row */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 -left-3 -right-3 -z-10 rounded-lg bg-[rgba(200,246,60,0.16)] transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />

      <Mono
        className={`w-7 shrink-0 pt-1 text-[11px] transition-colors md:w-10 md:text-xs ${
          isActive ? "text-[var(--im-deep)]" : "text-[var(--im-dim)]"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </Mono>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <h3 className="font-[family-name:var(--im-display)] text-[24px] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--im-ink)] sm:text-[30px] md:text-[38px]">
            {service.title?.trim()}
          </h3>
          {BESPOKE.has(service.slug) ? (
            <Mono className="shrink-0 rounded bg-lumen px-2 py-1 text-[10px] uppercase tracking-[0.08em] text-lumen-foreground">
              Live demo
            </Mono>
          ) : null}
        </div>

        <p className="mt-2 max-w-[560px] text-sm leading-[1.6] text-[var(--im-muted)] md:mt-2.5 md:text-[15px]">
          {service.description}
        </p>

        <Mono className="mt-3 block text-[10px] uppercase tracking-[0.08em] text-[var(--im-dim)] md:text-[11px]">
          {service.label || "Service"}
        </Mono>
      </div>

      {/* thumbnail rides with the row below lg, where there is no sticky panel */}
      <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-lg border border-[var(--im-line-strong)] sm:h-[88px] sm:w-[112px] lg:hidden">
        <Image
          src={service.image || "/placeholder.jpg"}
          alt=""
          fill
          sizes="112px"
          className="object-cover"
        />
      </div>

      <span
        className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all lg:flex ${
          isActive
            ? "border-transparent bg-lumen text-lumen-foreground"
            : "border-[rgba(17,19,21,0.16)] text-[var(--im-ink)]"
        }`}
      >
        <ArrowUpRight className="size-4" />
      </span>
    </div>
  </Link>
);

/* ── sticky preview panel (lg and up) ────────────────────────────────────── */

const PreviewPanel = ({ list, activeIndex }) => {
  const active = list[activeIndex] || list[0];
  if (!active) return null;

  const subCount = subCountOf(active);

  return (
    <div className="sticky top-24">
      <div className="overflow-hidden rounded-[14px] border border-[var(--im-line-strong)] bg-[var(--im-panel)]">
        {/* images are stacked and crossfaded so the panel never reflows */}
        <div className="relative aspect-[4/3] w-full border-b border-[var(--im-line)]">
          {list.map((service, i) => (
            <Image
              key={service.slug}
              src={service.image || "/placeholder.jpg"}
              alt={i === activeIndex ? service.title : ""}
              fill
              sizes="420px"
              priority={i === 0}
              className="object-cover transition-opacity duration-500"
              style={{ opacity: i === activeIndex ? 1 : 0 }}
            />
          ))}
        </div>

        <div className="p-4">
          <Mono className="block truncate text-[10px] uppercase tracking-[0.08em] text-[var(--im-deep)]">
            {String(activeIndex + 1).padStart(2, "0")} / {active.label || "Service"}
          </Mono>

          <div className="mt-2 font-[family-name:var(--im-display)] text-[19px] font-semibold leading-tight text-[var(--im-ink)]">
            {active.title?.trim()}
          </div>

          <p className="mt-2 text-sm leading-[1.6] text-[var(--im-muted)]">
            {active.description}
          </p>

          <Mono className="mt-3 block text-[11px] text-[var(--im-dim)]">
            {subCount
              ? `${subCount} sub-service${subCount === 1 ? "" : "s"}`
              : "Single engagement"}
          </Mono>

          <Link
            href={`/services/${active.slug}`}
            className="mt-4 flex items-center justify-center gap-1.5 rounded-[5px] bg-lumen px-4 py-2.5 text-[13px] font-semibold text-lumen-foreground transition-opacity hover:opacity-90"
          >
            Open service
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ── page ────────────────────────────────────────────────────────────────── */

const ServicesOverview = ({ variant = "full" }) => {
  const isFull = variant === "full";
  const [active, setActive] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);

  const all = useMemo(
    () => (services || []).map((s) => ({ ...s, category: CATEGORY[s.slug] || "all" })),
    [],
  );

  const filtered = useMemo(
    () => (active === "all" ? all : all.filter((s) => s.category === active)),
    [active, all],
  );

  const shown = isFull ? filtered : all.slice(0, 4);
  const safeIndex = Math.min(activeIndex, Math.max(shown.length - 1, 0));

  /* Row nodes, rebuilt whenever the filter changes the list. */
  const rowRefs = useRef([]);
  const setRowRef = useCallback((i) => (node) => {
    rowRefs.current[i] = node;
  }, []);

  /**
   * Track the row crossing the upper third of the viewport. Only the rows are
   * observed, so this stays cheap, and it works alongside Lenis because Lenis
   * drives real window scrolling rather than transforming a wrapper.
   */
  useEffect(() => {
    if (!isFull) return undefined;

    const nodes = rowRefs.current.slice(0, shown.length).filter(Boolean);
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (!visible.length) return;
        const i = nodes.indexOf(visible[0].target);
        if (i >= 0) setActiveIndex(i);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: 0 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [isFull, shown.length, active]);

  const selectFilter = (key) => {
    setActive(key);
    setActiveIndex(0);
    rowRefs.current = [];
  };

  const Heading = isFull ? "h1" : "h2";

  if (!isFull) {
    /* ── HOMEPAGE PREVIEW ── */
    return (
      <section
        id="services"
        className={`border-y border-[var(--im-line)] bg-background font-[family-name:var(--im-body)] text-[var(--im-ink)] antialiased ${PAD} py-14 md:py-20`}
        style={THEME}
      >
        <div className={INNER}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="min-w-0">
              <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
                Services
              </Mono>
              <Heading className="mt-3.5 max-w-[620px] font-[family-name:var(--im-display)] text-[32px] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[40px] md:mt-4 md:text-[48px]">
                Technology Solutions Built for Real-World Impact
              </Heading>
            </div>

            <Link
              href="/services"
              className="group inline-flex shrink-0 items-center gap-1.5 border-b border-[var(--im-ink)] pb-1 text-[15px] font-medium text-[var(--im-ink)]"
            >
              All {all.length} services
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="mt-8 border-t border-[var(--im-line-strong)]">
            {shown.map((service, i) => (
              <IndexRow
                key={service.slug}
                service={service}
                index={i}
                isActive={safeIndex === i}
                onEnter={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── FULL /services PAGE ── */
  return (
    <main
      id="services"
      className="bg-background font-[family-name:var(--im-body)] text-[var(--im-ink)] antialiased"
      style={THEME}
    >
      {/* HERO */}
      <section
        className={`border-b border-[var(--im-line)] ${PAD} pb-10 pt-10 md:pb-12 md:pt-[72px]`}
      >
        <div className={INNER}>
          <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
            Services
          </Mono>

          <Heading className="mt-5 max-w-[900px] font-[family-name:var(--im-display)] text-[44px] font-bold leading-[1.0] tracking-[-0.03em] sm:text-[58px] md:mt-7 md:text-[68px] md:leading-[0.98] lg:text-[76px]">
            {["Technology Solutions ", "Built for Real-World Impact."].map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.08 + i * 0.1,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </Heading>

          <p className="mt-4 max-w-[560px] text-base leading-[1.6] text-[var(--im-muted)] md:mt-6 md:text-[19px] [text-wrap:pretty]">
            From AI-powered platforms and full-stack development to GIS, interactive mapping, 3D visualization, digital twins, and immersive experiences — we build innovative technology solutions that help businesses visualize, automate, engage, and grow.
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row md:mt-9 md:gap-3">
            <Link href="/contact-us" className={`${PRIMARY_BTN} text-center`}>
              Start a project
            </Link>
            <Link href="/portfolio" className={`${SECONDARY_BTN} text-center`}>
              View portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* INDEX */}
      <section className={`border-b border-[var(--im-line)] ${PAD} py-10 md:py-[72px]`}>
        <div className={INNER}>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
              Index
            </Mono>
            <Mono className="text-[11px] text-[var(--im-dim)]">
              {shown.length} of {all.length}
            </Mono>
          </div>

          {/* filter rail — scrolls sideways on a phone rather than wrapping */}
          <div
            role="tablist"
            aria-label="Filter services"
            className="no-scrollbar mt-4 flex gap-2 overflow-x-auto md:flex-wrap md:overflow-visible"
          >
            {FILTERS.map((f) => {
              const on = active === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => selectFilter(f.key)}
                  className={`shrink-0 whitespace-nowrap rounded border px-3 py-1.5 transition-colors ${
                    on
                      ? "border-transparent bg-lumen text-lumen-foreground"
                      : "border-[var(--im-line-strong)] text-[var(--im-muted)] hover:bg-[rgba(17,19,21,0.04)]"
                  }`}
                >
                  <Mono className="text-[11px] md:text-xs">{f.label}</Mono>
                </button>
              );
            })}
          </div>

          {shown.length ? (
            <div className="mt-7 grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
              <div className="min-w-0 border-t border-[var(--im-line-strong)]">
                {shown.map((service, i) => (
                  <IndexRow
                    key={service.slug}
                    service={service}
                    index={i}
                    innerRef={setRowRef(i)}
                    isActive={safeIndex === i}
                    onEnter={() => setActiveIndex(i)}
                  />
                ))}
              </div>

              <div className="hidden min-w-0 lg:block">
                <PreviewPanel list={shown} activeIndex={safeIndex} />
              </div>
            </div>
          ) : (
            <p className="mt-7 text-base text-[var(--im-muted)]">
              Nothing under that filter yet.
            </p>
          )}
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className={`border-b border-[var(--im-line)] ${PAD} py-12 md:py-[104px]`}>
        <div
          className={`${INNER} flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12`}
        >
          <div className="min-w-0">
            <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
              Something else in mind
            </Mono>
            <h2 className="mt-3.5 font-[family-name:var(--im-display)] text-[36px] font-bold leading-[1.05] tracking-[-0.03em] md:mt-5 md:text-[58px] md:leading-[1.02]">
              Tell us the problem.
            </h2>
            <p className="mt-3.5 text-base text-[var(--im-muted)] md:mt-4 md:text-lg">
              If none of the above is quite it, describe what is slowing you down and
              we&rsquo;ll tell you honestly whether we&rsquo;re the right people.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row md:shrink-0 md:gap-3">
            <Link href="/contact-us" className={`${PRIMARY_BTN} text-center`}>
              Start a project
            </Link>
            <Link href="/case-studies" className={`${SECONDARY_BTN} text-center`}>
              See case studies
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesOverview;
