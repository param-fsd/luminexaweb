"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Sparkles,
  Camera,
  Cpu,
  Globe,
  Map,
  Layers,
  ShieldCheck,
  Zap,
} from "lucide-react";
import services from "@/data/serviceData";

const iconMap = { Camera, Cpu, Globe, Map };

// ---------- helpers ----------
const cx = (...c) => c.filter(Boolean).join(" ");

const FILTERS = [
  { key: "all", label: "All" },
  { key: "ar", label: "AR" },
  { key: "ai", label: "AI" },
  { key: "3d", label: "3D" },
  { key: "web", label: "Web Apps" },
  { key: "tour", label: "360 Tours" },
];

// very lightweight tagging without changing your data schema
const inferTag = (s = {}) => {
  const str = `${s.title || ""} ${s.label || ""} ${s.applications || ""}`.toLowerCase();
  if (str.includes("ar") || str.includes("webar") || str.includes("image mapping")) return "ar";
  if (str.includes("ai") || str.includes("ml") || str.includes("automation")) return "ai";
  if (str.includes("3d") || str.includes("model") || str.includes("render")) return "3d";
  if (str.includes("360") || str.includes("tour") || str.includes("virtual")) return "tour";
  if (str.includes("web") || str.includes("app") || str.includes("dashboard")) return "web";
  return "all";
};

// ---------- UI Blocks ----------
const SectionBg = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-background" />
    {/* subtle grid */}
    <div
      className="absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.14) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }}
    />
    {/* soft glows */}
    <div className="absolute -top-28 -left-24 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl" />
    <div className="absolute -bottom-32 -right-24 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-secondary/18 to-primary/18 blur-3xl" />
  </div>
);

const FilterChips = ({ active, setActive }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
      {FILTERS.map((f) => {
        const on = active === f.key;
        return (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={cx(
              "text-[11px] sm:text-[12px] px-3 py-1.5 rounded-full border transition-all",
              on
                ? "bg-foreground text-background border-foreground"
                : "bg-background/70 text-foreground border-border hover:bg-muted/50"
            )}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
};

const StatStrip = () => {
  const items = [
    { icon: Zap, title: "Fast Delivery", sub: "Rapid prototypes" },
    { icon: ShieldCheck, title: "Stable Builds", sub: "Production-ready" },
    { icon: Layers, title: "Premium UX", sub: "Modern UI systems" },
  ];

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <div
            key={it.title}
            className="rounded-2xl border border-border bg-muted/30 backdrop-blur p-4 flex items-center gap-3"
          >
            <div className="h-10 w-10 rounded-xl border border-border bg-background/60 flex items-center justify-center">
              <Icon className="size-5 text-primary" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-foreground">{it.title}</div>
              <div className="text-xs text-muted-foreground">{it.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// A more “UI panel” style service tile (not a normal card)
const ServiceTile = ({ service, variant = "compact" }) => {
  const IconComponent = iconMap[service.icon] || Globe;

  const isFeatured = variant === "featured";
  const h = isFeatured ? "min-h-[420px]" : "min-h-[260px]";

  return (
    <Link href={`/services/${service.slug}`} className="block h-full">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className={cx(
          "group relative h-full overflow-hidden rounded-2xl border border-border",
          "bg-background/60 backdrop-blur shadow-sm",
          h
        )}
      >
        {/* image layer */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${service.image || "/images/fallback.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* panel overlay (tech) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

        {/* micro grid mask */}
        <div
          className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
            maskImage: "radial-gradient(circle at 60% 42%, black 0%, black 45%, transparent 74%)",
            WebkitMaskImage:
              "radial-gradient(circle at 60% 42%, black 0%, black 45%, transparent 74%)",
          }}
        />

        {/* scan line */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-0 group-hover:opacity-25"
          initial={{ y: -120 }}
          animate={{ y: [-120, 520] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.18), transparent)",
          }}
        />

        {/* border ring */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/15 group-hover:ring-white/25 transition-all duration-500" />

        {/* TOP “UI BAR” */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4">
          <div className="flex items-center justify-between">
            {/* left cluster */}
            <div className="flex items-center gap-3">
              {/* dot controls */}
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>

              {/* icon */}
              <motion.div
                className="h-10 w-10 rounded-2xl bg-white/70 ring-1 ring-black/10 backdrop-blur-md shadow-sm flex items-center justify-center"
                whileHover={{ rotate: 6, scale: 1.06 }}
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
              >
                <IconComponent className="size-5 text-black/80" />
              </motion.div>

              {/* label */}
              <span className="text-[10px] sm:text-[11px] px-3 py-1 rounded-full bg-white/20 ring-1 ring-white/25 text-white/90 backdrop-blur">
                {service.label}
              </span>
            </div>

            {/* arrow */}
            <motion.div
              className="h-10 w-10 rounded-full bg-white/70 ring-1 ring-black/10 backdrop-blur-md shadow-sm flex items-center justify-center"
              whileHover={{ x: 3, y: -3 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <ArrowUpRight className="size-4 text-black/75" />
            </motion.div>
          </div>

          {/* little status row */}
          <div className="mt-3 flex items-center gap-2 text-[10px] text-white/80">
            <Sparkles className="size-3.5" />
            <span>Live-ready • Scalable • Modern UI</span>
          </div>
        </div>

        {/* BOTTOM content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-6">
          <motion.h3
            className={cx(
              "text-white font-semibold leading-tight",
              isFeatured
                ? "text-[18px] sm:text-[20px] md:text-[22px]"
                : "text-[16px] sm:text-[18px]"
            )}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {service.title}
          </motion.h3>

          <p
            className={cx(
              "mt-1 text-white/85 leading-snug",
              isFeatured ? "text-[12px] sm:text-[13px]" : "text-[12px]"
            )}
          >
            {service.applications}
          </p>

          {/* chips */}
          <div className="mt-3 flex flex-wrap gap-2">
            {["Secure", "Scalable", "High Performance"].map((tag) => (
              <span
                key={tag}
                className="text-[10px] sm:text-[11px] px-3 py-1 rounded-full bg-white/16 ring-1 ring-white/20 text-white/90 backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* featured: extra bottom detail row */}
          {isFeatured && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-white/10 ring-1 ring-white/15 backdrop-blur p-3">
                <div className="text-[10px] text-white/70">Typical timeline</div>
                <div className="text-[12px] sm:text-[13px] text-white font-semibold">
                  7–14 days
                </div>
              </div>
              <div className="rounded-xl bg-white/10 ring-1 ring-white/15 backdrop-blur p-3">
                <div className="text-[10px] text-white/70">Best for</div>
                <div className="text-[12px] sm:text-[13px] text-white font-semibold">
                  Brands + Launches
                </div>
              </div>
            </div>
          )}
        </div>

        {/* subtle corner glow */}
        <div className="absolute -bottom-20 -right-20 h-52 w-52 rounded-full bg-gradient-to-br from-primary/25 to-secondary/25 blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
      </motion.div>
    </Link>
  );
};

const CTA = () => (
  <motion.div
    className="mt-14 rounded-2xl border border-border bg-muted/30 backdrop-blur p-8"
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div className="text-left">
        <div className="text-lg md:text-xl font-semibold text-foreground">
          Want something custom for your brand?
        </div>
        <div className="mt-2 text-sm md:text-sm text-muted-foreground max-w-2xl">
          We build premium AI, 3D, AR and web experiences with analytics-ready, scalable architecture.
        </div>
      </div>

      <div className="flex gap-3">
        <Button asChild className="rounded-xl">
          <Link href="/contact-us">Get Started</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/portfolio">View Portfolio</Link>
        </Button>
      </div>
    </div>
  </motion.div>
);

export default function ProductsAndServicesSection() {
  const [active, setActive] = useState("all");

  const normalized = useMemo(() => {
    return (services || []).map((s) => ({
      ...s,
      __tag: inferTag(s),
    }));
  }, []);

  const filtered = useMemo(() => {
    if (active === "all") return normalized;
    return normalized.filter((s) => s.__tag === active);
  }, [active, normalized]);

  // bento pick: first one featured, next 3 compact
  const featured = filtered[0] || normalized[0];
  const rest = (filtered.length ? filtered : normalized).slice(1, 4);

  return (
    <section id="services" className="relative w-full py-16 md:py-24 overflow-hidden">
      <SectionBg />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-start" // ← this ensures everything starts from left
    >
      <Badge variant="secondary" className="mb-4">
        Our Services
      </Badge>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
        Tech-First Solutions, Built for Results
      </h2>

      <p className="mt-3 text-muted-foreground text-sm md:text-base max-w-3xl">
        Premium AR, AI, 3D and web experiences designed for engagement, conversions, and scale.
      </p>

      {/* Filter chips will now naturally align left because of items-start */}
      <div >
        <FilterChips active={active} setActive={setActive} />
      </div>
    </motion.div>

        {/* Bento layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* featured */}
          <div className="lg:col-span-7">
            {featured ? <ServiceTile service={featured} variant="featured" /> : null}
          </div>

          {/* right stack */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {rest.map((s) => (
              <ServiceTile key={s.slug} service={s} variant="compact" />
            ))}
          </div>
        </div>

        {/* stats strip */}
        <StatStrip />

        {/* CTA */}
        <CTA />
      </div>
    </section>
  );
}
