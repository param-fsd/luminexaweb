"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import sanitizeHtml from "sanitize-html";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Play,
  Layers,
  MapPinned,
  Image as ImageIcon,
  BadgeInfo,
  ScanSearch,
  Mountain,
  Box,
  Check,
  Quote,
} from "lucide-react";
import services from "@/data/serviceData";
import ImageMappingPage from "@/components/services/ImageMappingPage";
import SectionHeader from "@/components/motion/SectionHeader";
import Marquee from "@/components/motion/Marquee";
import Counter from "@/components/motion/Counter";

const cx = (...c) => c.filter(Boolean).join(" ");

const iconMap = {
  MapPinned,
  Image: ImageIcon,
  BadgeInfo,
  ScanSearch,
  Mountain,
  Box,
};

/* shared scroll-in reveal */
const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* "40%" → counts to 40 with suffix "%", non-numeric values render as-is */
const StatValue = ({ value, className = "" }) => {
  const m = /^(\d+)(.*)$/.exec(String(value).trim());
  if (!m) return <span className={className}>{value}</span>;
  return <Counter value={parseInt(m[1], 10)} suffix={m[2]} className={className} />;
};

/* lumen check bullet */
const CheckItem = ({ children, dark = false }) => (
  <div className="flex items-start gap-2.5">
    <span className="mt-0.5 inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-lumen">
      <Check className="size-3 text-lumen-foreground" />
    </span>
    <span
      className={cx(
        "text-[13px] sm:text-[14px] leading-relaxed",
        dark ? "text-white/75" : "text-muted-foreground"
      )}
    >
      {children}
    </span>
  </div>
);

/* feature rows — inline numbered label, no overlapping decorations */
const FeatureRow = ({ feature, index, reverse = false }) => {
  const Icon = iconMap[feature.icon] || Layers;

  return (
    <Reveal>
      <div
        className={cx(
          "grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center",
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        )}
      >
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lumen">
              <Icon className="size-5 text-lumen-foreground" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Feature {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px flex-1 max-w-[80px] bg-border" />
          </div>

          <h3
            className="mt-4 text-[20px] sm:text-[24px] md:text-[26px] font-bold leading-[1.1] text-foreground"
            style={{
              fontFamily: "var(--font-display, 'Montserrat', sans-serif)",
              letterSpacing: "-0.04em",
            }}
          >
            {feature.title}
          </h3>
          <p className="mt-2.5 text-[13px] sm:text-[14px] leading-relaxed text-muted-foreground max-w-xl">
            {feature.description}
          </p>
        </div>

        <div className="overflow-hidden rounded-[18px] border border-border bg-muted/20 group">
          {feature.image ? (
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
          ) : (
            <div className="aspect-[16/10] w-full flex items-center justify-center">
              <Icon className="size-10 text-lumen-foreground/40" />
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
};

const SubServiceDetails = () => {
  const params = useParams();
  const slug = params?.slug;
  const subSlug = params?.subSlug;

  const service = useMemo(() => services.find((s) => s.slug === slug), [slug]);

  const subService = useMemo(
    () => service?.subServices?.find((ss) => ss.subSlug === subSlug),
    [service, subSlug]
  );

  /* sections that exist for this sub-service — drives jump nav + numbering */
  const navSections = useMemo(() => {
    if (!subService) return [];
    return [
      { id: "overview", label: "Overview", show: true },
      { id: "gallery", label: "Gallery", show: !!subService.gallery?.length },
      { id: "features", label: "Features", show: !!subService.features?.length },
      { id: "demo", label: "Demo", show: !!subService.demos?.length },
      { id: "benefits", label: "Benefits", show: !!subService.benefits?.length },
      { id: "use-cases", label: "Use Cases", show: !!subService.useCases?.length },
      { id: "process", label: "Process", show: !!subService.workflow?.length },
      {
        id: "stack",
        label: "Stack",
        show: !!(subService.technologies?.length || subService.deliverables?.length),
      },
      { id: "results", label: "Results", show: !!subService.caseStudies?.length },
      { id: "faqs", label: "FAQs", show: !!subService.faqs?.length },
    ].filter((s) => s.show);
  }, [subService]);

  const numberOf = (id) =>
    String(navSections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

  if (!service || !subService) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-base text-foreground">Sub-service not found</p>
      </div>
    );
  }

  /* sub-services with a bespoke layout opt out of the generic template */
  if (slug === "mapping" && subSlug === "image-mapping") {
    return <ImageMappingPage service={service} subService={subService} />;
  }

  const heroImage =
    subService.heroImage ||
    subService.image ||
    service.image ||
    "/placeholder.jpg";

  const sanitizedOverview = sanitizeHtml(subService.overview || "", {
    allowedTags: ["p", "b", "i", "em", "strong", "a", "ul", "li", "ol", "br"],
    allowedAttributes: { a: ["href", "target", "rel"] },
  });

  const titleWords = String(subService.title || "").split(" ");

  return (
    <section className="relative overflow-hidden">
      {/* ── background ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 opacity-[0.045] dot-grid" />
        <div className="absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-lumen/15 blur-3xl" />
        <div className="absolute top-[40%] -left-40 h-[420px] w-[420px] rounded-full bg-foreground/[0.04] blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-6 md:pt-8 pb-5">
        {/* ── breadcrumb ── */}
        <motion.nav
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3" />
            Services
          </Link>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
          <Link
            href={`/services/${service.slug}`}
            className="hover:text-foreground transition-colors"
          >
            {service.title}
          </Link>
          <span className="h-1 w-1 rounded-full bg-lumen" />
          <span className="text-foreground">{subService.title}</span>
        </motion.nav>

        {/* ── HERO — editorial split ── */}
        <div className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-8 lg:gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-lumen px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-lumen-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-lumen-foreground lumen-pulse" />
                {subService.heroBadge || service.label || "Service"}
              </span>
              {subService.label ? (
                <span className="section-label">{subService.label}</span>
              ) : null}
            </motion.div>

            <h1 className="display-title mt-4 text-[36px] sm:text-[46px] md:text-[54px] lg:text-[58px] text-foreground">
              {titleWords.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom pb-1">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.12,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {i === titleWords.length - 1 ? (
                      <span className="lumen-mark">{word}</span>
                    ) : (
                      word
                    )}
                    {i < titleWords.length - 1 ? " " : ""}
                  </motion.span>
                </span>
              ))}
            </h1>

            {subService.shortTitle ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="display-title-light mt-1.5 text-[16px] sm:text-[19px] text-foreground/55"
              >
                {subService.shortTitle}
              </motion.p>
            ) : null}

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="mt-4 max-w-md text-[13px] sm:text-[14px] leading-relaxed text-muted-foreground"
            >
              {subService.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="mt-6 flex flex-row flex-wrap gap-3"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full h-11 px-6 text-sm font-semibold group bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 shadow-md shadow-black/10"
              >
                <Link href={subService.cta?.primaryLink || "/contact-us"}>
                  {subService.cta?.primaryText || "Book Demo"}
                  <span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-lumen text-lumen-foreground transition-transform duration-200 group-hover:translate-x-1">
                    <ArrowRight className="size-3.5" />
                  </span>
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full h-11 px-6 text-sm font-semibold border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-200"
              >
                <Link href={subService.cta?.secondaryLink || "/portfolio"}>
                  {subService.cta?.secondaryText || "View Portfolio"}
                  <ArrowUpRight className="size-4 ml-1.5" />
                </Link>
              </Button>
            </motion.div>

            {/* highlight tags — settled under the buttons instead of floating */}
            {subService.highlightTags?.length ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-6 flex flex-wrap gap-2"
              >
                {subService.highlightTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium text-muted-foreground"
                  >
                    <span className="h-1 w-1 rounded-full bg-lumen" />
                    {tag}
                  </span>
                ))}
              </motion.div>
            ) : null}
          </div>

          {/* hero visual — framed image, badges inside the frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden rounded-[22px] border border-border shadow-xl shadow-black/10">
              <div className="relative aspect-[16/11] w-full">
                <Image
                  src={heroImage}
                  alt={subService.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
              </div>

              <span className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-lumen lumen-pulse" />
                {service.title}
              </span>

              <span className="absolute bottom-3 right-3 rounded-full bg-lumen px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-lumen-foreground">
                Live & Interactive
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── stats strip ── */}
        {subService.stats?.length ? (
          <Reveal delay={0.1} className="mt-8 md:mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 rounded-[18px] border border-border bg-background/80 backdrop-blur divide-y sm:divide-y-0 sm:divide-x divide-border overflow-hidden">
              {subService.stats.map((stat, index) => (
                <div key={`${stat.label}-${index}`} className="px-5 py-4 sm:py-5">
                  <StatValue
                    value={stat.value}
                    className="display-title block text-[26px] sm:text-[30px] md:text-[34px] text-foreground"
                  />
                  <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        ) : null}

        {/* ── sticky jump nav ── */}
        <div className="sticky top-16 z-30 mt-6 -mx-4 px-4 md:-mx-8 md:px-8 py-2 bg-background/90 backdrop-blur border-b border-border/70">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground/60 shrink-0 mr-1.5">
              On this page
            </span>
            {navSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <span className="h-1 w-1 rounded-full bg-lumen opacity-0 group-hover:opacity-100 transition-opacity" />
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── OVERVIEW ── */}
        <div
          id="overview"
          className="scroll-mt-32 mt-10 md:mt-14 grid grid-cols-1 xl:grid-cols-[1.15fr_.85fr] gap-8 xl:gap-12 items-start"
        >
          <div>
            <SectionHeader
              index={numberOf("overview")}
              label="Overview"
              title="What it is, and why it works."
            />
            <article
              className="prose prose-sm max-w-none mt-4 text-[13px] sm:text-[14px] leading-relaxed text-muted-foreground [&_p]:mb-3"
              dangerouslySetInnerHTML={{ __html: sanitizedOverview }}
            />
          </div>

          {/* highlights — dark card */}
          {subService.highlightTags?.length ? (
            <Reveal delay={0.1}>
              <div className="dark-section relative overflow-hidden rounded-[20px] px-5 py-5 sm:px-6 sm:py-6">
                <div className="absolute -top-12 -right-12 h-[160px] w-[160px] rounded-full bg-lumen/20 blur-3xl" />
                <div className="relative">
                  <div className="section-label !text-white/50">Highlights</div>
                  <div className="mt-4 space-y-3">
                    {subService.highlightTags.map((item, index) => (
                      <CheckItem key={index} dark>
                        {item}
                      </CheckItem>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>

        {/* ── GALLERY ── */}
        {subService.gallery?.length ? (
          <div id="gallery" className="scroll-mt-32 mt-10 md:mt-14">
            <SectionHeader
              index={numberOf("gallery")}
              label="Gallery"
              title="A closer look."
            />
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {subService.gallery.map((img, index) => (
                <Reveal key={`${img}-${index}`} delay={index * 0.07}>
                  <div className="group relative overflow-hidden rounded-[16px] border border-border bg-muted/20">
                    <Image
                      src={img}
                      alt={`${subService.title} gallery ${index + 1}`}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-transparent group-hover:ring-lumen transition-all duration-300 rounded-[16px]" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}

        {/* ── FEATURES ── */}
        {subService.features?.length ? (
          <div id="features" className="scroll-mt-32 mt-10 md:mt-14">
            <SectionHeader
              index={numberOf("features")}
              label="Features"
              title="Built to do the heavy lifting."
            />
            <div className="mt-8 space-y-10 md:space-y-12">
              {subService.features.map((feature, index) => (
                <FeatureRow
                  key={index}
                  feature={feature}
                  index={index}
                  reverse={index % 2 === 1}
                />
              ))}
            </div>
          </div>
        ) : null}

        {/* ── DEMO ── */}
        {subService.demos?.length ? (
          <div id="demo" className="scroll-mt-32 mt-10 md:mt-14">
            <SectionHeader
              index={numberOf("demo")}
              label="Demo"
              title="See it in motion."
            />
            <div className="mt-5 space-y-8">
              {subService.demos.map((demo, index) => (
                <Reveal key={index}>
                  <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_.9fr] gap-5 xl:gap-8 items-center">
                    <div className="overflow-hidden rounded-[18px] border border-border bg-black">
                      <video
                        src={demo.url}
                        poster={demo.poster}
                        controls
                        className="aspect-video w-full h-full"
                        aria-label={`Demo ${index + 1} for ${subService.title}`}
                      />
                    </div>

                    <div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground">
                        <Play className="size-3 text-lumen-foreground fill-lumen" />
                        Demo {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className="mt-3 text-[20px] sm:text-[24px] md:text-[26px] font-bold leading-[1.1] text-foreground"
                        style={{
                          fontFamily: "var(--font-display, 'Montserrat', sans-serif)",
                          letterSpacing: "-0.04em",
                        }}
                      >
                        {demo.title || `${subService.title} Demo`}
                      </h3>
                      {demo.description ? (
                        <p className="mt-2.5 text-[13px] sm:text-[14px] leading-relaxed text-muted-foreground">
                          {demo.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}

        {/* ── BENEFITS — dark band ── */}
        {subService.benefits?.length ? (
          <Reveal className="mt-10 md:mt-14">
            <div
              id="benefits"
              className="scroll-mt-32 dark-section relative overflow-hidden rounded-[22px] px-5 py-7 sm:px-8 sm:py-8"
            >
              <div className="absolute inset-0 opacity-[0.05]">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "26px 26px",
                  }}
                />
              </div>
              <div className="absolute -bottom-16 -right-16 h-[220px] w-[220px] rounded-full bg-lumen/15 blur-3xl" />

              <div className="relative z-10">
                <SectionHeader
                  index={numberOf("benefits")}
                  label="Benefits"
                  title="What your team gains."
                  dark
                />
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3.5 max-w-5xl">
                  {subService.benefits.map((benefit, index) => (
                    <CheckItem key={index} dark>
                      {benefit}
                    </CheckItem>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ) : null}

        {/* ── USE CASES ── */}
        {subService.useCases?.length ? (
          <div id="use-cases" className="scroll-mt-32 mt-10 md:mt-14">
            <SectionHeader
              index={numberOf("use-cases")}
              label="Use Cases"
              title="Where it fits best."
            />
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {subService.useCases.map((useCase, index) => (
                <Reveal key={index} delay={index * 0.06}>
                  <div className="group h-full rounded-[16px] border border-border bg-background/80 px-5 py-5 transition-colors duration-300 hover:border-lumen hover:bg-lumen/[0.06]">
                    <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-muted/60 px-1.5 text-[11px] font-bold text-foreground transition-colors duration-300 group-hover:bg-lumen group-hover:text-lumen-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-[14px] sm:text-[15px] font-bold text-foreground">
                      {useCase.title}
                    </h3>
                    <p className="mt-1.5 text-[12px] sm:text-[13px] leading-relaxed text-muted-foreground">
                      {useCase.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}

        {/* ── PROCESS + STACK ── */}
        {(subService.workflow?.length ||
          subService.technologies?.length ||
          subService.deliverables?.length) && (
          <div className="mt-10 md:mt-14 grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 items-start">
            {subService.workflow?.length ? (
              <div id="process" className="scroll-mt-32">
                <SectionHeader
                  index={numberOf("process")}
                  label="Process"
                  title="A simple delivery flow."
                />
                <div className="mt-6">
                  {subService.workflow.map((step, index) => {
                    const last = index === subService.workflow.length - 1;
                    return (
                      <Reveal key={index} delay={index * 0.08}>
                        <div className="relative pl-11">
                          <div className="absolute left-0 top-0 flex flex-col items-center">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lumen text-[11px] font-bold text-lumen-foreground">
                              {step.step}
                            </div>
                            {!last ? <div className="mt-1.5 h-12 w-px bg-border" /> : null}
                          </div>
                          <div className="pb-5">
                            <div
                              className="text-[15px] sm:text-[17px] font-bold text-foreground"
                              style={{
                                fontFamily:
                                  "var(--font-display, 'Montserrat', sans-serif)",
                                letterSpacing: "-0.02em",
                              }}
                            >
                              {step.title}
                            </div>
                            <p className="mt-1.5 text-[13px] sm:text-[14px] leading-relaxed text-muted-foreground max-w-md">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {(subService.technologies?.length || subService.deliverables?.length) && (
              <div id="stack" className="scroll-mt-32">
                {subService.technologies?.length ? (
                  <>
                    <SectionHeader
                      index={numberOf("stack")}
                      label="Stack"
                      title="Built with the right tools."
                    />
                    <Reveal delay={0.1} className="mt-6">
                      <div className="rounded-full border border-border bg-foreground text-background overflow-hidden">
                        <Marquee duration={18} className="py-2.5">
                          {subService.technologies.map((tech) => (
                            <span key={tech} className="flex items-center">
                              <span
                                className="px-5 text-[11px] font-semibold uppercase tracking-[0.16em] whitespace-nowrap"
                                style={{
                                  fontFamily:
                                    "var(--font-display, 'Montserrat', sans-serif)",
                                }}
                              >
                                {tech}
                              </span>
                              <span className="h-1.5 w-1.5 rounded-full bg-lumen shrink-0" />
                            </span>
                          ))}
                        </Marquee>
                      </div>
                    </Reveal>
                  </>
                ) : null}

                {subService.deliverables?.length ? (
                  <Reveal
                    delay={0.12}
                    className={subService.technologies?.length ? "mt-6" : ""}
                  >
                    <div className="rounded-[18px] border border-border bg-background/80 px-5 py-5 sm:px-6">
                      <div className="section-label">What you receive</div>
                      <div className="mt-4 space-y-3">
                        {subService.deliverables.map((item, index) => (
                          <CheckItem key={index}>{item}</CheckItem>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ) : null}
              </div>
            )}
          </div>
        )}

        {/* ── CASE STUDY ── */}
        {subService.caseStudies?.length ? (
          <div id="results" className="scroll-mt-32 mt-10 md:mt-14">
            <SectionHeader
              index={numberOf("results")}
              label="Case Study"
              title="Proof, not promises."
            />
            <div className="mt-5 space-y-5">
              {subService.caseStudies.map((study, index) => (
                <Reveal key={index}>
                  <div className="group grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[20px] border border-border bg-background">
                    <div className="relative min-h-[200px] sm:min-h-[250px] overflow-hidden">
                      {study.image ? (
                        <Image
                          src={study.image}
                          alt={study.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-muted/30">
                          <Layers className="size-10 text-muted-foreground/50" />
                        </div>
                      )}
                      {study.result ? (
                        <span className="absolute top-3.5 left-3.5 rounded-full bg-lumen px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-lumen-foreground shadow-lg">
                          {study.result}
                        </span>
                      ) : null}
                    </div>

                    <div className="p-5 sm:p-7 flex flex-col justify-center">
                      <div className="section-label">Outcome</div>
                      <h3
                        className="mt-2.5 text-[20px] sm:text-[24px] md:text-[26px] font-bold leading-[1.1] text-foreground"
                        style={{
                          fontFamily: "var(--font-display, 'Montserrat', sans-serif)",
                          letterSpacing: "-0.04em",
                        }}
                      >
                        {study.title}
                      </h3>
                      <p className="mt-2.5 text-[13px] sm:text-[14px] leading-relaxed text-muted-foreground">
                        {study.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}

        {/* ── TESTIMONIAL — editorial quote ── */}
        {subService.testimonial ? (
          <Reveal className="mt-10 md:mt-14">
            <div className="px-2 sm:px-6 py-2 text-center">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-lumen mb-4">
                <Quote className="size-4 text-lumen-foreground fill-lumen-foreground" />
              </span>
              <blockquote
                className="mx-auto max-w-3xl text-[18px] sm:text-[22px] md:text-[26px] font-bold leading-[1.35] text-foreground"
                style={{
                  fontFamily: "var(--font-display, 'Montserrat', sans-serif)",
                  letterSpacing: "-0.03em",
                }}
              >
                “{subService.testimonial.quote}”
              </blockquote>
              <div className="mt-5 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-lumen" />
                <div className="text-left">
                  <div className="text-[13px] font-semibold text-foreground">
                    {subService.testimonial.name}
                  </div>
                  {subService.testimonial.company ? (
                    <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground mt-0.5">
                      {subService.testimonial.company}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </Reveal>
        ) : null}

        {/* ── FAQ — accordion ── */}
        {subService.faqs?.length ? (
          <div
            id="faqs"
            className="scroll-mt-32 mt-10 md:mt-14 grid grid-cols-1 xl:grid-cols-[.8fr_1.2fr] gap-6 xl:gap-12 items-start"
          >
            <SectionHeader
              index={numberOf("faqs")}
              label="FAQs"
              title="Common questions, answered."
              description="Everything you might want to know before getting started."
            />
            <Reveal delay={0.08}>
              <Accordion type="single" collapsible className="w-full">
                {subService.faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="border-border"
                  >
                    <AccordionTrigger className="py-4 text-[14px] sm:text-[15px] font-semibold text-foreground hover:no-underline group">
                      <span className="flex items-start gap-3.5">
                        <span className="text-[11px] font-bold text-muted-foreground/50 mt-0.5">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-8 text-[13px] sm:text-[14px] leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        ) : null}

        {/* ── CLOSING CTA ── */}
        <Reveal className="mt-10 md:mt-14 mb-6">
          <div className="dark-section relative overflow-hidden rounded-[22px]">
            <div className="absolute inset-0 opacity-[0.05]">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
                  backgroundSize: "42px 42px",
                }}
              />
            </div>
            <div className="absolute -top-20 -right-20 h-[280px] w-[280px] rounded-full bg-lumen/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-[240px] w-[240px] rounded-full bg-lumen/10 blur-3xl" />

            <div className="relative z-10 px-5 py-9 sm:px-8 md:py-11 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-lumen lumen-pulse" />
                Ready to move forward
              </span>

              <h2
                className="mx-auto mt-4 max-w-2xl text-[24px] sm:text-[30px] md:text-[36px] font-bold leading-[1.08] text-white"
                style={{
                  fontFamily: "var(--font-display, 'Montserrat', sans-serif)",
                  letterSpacing: "-0.04em",
                }}
              >
                {subService.cta?.title || `Start with ${subService.title}`}
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-[13px] sm:text-[14px] leading-relaxed text-white/65">
                {subService.cta?.description ||
                  `Build a more refined and modern presentation with ${subService.title}.`}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full h-11 px-6 text-sm font-semibold group bg-lumen text-lumen-foreground hover:bg-lumen/90 transition-all duration-200"
                >
                  <Link href={subService.cta?.primaryLink || "/contact-us"}>
                    {subService.cta?.primaryText || "Get Started"}
                    <ArrowRight className="size-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full h-11 px-6 text-sm font-semibold border-white/20 bg-transparent text-white hover:bg-white hover:text-black transition-all duration-200"
                >
                  <Link href={subService.cta?.secondaryLink || "/portfolio"}>
                    {subService.cta?.secondaryText || "View Portfolio"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default SubServiceDetails;
