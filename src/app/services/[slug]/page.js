"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import sanitizeHtml from "sanitize-html";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Code,
  ShieldCheck,
  Zap,
  Layers,
} from "lucide-react";
import services from "@/data/serviceData";

/* -------------------------------------------------------------------------- */
/* Background                                                                  */
/* -------------------------------------------------------------------------- */
const SectionBg = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-background" />
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.14) 1px, transparent 1px)",
        backgroundSize: "58px 58px",
      }}
    />
    <div className="absolute -top-24 -left-24 h-[340px] w-[340px] rounded-full bg-primary/10 blur-3xl" />
    <div className="absolute -bottom-24 -right-20 h-[380px] w-[380px] rounded-full bg-secondary/10 blur-3xl" />
  </div>
);

const SectionLabel = ({ children, icon: Icon }) => (
  <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
    {Icon ? <Icon className="size-3.5 text-primary" /> : null}
    <span>{children}</span>
  </div>
);

const StatStrip = () => {
  const items = [
    { icon: Zap, title: "Fast Delivery", sub: "Rapid prototypes" },
    { icon: ShieldCheck, title: "Stable Builds", sub: "Production-ready" },
    { icon: Layers, title: "Premium UX", sub: "Modern UI systems" },
  ];

  return (
    <div className="mt-4 rounded-[22px] border border-border/60 bg-background/70 px-4 py-4 sm:px-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <div key={it.title} className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 rounded-xl border border-border bg-background/80 flex items-center justify-center shrink-0">
                <Icon className="size-4 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-foreground">
                  {it.title}
                </div>
                <div className="text-[11px] text-muted-foreground">{it.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Sub Service Tile                                                            */
/* -------------------------------------------------------------------------- */
const SubServiceTile = ({ parentSlug, serviceImage, subService }) => {
  const imageSrc = subService.image || serviceImage || "/placeholder.jpg";

  return (
    <Link
      href={`/services/${parentSlug}/${subService.subSlug}`}
      className="group block"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="relative overflow-hidden rounded-[24px] border border-border/60 h-[280px] sm:h-[300px] md:h-[320px]"
      >
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt={subService.title}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/12 to-black/72" />

        <div
          className="absolute inset-0 opacity-[0.18] group-hover:opacity-[0.26] transition-opacity duration-500"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
            maskImage:
              "radial-gradient(circle at 60% 42%, black 0%, black 45%, transparent 74%)",
            WebkitMaskImage:
              "radial-gradient(circle at 60% 42%, black 0%, black 45%, transparent 74%)",
          }}
        />

        <div className="absolute inset-0 rounded-[24px] ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-500" />

        <div className="absolute top-4 left-4 right-4 z-20 flex items-start justify-between gap-3">
          <div className="max-w-[82%] rounded-2xl border border-white/15 bg-black/28 backdrop-blur-xl px-4 py-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[14px] sm:text-[15px] font-semibold text-white">
                {subService.title}
              </span>

              <span className="text-[10px] sm:text-[11px] px-3 py-1 rounded-full bg-white/12 ring-1 ring-white/20 text-white/90">
                {parentSlug === "augmented-reality" ? "nexAR" : "nex"}
              </span>
            </div>

            <p className="mt-1.5 text-[12px] sm:text-[13px] text-white/84 leading-snug line-clamp-2">
              {subService.description}
            </p>

            <div className="mt-2 inline-flex">
              <span className="text-[10px] sm:text-[11px] px-3 py-1 rounded-full bg-white/12 ring-1 ring-white/18 text-white/90">
                Learn More
              </span>
            </div>
          </div>

          <motion.div
            className="shrink-0 h-9 w-9 rounded-full bg-white/70 ring-1 ring-black/10 backdrop-blur-md shadow-sm flex items-center justify-center"
            whileHover={{ x: 2, y: -2 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <ArrowUpRight className="size-4 text-black/75" />
          </motion.div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
          <div className="text-[11px] sm:text-[12px] text-white/78">
            View Details
          </div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-white/60">
            Explore
          </div>
        </div>

        <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-primary/25 to-secondary/25 blur-3xl opacity-40 group-hover:opacity-65 transition-opacity duration-500" />
      </motion.div>
    </Link>
  );
};

const ServiceDetails = () => {
  const params = useParams();
  const slug = params?.slug;

  const service = useMemo(() => services.find((s) => s.slug === slug), [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-base text-foreground">Service not found</p>
      </div>
    );
  }

  const heroImage = service.image || "/placeholder.jpg";

  const sanitizedOverview = sanitizeHtml(service.overview || "", {
    allowedTags: ["p", "b", "i", "em", "strong", "a", "ul", "li", "ol", "br"],
    allowedAttributes: { a: ["href", "target", "rel"] },
  });

  return (
    <section className="relative w-full min-h-screen py-6 md:py-8 overflow-hidden">
      <SectionBg />

      <div className="max-w-6xl mx-auto px-4 md:px-5">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-5 text-[12px] text-muted-foreground flex items-center gap-2 flex-wrap"
        >
          <Link
            href="/services"
            className="hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft className="size-3" />
            Services
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{service.title}</span>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-[26px] border border-border/60"
        >
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt={service.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/28 to-black/72" />
          <div className="absolute inset-0 ring-1 ring-white/10 rounded-[26px]" />

          <div className="relative z-10 px-5 py-6 sm:px-7 md:px-8 md:py-8 lg:px-10 lg:py-10 min-h-[280px] sm:min-h-[320px] md:min-h-[360px] flex flex-col justify-end">
            <div className="max-w-2xl">
              <Badge className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur">
                {service.label}
              </Badge>

              <h1 className="mt-3 text-[24px] leading-none sm:text-[34px] md:text-[44px] lg:text-[50px] font-semibold tracking-[-0.04em] text-white">
                {service.title}
              </h1>

              <p className="mt-3 max-w-xl text-[12px] sm:text-[13px] md:text-[14px] leading-6 text-white/82">
                {service.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild className="rounded-full px-5 h-9 text-[12px]">
                  <Link href="/contact-us">
                    Book a Demo
                    <ArrowUpRight className="size-4 ml-2" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-5 h-9 text-[12px] border-white/15 bg-white/5 text-white hover:bg-white/10"
                >
                  <Link href="/portfolio">Portfolio</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <StatStrip />

        {/* Overview */}
        <section className="mt-8 grid grid-cols-1 xl:grid-cols-[1.15fr_.85fr] gap-7 xl:gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel icon={Layers}>Overview</SectionLabel>
            <h2 className="mt-3 text-[22px] sm:text-[28px] md:text-[34px] font-semibold tracking-tight text-foreground">
              A refined service layer for modern digital experiences.
            </h2>

            <article
              className="prose prose-sm dark:prose-invert max-w-none mt-4 text-[12px] sm:text-[13px] leading-6"
              dangerouslySetInnerHTML={{ __html: sanitizedOverview }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="xl:border-l border-border/70 xl:pl-8"
          >
            <SectionLabel icon={Sparkles}>Highlights</SectionLabel>

            <div className="mt-4 space-y-3">
              {[
                "Premium UI systems with cleaner presentation flow.",
                "Modern interaction patterns for a stronger user experience.",
                "Service-led structure with scalable sub-service expansion.",
                "Designed to present offerings clearly and professionally.",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Sparkles className="size-4 text-primary mt-1 shrink-0" />
                  <span className="text-[12px] sm:text-[13px] md:text-[14px] leading-6 text-muted-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Services */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
            <div>
              <SectionLabel icon={Sparkles}>Our Services</SectionLabel>
              <h2 className="mt-3 text-[22px] sm:text-[28px] md:text-[34px] font-semibold tracking-tight text-foreground">
                Explore the service stack.
              </h2>
            </div>

            <div className="text-[11px] sm:text-[12px] text-muted-foreground">
              Tech-service panels
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {service?.subServices?.map((sub) => (
              <SubServiceTile
                key={sub.subSlug}
                parentSlug={service.slug}
                serviceImage={service.image}
                subService={sub}
              />
            ))}

            {/* Custom Development */}
            <Link href="/contact-us" className="md:col-span-2 group block">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="relative overflow-hidden rounded-[24px] border border-dashed border-primary/35 bg-muted/20 px-6 py-7 md:px-8 md:py-8"
              >
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute -top-24 -left-24 h-[280px] w-[280px] rounded-full bg-primary/15 blur-3xl" />
                  <div className="absolute -bottom-24 -right-24 h-[320px] w-[320px] rounded-full bg-secondary/15 blur-3xl" />
                </div>

                <div className="relative z-10 max-w-xl mx-auto text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-2xl border border-border bg-background/70 flex items-center justify-center">
                    <Code className="w-6 h-6 text-primary" />
                  </div>

                  <SectionLabel icon={Code}>Custom Build</SectionLabel>

                  <h3 className="mt-3 text-[18px] sm:text-[22px] md:text-[26px] font-semibold tracking-tight text-foreground">
                    Custom Development Enquiry
                  </h3>

                  <p className="text-[12px] sm:text-[13px] md:text-[14px] text-muted-foreground mt-3 leading-6">
                    Need something tailored for your workflow, product, or presentation? Let’s discuss a custom solution built around your exact requirements.
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold text-primary">
                    Contact Us <ArrowUpRight className="size-4" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </motion.section>
      </div>
    </section>
  );
};

export default ServiceDetails;