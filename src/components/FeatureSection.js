"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import features from "@/data/feature.data";
import SectionHeader from "./motion/SectionHeader";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const FeatureSection = () => {
  return (
    <section id="features" className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Background using global tokens */}
      <div className="absolute inset-0 -z-10">
        {/* subtle grid - kept as it's neutral */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.14) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* Removed all colored glow blobs */}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeader
          index="04"
          label="Capabilities"
          title="The Luminexa difference"
          description="Innovation, design, and strategy — blended into digital experiences that engage and convert."
          className="mb-10"
        />

        {/* Hero / Banner */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-border bg-background/60 backdrop-blur shadow-sm"
        >
          {/* Image */}
          <div className="relative w-full h-[280px] sm:h-[340px] md:h-[420px]">
            <Image
              src="/deb.png"
              alt="Luminexa – Turning visions into powerful digital experiences"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />

            {/* Removed colored gradient overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" /> */}

            {/* tech overlay - kept as it's subtle/neutral */}
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)",
                backgroundSize: "34px 34px",
                maskImage:
                  "radial-gradient(circle at 50% 40%, black 0%, black 48%, transparent 76%)",
                WebkitMaskImage:
                  "radial-gradient(circle at 50% 40%, black 0%, black 48%, transparent 76%)",
              }}
            />

            {/* top chips */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="h-10 w-10 rounded-2xl bg-white/10 border border-white/15 backdrop-blur flex items-center justify-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                </span>

                <span className="text-[10px] sm:text-[11px] px-3 py-1 rounded-full bg-white/12 ring-1 ring-white/18 text-white/90 backdrop-blur">
                  Innovation • Design • Strategy
                </span>
              </div>

              <span className="text-[10px] sm:text-[11px] px-3 py-1 rounded-full bg-white/12 ring-1 ring-white/18 text-white/90 backdrop-blur">
                Luminexa Technologies
              </span>
            </div>

            {/* Text - now needs stronger contrast because we removed dark overlay */}
            <div className="absolute inset-0 flex items-end">
              <div className="w-full p-5 sm:p-7 md:p-10 bg-gradient-to-t from-black/85 via-black/65 to-transparent">
                <motion.h2
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                  className="text-[20px] sm:text-[28px] md:text-[36px] font-bold text-white"
                  style={{ fontFamily: "var(--font-display, 'Montserrat', sans-serif)", letterSpacing: "-0.035em" }}
                >
                  The Luminexa Difference
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.28, ease: "easeOut" }}
                  className="mt-2 sm:mt-3 text-[12px] sm:text-[13px] md:text-[14px] text-white/90 max-w-3xl leading-snug"
                >
                  We’re your creative partner, blending innovation, design, and strategy to transform
                  your vision into impactful digital experiences that help businesses engage and succeed.
                </motion.p>

                {/* mini stat strip */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Secure", "Scalable", "High Performance", "Modern UI"].map((t) => (
                    <span
                      key={t}
                      className="text-[10px] sm:text-[11px] px-3 py-1 rounded-full bg-white/12 ring-1 ring-white/18 text-white/90 backdrop-blur"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Removed corner glow */}
          </div>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 md:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5"
        >
          {features.slice(0, 6).map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="group relative rounded-2xl border border-border bg-muted/40 backdrop-blur p-4 sm:p-5 text-center overflow-hidden hover:border-foreground/25 hover:shadow-sm transition-all duration-300"
            >
              {/* subtle dots - kept (neutral) */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-[0.12] transition-opacity duration-500"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.30) 1px, transparent 0)",
                  backgroundSize: "22px 22px",
                }}
              />

              {/* icon */}
              <div className="mx-auto mb-3 h-12 w-12 sm:h-14 sm:w-14 rounded-2xl border border-border bg-foreground flex items-center justify-center group-hover:scale-105 group-hover:bg-lumen group-hover:border-lumen transition-all duration-300">
                <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-background group-hover:text-lumen-foreground transition-colors duration-300" />
              </div>

              <h3 className="text-[12px] sm:text-[13px] font-semibold text-foreground leading-snug">
                {feature.title}
              </h3>

              {/* hover hint */}
              <div className="mt-3 h-[2px] w-8 mx-auto rounded-full bg-foreground/30 opacity-40 group-hover:opacity-100 group-hover:w-12 group-hover:bg-lumen transition-all duration-300" />

              {/* Removed colored glow on hover */}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
