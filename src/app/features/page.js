"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  BarChart3,
  Zap,
  Smartphone,
  ShieldCheck,
  Layers,
  Sparkles,
  ArrowUpRight,
  Gauge,
  MousePointerClick,
  FileText,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Motion presets                                                             */
/* -------------------------------------------------------------------------- */
const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const features = [
  {
    title: "Seamless Integration",
    description: "Connect with popular tools and services effortlessly.",
    icon: CheckCircle,
    tag: "Plug & Play",
  },
  {
    title: "Advanced Analytics",
    description: "Gain insights with real-time reports and dashboards.",
    icon: BarChart3,
    tag: "Insights",
  },
  {
    title: "AI-Powered Automation",
    description: "Automate workflows and enhance efficiency.",
    icon: Zap,
    tag: "Smart",
  },
  {
    title: "Multi-Platform Support",
    description: "Access our platform on web, mobile, and desktop.",
    icon: Smartphone,
    tag: "Everywhere",
  },
  {
    title: "Top-Notch Security",
    description: "Secure data encryption and compliance measures.",
    icon: ShieldCheck,
    tag: "Secure",
  },
  {
    title: "Scalable Architecture",
    description: "Designed to grow with your business needs.",
    icon: Layers,
    tag: "Scale",
  },
];

export default function FeaturesPage() {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden">
      {/* ================= GLOBAL BACKGROUND (same system as your other pages) ================= */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.18) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* soft glows */}
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* ================= HEADER (flex-start like you wanted) ================= */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.55 }}
          className="max-w-3xl"
        >
          <div className="mb-4 flex items-center gap-2">
            <Badge className="rounded-full px-4 py-1">Features</Badge>
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Sparkles className="size-3.5 text-primary" />
              Modern UX • scalable systems
            </span>
          </div>

          <h1 className="text-[30px] sm:text-[36px] md:text-[44px] font-bold tracking-tight text-foreground">
            Powerful Features for{" "}
            <span className="text-primary">nex</span> Platform
          </h1>

          <p className="mt-4 text-[14px] md:text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
            A clean, fast, and reliable platform stack built for product teams,
            brands, and enterprises. Built with performance, security, and
            great user experience at the core.
          </p>

          {/* quick strip */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: Gauge, label: "Performance", sub: "Fast & optimized" },
              { icon: MousePointerClick, label: "UX", sub: "Smooth flows" },
              { icon: FileText, label: "Reports", sub: "Clear visibility" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-background/60 backdrop-blur p-4 flex items-center gap-3"
                >
                  <div className="h-10 w-10 rounded-xl border border-border bg-muted/35 flex items-center justify-center">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-foreground">
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
        </motion.div>

        {/* ================= FEATURE GRID ================= */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
              >
                <Card className="relative h-full overflow-hidden rounded-2xl border border-border bg-background/60 backdrop-blur shadow-sm">
                  {/* hover gradient */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/10 to-secondary/10" />

                  {/* subtle dots */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.45) 1px, transparent 0)",
                      backgroundSize: "22px 22px",
                    }}
                  />

                  <CardContent className="relative p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between gap-3">
                      <div className="h-11 w-11 rounded-2xl border border-border bg-muted/35 flex items-center justify-center">
                        <Icon className="size-5 text-primary" />
                      </div>

                      <span className="text-[10px] px-3 py-1 rounded-full bg-muted/40 border border-border text-muted-foreground">
                        {feature.tag}
                      </span>
                    </div>

                    <h3 className="mt-4 text-[15px] font-semibold text-foreground">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-[12.5px] text-muted-foreground leading-relaxed flex-1">
                      {feature.description}
                    </p>

                    <div className="mt-5 h-px w-full bg-border/70" />

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">
                        Designed for real workflows
                      </span>
                      <ArrowUpRight className="size-4 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* ================= CTA ================= */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.65 }}
          className="mt-14 rounded-2xl border border-border bg-background/60 backdrop-blur p-7 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="text-[18px] md:text-[20px] font-semibold text-foreground">
                Ready to build with nex?
              </h3>
              <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
                Start using our tools to launch faster, track better, and scale
                confidently with a modern UX-first approach.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="rounded-xl">
                <Link href="/getstarted">
                  Get Started <ArrowUpRight className="ml-2 size-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/contact-us">Talk to Us</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
