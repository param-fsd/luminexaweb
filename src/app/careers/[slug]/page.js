"use client";

import React from "react";
import { useParams } from "next/navigation";
import { jobs } from "@/data/careerData";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  Briefcase,
  Clock,
  Sparkles,
  Mail,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CareerDetails = () => {
  const { slug } = useParams();
  const job = jobs.find((j) => j.slug === slug);

  if (!job) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-sm text-muted-foreground">
          This role isn’t available anymore.
        </p>
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/careers">
            <ArrowLeft className="mr-2 size-4" />
            Back to Careers
          </Link>
        </Button>
      </div>
    );
  }

  const meta = [
    { icon: Briefcase, label: job.type },
    { icon: MapPin, label: job.location },
    { icon: Clock, label: `${job.experience} experience` },
  ];

  const mailHref = `mailto:${job.apply?.email || "careers@luminexa.in"}?subject=${encodeURIComponent(
    `Application — ${job.title}`
  )}`;
  const applyHref = job.apply?.url || mailHref;

  return (
    <section className="relative w-full overflow-hidden py-12 md:py-16">
      {/* ================= GLOBAL BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.18) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-8">
        {/* ================= BREADCRUMB ================= */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center gap-2 text-[12px] text-muted-foreground"
        >
          <Link
            href="/careers"
            className="inline-flex items-center gap-1 hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Careers
          </Link>
          <span>/</span>
          <span className="font-medium text-foreground">{job.title}</span>
        </motion.div>

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 max-w-3xl"
        >
          <div className="mb-4 flex items-center gap-2">
            <Badge className="rounded-full px-4 py-1">Careers</Badge>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" />
              Join our growing team
            </span>
          </div>

          <h1 className="text-[30px] font-bold tracking-tight text-foreground sm:text-[36px] md:text-[42px]">
            {job.title}
          </h1>

          {/* meta chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {meta.map((m) => {
              const Icon = m.icon;
              return (
                <span
                  key={m.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1.5 text-[12px] text-foreground"
                >
                  <Icon className="size-3.5 text-primary" />
                  {m.label}
                </span>
              );
            })}
          </div>

          <p className="mt-4 max-w-2xl text-[13px] leading-6 text-muted-foreground md:text-[14px]">
            {job.shortDescription}
          </p>
        </motion.div>

        {/* ================= CONTENT GRID ================= */}
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_320px] lg:gap-10">
          {/* ================= JOB DESCRIPTION ================= */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border bg-background/60 p-5 backdrop-blur sm:p-7 md:p-8"
          >
            {job.sections.map((section, i) => (
              <div key={section.heading} className={i > 0 ? "mt-8" : ""}>
                <h2 className="text-[18px] font-semibold tracking-tight text-foreground sm:text-[20px]">
                  {section.heading}
                </h2>

                {section.body?.map((para, j) => (
                  <p
                    key={j}
                    className="mt-3 text-[13px] leading-7 text-muted-foreground sm:text-[14px]"
                  >
                    {para}
                  </p>
                ))}

                {section.items && (
                  <ul className="mt-4 space-y-2.5">
                    {section.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-[13px] leading-6 text-muted-foreground sm:text-[14px]"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>
                          {typeof item === "string" ? (
                            item
                          ) : (
                            <>
                              <span className="font-semibold text-foreground">
                                {item.label}:
                              </span>{" "}
                              {item.text}
                            </>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* How to Apply */}
            <div className="mt-8 rounded-xl border border-border bg-muted/20 p-5">
              <h2 className="text-[18px] font-semibold tracking-tight text-foreground sm:text-[20px]">
                How to Apply
              </h2>
              <p className="mt-3 text-[13px] leading-7 text-muted-foreground sm:text-[14px]">
                Send your resume, portfolio, and a short cover letter to{" "}
                <a
                  href={mailHref}
                  className="font-medium text-primary underline-offset-2 hover:underline"
                >
                  {job.apply?.email || "careers@luminexa.in"}
                </a>
                .
              </p>

              {job.apply?.url && (
                <Button asChild className="mt-4 rounded-full">
                  <a href={job.apply.url} target="_blank" rel="noopener noreferrer">
                    Apply via Form
                    <ArrowUpRight className="ml-2 size-4" />
                  </a>
                </Button>
              )}
            </div>
          </motion.article>

          {/* ================= SIDEBAR ================= */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <div className="rounded-2xl border border-border bg-background/60 p-6 backdrop-blur">
              <h3 className="text-sm font-semibold text-foreground">
                Job Overview
              </h3>

              <div className="mt-5 space-y-4 text-[13px]">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="size-4 text-primary" />
                    Type
                  </span>
                  <span className="font-medium text-foreground">{job.type}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="size-4 text-primary" />
                    Location
                  </span>
                  <span className="font-medium text-foreground">
                    {job.location}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="size-4 text-primary" />
                    Experience
                  </span>
                  <span className="font-medium text-foreground">
                    {job.experience}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="size-4 text-primary" />
                    Status
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    Actively hiring
                  </span>
                </div>
              </div>

              <Button asChild className="mt-6 w-full rounded-xl">
                <a href={applyHref}>
                  <Mail className="mr-2 size-4" />
                  Apply Now
                </a>
              </Button>

              <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-5 text-muted-foreground">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                Send your resume &amp; portfolio to careers@luminexa.in
              </p>
            </div>
          </motion.aside>
        </div>

        {/* ================= NEWSLETTER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-14 max-w-4xl rounded-2xl border border-border bg-background/60 p-8 text-center backdrop-blur"
        >
          <Mail className="mx-auto mb-4 size-8 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Stay updated with career openings
          </h3>
          <p className="mb-5 mt-2 text-[13px] text-muted-foreground">
            Get notified when new roles open at Luminexa.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Input type="email" placeholder="Enter your email" className="sm:w-80" />
            <Button className="rounded-xl">Subscribe</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CareerDetails;
