"use client";

/**
 * Bespoke page for /services/mapping/image-mapping.
 *
 * Implements the "Image Mapping — redesign" design doc: an editorial, hairline-ruled
 * layout with a live interactive plot map in the hero. Everything except the map
 * interaction is driven by the `image-mapping` record in @/data/mapping.
 *
 * Deliberately does not render a navbar or footer — the root layout already does.
 */

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Typography maps onto the fonts the root layout already loads — no extra webfonts.
 * The design doc calls for Space Grotesk headings over a neutral sans with a mono
 * accent; here that is Space Grotesk (--font-body), Montserrat (--font-display,
 * the site's secondary face, kept as-is) and Geist Mono for the label rails.
 */
const FONTS = {
  "--im-display": "var(--font-body), 'Space Grotesk', sans-serif",
  "--im-body": "var(--font-display), 'Montserrat', sans-serif",
  "--im-mono": "var(--font-geist-mono), ui-monospace, monospace",
};

/* Plot status → swatch. Available borrows the site's signature lumen. */
const STATUS_COLOR = {
  Available: "var(--lumen)",
  Reserved: "#F5B544",
  Sold: "#FF6B6B",
};

const statusFill = (status, strong) =>
  status === "Available"
    ? `rgba(200,246,60,${strong ? 0.5 : 0.22})`
    : status === "Reserved"
      ? `rgba(245,181,68,${strong ? 0.48 : 0.2})`
      : `rgba(255,107,107,${strong ? 0.45 : 0.2})`;

/* ── shared bits ─────────────────────────────────────────────────────────── */

const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Mono = ({ children, className = "" }) => (
  <span className={`font-[family-name:var(--im-mono)] ${className}`}>{children}</span>
);

/* Section shell: sticky index/label rail on the left, content on the right. */
const Section = ({ id, index, label, note, title, children, className = "" }) => (
  <section
    id={id}
    className={`scroll-mt-24 border-b border-[var(--im-line)] px-5 py-12 sm:px-8 md:px-12 md:py-[88px] ${className}`}
  >
    <div className="mx-auto grid max-w-[1240px] gap-8 md:grid-cols-[200px_1fr] md:gap-14">
      <div className="md:sticky md:top-24 md:self-start">
        <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
          {index} / {label}
        </Mono>
        {note ? (
          <p className="mt-3 hidden text-sm leading-relaxed text-[var(--im-dim)] md:block">
            {note}
          </p>
        ) : null}
        {title ? (
          <h2 className="mt-3.5 text-[28px] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--im-ink)] md:hidden font-[family-name:var(--im-display)]">
            {title}
          </h2>
        ) : null}
      </div>
      <div>{children}</div>
    </div>
  </section>
);

/* ── interactive plot map ────────────────────────────────────────────────── */

const Legend = ({ className = "" }) => (
  <div className={`flex gap-3.5 ${className}`}>
    {["Available", "Reserved", "Sold"].map((s) => (
      <Mono key={s} className="flex items-center gap-1.5 text-[10px] text-[var(--im-dim)] sm:text-[11px]">
        <span
          className="inline-block h-1.5 w-1.5 rounded-[2px]"
          style={{ background: STATUS_COLOR[s] }}
        />
        {s}
      </Mono>
    ))}
  </div>
);

const PlotMap = ({ project, plots, ctaLink }) => {
  const [activeKey, setActiveKey] = useState(plots[0]?.key);
  const [hoverKey, setHoverKey] = useState(null);
  const [phase, setPhase] = useState(project.activePhase);

  const plot = plots.find((p) => p.key === activeKey) || plots[0];

  return (
    <div className="overflow-hidden rounded-[14px] border border-[var(--im-line-strong)] bg-[var(--im-panel)]">
      {/* panel header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--im-line)] px-4 py-3">
        <Mono className="flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-[var(--im-dim)] sm:text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-lumen lumen-pulse" />
          <span className="hidden sm:inline">Live · {project.name}</span>
          <span className="sm:hidden">Live · {project.shortName}</span>
        </Mono>
        <Legend className="hidden sm:flex" />
      </div>

      {/* map */}
      <div className="relative h-[260px] sm:h-[360px] lg:h-[470px]">
        <Image
          src={project.image}
          alt={`${project.name} master layout`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 620px"
          className="object-cover opacity-90"
        />

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          role="group"
          aria-label="Interactive plot layout"
        >
          {plots.map((p) => {
            const lit = p.key === activeKey || p.key === hoverKey;
            return (
              <polygon
                key={p.key}
                points={p.points}
                fill={statusFill(p.status, lit)}
                stroke={STATUS_COLOR[p.status]}
                strokeWidth={p.key === activeKey ? 0.8 : 0.4}
                className="cursor-pointer outline-none transition-all duration-200"
                tabIndex={0}
                role="button"
                aria-label={`Plot ${p.id} — ${p.status}, ${p.area}, ${p.price}`}
                aria-pressed={p.key === activeKey}
                onClick={() => setActiveKey(p.key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveKey(p.key);
                  }
                }}
                onMouseEnter={() => setHoverKey(p.key)}
                onMouseLeave={() => setHoverKey(null)}
                onFocus={() => setHoverKey(p.key)}
                onBlur={() => setHoverKey(null)}
              />
            );
          })}
        </svg>

        {/* phase switcher */}
        <div className="absolute right-3 top-3 flex gap-1.5 lg:flex-col lg:gap-1.5">
          {project.phases.map((ph) => {
            const on = ph === phase;
            return (
              <button
                key={ph}
                type="button"
                onClick={() => setPhase(ph)}
                className={`rounded-[5px] px-2.5 py-1.5 text-left transition-colors ${
                  on
                    ? "bg-lumen text-lumen-foreground"
                    : "border border-[rgba(17,19,21,0.16)] bg-white/92 text-[var(--im-ink)] hover:bg-white"
                }`}
              >
                <Mono className="text-[10px] sm:text-[11px]">{ph}</Mono>
              </button>
            );
          })}
        </div>

        {/* detail card — floats over the map from lg up */}
        <div className="absolute bottom-4 left-4 hidden w-[268px] rounded-[10px] border border-[rgba(17,19,21,0.16)] bg-white/94 p-4 backdrop-blur-md lg:block">
          <PlotCard plot={plot} ctaLink={ctaLink} />
        </div>
      </div>

      {/* detail card — inline below the map on small screens */}
      <div className="border-t border-[var(--im-line)] p-4 lg:hidden">
        <PlotCard plot={plot} ctaLink={ctaLink} />
        <Legend className="mt-3.5 sm:hidden" />
      </div>
    </div>
  );
};

const PlotCard = ({ plot, ctaLink }) => (
  <>
    <div className="flex items-center justify-between">
      <span className="font-[family-name:var(--im-display)] text-[19px] font-semibold text-[var(--im-ink)] lg:text-xl">
        Plot {plot.id}
      </span>
      <span
        className="rounded-[3px] px-1.5 py-1 font-[family-name:var(--im-mono)] text-[10px] uppercase tracking-[0.08em] text-lumen-foreground"
        style={{ background: STATUS_COLOR[plot.status] }}
      >
        {plot.status}
      </span>
    </div>

    <dl className="mt-3.5 grid grid-cols-2 gap-3 font-[family-name:var(--im-mono)]">
      {[
        ["Area", plot.area],
        ["Price", plot.price],
        ["Facing", plot.facing],
        ["Block", plot.block],
      ].map(([k, v]) => (
        <div key={k}>
          <dt className="text-[10px] uppercase tracking-[0.08em] text-[var(--im-dim)]">{k}</dt>
          <dd className="mt-[3px] text-[15px] text-[var(--im-ink)]">{v}</dd>
        </div>
      ))}
    </dl>

    <div className="mt-4 flex gap-2">
      <Link
        href={ctaLink}
        className="flex-1 rounded-[5px] bg-lumen py-2.5 text-center text-[13px] font-semibold text-lumen-foreground transition-opacity hover:opacity-90"
      >
        Enquire
      </Link>
      <Link
        href="/contact-us"
        className="flex-1 rounded-[5px] border border-[rgba(17,19,21,0.22)] py-2.5 text-center text-[13px] text-[var(--im-ink)] transition-colors hover:bg-[rgba(17,19,21,0.04)]"
      >
        Brochure
      </Link>
    </div>
  </>
);

/* ── FAQ ─────────────────────────────────────────────────────────────────── */

const Faqs = ({ faqs }) => {
  const [open, setOpen] = useState(0);
  return (
    <div className="border-t border-[var(--im-line-strong)]">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.question} className="border-b border-[var(--im-line-strong)]">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-5 py-5 text-left"
            >
              <span className="font-[family-name:var(--im-display)] text-base font-medium leading-[1.35] text-[var(--im-ink)] md:text-[19px]">
                {faq.question}
              </span>
              <Mono className="shrink-0 text-base leading-tight text-[var(--im-deep)] md:text-lg">
                {isOpen ? "−" : "+"}
              </Mono>
            </button>
            {isOpen ? (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="max-w-[720px] pb-5 text-sm leading-[1.7] text-[var(--im-muted)] md:text-base"
              >
                {faq.answer}
              </motion.p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

/* ── page ────────────────────────────────────────────────────────────────── */

const ImageMappingPage = ({ service, subService }) => {
  const cta = subService.cta || {};
  const primaryLink = cta.primaryLink || "/contact-us";
  const secondaryLink = cta.secondaryLink || "/portfolio";
  const demo = subService.demos?.[0];
  const study = subService.caseStudies?.[0];

  const primaryBtn =
    "rounded-md bg-lumen px-6 py-3.5 text-[15px] font-semibold text-lumen-foreground transition-opacity hover:opacity-90";
  const secondaryBtn =
    "rounded-md border border-[rgba(17,19,21,0.22)] px-6 py-3.5 text-[15px] font-medium text-[var(--im-ink)] transition-colors hover:bg-[rgba(17,19,21,0.04)]";

  return (
    <main
      className="bg-background font-[family-name:var(--im-body)] text-[var(--im-ink)] antialiased"
      style={{
        ...FONTS,
        "--im-ink": "#111315",
        "--im-muted": "#565C63",
        "--im-dim": "#7C838A",
        "--im-deep": "#4D7A0F",
        "--im-line": "rgba(17,19,21,0.10)",
        "--im-line-strong": "rgba(17,19,21,0.12)",
        "--im-panel": "#F8F8F5",
      }}
    >
      {/* ── HERO ── */}
      <section className="border-b border-[var(--im-line)] px-5 pb-12 pt-10 sm:px-8 md:px-12 md:pb-16 md:pt-[72px]">
        <div className="mx-auto grid max-w-[1240px] items-center gap-8 md:grid-cols-2 md:gap-16">
        <div>
          <nav aria-label="Breadcrumb">
            <Mono className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.11em] text-[var(--im-dim)] md:text-xs md:tracking-[0.12em]">
              <Link href="/services" className="transition-colors hover:text-[var(--im-ink)]">
                Services
              </Link>
              <span className="text-[#C4C8C2]">/</span>
              <Link
                href={`/services/${service.slug}`}
                className="transition-colors hover:text-[var(--im-ink)]"
              >
                {service.title}
              </Link>
              <span className="text-[#C4C8C2]">/</span>
              <span className="text-[var(--im-deep)]">{subService.title}</span>
            </Mono>
          </nav>

          <h1 className="mt-5 font-[family-name:var(--im-display)] text-[44px] font-medium leading-[1.0] tracking-[-0.03em] sm:text-[58px] md:mt-7 md:text-[68px] md:leading-[0.98] lg:text-[76px]">
            {(subService.headline || [subService.title]).map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <p className="mt-4 max-w-[480px] text-base leading-[1.6] text-[var(--im-muted)] md:mt-6 md:text-[19px] [text-wrap:pretty]">
            {subService.heroSubcopy || subService.description}
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row md:mt-9 md:gap-3">
            <Link href={primaryLink} className={`${primaryBtn} text-center`}>
              {cta.primaryText || "Book demo"}
            </Link>
            <Link href={secondaryLink} className={`${secondaryBtn} text-center`}>
              {cta.secondaryText || "View portfolio"}
            </Link>
          </div>

          {subService.highlightTags?.length ? (
            <div className="no-scrollbar mt-7 flex gap-2 overflow-x-auto md:mt-10 md:flex-wrap md:overflow-visible">
              {subService.highlightTags.map((tag) => (
                <Mono
                  key={tag}
                  className="shrink-0 whitespace-nowrap rounded border border-[var(--im-line-strong)] px-2.5 py-1.5 text-[11px] text-[var(--im-muted)] md:text-xs"
                >
                  {tag}
                </Mono>
              ))}
            </div>
          ) : null}
        </div>

        {subService.plots?.length && subService.liveProject ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <PlotMap
              project={subService.liveProject}
              plots={subService.plots}
              ctaLink={primaryLink}
            />
          </motion.div>
        ) : null}
        </div>
      </section>

      {/* ── STATS ── */}
      {subService.stats?.length ? (
        <div className="border-b border-[var(--im-line)] px-5 sm:px-8 md:px-12">
          <div className="mx-auto grid max-w-[1240px] grid-cols-3">
            {subService.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-6 md:py-10 ${
                  i > 0 ? "border-l border-[var(--im-line)] pl-5 sm:pl-8 md:pl-12" : ""
                } ${i < subService.stats.length - 1 ? "pr-4 md:pr-12" : ""}`}
              >
                <div
                  className={`font-[family-name:var(--im-display)] text-[26px] font-medium leading-none tracking-[-0.02em] sm:text-[38px] md:text-[52px] ${
                    i === 0 ? "text-[var(--im-deep)]" : "text-[var(--im-ink)]"
                  }`}
                >
                  {stat.value}
                </div>
                <div className="mt-2.5 text-xs leading-snug text-[var(--im-muted)] sm:text-sm md:mt-3 md:text-[15px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* ── 01 OVERVIEW ── */}
      <Section
        id="overview"
        index="01"
        label="Overview"
        note={subService.overviewNote}
        title={subService.overviewTitle}
      >
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              <h2 className="hidden font-[family-name:var(--im-display)] text-[34px] font-medium leading-[1.2] tracking-[-0.02em] md:block [text-wrap:pretty]">
                {subService.overviewTitle}
              </h2>
              <div
                className="text-base leading-[1.7] text-[var(--im-muted)] md:mt-5.5 md:text-[17px] [&>p+p]:mt-4"
                dangerouslySetInnerHTML={{ __html: subService.overview }}
              />
            </div>

            {subService.highlightTags?.length ? (
              <div className="border-t border-[var(--im-line-strong)] pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
                <Mono className="text-[11px] uppercase tracking-[0.1em] text-[var(--im-dim)]">
                  Highlights
                </Mono>
                <div className="mt-3.5">
                  {subService.highlightTags.map((tag, i) => (
                    <div
                      key={tag}
                      className={`flex gap-3 py-3.5 text-[15px] text-[var(--im-ink)] ${
                        i < subService.highlightTags.length - 1
                          ? "border-b border-[rgba(17,19,21,0.09)]"
                          : ""
                      }`}
                    >
                      <Mono className="text-xs text-[var(--im-deep)]">
                        {String(i + 1).padStart(2, "0")}
                      </Mono>
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </Reveal>
      </Section>

      {/* ── 02 FEATURES ── */}
      {subService.features?.length ? (
        <Section
          id="features"
          index="02"
          label="Features"
          note="Built to do the heavy lifting."
          title="Built to do the heavy lifting."
        >
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {subService.features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.08}>
                <article className="h-full overflow-hidden rounded-xl border border-[var(--im-line-strong)] bg-[var(--im-panel)]">
                  <div className="relative h-[168px] border-b border-[var(--im-line)] md:h-[196px]">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-[18px] md:p-[22px]">
                    <Mono className="text-[10px] text-[var(--im-dim)] md:text-[11px]">
                      Feature {String(i + 1).padStart(2, "0")}
                    </Mono>
                    <h3 className="mt-2 font-[family-name:var(--im-display)] text-[19px] font-semibold text-[var(--im-ink)] md:mt-2.5 md:text-[21px]">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-[1.6] text-[var(--im-muted)] md:mt-2.5 md:text-[15px]">
                      {feature.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      {/* ── 03 DEMO ── */}
      {demo ? (
        <Section id="demo" index="03" label="Demo" note="See it in motion." title="See it in motion.">
          <Reveal>
            <div className="grid items-stretch gap-6 lg:grid-cols-[1.6fr_1fr] lg:gap-8">
              <div className="overflow-hidden rounded-xl border border-[var(--im-line-strong)] bg-[#EFEFEC]">
                <video
                  src={demo.url}
                  poster={demo.poster}
                  controls
                  playsInline
                  preload="metadata"
                  className="aspect-video h-full w-full object-cover"
                  aria-label={demo.title}
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-[family-name:var(--im-display)] text-[22px] font-medium tracking-[-0.01em] md:text-[26px]">
                  {demo.title}
                </h3>
                <p className="mt-3.5 text-[15px] leading-[1.7] text-[var(--im-muted)] md:text-base">
                  {demo.description}
                </p>
                {demo.notes?.length ? (
                  <div className="mt-6 flex gap-6">
                    {demo.notes.map((note) => (
                      <Mono key={note} className="text-xs text-[var(--im-dim)]">
                        {note}
                      </Mono>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </Reveal>
        </Section>
      ) : null}

      {/* ── 04 BENEFITS ── */}
      {subService.benefits?.length ? (
        <Section
          id="benefits"
          index="04"
          label="Benefits"
          note="What your team gains."
          title="What your team gains."
        >
          <div className="grid md:grid-cols-2 md:gap-x-12">
            {subService.benefits.map((benefit, i) => (
              <div
                key={benefit}
                className="flex gap-3.5 border-b border-[rgba(17,19,21,0.09)] py-4 text-[15px] text-[#262A2E] last:border-b-0 md:py-[18px] md:text-base"
              >
                <span className="text-[var(--im-deep)]" aria-hidden="true">
                  →
                </span>
                {benefit}
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* ── 05 USE CASES ── */}
      {subService.useCases?.length ? (
        <Section
          id="use-cases"
          index="05"
          label="Use cases"
          note="Where it fits best."
          title="Where it fits best."
        >
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[rgba(17,19,21,0.11)] bg-[rgba(17,19,21,0.11)] md:grid-cols-3">
            {subService.useCases.map((useCase, i) => (
              <div key={useCase.title} className="bg-background p-4 md:p-7">
                <Mono className="text-[10px] text-[var(--im-deep)] md:text-[11px]">
                  {String(i + 1).padStart(2, "0")}
                </Mono>
                <h3 className="mt-2.5 font-[family-name:var(--im-display)] text-[15px] font-semibold leading-snug text-[var(--im-ink)] md:mt-3.5 md:text-lg">
                  {useCase.title}
                </h3>
                <p className="mt-2 hidden text-sm leading-[1.6] text-[#6A7076] md:block">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* ── 06 PROCESS + STACK ── */}
      {subService.workflow?.length ? (
        <Section
          id="process"
          index="06"
          label="Process"
          note="A simple delivery flow."
          title="A simple delivery flow."
        >
          <div className="grid gap-5 md:grid-cols-3 md:gap-7">
            {subService.workflow.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.08}>
                <div
                  className="pt-3.5 md:pt-5"
                  style={{
                    borderTop: `2px solid ${i === 0 ? "var(--lumen)" : "rgba(17,19,21,0.18)"}`,
                  }}
                >
                  <Mono
                    className={`text-[10px] md:text-[11px] ${
                      i === 0 ? "text-[var(--im-deep)]" : "text-[var(--im-dim)]"
                    }`}
                  >
                    Step {step.step}
                  </Mono>
                  <h3 className="mt-2 font-[family-name:var(--im-display)] text-lg font-semibold text-[var(--im-ink)] md:mt-3 md:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-[1.6] text-[var(--im-muted)] md:mt-2.5 md:text-[15px]">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {subService.technologies?.length || subService.deliverables?.length ? (
            <div className="mt-10 grid gap-8 border-t border-[var(--im-line)] pt-8 md:mt-14 md:grid-cols-2 md:gap-12 md:pt-10">
              {subService.technologies?.length ? (
                <div>
                  <Mono className="text-[11px] uppercase tracking-[0.1em] text-[var(--im-dim)]">
                    Stack
                  </Mono>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {subService.technologies.map((tech) => (
                      <Mono
                        key={tech}
                        className="rounded border border-[rgba(17,19,21,0.14)] px-2.5 py-1.5 text-xs text-[#262A2E]"
                      >
                        {tech}
                      </Mono>
                    ))}
                  </div>
                </div>
              ) : null}

              {subService.deliverables?.length ? (
                <div>
                  <Mono className="text-[11px] uppercase tracking-[0.1em] text-[var(--im-dim)]">
                    What you receive
                  </Mono>
                  <div className="mt-2">
                    {subService.deliverables.map((item) => (
                      <div
                        key={item}
                        className="border-b border-[rgba(17,19,21,0.09)] py-2.5 text-[15px] text-[#262A2E] last:border-b-0 md:py-[11px]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </Section>
      ) : null}

      {/* ── 07 CASE STUDY ── */}
      {study ? (
        <Section
          id="results"
          index="07"
          label="Case study"
          note="Proof, not promises."
          title="Proof, not promises."
        >
          <Reveal>
            <div className="grid overflow-hidden rounded-xl border border-[var(--im-line-strong)] md:grid-cols-[1.2fr_1fr]">
              <div className="relative h-[220px] md:h-[320px]">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center bg-[var(--im-panel)] p-7 md:p-10">
                <div className="font-[family-name:var(--im-display)] text-[42px] font-medium tracking-[-0.02em] text-[var(--im-deep)] md:text-[56px]">
                  {study.result}
                </div>
                <h3 className="mt-3 font-[family-name:var(--im-display)] text-xl font-semibold text-[var(--im-ink)] md:mt-4 md:text-[22px]">
                  {study.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.7] text-[var(--im-muted)]">
                  {study.description}
                </p>
              </div>
            </div>
          </Reveal>
        </Section>
      ) : null}

      {/* ── 08 FAQS ── */}
      {subService.faqs?.length ? (
        <Section
          id="faqs"
          index="08"
          label="FAQs"
          note="Common questions, answered."
          title="Common questions."
        >
          <Faqs faqs={subService.faqs} />
        </Section>
      ) : null}

      {/* ── CLOSING CTA ── */}
      <section className="border-b border-[var(--im-line)] px-5 py-12 sm:px-8 md:px-12 md:py-[104px]">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
          <div>
            <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
              Ready to move forward
            </Mono>
            <h2 className="mt-3.5 font-[family-name:var(--im-display)] text-[36px] font-medium leading-[1.05] tracking-[-0.03em] md:mt-5 md:text-[58px] md:leading-[1.02]">
              {cta.title}
            </h2>
            <p className="mt-3.5 text-base text-[var(--im-muted)] md:mt-4.5 md:text-lg">
              {cta.description}
            </p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row md:shrink-0 md:gap-3">
            <Link href={primaryLink} className={`${primaryBtn} text-center`}>
              {cta.primaryText || "Book demo"}
            </Link>
            <Link href={secondaryLink} className={`${secondaryBtn} text-center`}>
              {cta.secondaryText || "View portfolio"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ImageMappingPage;
