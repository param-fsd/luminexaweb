"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  ArrowUpRight,
  Sparkles,
  Cpu,
  Layers,
  Zap,
  CheckCircle2,
} from "lucide-react";
import Marquee from "./motion/Marquee";

const CTASection = () => {
  const highlights = [
    "Fast delivery approach",
    "Premium UI systems",
    "Modern and scalable stack",
    "Strategy-first execution",
  ];

  const features = [
    { icon: Zap, label: "Fast Delivery" },
    { icon: Layers, label: "Premium UI" },
    { icon: Cpu, label: "Modern Stack" },
  ];

  return (
    <section className="relative w-full py-14 md:py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-background" />
      <div className="absolute inset-0 -z-10 opacity-[0.04] line-grid" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[24px] sm:rounded-[30px] border border-border/60 bg-foreground text-background"
        >
          {/* faint grid inside panel */}
          <div className="absolute inset-0 opacity-[0.06]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />
          </div>

          {/* lumen glow corners */}
          <motion.div
            className="absolute -top-24 -left-24 h-[260px] w-[260px] rounded-full bg-lumen/25 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute -bottom-20 -right-20 h-[260px] w-[260px] rounded-full bg-white/10 blur-3xl" />

          {/* oversized ghost marquee behind the content */}
          <div className="pointer-events-none absolute inset-x-0 bottom-2 select-none" aria-hidden>
            <Marquee duration={36} className="opacity-[0.35]">
              {["LET'S BUILD", "BEYOND LIMITS", "LUMINEXA", "LET'S BUILD", "BEYOND LIMITS", "LUMINEXA"].map(
                (word, i) => (
                  <span
                    key={`${word}-${i}`}
                    className="display-outline display-outline-light px-8 text-[64px] sm:text-[92px] leading-none whitespace-nowrap"
                  >
                    {word}
                  </span>
                )
              )}
            </Marquee>
          </div>

          <div className="relative z-10 grid grid-cols-1 xl:grid-cols-[1.15fr_.85fr] gap-8 px-4 py-8 sm:px-6 md:px-10 md:py-12 lg:px-12 lg:py-14 pb-24 md:pb-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-lumen px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-lumen-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-lumen-foreground lumen-pulse" />
                Let’s Collaborate
              </span>

              <h2
                className="mt-4 text-[26px] sm:text-[34px] md:text-[44px] lg:text-[50px] font-bold leading-[1.04] text-background"
                style={{ fontFamily: "var(--font-display, 'Montserrat', sans-serif)", letterSpacing: "-0.04em" }}
              >
                Innovating Beyond
                <span className="block text-background/70 font-light italic">Boundaries</span>
              </h2>

              <p className="mt-4 max-w-2xl text-[12px] sm:text-[13px] md:text-[14px] leading-6 text-background/75">
                From immersive WebAR to intelligent platforms and future-ready
                digital products, we help brands turn bold ideas into
                meaningful, scalable experiences.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Button
                  asChild
                  className="group rounded-full px-6 h-11 w-full sm:w-auto bg-lumen text-lumen-foreground font-semibold hover:bg-lumen/90 transition-all duration-200"
                >
                  <Link href="/getstarted">
                    Start a Project
                    <ArrowUpRight className="size-4 ml-2 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-6 h-11 border-background/25 bg-transparent text-background hover:bg-background/10 hover:text-background w-full sm:w-auto"
                >
                  <Link href="/contact-us">Book a Creative Demo</Link>
                </Button>
              </div>

              <div className="mt-5 flex items-center gap-2 text-[11px] text-background/65">
                <span className="h-1.5 w-1.5 rounded-full bg-lumen" />
                No obligation • Strategy-first • Built to scale
              </div>
            </div>

            <div className="xl:border-l xl:border-white/10 xl:pl-10">
              <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-background/60">
                <Sparkles className="size-3.5 text-lumen" />
                <span>Why work with us</span>
              </div>

              <div className="mt-4 space-y-3">
                {highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="size-4 text-lumen mt-0.5 shrink-0" />
                    <span className="text-[12px] sm:text-[13px] md:text-[14px] leading-6 text-background/80">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {features.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.25 }}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] sm:text-[11px] text-background backdrop-blur hover:border-lumen/50 transition-colors"
                    >
                      <Icon className="size-4 text-lumen" />
                      {item.label}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
