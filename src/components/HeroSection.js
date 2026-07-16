"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "./ui/button";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import Marquee from "./motion/Marquee";

/* 3D scene is client/GPU-only — load it lazily with a lightweight placeholder */
const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => (
    <div className="relative h-[420px] sm:h-[500px] lg:h-[580px] xl:h-[620px] w-full flex items-center justify-center">
      <div className="h-40 w-40 rounded-full bg-lumen/20 blur-3xl" />
    </div>
  ),
});

/* line-by-line clip reveal for the headline */
const lineReveal = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: 0,
    transition: { delay: 0.12 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const HeroLine = ({ index, children, className = "" }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      custom={index}
      variants={lineReveal}
      initial="hidden"
      animate="show"
      className={`block ${className}`}
    >
      {children}
    </motion.span>
  </span>
);

const HeroSection = () => {
  const router = useRouter();

  const tags = useMemo(
    () => [
      "Immersive 3D",
      "AI & Automations",
      "Custom Web Applications",
      "Geospatial Mapping",
      "360° Virtual Tours",
      "AR / VR / XR",
      "Enterprise CRM",
      "& More",
    ],
    []
  );

  const tickerItems = useMemo(
    () => [
      "Immersive 3D Experiences",
      "AI & Automations",
      "Custom Web Applications",
      "Geospatial Mapping",
      "360° Virtual Tours",
      "AR / VR / XR Solutions",
      "Enterprise CRM Systems",
      "& More",
    ],
    []
  );

  return (
    <section className="w-full overflow-hidden relative">
      {/* ── Background ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        {/* fine dot grid */}
        <div className="absolute inset-0 opacity-[0.045] dot-grid" />
        {/* soft blobs for depth */}
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-foreground/[0.04] blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[540px] w-[540px] rounded-full bg-lumen/20 blur-3xl" />
      </div>

      <div className="px-4 md:px-8 pt-14 pb-10 md:pt-20 md:pb-14">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col items-start text-left min-w-0 w-full">
            {/* Overline tag row */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-8"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-lumen px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-lumen-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-lumen-foreground lumen-pulse" />
                Studio of Future
              </span>
              {tags.map((t) => (
                <React.Fragment key={t}>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
                    {t}
                  </span>
                </React.Fragment>
              ))}
            </motion.div>

            {/* ── Headline ── line-by-line clip reveal */}
            <h1 className="display-title text-[42px] sm:text-[52px] md:text-[60px] lg:text-[66px] mb-6">
              <HeroLine index={0} className="text-foreground">Experience</HeroLine>
              <HeroLine
                index={1}
                className="display-title-light text-foreground/60 text-[38px] sm:text-[46px] md:text-[54px] lg:text-[58px]"
              >
                the Future
              </HeroLine>
              <HeroLine index={2} className="text-foreground">Built by</HeroLine>
              <HeroLine index={3} className="text-foreground">
                <span className="lumen-mark">Luminexa</span>
              </HeroLine>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="text-sm md:text-[15px] text-muted-foreground mb-8 max-w-md leading-relaxed"
            >
              Luminexa helps you collaborate, automate, and scale — with powerful
              AR, AI, and 3D experiences built for results.
            </motion.p>

            {/* ── Buttons ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="flex flex-row flex-wrap gap-3"
            >
              <Button
                size="lg"
                className="rounded-full h-12 px-7 text-sm font-semibold cursor-pointer group bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 shadow-md shadow-black/10"
                onClick={() => router.push("/features")}
              >
                Why <strong className="ml-1">nex?</strong>
                <span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-lumen text-lumen-foreground transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight className="size-3.5" />
                </span>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-12 px-7 text-sm font-semibold cursor-pointer border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-200"
                onClick={() => router.push("/getstarted")}
              >
                Book a Demo
              </Button>
            </motion.div>

            {/* Trust checks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-[12px] text-muted-foreground"
            >
              {[
                "Custom-Built for Your Brand",
                "End-to-End Solutions",
                "Scalable Across All Platforms",
              ].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-lumen">
                    <Check className="size-2.5 text-lumen-foreground" />
                  </span>
                  <span>{t}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — interactive 3D tech core ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 w-full flex justify-center"
          >
            <div className="w-full max-w-[560px]">
              <Hero3D />
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Capability ticker ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="border-y border-border bg-foreground text-background"
      >
        <Marquee duration={26} className="py-3">
          {tickerItems.map((item) => (
            <span key={item} className="flex items-center">
              <span
                className="px-6 text-[12px] font-semibold uppercase tracking-[0.18em] whitespace-nowrap"
                style={{ fontFamily: "var(--font-display, 'Montserrat', sans-serif)" }}
              >
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-lumen shrink-0" />
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
};

export default HeroSection;
