"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Marquee from "@/components/motion/Marquee";
import {
  ArrowUpRight,
  Sparkles,
  Rocket,
  Target,
  Eye,
  BrainCircuit,
  Boxes,
  Wand2,
  ShieldCheck,
  Code2,
  Handshake,
  CheckCircle2,
  Quote,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

const displayFont = {
  fontFamily: "var(--font-display, 'Montserrat', sans-serif)",
  letterSpacing: "-0.035em",
};

/* ----- small shared bits ----- */
const Label = ({ children }) => (
  <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
    <span className="h-1.5 w-1.5 rounded-full bg-lumen" />
    {children}
  </div>
);

const Heading = ({ children, className = "" }) => (
  <h2
    style={displayFont}
    className={`mt-4 text-[26px] sm:text-[34px] md:text-[42px] font-bold leading-[1.05] text-foreground ${className}`}
  >
    {children}
  </h2>
);

const AboutPage = () => {
  const stats = [
    { value: "50+", label: "Projects delivered" },
    { value: "10+", label: "Industries served" },
    { value: "100%", label: "Custom builds" },
  ];

  const highlights = [
    "Experience-first development",
    "Immersive + intelligent + web",
    "Scalable, clean architecture",
    "Design and business value",
  ];

  const approach = [
    "Product thinking before pixels — we design around the real outcome.",
    "Engineering structure that stays reliable, scalable, and maintainable.",
    "Visual refinement that makes every interaction feel premium.",
  ];

  const capabilities = [
    {
      icon: Boxes,
      title: "WebAR Experiences",
      desc: "Browser-based immersive experiences — image tracking, product visualization, and engagement-led campaigns.",
    },
    {
      icon: BrainCircuit,
      title: "AI-Enabled Systems",
      desc: "Smart workflows, automation, and assistant-driven tools that cut manual effort and sharpen decisions.",
    },
    {
      icon: Code2,
      title: "Modern Web Apps",
      desc: "Fast, responsive, scalable platforms built with clean architecture and product-focused engineering.",
    },
    {
      icon: Wand2,
      title: "Design + UX Systems",
      desc: "Premium interfaces and polished interactions designed to improve clarity, usability, and conversion.",
    },
  ];

  const values = [
    {
      icon: Sparkles,
      title: "Innovation",
      desc: "We work with emerging technologies to build solutions that stay relevant, adaptive, and future-ready.",
    },
    {
      icon: ShieldCheck,
      title: "Quality",
      desc: "Performance, maintainability, and structured execution shape every experience we ship.",
    },
    {
      icon: Handshake,
      title: "Collaboration",
      desc: "We work as partners, aligning every build with real business objectives and outcomes.",
    },
  ];

  const workflow = [
    {
      step: "01",
      title: "Understand the requirement",
      description:
        "We start with the business goal, audience, expected outcome, and technical scope before shaping a solution.",
    },
    {
      step: "02",
      title: "Design the experience",
      description:
        "We structure the experience with strong visual clarity, interaction flow, and product thinking so it feels intuitive.",
    },
    {
      step: "03",
      title: "Build the right way",
      description:
        "We pick a practical execution path for the requirement, keeping the product reliable, scalable, and easy to use.",
    },
    {
      step: "04",
      title: "Refine and deliver",
      description:
        "After testing and iteration, we finalize a polished, business-ready, and maintainable delivery.",
    },
  ];

  return (
    <main className="relative w-full overflow-hidden">
      {/* global background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 opacity-[0.04] line-grid" />
        <div className="absolute -top-40 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8 pb-6">
        {/* ============ HERO (dark) ============ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-6 overflow-hidden rounded-[28px] border border-border/60 bg-foreground text-background"
        >
          {/* inner grid */}
          <div className="absolute inset-0 opacity-[0.06]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
          </div>

          {/* lumen glows */}
          <motion.div
            className="absolute -top-24 -left-24 h-[280px] w-[280px] rounded-full bg-lumen/25 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute -bottom-24 -right-16 h-[280px] w-[280px] rounded-full bg-white/10 blur-3xl" />

          {/* ghost marquee */}
          <div className="pointer-events-none absolute inset-x-0 bottom-3 select-none" aria-hidden>
            <Marquee duration={40} className="opacity-[0.3]">
              {["LUMINEXA", "BEYOND LIMITS", "IMMERSIVE", "INTELLIGENT", "LUMINEXA", "BEYOND LIMITS"].map(
                (word, i) => (
                  <span
                    key={`${word}-${i}`}
                    className="display-outline display-outline-light px-8 text-[58px] sm:text-[84px] md:text-[104px] leading-none whitespace-nowrap"
                  >
                    {word}
                  </span>
                )
              )}
            </Marquee>
          </div>

          <div className="relative z-10 px-5 py-8 sm:px-8 md:px-12 md:py-12 lg:py-14">
            <span className="inline-flex items-center gap-2 rounded-full bg-lumen px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-lumen-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-lumen-foreground lumen-pulse" />
              About Luminexa
            </span>

            <h1
              style={displayFont}
              className="mt-5 max-w-4xl text-[30px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-bold leading-[1.02] text-background"
            >
              We craft <span className="text-lumen">immersive</span>,
              intelligent digital experiences.
            </h1>

            <p className="mt-5 max-w-2xl text-[13px] sm:text-[15px] leading-7 text-background/75">
              Luminexa Technologies is a product and solutions company building
              experience-first platforms with immersive, intelligent, and modern
              digital systems — where engineering meets refined design.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                asChild
                className="group rounded-full px-6 h-11 bg-lumen text-lumen-foreground font-semibold hover:bg-lumen/90"
              >
                <Link href="/contact-us">
                  Get in Touch
                  <ArrowUpRight className="size-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full px-6 h-11 border-background/25 bg-transparent text-background hover:bg-background/10 hover:text-background"
              >
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </div>

            {/* stat strip */}
            <div className="mt-7 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-5">
              {stats.map((s) => (
                <div key={s.label}>
                  <div
                    style={displayFont}
                    className="text-[22px] sm:text-[30px] md:text-[36px] font-bold text-background"
                  >
                    {s.value}
                  </div>
                  <div className="mt-1 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-background/55">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ============ INTRO ============ */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.55 }}
          className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12"
        >
          <div>
            <Label>Who we are</Label>
            <Heading>
              Engineering experiences,
              <br className="hidden sm:block" /> not just websites.
            </Heading>
          </div>

          <div className="space-y-4 text-[13px] sm:text-[14px] md:text-[15px] leading-7 text-muted-foreground lg:pt-2">
            <p>
              We help brands, startups, and enterprises move beyond static
              content — turning ideas into interactive, intelligent, and
              experience-driven digital solutions.
            </p>
            <p>
              Our work blends product thinking, engineering structure, visual
              refinement, and emerging technologies to build systems that are
              functional and genuinely premium to use.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {highlights.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1.5 text-[11px] text-foreground"
                >
                  <CheckCircle2 className="size-3.5 text-lumen" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ============ APPROACH (image + text) ============ */}
        <section className="mt-10 grid items-center gap-8 md:mt-14 lg:grid-cols-2 lg:gap-12">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55 }}
            className="relative aspect-[4/3] overflow-hidden rounded-[26px] border border-border/60"
          >
            <Image
              src="/to.jpg"
              alt="The Luminexa approach"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/5 to-transparent" />
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-lumen px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-lumen-foreground">
              <Sparkles className="size-3.5" />
              Crafted with intent
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.05 }}>
            <Label>Our approach</Label>
            <Heading>Product thinking meets refined engineering.</Heading>

            <p className="mt-4 max-w-xl text-[13px] sm:text-[14px] md:text-[15px] leading-7 text-muted-foreground">
              Every build starts with the outcome and ends with the details.
              That balance is what makes our products feel modern, fast, and
              human.
            </p>

            <div className="mt-6 space-y-4">
              {approach.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-lumen/15 text-[11px] font-bold text-foreground">
                    {i + 1}
                  </span>
                  <span className="text-[13px] sm:text-[14px] leading-6 text-muted-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ============ MISSION + VISION (contrast pair) ============ */}
        <section className="mt-10 md:mt-14">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <Label>Direction</Label>
            <Heading>Mission &amp; Vision.</Heading>
          </motion.div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {/* dark mission card */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-[26px] border border-border/60 bg-foreground p-7 text-background sm:p-9"
            >
              <div className="absolute -top-16 -right-10 h-44 w-44 rounded-full bg-lumen/20 blur-3xl" />
              <span className="relative inline-flex size-11 items-center justify-center rounded-2xl bg-lumen text-lumen-foreground">
                <Target className="size-5" />
              </span>
              <h3 className="relative mt-5 text-[20px] sm:text-[24px] font-semibold">
                Our Mission
              </h3>
              <p className="relative mt-3 text-[13px] sm:text-[14px] leading-7 text-background/75">
                To simplify complex ideas through intuitive digital experiences
                that improve clarity, engagement, and decision-making for
                businesses and the people they serve.
              </p>
            </motion.div>

            {/* light vision card */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="relative overflow-hidden rounded-[26px] border border-border/60 bg-background/70 p-7 sm:p-9"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Eye className="size-5" />
              </span>
              <h3 className="mt-5 text-[20px] sm:text-[24px] font-semibold text-foreground">
                Our Vision
              </h3>
              <p className="mt-3 text-[13px] sm:text-[14px] leading-7 text-muted-foreground">
                To shape a future where immersive technologies and intelligent
                systems become a natural extension of how people learn, explore,
                and interact with the world.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ============ CAPABILITIES ============ */}
        <section className="mt-10 md:mt-14">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <Label>Capabilities</Label>
            <Heading>What we build.</Heading>
          </motion.div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  {...fadeUp}
                  transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden rounded-[22px] border border-border/60 bg-background/70 p-6 transition-colors hover:border-lumen/50"
                >
                  <span className="absolute right-5 top-5 text-[12px] font-semibold tabular-nums text-muted-foreground/40">
                    0{index + 1}
                  </span>
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-lumen group-hover:text-lumen-foreground">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-[16px] sm:text-[18px] font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[12px] sm:text-[13px] leading-6 text-muted-foreground">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ============ PROCESS ============ */}
        <section className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="lg:sticky lg:top-24 lg:self-start">
            <Label>Process</Label>
            <Heading>How we approach delivery.</Heading>
            <p className="mt-4 max-w-md text-[13px] sm:text-[14px] leading-7 text-muted-foreground">
              Every project follows a clear flow — from understanding the
              requirement to delivering a polished, reliable, business-ready
              product.
            </p>
          </motion.div>

          <div>
            {workflow.map((step, index) => (
              <motion.div
                key={step.step}
                {...fadeUp}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="relative pl-12 sm:pl-14"
              >
                <div className="absolute left-0 top-0 flex flex-col items-center">
                  <div className="flex size-9 items-center justify-center rounded-full bg-lumen text-[12px] font-bold text-lumen-foreground sm:size-10">
                    {step.step}
                  </div>
                  {index !== workflow.length - 1 && (
                    <div className="mt-2 h-full min-h-[44px] w-px flex-1 bg-border" />
                  )}
                </div>

                <div className="pb-9">
                  <h3 className="text-[16px] sm:text-[19px] font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[12px] sm:text-[13px] md:text-[14px] leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============ VALUES ============ */}
        <section className="mt-10 md:mt-14">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <Label>Values</Label>
            <Heading>What defines us.</Heading>
          </motion.div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {values.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  {...fadeUp}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  whileHover={{ y: -5 }}
                  className="rounded-[22px] border border-border/60 bg-background/70 p-6 transition-colors hover:border-lumen/50"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-[16px] sm:text-[18px] font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[12px] sm:text-[13px] leading-6 text-muted-foreground">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ============ QUOTE ============ */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="mt-10 md:mt-14"
        >
          <div className="relative overflow-hidden rounded-[28px] border border-border/60 bg-muted/20 p-8 md:p-12">
            <Quote className="absolute right-8 top-8 size-16 text-lumen/15" />
            <p
              style={displayFont}
              className="relative max-w-4xl text-[20px] sm:text-[28px] md:text-[34px] font-semibold leading-[1.35] text-foreground"
            >
              “We believe good technology should not only function well, but also
              feel <span className="lumen-mark">natural, refined, and valuable</span> for
              the people who use it.”
            </p>
            <div className="relative mt-6">
              <div className="text-[13px] font-semibold text-foreground">
                Luminexa Technologies
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-[12px]">
                Immersive • Intelligent • Digital Solutions
              </div>
            </div>
          </div>
        </motion.section>

        {/* ============ CTA ============ */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="mt-10 mb-6 md:mt-14"
        >
          <div className="relative overflow-hidden rounded-[28px] border border-border/60 bg-foreground text-background">
            <div className="absolute inset-0 opacity-[0.06]">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              />
            </div>
            <div className="absolute -bottom-20 left-1/2 h-[240px] w-[240px] -translate-x-1/2 rounded-full bg-lumen/20 blur-3xl" />

            <div className="relative z-10 px-5 py-10 text-center sm:px-8 md:px-10 md:py-14">
              <p className="text-[10px] uppercase tracking-[0.2em] text-background/70 sm:text-[12px]">
                Let’s build what’s next
              </p>

              <h2
                style={displayFont}
                className="mx-auto mt-3 max-w-3xl text-[24px] font-bold leading-[1.1] text-background sm:text-[32px] md:text-[42px]"
              >
                Create better digital products with Luminexa.
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-[13px] leading-7 text-background/75 sm:text-[14px]">
                From immersive solutions to intelligent automation and scalable
                platforms, we’re ready to turn your vision into a polished,
                working reality.
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  className="rounded-full px-6 h-11 bg-lumen text-lumen-foreground font-semibold hover:bg-lumen/90 w-full sm:w-auto"
                >
                  <Link href="/contact-us">Get in Touch</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-6 h-11 border-background/25 bg-transparent text-background hover:bg-background/10 hover:text-background w-full sm:w-auto"
                >
                  <Link href="/services">Explore Capabilities</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default AboutPage;
