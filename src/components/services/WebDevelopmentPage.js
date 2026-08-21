"use client";

/**
 * Bespoke page for /services/website-app-development.
 *
 * Hero widget is a viewport previewer: pick Mobile / Tablet / Desktop and the mock
 * browser reflows, with the performance figures for that breakpoint alongside. It
 * demonstrates the thing the section is selling — responsive, fast front-ends.
 *
 * Modules link to the sub-services in src/data/webdevelopment.js.
 */

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import EditorialServicePage from "./editorial/EditorialServicePage";
import { KpiRow, Mono, Panel, PanelHeader, SegmentedTabs } from "./editorial/shell";

/* ── hero: viewport previewer ────────────────────────────────────────────── */

const VIEWPORTS = [
  {
    key: "mobile",
    tab: "Mobile",
    width: "375 px",
    frame: 46,
    cols: 1,
    kpis: [
      { label: "LCP", value: "1.2s" },
      { label: "Perf", value: "96" },
      { label: "Bundle", value: "78kb" },
    ],
    note: "Single column, tap targets at 44px, images served in AVIF at the size the phone actually needs.",
  },
  {
    key: "tablet",
    tab: "Tablet",
    width: "768 px",
    frame: 72,
    cols: 2,
    kpis: [
      { label: "LCP", value: "1.0s" },
      { label: "Perf", value: "97" },
      { label: "Bundle", value: "78kb" },
    ],
    note: "Two-column grids and a persistent nav, using the same components rather than a separate template.",
  },
  {
    key: "desktop",
    tab: "Desktop",
    width: "1280 px",
    frame: 100,
    cols: 3,
    kpis: [
      { label: "LCP", value: "0.8s" },
      { label: "Perf", value: "99" },
      { label: "Bundle", value: "78kb" },
    ],
    note: "Full editorial layout with the content column pinned to a readable measure, not stretched edge to edge.",
  },
];

const ViewportPreview = () => {
  const [key, setKey] = useState("mobile");
  const vp = VIEWPORTS.find((v) => v.key === key) || VIEWPORTS[0];

  return (
    <Panel>
      <PanelHeader live="Responsive preview" right={vp.width} />

      <SegmentedTabs
        label="Breakpoint"
        items={VIEWPORTS.map((v) => ({ key: v.key, label: v.tab }))}
        value={key}
        onChange={setKey}
        className="border-b border-[var(--im-line)] px-4 py-2.5"
      />

      <KpiRow kpis={vp.kpis} />

      {/* mock browser — the frame width animates between breakpoints */}
      <div className="flex justify-center border-b border-[var(--im-line)] bg-[rgba(17,19,21,0.03)] px-4 py-5">
        <motion.div
          className="overflow-hidden rounded-[8px] border border-[rgba(17,19,21,0.16)] bg-white"
          initial={false}
          animate={{ width: `${vp.frame}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: "100%" }}
        >
          {/* browser chrome */}
          <div className="flex items-center gap-1 border-b border-[rgba(17,19,21,0.10)] px-2 py-1.5">
            {["#FF6B6B", "#F5B544", "#c8f63c"].map((c) => (
              <span
                key={c}
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: c }}
              />
            ))}
          </div>

          {/* wireframe content */}
          <div className="p-2.5">
            <div className="h-2 w-2/3 rounded-full bg-[rgba(17,19,21,0.16)]" />
            <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-[rgba(17,19,21,0.08)]" />
            <div
              className="mt-2.5 grid gap-1.5"
              style={{ gridTemplateColumns: `repeat(${vp.cols}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: vp.cols * 2 }).map((_, i) => (
                <motion.div
                  key={i}
                  layout
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="h-8 rounded-[3px] bg-[rgba(17,19,21,0.07)]"
                />
              ))}
            </div>
            <div className="mt-2.5 h-4 w-20 rounded-[3px] bg-lumen" />
          </div>
        </motion.div>
      </div>

      <div className="p-4">
        <Mono className="text-[10px] uppercase tracking-[0.08em] text-[var(--im-dim)]">
          At {vp.width}
        </Mono>
        <p className="mt-2 text-sm leading-[1.6] text-[var(--im-muted)]">{vp.note}</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/contact-us"
            className="rounded-[5px] bg-lumen px-4 py-2.5 text-center text-[13px] font-semibold text-lumen-foreground transition-opacity hover:opacity-90 sm:flex-1"
          >
            Start a project
          </Link>
          <Link
            href="/portfolio"
            className="rounded-[5px] border border-[rgba(17,19,21,0.22)] px-4 py-2.5 text-center text-[13px] text-[var(--im-ink)] transition-colors hover:bg-[rgba(17,19,21,0.04)] sm:flex-1"
          >
            See our work
          </Link>
        </div>
      </div>
    </Panel>
  );
};

/* ── content ─────────────────────────────────────────────────────────────── */

const CONTENT = {
  headline: ["Fast on every", "screen you own."],
  subcopy:
    "Websites, apps and storefronts built on Next.js and React — server-rendered, responsive to 320px, and quick on a mid-range phone rather than just your office wifi.",
  tags: [
    "Next.js & React",
    "Responsive to 320px",
    "Core Web Vitals",
    "CMS-Editable",
    "SEO Foundations",
  ],
  stats: [
    { value: "90+", label: "Typical Lighthouse performance" },
    { value: "3 wks", label: "Typical marketing site build" },
    { value: "2 stores", label: "From one app codebase" },
  ],

  overview: {
    note: "How we build.",
    title: "Most sites are slow because of what happens after the design.",
    html: `
      <p>A layout looks fine in a design tool and then ships four megabytes of JavaScript, a hero image nobody resized, and three font families that block the first paint. The design was never the problem.</p>
      <p>We build server-rendered so the first paint does not wait on a bundle, ship images in modern formats at the size each device asks for, and keep the JavaScript budget honest. Breakpoints are checked on real devices, down to 320px, before anything is called done.</p>
      <p>Content sits in a CMS your marketing team can edit, analytics and structured data are wired in from the first deploy, and you get the source code and deployment documented at handover.</p>
    `,
  },

  modules: {
    label: "Services",
    itemLabel: "Service",
    note: "Three ways in.",
    title: "Three ways in.",
    hrefBase: "/services/website-app-development",
    items: [
      {
        subSlug: "website-development",
        title: "Website development",
        description:
          "Company sites, campaign landing pages and portfolios built for speed, search and conversion.",
        image: "/web.jpg",
      },
      {
        subSlug: "mobile-app-development",
        title: "Mobile app development",
        description:
          "Android and iOS from one React Native codebase, with offline handling and store release included.",
        image: "/net.jpg",
      },
      {
        subSlug: "ecommerce-development",
        title: "E-commerce development",
        description:
          "Custom storefronts, carts and checkout rules that match how you actually price and fulfil.",
        image: "/crm.jpg",
      },
    ],
  },

  benefits: {
    note: "What you get out of it.",
    title: "What you get out of it.",
    items: [
      "Pages that load fast on mobile networks, not just on fibre.",
      "One responsive build instead of a separate mobile site.",
      "Content edits without a developer in the loop.",
      "Structured data, sitemaps and metadata handled correctly.",
      "Accessible markup that also happens to help search rankings.",
      "Source code, hosting and deployment handed over documented.",
    ],
  },

  useCases: {
    note: "What we build most.",
    title: "What we build most.",
    items: [
      { title: "Corporate sites", description: "Multi-page company sites with careers, news and contact flows." },
      { title: "Landing pages", description: "Fast, focused pages built to convert paid traffic." },
      { title: "Product marketing", description: "Feature, pricing and documentation sites." },
      { title: "Customer apps", description: "Accounts, orders, tracking and support on both stores." },
      { title: "Field staff apps", description: "Data capture and job updates that work without signal." },
      { title: "Online stores", description: "Custom checkout, tiered pricing and inventory that syncs." },
    ],
  },

  process: {
    note: "From brief to live.",
    title: "From brief to live.",
    steps: [
      { step: "01", title: "Structure & content", description: "Sitemap, page intent and an honest look at the content you actually have rather than the content you plan to write." },
      { step: "02", title: "Design & build", description: "Layouts built responsive-first from a shared component set, reviewed on real devices at each breakpoint." },
      { step: "03", title: "Launch & measure", description: "Deploy, wire analytics and events, then tune against how real traffic actually behaves." },
    ],
    technologies: ["Next.js", "React", "React Native", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Sanity / Strapi", "Vercel", "Sentry"],
    deliverables: [
      "Responsive build across all breakpoints",
      "CMS with editor accounts",
      "SEO metadata, sitemap and schema markup",
      "Analytics and conversion event tracking",
      "Performance budget and Lighthouse report",
      "Source code and deployment handover",
    ],
  },

  caseStudy: {
    note: "Proof, not promises.",
    title: "Proof, not promises.",
    result: "2.4s",
    heading: "Cut off the load time",
    description:
      "A client site was taking well over three seconds to first paint on 4G, mostly from unoptimised images and a render-blocking bundle. Rebuilt server-rendered with a real performance budget, it now paints in under a second on the same connection.",
    image: "/web.jpg",
  },

  faqs: {
    note: "Common questions, answered.",
    title: "Common questions.",
    items: [
      { question: "Can our team edit the content?", answer: "Yes. Pages, copy and images are editable through a CMS with per-user accounts. Structural changes — new section types, new templates — still come to us." },
      { question: "Do you handle hosting?", answer: "We deploy to Vercel or to your own infrastructure and hand the setup over documented. Ongoing hosting can sit with you or with us on a retainer." },
      { question: "Native app or cross-platform?", answer: "Cross-platform for most business apps, since it halves what you maintain. We recommend native only when the app leans heavily on platform-specific hardware or performance." },
      { question: "How long does a build take?", answer: "A focused marketing site is usually about three weeks once content is ready. A first app release is typically ten weeks. Storefronts land in between." },
      { question: "Will it work on older phones?", answer: "We test down to 320px width and on mid-range Android, because that is what a lot of real traffic is using. That constraint shapes the build rather than being checked at the end." },
    ],
  },

  cta: {
    title: "Let's build it properly.",
    description:
      "Tell us what the site or app needs to do, and we'll come back with structure, timeline and a number.",
    primaryText: "Start a project",
    primaryLink: "/contact-us",
    secondaryText: "View portfolio",
    secondaryLink: "/portfolio",
  },
};

const WebDevelopmentPage = ({ service }) => (
  <EditorialServicePage
    content={CONTENT}
    hero={<ViewportPreview />}
    breadcrumb={service?.title?.trim() || "Website & App Development"}
  />
);

export default WebDevelopmentPage;
