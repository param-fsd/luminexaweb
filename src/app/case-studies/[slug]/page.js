"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import caseStudies from "@/data/caseStudyData";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const CaseStudyDetailsPage = () => {
  const params = useParams();
  const slug = params?.slug;
  const caseStudy = caseStudies.find((item) => item.slug === slug);

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">Case study not found.</p>
      </div>
    );
  }

  return (
    <section className="relative w-full min-h-screen py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.14) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Case Studies
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl"
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge className="rounded-full px-4 py-1">Case Study</Badge>
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Sparkles className="size-3.5 text-primary" />
              Business challenge to visual solution
            </span>
          </div>

          <h1 className="text-[30px] sm:text-[38px] md:text-[48px] font-bold tracking-tight text-foreground leading-tight">
            {caseStudy.title}
          </h1>

          <p className="mt-4 max-w-3xl text-[14px] md:text-[15px] text-muted-foreground leading-relaxed">
            {caseStudy.shortDescription}
          </p>

          <div className="mt-5 flex flex-wrap gap-4 text-[12px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-4 text-primary" />
              {caseStudy.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 text-primary" />
              {caseStudy.location}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-10"
        >
          <div className="relative overflow-hidden rounded-[28px] border border-border bg-background/60 backdrop-blur">
            <div className="relative aspect-[16/7] w-full">
              <Image
                src={caseStudy.coverImage}
                alt={caseStudy.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[2.1fr_0.9fr] mt-12">
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="max-w-none"
            dangerouslySetInnerHTML={{ __html: caseStudy.fullDescription }}
          />

          <motion.aside
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="h-fit rounded-[24px] border border-border bg-background/70 backdrop-blur p-6 sticky top-24"
          >
            <h3 className="text-sm font-semibold text-foreground mb-5">
              Case Study Overview
            </h3>

            <div className="space-y-4 text-[13px]">
              <div>
                <p className="text-muted-foreground mb-1">Category</p>
                <p className="font-medium text-foreground">{caseStudy.category}</p>
              </div>

              <div>
                <p className="text-muted-foreground mb-1">Client</p>
                <p className="font-medium text-foreground">{caseStudy.client}</p>
              </div>

              <div>
                <p className="text-muted-foreground mb-1">Location</p>
                <p className="font-medium text-foreground">{caseStudy.location}</p>
              </div>

              <div>
                <p className="text-muted-foreground mb-1">Services</p>
                <p className="font-medium text-foreground leading-6">
                  {caseStudy.services?.join(" • ")}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/contact">
                <Button className="w-full rounded-xl">
                  Enquire Now
                  <ArrowUpRight className="size-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyDetailsPage;