"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Briefcase, Sparkles, Clock3, Layers3 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cards = [
  {
    icon: Briefcase,
    title: "Selected Works",
    text: "A curated collection of projects, products, and digital experiences will be showcased here.",
  },
  {
    icon: Layers3,
    title: "Design + Development",
    text: "From UI systems to scalable web solutions, the portfolio will reflect both creativity and execution.",
  },
  {
    icon: Sparkles,
    title: "Brand Impact",
    text: "Case studies, visuals, and success-driven project highlights are being prepared for launch.",
  },
];

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.14) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div className="absolute -top-24 -left-20 h-[320px] w-[320px] rounded-full bg-muted/50 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-[380px] w-[380px] rounded-full bg-muted/40 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-[320px] w-[320px] rounded-full bg-muted/40 blur-3xl" />
      </div>

      <section className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-16 md:px-6">
        <div className="w-full">
          {/* Top bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8 flex items-center justify-between gap-4"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-sm text-foreground backdrop-blur transition hover:bg-muted/60"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-xs text-muted-foreground backdrop-blur">
              <Clock3 className="h-4 w-4" />
              Portfolio Page in Progress
            </div>
          </motion.div>

          {/* Hero */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative overflow-hidden rounded-3xl border border-border bg-background/70 shadow-sm backdrop-blur"
          >
            <div className="absolute inset-0 opacity-[0.04]">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.32) 1px, transparent 0)",
                  backgroundSize: "22px 22px",
                }}
              />
            </div>

            <div className="relative px-6 py-14 sm:px-8 md:px-12 md:py-20">
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-1.5 text-xs font-medium text-muted-foreground"
              >
                <Sparkles className="h-4 w-4" />
                Luminexa Portfolio
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
              >
                Portfolio
                <span className="block text-primary">Coming Soon</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base"
              >
                We are currently preparing a refined portfolio experience to
                showcase our best work, creative process, and digital solutions.
                Stay tuned for a collection of impactful projects and case
                studies.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap gap-3"
              >
                {["Creative Projects", "Modern Solutions", "Case Studies", "UI/UX Showcase"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-muted/30 px-4 py-2 text-xs text-foreground sm:text-sm"
                    >
                      {item}
                    </span>
                  )
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Info cards */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-background/80 p-6 backdrop-blur"
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-[0.06]">
                    <div
                      className="h-full w-full"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, rgba(0,0,0,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.18) 1px, transparent 1px)",
                        backgroundSize: "34px 34px",
                      }}
                    />
                  </div>

                  <div className="relative">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-muted/40">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>

                    <h3 className="text-base font-semibold text-foreground">
                      {card.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {card.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </main>
  );
}