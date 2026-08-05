"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Real delivery process                                                      */
/* -------------------------------------------------------------------------- */
const steps = [
  {
    title: "Discover",
    tag: "Workshops · Research",
    description:
      "We dig into your goals, users, and market — so every decision after this is grounded in what actually matters.",
  },
  {
    title: "Strategize",
    tag: "Roadmap · Architecture",
    description:
      "We map the solution: scope, architecture, milestones, and the fastest route from idea to measurable impact.",
  },
  {
    title: "Design",
    tag: "UI/UX · Prototypes",
    description:
      "Interfaces, 3D scenes, and interactions are prototyped early — you see and feel the product before a line of code.",
  },
  {
    title: "Build",
    tag: "Sprints · Weekly demos",
    description:
      "Agile sprints with weekly demos. AR, AI, mapping, or web — engineered for performance and scale from day one.",
  },
  {
    title: "Launch",
    tag: "QA · Deployment",
    description:
      "Hardened, tested, and deployed. We handle infrastructure, analytics, and a smooth, zero-drama go-live.",
  },
  {
    title: "Evolve",
    tag: "Support · Optimization",
    description:
      "Post-launch we monitor, optimize, and iterate — your product keeps getting faster, smarter, and sharper.",
  },
];

const DISPLAY = {
  fontFamily: "var(--font-display, 'Montserrat', sans-serif)",
  letterSpacing: "-0.03em",
};

/* -------------------------------------------------------------------------- */
/*  Route geometry                                                             */
/*                                                                             */
/*  The SVG stretches to the container (preserveAspectRatio="none") so viewBox  */
/*  x maps linearly to width — that's what keeps the nodes locked to the card   */
/*  columns below. Odd steps ride the crest, even steps the trough.             */
/* -------------------------------------------------------------------------- */
const VB_W = 1000;
const VB_H = 130;
const CREST = 34;
const TROUGH = 100;

/* Card columns: 7-col grid, cards span 2 starting at 1,3,5 (top) and 2,4,6
   (bottom). Node x = the centre of each card's span.
 *
 * The grid deliberately has NO column gap — the gutters are padding inside each
 * cell instead. With a real gap the centre of a 2-col span is
 * (s-1)(colW+gap) + colW + gap/2, which is not a fixed percentage: it drifts
 * with both the gap and the container width, so the nodes would slide off their
 * cards. With gap:0 the centre collapses to exactly s/7. */
const NODE_X = [1, 2, 3, 4, 5, 6].map((s) => (s / 7) * 100);

const routePoints = [
  { x: 0, y: TROUGH },
  ...NODE_X.map((pct, i) => ({
    x: (pct / 100) * VB_W,
    y: i % 2 === 0 ? CREST : TROUGH,
  })),
  { x: VB_W, y: TROUGH },
];

/* Smooth serpentine: horizontal tangents at every node. */
const routeD = routePoints.reduce((d, p, i) => {
  if (i === 0) return `M ${p.x} ${p.y}`;
  const prev = routePoints[i - 1];
  const dx = (p.x - prev.x) * 0.5;
  return `${d} C ${prev.x + dx} ${prev.y}, ${p.x - dx} ${p.y}, ${p.x} ${p.y}`;
}, "");

/* -------------------------------------------------------------------------- */
/*  Step card                                                                  */
/* -------------------------------------------------------------------------- */
function StepCard({ index, step, dark = false, className = "" }) {
  const stepNo = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`flex h-full flex-col rounded-[18px] border p-5 transition-colors duration-300 ${
        dark
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background hover:border-foreground/35"
      } ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${
            dark ? "text-background/50" : "text-muted-foreground"
          }`}
        >
          Step {stepNo}
        </span>
        <span className="rounded-full bg-lumen px-2.5 py-1 text-[10px] font-semibold text-lumen-foreground">
          {step.tag}
        </span>
      </div>

      <h3
        className={`mt-4 text-[20px] font-bold ${
          dark ? "text-background" : "text-foreground"
        }`}
        style={DISPLAY}
      >
        {step.title}
      </h3>

      <p
        className={`mt-2 text-[12.5px] leading-relaxed ${
          dark ? "text-background/65" : "text-muted-foreground"
        }`}
      >
        {step.description}
      </p>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Component — serpentine route (lg+) with a vertical fallback below           */
/* -------------------------------------------------------------------------- */
export default function WorkingSection() {
  const routeRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: routeRef,
    offset: ["start 80%", "end 60%"],
  });
  const drawn = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <section className="relative w-full overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-background" />
      <div className="line-grid absolute inset-0 -z-10 opacity-[0.05]" />
      <div className="absolute -bottom-28 -right-24 -z-10 h-[520px] w-[520px] rounded-full bg-lumen/15 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex flex-wrap items-end justify-between gap-8"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span className="lumen-pulse size-1.5 rounded-full bg-lumen" />
              05 · How we work
            </span>

            <h2
              className="mt-5 text-[30px] font-bold leading-[1.06] text-foreground sm:text-[38px] lg:text-[46px]"
              style={DISPLAY}
            >
              From brief to launch,
              <br />
              one clear <span className="lumen-mark">route.</span>
            </h2>
          </div>

          <p className="max-w-[340px] text-[13.5px] leading-relaxed text-muted-foreground">
            Six steps, one straight line. Every engagement runs the same
            disciplined path — from the first workshop to continuous
            optimization.
          </p>
        </motion.div>

        {/* ================= ROUTE (lg+) ================= */}
        <div ref={routeRef} className="mt-16 hidden lg:block">
          {/* crest row — steps 01 · 03 · 05 */}
          <div className="grid grid-cols-7">
            {[0, 2, 4].map((i, slot) => (
              <div
                key={steps[i].title}
                className="col-span-2 px-2.5"
                style={{ gridColumnStart: slot * 2 + 1 }}
              >
                <StepCard index={i} step={steps[i]} />
              </div>
            ))}
          </div>

          {/* the route itself */}
          <div className="relative h-[130px]">
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              preserveAspectRatio="none"
              className="absolute inset-0 size-full"
              aria-hidden
            >
              <path
                d={routeD}
                fill="none"
                stroke="currentColor"
                className="text-border"
                strokeWidth={2}
                strokeDasharray="7 8"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                d={routeD}
                fill="none"
                stroke="var(--lumen)"
                strokeWidth={2.5}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: drawn }}
              />
            </svg>

            {/* numbered nodes */}
            {NODE_X.map((left, i) => (
              <motion.span
                key={steps[i].title}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute z-10 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-lumen text-[12px] font-bold text-lumen-foreground shadow-[0_0_0_5px_var(--background)]"
                style={{
                  left: `${left}%`,
                  top: `${((i % 2 === 0 ? CREST : TROUGH) / VB_H) * 100}%`,
                  ...DISPLAY,
                }}
              >
                {i + 1}
              </motion.span>
            ))}

            {/* endpoint labels */}
            <span className="absolute left-0 top-[76%] -translate-y-1/2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Start · Kickoff
            </span>
            <span className="absolute right-0 top-[24%] -translate-y-1/2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Live &amp; evolving
            </span>
          </div>

          {/* trough row — steps 02 · 04 · 06 */}
          <div className="grid grid-cols-7">
            {[1, 3, 5].map((i, slot) => (
              <div
                key={steps[i].title}
                className="col-span-2 px-2.5"
                style={{ gridColumnStart: slot * 2 + 2 }}
              >
                <StepCard
                  index={i}
                  step={steps[i]}
                  dark={i === steps.length - 1}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ================= FALLBACK (below lg) ================= */}
        <div className="relative mt-12 lg:hidden">
          <div className="absolute bottom-0 left-[15px] top-2 w-px bg-border" />
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={step.title} className="relative pl-10">
                <span className="absolute left-[15px] top-6 z-10 flex size-7 -translate-x-1/2 items-center justify-center rounded-full bg-lumen text-[11px] font-bold text-lumen-foreground shadow-[0_0_0_4px_var(--background)]">
                  {i + 1}
                </span>
                <StepCard
                  index={i}
                  step={step}
                  dark={i === steps.length - 1}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
