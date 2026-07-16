"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  Star,
  MapPinned,
  Rotate3d,
  Box,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Navigation,
  Map,
  Crosshair,
  Layers,
  Gauge,
  FileText,
  MousePointerClick,
  Check,
} from "lucide-react";

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
/*  Feature data                                                               */
/* -------------------------------------------------------------------------- */
const features = [
  {
    icon: MapPinned,
    title: "Image Mapping",
    description:
      "Tap any plot to instantly view dimensions, pricing, availability, and documents.",
  },
  {
    icon: Rotate3d,
    title: "360° Virtual Tours",
    description:
      "Immersive walkthroughs and aerial perspectives to explore remotely, anytime.",
  },
  {
    icon: Box,
    title: "3D Immersive Experience",
    description:
      "Photoreal 3D previews of future projects for confident decision-making.",
  },
];

const userActions = [
  "Tap plots to open details instantly",
  "View floor plans, images & PDFs",
  "Explore via 360° tours & hotspots",
  "See 3D renders for future phases",
];

const quickStats = [
  { icon: MousePointerClick, label: "Tap-to-View", sub: "Instant details" },
  { icon: FileText, label: "Docs & Plans", sub: "Floor plans, PDFs" },
  { icon: Gauge, label: "Fast UX", sub: "Smooth navigation" },
];

const MainProduct = () => {
  return (
    <section className="relative w-full py-14 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* ================= HEADER — title left, CTAs right ================= */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-6"
        >
          <motion.div variants={item} className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center justify-center h-6 min-w-6 px-1.5 rounded-md bg-lumen text-lumen-foreground text-[11px] font-bold tracking-wide">
                03
              </span>
              <Badge variant="secondary" className="rounded-full px-4 py-1">
                Visualization
              </Badge>
              <span className="hidden sm:inline-flex text-[11px] px-3 py-1 rounded-full bg-muted/40 border border-border text-muted-foreground">
                Mapping • Tours • 3D
              </span>
            </div>

            <h2
              className="mt-5 text-[26px] sm:text-[34px] md:text-[40px] font-bold text-foreground leading-[1.12]"
              style={{
                fontFamily: "var(--font-display, 'Montserrat', sans-serif)",
                letterSpacing: "-0.04em",
              }}
            >
              Transforming <span className="lumen-mark">Real Estate</span> with{" "}
              <span className="display-title-light text-foreground/60">
                Cutting-Edge
              </span>{" "}
              Visualization
            </h2>

            <p className="mt-4 text-[13px] sm:text-[14px] md:text-[15px] text-muted-foreground leading-relaxed">
              We build interactive visualization systems for layouts, villas, and
              large-scale projects — so buyers, investors, and teams can explore
              faster, compare options, and make decisions with clarity.
            </p>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap gap-3 lg:pb-1">
            <Button
              asChild
              size="lg"
              className="rounded-full h-11 px-6 text-sm font-semibold group bg-foreground text-background hover:bg-foreground/90 transition-all duration-200"
            >
              <Link href="/services/nexnet">
                Explore Visualization
                <span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-lumen text-lumen-foreground transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight className="size-3.5" />
                </span>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full h-11 px-6 text-sm font-semibold border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-200"
            >
              <Link href="/contact-us">Request Demo</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* ================= VIDEO — aligned to the container ================= */}
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
                src="/vid1.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>

            <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-lumen lumen-pulse" />
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
          className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={item}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="rounded-[18px] border border-border bg-background/70 backdrop-blur p-5 hover:border-lumen transition-colors duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lumen">
                    <Icon className="size-5 text-lumen-foreground" />
                  </span>
                  <div className="text-[14px] sm:text-[15px] font-semibold text-foreground">
                    {f.title}
                  </div>
                </div>
                <p className="mt-3 text-[12px] sm:text-[13px] text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ================= EXPERIENCE + MAP PANEL ================= */}
        <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-5 lg:gap-6 items-stretch">
          {/* LEFT — what users can do + quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="flex flex-col rounded-[20px] border border-border bg-background/70 backdrop-blur p-5 sm:p-6"
          >
            <div className="section-label">Inside the experience</div>
            <div className="mt-2 text-[16px] sm:text-[18px] font-bold text-foreground">
              What users can do
            </div>

            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {userActions.map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <span className="mt-0.5 inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-lumen">
                    <Check className="size-3 text-lumen-foreground" />
                  </span>
                  <span className="text-[13px] text-muted-foreground leading-relaxed">
                    {t}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-dashed border-border pt-5">
                {quickStats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/30">
                        <Icon className="size-4 text-foreground" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[12px] font-semibold text-foreground">
                          {s.label}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {s.sub}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — interactive map panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="w-full"
          >
            <Card className="relative h-full overflow-hidden rounded-[20px] border border-border bg-background/70 backdrop-blur shadow-sm py-0">
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.22) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-lumen/15 blur-3xl" />

              <CardContent className="relative z-10 flex h-full flex-col p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lumen">
                      <Map className="size-5 text-lumen-foreground" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[13px] sm:text-[14px] font-semibold text-foreground">
                        Interactive Map UI
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        Tap plots • hotspots • navigation
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-[10px] px-3 py-1 rounded-full bg-muted/40 border border-border text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-lumen lumen-pulse" />
                    Live
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { icon: Crosshair, label: "Plot Focus" },
                    { icon: Navigation, label: "Visual" },
                    { icon: Layers, label: "Layers" },
                  ].map((it) => {
                    const Icon = it.icon;
                    return (
                      <div
                        key={it.label}
                        className="rounded-xl border border-border bg-muted/25 px-3 py-2.5 flex items-center gap-2"
                      >
                        <Icon className="size-4 shrink-0 text-foreground" />
                        <div className="text-[11px] text-muted-foreground leading-tight">
                          {it.label}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex-1 rounded-[16px] border border-border bg-muted/25 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-4 h-4 text-foreground/80 fill-foreground/80"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] px-3 py-1 rounded-full bg-background/60 border border-border text-muted-foreground">
                      Trusted
                    </span>
                  </div>

                  <p className="mt-3 text-[12px] sm:text-[13px] text-muted-foreground leading-relaxed">
                    Reduce back-and-forth by showing plot info, floor plans,
                    renders, and CTAs inside a clean map-driven experience.
                  </p>

                  <div className="mt-4 flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lumen">
                      <ShieldCheck className="size-4.5 text-lumen-foreground" />
                    </span>
                    <div>
                      <div className="text-[13px] font-semibold text-foreground">
                        AI Integration
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        Smart insights, faster qualification, better decisions.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <Button
                    asChild
                    className="rounded-full px-5 font-semibold bg-foreground text-background hover:bg-foreground/90"
                  >
                    <Link href="/contact-us">
                      Talk to us <ArrowUpRight className="ml-1.5 size-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full px-5 font-semibold border-foreground/20 hover:bg-foreground hover:text-background"
                  >
                    <Link href="/portfolio">View Work</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MainProduct;
