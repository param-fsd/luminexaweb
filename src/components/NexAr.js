"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Globe,
  Smartphone,
  Layers,
  Camera,
  ArrowUpRight,
  Sparkles,
  Zap,
  MousePointerClick,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Web Platform",
    desc: "Launch immersive experiences instantly through the browser.",
  },
  {
    icon: Smartphone,
    title: "Cross-Device Ready",
    desc: "Optimized for Android, iOS, tablets, and desktop browsers.",
  },
  {
    icon: Layers,
    title: "3D Visual Layers",
    desc: "Interactive models, animations, hotspots, and product showcases.",
  },
  {
    icon: Camera,
    title: "Real-Time Preview",
    desc: "Display products, visuals, and experiences with premium interaction.",
  },
];

const Tech3DPreview = () => {
  return (
    <div className="relative flex min-h-[430px] items-center justify-center">
      <div className="absolute -inset-10 -z-10 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 blur-3xl opacity-70" />

      <motion.div
        aria-hidden
        className="absolute h-[420px] w-[420px] rounded-full border border-border/60"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        aria-hidden
        className="absolute h-[300px] w-[300px] rounded-full border border-dashed border-foreground/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 h-[360px] w-[340px] overflow-hidden rounded-[28px] border border-border bg-background/70 shadow-2xl backdrop-blur-xl">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.25) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <motion.div
          className="absolute bottom-12 left-1/2 h-20 w-[240px] -translate-x-1/2 rounded-full bg-foreground/10 blur-2xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute left-1/2 top-[45%] h-28 w-28 -translate-x-1/2 -translate-y-1/2"
          animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 rotate-45 rounded-3xl bg-foreground shadow-2xl" />
          <div className="absolute inset-4 rotate-45 rounded-2xl bg-background" />
          <div className="absolute inset-8 rotate-45 rounded-xl bg-foreground/80" />
        </motion.div>

        {[
          "left-6 top-14",
          "right-10 top-20",
          "left-12 bottom-20",
          "right-16 bottom-16",
        ].map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute ${pos} h-14 w-14 rounded-2xl border border-border bg-background shadow-lg`}
            animate={{
              y: [0, i % 2 === 0 ? -16 : 16, 0],
              rotate: [0, i % 2 === 0 ? 14 : -14, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-2 rounded-xl bg-muted" />
          </motion.div>
        ))}

        <motion.div
          className="absolute left-1/2 top-16 h-[200px] w-px bg-foreground/20"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        <motion.div
          className="absolute left-10 right-10 top-1/2 h-px bg-foreground/20"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-lumen/70"
          animate={{ top: ["20%", "80%", "20%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-border bg-background/80 px-4 py-3 backdrop-blur">
          <p className="text-xs text-muted-foreground">3D System Engine</p>
          <p className="text-sm font-semibold text-foreground">
            Real-time Rendering Core
          </p>
        </div>
      </div>

      <motion.div
        className="absolute -left-6 top-12 hidden sm:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="rounded-xl border border-border bg-background/80 px-4 py-3 shadow-lg backdrop-blur">
          <p className="text-xs text-muted-foreground">Render Speed</p>
          <p className="text-lg font-semibold">Ultra Fast</p>
        </div>
      </motion.div>

      <motion.div
        className="absolute -right-6 bottom-14 hidden sm:block"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="rounded-xl border border-border bg-background/80 px-4 py-3 shadow-lg backdrop-blur">
          <p className="text-xs text-muted-foreground">System Status</p>
          <p className="text-lg font-semibold">Active</p>
        </div>
      </motion.div>
    </div>
  );
};

const NexArSection = () => {
  return (
    <section className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />

        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.18) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[620px] w-[620px] rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-flex items-center justify-center h-6 min-w-6 px-1.5 rounded-md bg-lumen text-lumen-foreground text-[11px] font-bold tracking-wide">06</span>
              <Badge className="rounded-full px-4 py-1">Product</Badge>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Sparkles className="size-3.5 text-lumen" />
                Web-based immersive technology
              </span>
            </div>

            <h2 className="text-[28px] font-bold tracking-tight text-foreground sm:text-[34px] md:text-[42px]">
              nexAR <span className="display-title-light text-foreground/60">—</span>{" "}
              <span className="lumen-mark">Augmented</span> Reality
            </h2>

            <p className="mt-5 max-w-xl text-[13px] leading-relaxed text-muted-foreground sm:text-[14px] md:text-[15px]">
              nexAR transforms ordinary marketing, education, and product
              experiences into immersive digital experiences — delivered
              instantly through the web with smooth, interactive 3D visuals.
            </p>

            <div className="mt-6 h-px w-full max-w-xl bg-border" />

            <div className="mt-6 grid max-w-xl grid-cols-1 gap-5 sm:grid-cols-2">
              {features.map((f, i) => {
                const Icon = f.icon;

                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    className="relative rounded-2xl border border-border bg-background/60 p-4 backdrop-blur"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 transition-opacity duration-300 hover:opacity-100" />

                    <div className="relative flex gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-foreground">
                        <Icon className="h-5 w-5 text-lumen" />
                      </div>

                      <div>
                        <div className="text-[13px] font-semibold text-foreground">
                          {f.title}
                        </div>
                        <div className="text-[12px] leading-snug text-muted-foreground">
                          {f.desc}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild className="rounded-xl">
                <Link href="/services/augmented-reality">
                  Explore nexAR <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/contact-us">Request Demo</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <Tech3DPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NexArSection;