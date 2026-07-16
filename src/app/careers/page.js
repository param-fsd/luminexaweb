"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { jobs, benefits } from "@/data/careerData";

const CareersPage = () => {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden">
      {/* ================= GLOBAL BACKGROUND ================= */}
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

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <Badge className="rounded-full px-4 py-1">Careers</Badge>
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Sparkles className="size-3.5 text-primary" />
              Build the future with us
            </span>
          </div>

          <h1 className="text-[30px] sm:text-[36px] md:text-[44px] font-bold tracking-tight text-foreground">
            Shape the Future at <span className="text-primary">Luminexa</span>
          </h1>

          <p className="mt-4 text-[14px] md:text-[15px] text-muted-foreground max-w-xl leading-relaxed">
            Join a team that blends creativity, engineering, and innovation to
            build immersive digital products for the next generation.
          </p>
        </motion.div>

        {/* ================= BENEFITS ================= */}
        <div className="mb-20">
          <h2 className="text-xl md:text-2xl font-semibold mb-8">
            Why Join Luminexa
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative rounded-2xl border border-border bg-background/60 backdrop-blur p-6"
              >
                {/* hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/10 to-secondary/10" />

                <div className="relative">
  <benefit.icon className={benefit.iconClass} />

  <h3 className="text-sm font-semibold text-foreground mt-2">
    {benefit.title}
  </h3>

  <p className="mt-2 text-[12px] text-muted-foreground leading-relaxed">
    {benefit.description}
  </p>
</div>

              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= JOB LISTINGS ================= */}
        <div>
          <h2 className="text-xl md:text-2xl font-semibold mb-8">
            Open Positions
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job, index) => (
              <motion.div
                key={job.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="relative h-full rounded-2xl border border-border bg-background/60 backdrop-blur hover:shadow-xl transition-all">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl border border-border bg-muted/40 flex items-center justify-center">
                        <Briefcase className="size-5 text-primary" />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-foreground">
                          {job.title}
                        </h3>
                        <p className="mt-1 text-[12px] text-muted-foreground">
                          {job.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="size-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-4" />
                        {job.experience}
                      </span>
                      <Badge variant="outline" className="text-[10px]">
                        {job.type}
                      </Badge>
                    </div>

                    <div className="mt-auto pt-5">
                      <Link href={`/careers/${job.slug}`}>
                        <Button
                          variant="outline"
                          className="w-full rounded-xl text-sm"
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersPage;
