"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles, Boxes, MapPinned } from "lucide-react";
import SectionHeader from "./motion/SectionHeader";

const UPDATES = [
  {
    icon: Boxes,
    no: "01",
    tag: "June 2026",
    kicker: "New Capability",
    title: "3D Immersive Experience",
    description:
      "Step inside projects before they exist. Digital twins and real-time 3D walkthroughs of spaces, products, and layouts — straight in the browser, no app needed.",
    chips: ["Digital Twins", "Real-time 3D", "360° Walkthroughs"],
    image: "/3d.jpg",
    imageAlt: "3D digital twin of a villa project rendered on a laptop",
    ctaText: "Explore 3D",
    ctaLink: "/services/3d-visualization",
  },
  {
    icon: MapPinned,
    no: "02",
    tag: "Real Estate",
    kicker: "Just Shipped",
    title: "AI Integrations for Real Estate Maps",
    description:
      "Interactive project maps that think. AI-powered plot insights, pricing intelligence, and smart search layered directly onto your layouts.",
    chips: ["AI Insights", "Live Availability", "Smart Search"],
    image: "/map3d.jpg",
    imageAlt: "AI-highlighted 3D map of a real estate development",
    ctaText: "Explore Mapping",
    ctaLink: "/services/mapping",
  },
];

const UpdateRow = ({ update, index }) => {
  const router = useRouter();
  const Icon = update.icon;
  const flipped = index % 2 === 1; // alternate the image side

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => router.push(update.ctaLink)}
      className="group grid grid-cols-1 lg:grid-cols-12 items-stretch gap-6 lg:gap-10 cursor-pointer"
    >
      {/* ---------- visual panel ---------- */}
      <div
        className={`relative lg:col-span-7 overflow-hidden rounded-[28px] ring-1 ring-black/5 ${
          flipped ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div className="relative h-[280px] sm:h-[360px] lg:h-[460px] w-full overflow-hidden rounded-[28px]">
          <Image
            src={update.image}
            alt={update.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 760px"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
          />
          {/* readability + brand wash */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/15" />
          {/* shimmer sweep on hover */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100" />

          {/* floating badges */}
          <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-lumen px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-lumen-foreground shadow-lg shadow-lumen/30">
            <span className="h-1.5 w-1.5 rounded-full bg-lumen-foreground lumen-pulse" />
            New
          </span>
          <span className="absolute top-5 right-5 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 backdrop-blur-md">
            {update.tag}
          </span>

          {/* oversized ghost index, anchored to the panel */}
          <span
            className="display-outline display-outline-light pointer-events-none absolute -bottom-6 right-4 select-none text-[150px] leading-none opacity-40"
            aria-hidden="true"
          >
            {update.no}
          </span>
        </div>
      </div>

      {/* ---------- text panel ---------- */}
      <div
        className={`relative lg:col-span-5 flex flex-col justify-center py-2 ${
          flipped ? "lg:order-1 lg:pr-2" : "lg:order-2 lg:pl-2"
        }`}
      >
        {/* kicker row */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center h-7 min-w-7 px-2 rounded-md bg-lumen text-lumen-foreground text-[11px] font-bold tracking-wide">
            {update.no}
          </span>
          <span className="section-label">{update.kicker}</span>
          <div className="flex-1 h-px max-w-[90px] bg-border" />
        </div>

        {/* icon + title */}
        <div className="mt-5 flex items-start gap-3">
          <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lumen shadow-md shadow-lumen/25 transition-transform duration-300 group-hover:rotate-6">
            <Icon className="size-5 text-lumen-foreground" />
          </span>
          <h3
            className="text-[24px] sm:text-[30px] lg:text-[34px] font-bold leading-[1.05] text-foreground"
            style={{
              fontFamily: "var(--font-display, 'Montserrat', sans-serif)",
              letterSpacing: "-0.035em",
            }}
          >
            {update.title}
          </h3>
        </div>

        <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-muted-foreground max-w-md">
          {update.description}
        </p>

        {/* chips */}
        <div className="mt-5 flex flex-wrap gap-2">
          {update.chips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground transition-colors duration-200 group-hover:border-lumen/40"
            >
              <span className="h-1 w-1 rounded-full bg-lumen" />
              {chip}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[13px] font-semibold text-background transition-all duration-200 group-hover:bg-lumen group-hover:text-lumen-foreground">
            {update.ctaText}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </motion.article>
  );
};

const WhatsNew = () => {
  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24">
      {/* background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="absolute -top-24 left-1/4 h-[380px] w-[380px] rounded-full bg-lumen/10 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 h-[320px] w-[320px] rounded-full bg-lumen/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* intro — left aligned, matching every other section on the page */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <SectionHeader
            index="01"
            label="What's New"
            title="Fresh out of the studio."
            description="Two new capabilities just landed — built to make property and product experiences feel alive."
            className="max-w-3xl"
          />

          <Link
            href="/blogs"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border bg-background px-4 py-2 text-[12px] font-semibold text-foreground transition-all duration-200 hover:bg-foreground hover:text-background md:self-auto"
          >
            <Sparkles className="size-3.5 fill-lumen text-lumen-foreground" />
            See all updates
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        {/* alternating editorial rows */}
        <div className="mt-14 md:mt-20 flex flex-col gap-16 md:gap-24">
          {UPDATES.map((update, index) => (
            <UpdateRow key={update.title} update={update} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsNew;
