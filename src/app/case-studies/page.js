"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import caseStudies from "@/data/caseStudyData";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Sparkles, Calendar, MapPin } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const CaseStudiesPage = () => {
  return (
    <section className="relative w-full py-20 md:py-24 overflow-hidden">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.12) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="absolute -top-40 -left-40 h-[380px] w-[380px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[380px] w-[380px] rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mb-14 overflow-hidden rounded-[28px] border border-border bg-background/70 backdrop-blur"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
            <div className="absolute -top-16 right-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-16 left-0 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />
          </div>

          <div className="relative px-5 py-8 md:px-8 md:py-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge className="rounded-full px-3 py-1">Case Studies</Badge>

              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/80 px-3 py-1 text-[11px] text-muted-foreground">
                <Sparkles className="size-3 text-primary" />
                Real project insights
              </span>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
              <div>
                <h1 className="text-[28px] sm:text-[34px] md:text-[40px] font-bold text-foreground leading-tight">
                  Case Studies That Show
                  <span className="block text-primary">
                    Real Business Impact
                  </span>
                </h1>

                <p className="mt-4 max-w-2xl text-[13px] md:text-[14px] leading-7 text-muted-foreground">
                  Explore how Luminexa uses immersive visualization, digital
                  experiences, and interactive presentation solutions to solve
                  real business challenges across different industries.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    "Image Mapping",
                    "360 Tours",
                    "Drone Visualization",
                    "Interactive Experience",
                  ].map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-border bg-muted/40 px-3 py-1 text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-background/80 p-4">
                  <p className="text-[11px] text-muted-foreground">
                    Case Studies
                  </p>
                  <p className="mt-1 text-[18px] font-semibold">
                    {caseStudies.length}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-background/80 p-4">
                  <p className="text-[11px] text-muted-foreground">
                    Solutions
                  </p>
                  <p className="mt-1 text-[18px] font-semibold">
                    Multi-Sector
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-background/80 p-4 col-span-2">
                  <p className="text-[11px] text-muted-foreground">
                    Includes
                  </p>
                  <p className="mt-1 text-[12px] text-foreground/80">
                    Challenges, solutions, services, and outcomes across
                    different project types.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= GRID ================= */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {caseStudies.map((study) => (
            <motion.article key={study.slug} variants={item}>
              <div className="group rounded-[18px] border border-border bg-background/70 overflow-hidden hover:shadow-lg transition-all">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={study.coverImage}
                    alt={study.title}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />

                  <div className="absolute top-3 left-3">
                    <Badge className="text-[10px] px-2 py-0.5 bg-background/90 text-foreground">
                      {study.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3.5 text-primary" />
                      {study.date}
                    </span>

                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5 text-primary" />
                      {study.location}
                    </span>
                  </div>

                  <h3 className="text-[15px] font-semibold line-clamp-2 text-foreground">
                    {study.title}
                  </h3>

                  <p className="mt-2 text-[12px] text-muted-foreground leading-relaxed line-clamp-3">
                    {study.shortDescription}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {study.services?.slice(0, 2).map((service, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 bg-muted/40 rounded-full text-muted-foreground"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4">
                    <Link href={`/case-studies/${study.slug}`}>
                      <Button
                        variant="outline"
                        className="w-full h-9 text-[12px] rounded-lg"
                      >
                        View Details
                        <ArrowUpRight className="size-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesPage;