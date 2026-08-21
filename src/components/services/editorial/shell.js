"use client";

/**
 * Shared shell for the bespoke service pages (CRM/ERP, Website & App, Custom Web
 * App, AI Automation) and the Image Mapping sub-service page.
 *
 * These pages all use the same editorial language: hairline rules, a sticky
 * index/label rail, mono micro-labels and numbered sections. Keeping the shell in
 * one module means container widths and responsive behaviour are fixed once.
 *
 * Container note: sections are full-bleed (so their bottom rules span the viewport)
 * with the padding on the section and the max-width on an inner box. `px-4 md:px-8`
 * + `max-w-[1216px]` puts the content edge exactly where the site's shared
 * `max-w-7xl mx-auto px-4 md:px-8` chrome puts it (see Footer.js).
 */

import React, { useState } from "react";
import { motion } from "framer-motion";

/* Typography maps onto the fonts the root layout already loads — no extra webfonts. */
export const FONTS = {
  "--im-display": "var(--font-display), 'Montserrat', sans-serif",
  "--im-body": "var(--font-body), 'Space Grotesk', sans-serif",
  "--im-mono": "var(--font-geist-mono), ui-monospace, monospace",
};

/* Light editorial palette. Set on <main> so every child can read the tokens. */
export const THEME = {
  ...FONTS,
  "--im-ink": "#111315",
  "--im-muted": "#565C63",
  "--im-dim": "#7C838A",
  "--im-deep": "#4D7A0F",
  "--im-line": "rgba(17,19,21,0.10)",
  "--im-line-strong": "rgba(17,19,21,0.12)",
  "--im-panel": "#F8F8F5",
};

/* Shared spacing so every section lines up with the site chrome. */
export const PAD = "px-4 md:px-8";
export const INNER = "mx-auto max-w-[1216px]";

export const PRIMARY_BTN =
  "rounded-md bg-lumen px-6 py-3.5 text-[15px] font-semibold text-lumen-foreground transition-opacity hover:opacity-90";
export const SECONDARY_BTN =
  "rounded-md border border-[rgba(17,19,21,0.22)] px-6 py-3.5 text-[15px] font-medium text-[var(--im-ink)] transition-colors hover:bg-[rgba(17,19,21,0.04)]";

export const Mono = ({ children, className = "" }) => (
  <span className={`font-[family-name:var(--im-mono)] ${className}`}>{children}</span>
);

export const Reveal = ({ children, delay = 0, className = "" }) => (
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

/**
 * Section shell: sticky index/label rail on the left, content on the right.
 * `min-w-0` on the content column matters — without it a grid item's automatic
 * minimum size is its min-content width, which blows the single mobile track wide
 * enough to scroll the whole page sideways.
 */
export const Section = ({ id, index, label, note, title, children, className = "" }) => (
  <section
    id={id}
    className={`scroll-mt-24 border-b border-[var(--im-line)] ${PAD} py-12 md:py-[88px] ${className}`}
  >
    <div className={`${INNER} grid gap-8 md:grid-cols-[200px_1fr] md:gap-14`}>
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
          <h2 className="mt-3.5 font-[family-name:var(--im-display)] text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-[var(--im-ink)] md:hidden">
            {title}
          </h2>
        ) : null}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  </section>
);

export const Faqs = ({ faqs }) => {
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
              <span className="font-[family-name:var(--im-display)] text-base font-bold leading-[1.35] text-[var(--im-ink)] md:text-[19px]">
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

/**
 * A segmented control used by several hero widgets. Always a full-width N-up grid,
 * so it never overflows a narrow panel the way a floating overlay does.
 */
export const SegmentedTabs = ({ items, value, onChange, label, className = "" }) => (
  <div
    role="tablist"
    aria-label={label}
    className={`grid gap-1.5 ${className}`}
    style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
  >
    {items.map((it) => {
      const on = it.key === value;
      return (
        <button
          key={it.key}
          type="button"
          role="tab"
          aria-selected={on}
          onClick={() => onChange(it.key)}
          className={`rounded-[5px] px-2 py-1.5 text-center transition-colors ${
            on
              ? "bg-lumen text-lumen-foreground"
              : "border border-[rgba(17,19,21,0.16)] bg-white/92 text-[var(--im-ink)] hover:bg-white"
          }`}
        >
          <Mono className="block truncate text-[10px] sm:text-[11px]">{it.label}</Mono>
        </button>
      );
    })}
  </div>
);

/* Panel chrome shared by the hero widgets. */
export const PanelHeader = ({ live, right }) => (
  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--im-line)] px-4 py-3">
    <Mono className="flex min-w-0 items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-[var(--im-dim)] sm:text-[11px]">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lumen lumen-pulse" />
      <span className="truncate">Live · {live}</span>
    </Mono>
    {right ? (
      <Mono className="shrink-0 text-[10px] uppercase tracking-[0.1em] text-[var(--im-dim)] sm:text-[11px]">
        {right}
      </Mono>
    ) : null}
  </div>
);

export const Panel = ({ children }) => (
  <div className="overflow-hidden rounded-[14px] border border-[var(--im-line-strong)] bg-[var(--im-panel)]">
    {children}
  </div>
);

export const KpiRow = ({ kpis }) => (
  <div className="grid grid-cols-3 border-b border-[var(--im-line)]">
    {kpis.map((kpi, i) => (
      <div
        key={kpi.label}
        className={`min-w-0 px-3 py-3.5 sm:px-4 ${
          i > 0 ? "border-l border-[var(--im-line)]" : ""
        }`}
      >
        <div
          className={`truncate font-[family-name:var(--im-display)] text-[19px] font-bold leading-none tracking-[-0.02em] sm:text-[24px] ${
            i === 0 ? "text-[var(--im-deep)]" : "text-[var(--im-ink)]"
          }`}
        >
          {kpi.value}
        </div>
        <Mono className="mt-1.5 block truncate text-[10px] uppercase tracking-[0.08em] text-[var(--im-dim)]">
          {kpi.label}
        </Mono>
      </div>
    ))}
  </div>
);
