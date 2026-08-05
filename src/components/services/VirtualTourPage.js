"use client";

/**
 * Bespoke page for /services/360-virtual-tour.
 *
 * Rendered by the generic service route, which short-circuits to this component
 * for the `360-virtual-tour` slug and hands over the matching `serviceData`
 * record. The editorial copy below is hand-written for this service; the
 * `service` record supplies the breadcrumb and eyebrow so the page stays in
 * sync with the nav and the services index.
 *
 * Deliberately does not render a navbar or footer — the root layout already does.
 */

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  CircleDot,
  Clock3,
  Gauge,
  Globe2,
  Layers3,
  MapPin,
  MousePointer2,
  Palette,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ── content ─────────────────────────────────────────────────────────────── */

const highlights = ["No app required", "Fully branded", "Mobile ready"];

const stats = [
  {
    icon: Smartphone,
    value: "Any device",
    text: "Responsive across mobile, tablet and desktop",
  },
  {
    icon: Gauge,
    value: "Fast loading",
    text: "Optimized for a smooth web experience",
  },
  {
    icon: Globe2,
    value: "No app required",
    text: "Opens directly in a modern browser",
  },
  {
    icon: MousePointer2,
    value: "User-friendly",
    text: "Simple and effortless to explore",
  },
  {
    icon: Clock3,
    value: "24/7",
    text: "Always available for virtual site visits",
  },
];

const features = [
  {
    icon: MousePointer2,
    title: "Interactive hotspots",
    description:
      "Add information, images, video, brochures, links and enquiry actions directly inside the experience.",
  },
  {
    icon: MapPin,
    title: "Guided navigation",
    description:
      "Create a clear journey between rooms, spaces, amenities and important project locations.",
  },
  {
    icon: Palette,
    title: "Complete brand control",
    description:
      "Customize the interface with your logo, colors, labels, navigation style and campaign identity.",
  },
  {
    icon: BarChart3,
    title: "Engagement ready",
    description:
      "Connect analytics and enquiry actions to understand visitor interest and improve conversion.",
  },
];

const benefits = [
  "Let customers explore the project from anywhere, at any time.",
  "Reduce repetitive site visits while improving lead quality.",
  "Explain spaces and amenities with visual, interactive context.",
  "Launch instantly through a website link or QR code.",
  "Deliver a smooth experience across mobile, tablet and desktop.",
  "Update content, hotspots and calls to action as the project evolves.",
  "Embed brochures, video, images and contact actions in one place.",
  "Present a premium, consistent experience under your own brand.",
];

const useCases = [
  {
    title: "Real estate projects",
    text: "Show apartments, villas, amenities and model spaces to buyers anywhere.",
  },
  {
    title: "Hotels & resorts",
    text: "Turn rooms, facilities and experiences into a compelling booking journey.",
  },
  {
    title: "Showrooms",
    text: "Let customers browse displays and product information beyond business hours.",
  },
  {
    title: "Campuses",
    text: "Guide students and visitors through buildings, facilities and important locations.",
  },
  {
    title: "Commercial spaces",
    text: "Present offices, retail units and shared facilities with clarity.",
  },
  {
    title: "Events & exhibitions",
    text: "Extend a physical event into an accessible, shareable digital experience.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Plan",
    text: "We define the spaces, visitor journey, content, branding and conversion goals.",
  },
  {
    step: "02",
    title: "Capture",
    text: "High-quality panoramic media is captured and prepared for a seamless experience.",
  },
  {
    step: "03",
    title: "Build",
    text: "We create navigation, hotspots, media layers, interactions and responsive UI.",
  },
  {
    step: "04",
    title: "Launch",
    text: "The optimized tour is published to your website and shared by link or QR code.",
  },
];

const integrations = [
  {
    icon: MapPin,
    title: "Image Mapping Integration",
    text: "Connect 360° scenes to an interactive master layout with clickable plots, live availability, pricing, brochures and enquiries.",
    image: "/map3d.jpg",
    alt: "Image Mapping integration",
  },
  {
    icon: Layers3,
    title: "3D Immersive Web App",
    text: "Blend panoramic spaces with interactive 3D models, guided camera movement, unit selection and rich project content.",
    image: "/3d.jpg",
    alt: "3D immersive web application integration",
  },
];

const faqs = [
  {
    question: "Does it work on mobile devices?",
    answer:
      "Yes. The experience is optimized for modern mobile, tablet and desktop browsers with no additional app installation.",
  },
  {
    question: "Can we add our branding?",
    answer:
      "Yes. We can customize the logo, colors, labels, buttons, navigation and overall interface to match your brand.",
  },
  {
    question: "What can hotspots contain?",
    answer:
      "Hotspots can open text, images, video, brochures, external links, contact actions and navigation to another scene.",
  },
  {
    question: "How do customers access the tour?",
    answer:
      "It can be embedded into your website or opened through a direct shareable link, campaign link or QR code.",
  },
  {
    question: "Can content be updated later?",
    answer:
      "Yes. Hotspot content, media, labels and calls to action can be updated as your project changes.",
  },
];

/* ── shared bits ─────────────────────────────────────────────────────────── */

const reveal = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

/**
 * Numbered section header.
 *
 * `invert` re-tones the rule and supporting copy for the sections that sit on
 * `bg-foreground`; without it the hairline and label inherit near-black values
 * and all but disappear against the dark panel.
 */
const SectionHead = ({ number, label, title, text, invert = false }) => (
  <div
    className={`grid gap-4 border-t pt-4 md:grid-cols-[180px_1fr] md:gap-10 ${
      invert ? "border-background/20" : "border-foreground/20"
    }`}
  >
    <div
      className={`flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.2em] ${
        invert ? "text-background/55" : "text-muted-foreground"
      }`}
    >
      <span className="flex size-7 items-center justify-center rounded-full bg-lumen text-lumen-foreground">
        {number}
      </span>
      {label}
    </div>

    <div>
      <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-.045em] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {text ? (
        <p
          className={`mt-4 max-w-2xl text-sm leading-7 ${
            invert ? "text-background/55" : "text-muted-foreground"
          }`}
        >
          {text}
        </p>
      ) : null}
    </div>
  </div>
);

/* ── sections ────────────────────────────────────────────────────────────── */

const Hero = ({ service }) => (
  <section className="relative min-h-[92vh] pt-28 md:pt-32">
    <div className="mx-auto grid min-h-[calc(92vh-8rem)] max-w-7xl items-center gap-10 px-5 pb-12 md:px-8 lg:grid-cols-[.9fr_1.1fr]">
      <motion.div
        initial="hidden"
        animate="show"
        variants={reveal}
        className="relative z-10 py-8"
      >
        <nav className="mb-6 flex items-center gap-2 text-[11px] text-muted-foreground">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3" />
            Services
          </Link>
          <span>/</span>
          <span className="font-medium text-foreground">
            {service?.title?.trim() || "360° Virtual Tour"}
          </span>
        </nav>

        {/*
          Intentionally not `service.label` — that field holds search keywords
          ("360 VT | VR | Interactive 360 VT"), not display copy.
        */}
        <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.22em] text-muted-foreground">
          <span className="h-px w-10 bg-lumen" />
          Immersive property experience
        </div>

        <h1 className="mt-6 text-5xl font-semibold leading-[.92] tracking-[-.065em] sm:text-6xl md:text-7xl">
          Walk through it.
          <br />
          <span className="text-muted-foreground">Before you visit.</span>
        </h1>

        <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          A premium, interactive 360° experience that turns every room, amenity
          and project detail into an explorable digital journey.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="h-12 rounded-full px-6">
            <Link href="/contact-us">
              Request a demo
              <ArrowUpRight className="ml-2 size-4" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full px-6"
          >
            <Link href="#overview">
              See how it works
              <ArrowDown className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[11px] text-muted-foreground">
          {highlights.map((item) => (
            <span key={item} className="flex items-center gap-2">
              <Check className="size-3.5 text-foreground" />
              {item}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative min-h-[480px] lg:min-h-[620px]"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[30px] border border-border">
          <Image
            src="/360w.webp"
            alt="Interactive 360 virtual tour preview"
            fill
            priority
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 55vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

          <div className="absolute left-[55%] top-[38%] flex size-12 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md">
            <CircleDot className="size-5" />
          </div>
          <div className="absolute left-[26%] top-[55%] flex size-9 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md">
            <CircleDot className="size-4" />
          </div>
        </div>

        <div className="absolute -bottom-5 -left-5 rounded-2xl border border-border bg-background p-4 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-lumen">
              <Gauge className="size-5 text-lumen-foreground" />
            </span>
            <div>
              <div className="text-xs font-semibold">Fast-loading experience</div>
              <div className="text-[10px] text-muted-foreground">
                Optimized for the web
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const OverviewSection = () => (
  <section
    id="overview"
    className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28"
  >
    <SectionHead
      number="01"
      label="Overview"
      title="A site visit that never closes."
      text="Give customers the freedom to understand your space on their own terms. Clear navigation, rich information and carefully placed interactions make the experience useful—not just visually impressive."
    />

    <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
      {stats.map(({ icon: Icon, value, text }) => (
        <div key={value} className="bg-background p-6">
          <Icon className="size-5 text-foreground" />
          <div className="mt-6 text-2xl font-semibold tracking-tight">
            {value}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">{text}</div>
        </div>
      ))}
    </div>
  </section>
);

const FeaturesSection = () => (
  <section className="bg-foreground py-20 text-background md:py-28">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead
        invert
        number="02"
        label="Features"
        title="Every interaction has a purpose."
        text="A considered set of tools that helps visitors explore naturally and take the next step confidently."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, description }, index) => (
          <motion.article
            key={title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-70px" }}
            variants={reveal}
            className="group flex flex-col rounded-[22px] border border-background/15 bg-background/[.04] p-6 transition-colors hover:bg-background/[.08]"
          >
            <div className="flex items-start justify-between">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-lumen text-lumen-foreground transition-transform duration-500 group-hover:-translate-y-1">
                <Icon className="size-6" />
              </span>
              <span className="text-[10px] font-semibold tracking-[.18em] text-background/40">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="mt-10 text-lg font-semibold tracking-[-.025em]">
              {title}
            </h3>
            <p className="mt-2 text-xs leading-6 text-background/55">
              {description}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

const BenefitsSection = () => (
  <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
    <SectionHead
      number="03"
      label="Benefits"
      title="More clarity. Better-qualified conversations."
    />

    <div className="mt-12 grid gap-3 sm:grid-cols-2">
      {benefits.map((benefit, index) => (
        <div
          key={benefit}
          className="flex items-start gap-4 rounded-2xl border border-border p-5"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-lumen text-[10px] font-bold text-lumen-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="text-sm leading-6 text-muted-foreground">{benefit}</p>
        </div>
      ))}
    </div>
  </section>
);

const UseCasesSection = () => (
  <section className="border-y border-border bg-muted/20 py-20 md:py-28">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead
        number="04"
        label="Use cases"
        title="Built for spaces worth exploring."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {useCases.map(({ title, text }, index) => (
          <div
            key={title}
            className="group bg-background p-6 transition-colors hover:bg-lumen"
          >
            <div className="flex items-center justify-between">
              <Layers3 className="size-5" />
              <span className="text-[10px] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-12 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-xs leading-6 text-muted-foreground group-hover:text-lumen-foreground/65">
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
    <SectionHead
      number="05"
      label="Process"
      title="From physical space to digital experience."
    />

    <div className="relative mt-14 grid gap-5 md:grid-cols-4">
      {workflow.map(({ step, title, text }) => (
        <div key={step} className="relative rounded-2xl border border-border p-5">
          <span className="text-[10px] font-semibold tracking-[.2em] text-muted-foreground">
            {step}
          </span>
          <h3 className="mt-10 text-xl font-semibold">{title}</h3>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">{text}</p>
        </div>
      ))}
    </div>
  </section>
);

const IntegrationsSection = () => (
  <section className="border-t border-border px-5 py-20 md:px-8 md:py-28">
    <div className="mx-auto max-w-7xl">
      <SectionHead
        number="06"
        label="Custom build"
        title="Connect the tour to a complete digital sales experience."
        text="Combine your virtual tour with interactive project tools to give customers one seamless place to explore, compare and enquire."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {integrations.map(({ icon: Icon, title, text, image, alt }) => (
          <article
            key={title}
            className="group relative min-h-[360px] overflow-hidden rounded-[26px] border border-border"
          >
            <Image
              src={image}
              alt={alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width:768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5" />

            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-lumen text-lumen-foreground">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-.035em]">
                {title}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-6 text-white/65">
                {text}
              </p>
              <Link
                href="/contact-us"
                className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-lumen"
              >
                Build this integration
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const FaqSection = () => (
  <section className="bg-foreground py-20 text-background md:py-28">
    <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[.8fr_1.2fr]">
      <div>
        <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.2em] text-background/55">
          <Sparkles className="size-4 text-lumen" />
          07 · FAQ
        </div>
        <h2 className="mt-5 text-3xl font-semibold tracking-[-.045em] sm:text-5xl">
          Everything you need to know.
        </h2>
        <p className="mt-5 max-w-md text-sm leading-7 text-background/55">
          Have a project-specific question? We’ll help define the right
          experience for your space and audience.
        </p>
      </div>

      <div className="divide-y divide-background/15 border-y border-background/15">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium sm:text-base">
              {faq.question}
              <ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <p className="max-w-2xl pt-3 text-sm leading-6 text-background/55">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

const ClosingCta = () => (
  <section className="px-5 py-16 md:px-8 md:py-24">
    <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-lumen px-6 py-12 text-lumen-foreground sm:px-10 md:py-16">
      <div className="absolute -right-16 -top-20 size-72 rounded-full border-[50px] border-black/5" />

      <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <span className="text-[10px] font-semibold uppercase tracking-[.2em] opacity-60">
            Bring your project closer
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-.045em] sm:text-5xl">
            Turn every screen into a site visit.
          </h2>
        </div>

        <Button
          asChild
          size="lg"
          className="h-12 shrink-0 rounded-full bg-foreground px-6 text-background hover:bg-foreground/90"
        >
          <Link href="/contact-us">
            Start your project
            <ArrowUpRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

/* ── page ────────────────────────────────────────────────────────────────── */

export default function VirtualTourPage({ service }) {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <Hero service={service} />
      <OverviewSection />
      <FeaturesSection />
      <BenefitsSection />
      <UseCasesSection />
      <ProcessSection />
      <IntegrationsSection />
      <FaqSection />
      <ClosingCta />
    </main>
  );
}
