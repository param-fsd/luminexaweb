"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Search,
  PenTool,
  Code2,
  Rocket,
  LineChart,
  Compass,
} from "lucide-react";
import SectionHeader from "./motion/SectionHeader";

/* -------------------------------------------------------------------------- */
/*  Real delivery process                                                      */
/* -------------------------------------------------------------------------- */
const steps = [
  {
    icon: Search,
    title: "Discover",
    description:
      "We dig into your goals, users, and market — so every decision after this is grounded in what actually matters.",
    tag: "Workshops · Research",
  },
  {
    icon: Compass,
    title: "Strategize",
    description:
      "We map the solution: scope, architecture, milestones, and the fastest route from idea to measurable impact.",
    tag: "Roadmap · Architecture",
  },
  {
    icon: PenTool,
    title: "Design",
    description:
      "Interfaces, 3D scenes, and interactions are prototyped early — you see and feel the product before a line of code.",
    tag: "UI/UX · Prototypes",
  },
  {
    icon: Code2,
    title: "Build",
    description:
      "Agile sprints with weekly demos. AR, AI, mapping, or web — engineered for performance and scale from day one.",
    tag: "Sprints · Weekly demos",
  },
  {
    icon: Rocket,
    title: "Launch",
    description:
      "Hardened, tested, and deployed. We handle infrastructure, analytics, and a smooth, zero-drama go-live.",
    tag: "QA · Deployment",
  },
  {
    icon: LineChart,
    title: "Evolve",
    description:
      "Post-launch we monitor, optimize, and iterate — your product keeps getting faster, smarter, and sharper.",
    tag: "Support · Optimization",
  },
];

/* -------------------------------------------------------------------------- */
/*  Step Card                                                                  */
/* -------------------------------------------------------------------------- */
function StepCard({ index, step, side }) {
  const Icon = step.icon;
  const stepNo = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, x: side === "left" ? -16 : 16 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-full overflow-hidden rounded-2xl border border-border bg-background/80 backdrop-blur transition-all duration-300 hover:border-foreground/30 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1"
    >
      {/* giant ghost number */}
      <span
        className="pointer-events-none absolute -right-2 -top-5 text-[88px] font-black leading-none display-outline select-none transition-opacity duration-300 opacity-60 group-hover:opacity-100"
        aria-hidden
      >
        {stepNo}
      </span>

      <div className="relative p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-foreground flex items-center justify-center transition-colors duration-300 group-hover:bg-lumen">
            <Icon className="size-5 text-background transition-colors duration-300 group-hover:text-lumen-foreground" />
          </div>
          <div>
            <div
              className="text-[16px] font-bold text-foreground"
              style={{ fontFamily: "var(--font-display, 'Montserrat', sans-serif)", letterSpacing: "-0.03em" }}
            >
              {step.title}
            </div>
            <div className="text-[11px] text-muted-foreground tracking-wide">{step.tag}</div>
          </div>
        </div>

        <p className="mt-4 text-[12.5px] sm:text-[13px] text-muted-foreground leading-relaxed max-w-md">
          {step.description}
        </p>

        {/* progress hint */}
        <div className="mt-4 h-[2px] w-8 rounded-full bg-foreground/15 transition-all duration-300 group-hover:w-16 group-hover:bg-lumen" />
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Component — scroll-driven center timeline                                  */
/* -------------------------------------------------------------------------- */
export default function WorkingSection() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 65%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-background" />
      <div className="absolute inset-0 -z-10 opacity-[0.05] line-grid" />
      <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-muted/40 blur-3xl -z-10" />
      <div className="absolute -bottom-28 -right-24 h-[520px] w-[520px] rounded-full bg-lumen/15 blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <SectionHeader
          index="05"
          label="How we work"
          title="From idea to launch — and beyond"
          description="Six clear stages. No black boxes, no surprises — you see progress every single week, from first workshop to post-launch optimization."
          className="mb-14"
        />

        {/* timeline */}
        <div ref={timelineRef} className="relative">
          {/* center rail (desktop) / left rail (mobile) */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
          {/* animated lumen fill */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[3px] -ml-px md:-translate-x-1/2 origin-top bg-lumen rounded-full"
          />

          <div className="space-y-8 md:space-y-0">
            {steps.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <div
                  key={step.title}
                  className="relative md:grid md:grid-cols-2 md:gap-14 md:items-center md:py-5"
                >
                  {/* node dot */}
                  <div className="absolute left-5 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
                    <span className="block h-4 w-4 rounded-full border-[3px] border-background bg-foreground shadow-md" />
                  </div>

                  {/* card — alternating sides on desktop, indented on mobile */}
                  <div
                    className={`pl-12 md:pl-0 ${
                      left ? "md:col-start-1 md:pr-2" : "md:col-start-2 md:pl-2"
                    }`}
                  >
                    <StepCard index={i} step={step} side={left ? "left" : "right"} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
