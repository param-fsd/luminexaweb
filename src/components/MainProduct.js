"use client";

/**
 * Home · section 03 — Visualization.
 *
 * Implements variant "1a — Editorial refine (light)" from the `Luminexa Section.dc.html`
 * design doc (Claude Design project "Hi UI UX Redesign"). The doc's raw hex values are
 * mapped onto the site's tokens rather than hard-coded: #c6f24e → `lumen`,
 * #0e0e10 → `foreground`, #ececed → `border`, #6b6b70 → `muted-foreground`.
 *
 * The doc's <image-slot> placeholder is a design-canvas element, not something that
 * ships — here it resolves to the section's existing /vid1.mp4 loop, which already
 * carried the doc's "Live preview" badge.
 */

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Box,
  Check,
  FileText,
  Gauge,
  Map,
  MousePointerClick,
  Navigation,
  Rotate3d,
} from "lucide-react";
import { Button } from "./ui/button";

/* -------------------------------------------------------------------------- */
/*  Motion variants                                                            */
/* -------------------------------------------------------------------------- */
const container = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, duration: 0.55, ease: "easeOut" },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

/* -------------------------------------------------------------------------- */
/*  Content                                                                    */
/* -------------------------------------------------------------------------- */
const features = [
  {
    icon: Map,
    title: "Image mapping",
    description:
      "Tap any plot to open dimensions, pricing, availability and documents instantly.",
  },
  {
    icon: Rotate3d,
    title: "360° virtual tours",
    description:
      "Immersive walkthroughs and aerial perspectives explored remotely, anytime.",
  },
  {
    icon: Box,
    title: "3D immersive preview",
    description:
      "Photoreal 3D of future phases for confident, faster decision-making.",
  },
  {
    icon: Navigation,
    title: "Smart routing",
    description:
      "Live directions, ETA and branded overlays with one-tap QR share links.",
  },
];

const buyerActions = [
  "Tap plots to open details instantly",
  "View floor plans, images & PDFs",
  "Explore via 360° tours & hotspots",
  "See 3D renders for future phases",
  "Get live routes & travel time",
  "Open or share navigation via QR",
];

const quickStats = [
  { icon: MousePointerClick, label: "Tap-to-view", sub: "Instant details" },
  { icon: FileText, label: "Docs & plans", sub: "Floor plans, PDFs" },
  { icon: Gauge, label: "Fast UX", sub: "Smooth navigation" },
];

/* Hotspot positions are percentage-based so they track the media as it scales. */
const hotspots = [
  { top: "28%", left: "22%", delay: "0s" },
  { top: "57%", left: "55%", delay: "0.8s" },
  { top: "39%", left: "79%", delay: "1.5s" },
];

/* Space Grotesk — the doc's display face, already loaded by the root layout. */
const DISPLAY = { fontFamily: "var(--font-display, 'Montserrat', sans-serif)" };

/* -------------------------------------------------------------------------- */

const MainProduct = () => {
  return (
    <section className="relative w-full py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* ================= HEADER ================= */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-wrap items-end justify-between gap-8"
        >
          <motion.div variants={item} className="max-w-[680px]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-lumen px-1.5 text-[11px] font-bold tracking-wide text-lumen-foreground">
                03
              </span>
              <span className="section-label">Visualization</span>
              <span className="hidden h-px max-w-[120px] flex-1 bg-border sm:block" />
              <span className="rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground">
                Mapping · Tours · 3D
              </span>
            </div>

            <h2
              className="mt-4 text-[26px] font-bold leading-[1.08] text-foreground sm:text-[32px] md:text-[38px]"
              style={{ ...DISPLAY, letterSpacing: "-0.04em" }}
            >
              Transforming real estate with
              <br />
              <em className="lumen-mark font-normal italic">cutting-edge</em>{" "}
              visualization.
            </h2>
          </motion.div>

          <motion.p
            variants={item}
            className="max-w-[340px] text-[15.5px] leading-[1.55] text-muted-foreground"
          >
            One map-driven surface — plots, floor plans, renders and live
            routing — so prospects qualify themselves before the first call.
          </motion.p>
        </motion.div>

        {/* ================= VIDEO — full width, as before ================= */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mt-8 md:mt-10"
        >
          <div className="relative overflow-hidden rounded-[22px] border border-border shadow-lg shadow-black/5">
            <div className="aspect-[16/8]">
              <video
                src="/img.mp4"
                className="size-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>

            <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
              <span className="lumen-pulse size-1.5 rounded-full bg-lumen" />
              Live preview
            </span>
          </div>

          <p className="mt-3 text-center text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Interactive visualization • Image mapping • 360° tours • 3D walkthroughs
          </p>
        </motion.div>

        {/* ================= FEATURE CARDS ================= */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-10 grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:mt-12 lg:grid-cols-4"
        >
          {features.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={item}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="rounded-[20px] border border-border px-6 pb-[30px] pt-[26px] transition-colors duration-200 hover:border-foreground"
            >
              <div className="flex size-11 items-center justify-center rounded-[13px] bg-lumen">
                <Icon className="size-[21px] text-lumen-foreground" />
              </div>
              <h3
                className="mb-2 mt-5 text-[18px] font-semibold text-foreground"
                style={DISPLAY}
              >
                {title}
              </h3>
              <p className="text-[14px] leading-[1.5] text-muted-foreground">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ================= EXPERIENCE + MEDIA ================= */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.05fr_1fr]">
          {/* LEFT — dark panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="flex flex-col rounded-[22px] bg-foreground p-7 text-background sm:p-10"
          >
            <div
              className="text-[12px] font-semibold uppercase tracking-[.14em] text-lumen"
              style={DISPLAY}
            >
              Inside the experience
            </div>
            <h3
              className="mb-6 mt-3 text-[26px] font-semibold text-background"
              style={DISPLAY}
            >
              What your buyers can do
            </h3>

            <div className="grid grid-cols-1 gap-x-[30px] gap-y-4 sm:grid-cols-2">
              {buyerActions.map((action) => (
                <div
                  key={action}
                  className="flex items-start gap-3 text-[14.5px] leading-[1.4] text-background/85"
                >
                  <span className="mt-0.5 flex size-[19px] shrink-0 items-center justify-center rounded-full bg-lumen">
                    <Check
                      className="size-[11px] text-lumen-foreground"
                      strokeWidth={3}
                    />
                  </span>
                  {action}
                </div>
              ))}
            </div>

            <div className="mt-auto flex flex-wrap gap-x-[34px] gap-y-5 border-t border-background/10 pt-6">
              {quickStats.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-background/15">
                    <Icon className="size-4 text-lumen" />
                  </span>
                  <div>
                    <div
                      className="text-[15px] font-bold text-background"
                      style={DISPLAY}
                    >
                      {label}
                    </div>
                    <div className="text-[12.5px] text-background/55">
                      {sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — media + product card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col rounded-[22px] border border-border p-3.5"
          >
            <div className="relative h-[230px] overflow-hidden rounded-[14px]">
              <Image
                src="/inter.webp"
                alt="Interactive map UI preview"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 45vw"
              />

              {/* doc's pulsing plot markers */}
              <div className="pointer-events-none absolute inset-0">
                {hotspots.map((h) => (
                  <span
                    key={`${h.top}-${h.left}`}
                    className="lumen-pulse absolute size-3.5 rounded-full bg-lumen shadow-[0_0_0_5px_rgba(200,246,60,.35)]"
                    style={{
                      top: h.top,
                      left: h.left,
                      animationDelay: h.delay,
                    }}
                  />
                ))}
              </div>

              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-foreground/80 px-2.5 py-1.5 text-[11px] font-semibold text-background backdrop-blur">
                <span className="size-1.5 rounded-full bg-lumen" />
                Live preview
              </span>
            </div>

            <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
              <div className="flex items-center gap-3">
                <div className="flex size-[38px] shrink-0 items-center justify-center rounded-[11px] bg-lumen">
                  <Map className="size-[19px] text-lumen-foreground" />
                </div>
                <div>
                  <div
                    className="text-[16px] font-semibold text-foreground"
                    style={DISPLAY}
                  >
                    Interactive map UI
                  </div>
                  <div className="text-[12.5px] text-muted-foreground">
                    Tap plots · hotspots · navigation
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                {["Plot focus", "Visual", "Layers"].map((chip) => (
                  <span
                    key={chip}
                    className="flex-1 rounded-[10px] border border-border py-2.5 text-center text-[12.5px] text-foreground/75"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <p className="mb-[18px] mt-4 text-[13.5px] leading-[1.5] text-muted-foreground">
                Reduce back-and-forth by showing plot info, floor plans,
                renders and CTAs inside one clean, map-driven experience.
              </p>

              <div className="mt-auto flex flex-wrap gap-2.5">
                <Button
                  asChild
                  className="group h-auto rounded-full bg-foreground py-2.5 pl-5 pr-2.5 text-[14px] font-semibold text-background hover:bg-foreground/90"
                >
                  <Link href="/contact-us">
                    Talk to us
                    <span className="ml-2 flex size-[26px] items-center justify-center rounded-full bg-lumen transition-transform duration-200 group-hover:translate-x-0.5">
                      <ArrowUpRight className="size-3.5 text-lumen-foreground" />
                    </span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto rounded-full border-border px-5 py-[11px] text-[14px] font-semibold hover:bg-foreground hover:text-background"
                >
                  <Link href="/portfolio">View work</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MainProduct;
