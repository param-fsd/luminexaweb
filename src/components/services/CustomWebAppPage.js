"use client";

/**
 * Bespoke page for /services/custom-web-application.
 *
 * Hero widget is a scope builder: toggle the modules you need and the estimate
 * panel recalculates timeline, roles and screen count. It gives a visitor a real
 * number to react to instead of "contact us for pricing".
 *
 * The figures are indicative ranges, and the panel says so — they are a starting
 * point for a conversation, not a quote.
 *
 * Modules link to the sub-services in src/data/customweb.js.
 */

import React, { useMemo, useState } from "react";
import Link from "next/link";
import EditorialServicePage from "./editorial/EditorialServicePage";
import { KpiRow, Mono, Panel, PanelHeader } from "./editorial/shell";

/* ── hero: scope builder ─────────────────────────────────────────────────── */

/* weeks / screens / roles contributed by each module, used for the estimate. */
const BLOCKS = [
  { key: "core", name: "Core app & auth", weeks: 3, screens: 6, roles: 2, locked: true, detail: "Accounts, sessions, permissions and the base layout everything else sits on." },
  { key: "dashboard", name: "Dashboards", weeks: 2, screens: 4, roles: 1, detail: "Role-specific KPI boards reading live from your data." },
  { key: "records", name: "Records & workflow", weeks: 3, screens: 7, roles: 1, detail: "Your core entities with stages, assignment and status transitions." },
  { key: "reports", name: "Reports & exports", weeks: 2, screens: 3, roles: 0, detail: "Saved views, scheduled report packs, Excel and PDF export." },
  { key: "approvals", name: "Approvals", weeks: 2, screens: 3, roles: 1, detail: "Multi-level sign-off by value, department or cost centre, with an audit trail." },
  { key: "api", name: "API & integrations", weeks: 2, screens: 2, roles: 0, detail: "REST endpoints plus connectors to the tools you already pay for." },
  { key: "mobile", name: "Mobile access", weeks: 2, screens: 4, roles: 0, detail: "Phone-first screens for staff who work away from a desk." },
];

const ScopeBuilder = () => {
  const [on, setOn] = useState({ core: true, dashboard: true, records: true, reports: false, approvals: false, api: false, mobile: false });

  const est = useMemo(() => {
    const picked = BLOCKS.filter((b) => on[b.key]);
    const weeks = picked.reduce((a, b) => a + b.weeks, 0);
    return {
      weeks,
      screens: picked.reduce((a, b) => a + b.screens, 0),
      roles: picked.reduce((a, b) => a + b.roles, 0),
      /* Parallel work compresses the total, so quote a range rather than a sum. */
      range: `${Math.max(3, Math.round(weeks * 0.7))}–${weeks}`,
    };
  }, [on]);

  const toggle = (b) => {
    if (b.locked) return;
    setOn((prev) => ({ ...prev, [b.key]: !prev[b.key] }));
  };

  return (
    <Panel>
      <PanelHeader live="Scope builder" right="Indicative" />

      <KpiRow
        kpis={[
          { label: "Weeks", value: est.range },
          { label: "Screens", value: String(est.screens) },
          { label: "Roles", value: String(est.roles) },
        ]}
      />

      <div className="px-4 py-3">
        {BLOCKS.map((b) => {
          const active = on[b.key];
          return (
            <button
              key={b.key}
              type="button"
              role="switch"
              aria-checked={active}
              aria-label={b.name}
              disabled={b.locked}
              onClick={() => toggle(b)}
              className={`flex w-full items-center gap-3 py-2 text-left ${
                b.locked ? "cursor-default" : ""
              }`}
            >
              {/* checkbox */}
              <span
                aria-hidden="true"
                className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border transition-colors"
                style={{
                  borderColor: active ? "transparent" : "rgba(17,19,21,0.24)",
                  background: active ? "var(--lumen)" : "transparent",
                }}
              >
                {active ? (
                  <Mono className="text-[10px] text-lumen-foreground">✓</Mono>
                ) : null}
              </span>

              <span
                className={`min-w-0 flex-1 truncate text-[13px] sm:text-sm ${
                  active ? "text-[var(--im-ink)]" : "text-[var(--im-muted)]"
                }`}
              >
                {b.name}
                {b.locked ? (
                  <Mono className="ml-2 text-[10px] uppercase tracking-[0.08em] text-[var(--im-dim)]">
                    Always
                  </Mono>
                ) : null}
              </span>

              <Mono
                className={`shrink-0 text-[11px] sm:text-xs ${
                  active ? "text-[var(--im-deep)]" : "text-[var(--im-dim)]"
                }`}
              >
                +{b.weeks}w
              </Mono>
            </button>
          );
        })}
      </div>

      <div className="border-t border-[var(--im-line)] p-4">
        <Mono className="text-[10px] uppercase tracking-[0.08em] text-[var(--im-dim)]">
          Indicative only
        </Mono>
        <p className="mt-2 text-sm leading-[1.6] text-[var(--im-muted)]">
          A starting point for a conversation, not a quote — real timelines depend on
          your data, integrations and how many people need to sign off.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/contact-us"
            className="rounded-[5px] bg-lumen px-4 py-2.5 text-center text-[13px] font-semibold text-lumen-foreground transition-opacity hover:opacity-90 sm:flex-1"
          >
            Get a real quote
          </Link>
          <Link
            href="/case-studies"
            className="rounded-[5px] border border-[rgba(17,19,21,0.22)] px-4 py-2.5 text-center text-[13px] text-[var(--im-ink)] transition-colors hover:bg-[rgba(17,19,21,0.04)] sm:flex-1"
          >
            See a build
          </Link>
        </div>
      </div>
    </Panel>
  );
};

/* ── content ─────────────────────────────────────────────────────────────── */

const CONTENT = {
  headline: ["Software shaped", "to your process."],
  subcopy:
    "Internal tools, portals and dashboards built for the workflow you actually run — the one that currently lives across four spreadsheets and a group chat.",
  tags: [
    "Role-Based Dashboards",
    "Workflow Automation",
    "Custom Reporting",
    "API Integrations",
    "Built to Scale",
  ],
  stats: [
    { value: "3–5 wks", label: "To a usable first version" },
    { value: "1 tool", label: "Replacing the spreadsheet sprawl" },
    { value: "100%", label: "Source code handed to you" },
  ],

  overview: {
    note: "When custom is right.",
    title: "The spreadsheet works until the fourth person opens it.",
    html: `
      <p>Every growing team hits the same wall. The sheet that ran operations beautifully at five people starts breaking at fifteen: two versions in circulation, formulas someone overwrote, and no record of who changed what.</p>
      <p>A custom web application fixes the parts a spreadsheet was never going to do — concurrent access, permissions, validation, an audit trail, and automation of the steps your team currently does by hand.</p>
      <p>We are equally happy to tell you when custom is the wrong call. If an off-the-shelf tool covers 90% of what you need, buying it is cheaper than building it, and we will say so before you spend anything.</p>
    `,
  },

  modules: {
    label: "Applications",
    itemLabel: "Application",
    note: "What we build most.",
    title: "What we build most.",
    hrefBase: "/services/custom-web-application",
    items: [
      {
        subSlug: "custom-dashboards",
        title: "Dashboards & portals",
        description:
          "Role-based dashboards and customer or vendor portals, reading live from your operational data.",
        image: "/web.jpg",
      },
      {
        subSlug: "industry-solutions",
        title: "Industry solutions",
        description:
          "Applications shaped around a sector's own vocabulary and rules — real estate, education, healthcare, logistics.",
        image: "/cus.jpg",
      },
      {
        subSlug: "automation-tools",
        title: "Internal tools",
        description:
          "The admin panels, approval queues and back-office screens that replace manual coordination.",
        image: "/net.jpg",
      },
    ],
  },

  benefits: {
    note: "What changes day to day.",
    title: "What changes day to day.",
    items: [
      "Everyone works off one live version, concurrently.",
      "Permissions per role, so people see only their own scope.",
      "Validation at entry, instead of cleanup at month-end.",
      "An audit trail on every change, kept intact.",
      "The manual coordination steps automated away.",
      "Full source code, so you are never held hostage by a vendor.",
    ],
  },

  useCases: {
    note: "Where it fits best.",
    title: "Where it fits best.",
    items: [
      { title: "Operations tools", description: "Job tracking, scheduling and resource allocation." },
      { title: "Customer portals", description: "Self-service accounts, documents and status." },
      { title: "Vendor portals", description: "Onboarding, purchase orders and invoice submission." },
      { title: "Approval workflows", description: "Multi-level sign-off with a full audit trail." },
      { title: "Field data capture", description: "Phone-first forms that work without signal." },
      { title: "Reporting hubs", description: "One place the numbers are agreed and published from." },
    ],
  },

  process: {
    note: "How we deliver.",
    title: "How we deliver.",
    steps: [
      { step: "01", title: "Shadow the process", description: "We watch the work happen, including the workarounds nobody documents. The workarounds are usually the requirement." },
      { step: "02", title: "Ship a thin version", description: "A narrow but genuinely usable version goes live in three to five weeks, so feedback comes from use rather than from a mockup." },
      { step: "03", title: "Widen on feedback", description: "Modules added in priority order against real usage, with the source code and deployment handed over at each stage." },
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Redis", "REST & GraphQL", "Docker", "Vercel"],
    deliverables: [
      "Process map and prioritised module list",
      "Working application with role-based access",
      "Admin panel and configurable master data",
      "Data migration from your current spreadsheets or tools",
      "API documentation for every integration",
      "Full source code and deployment handover",
      "Training and a post-launch support window",
    ],
  },

  caseStudy: {
    note: "Proof, not promises.",
    title: "Proof, not promises.",
    result: "4 wks",
    heading: "Out of the spreadsheets",
    description:
      "An operations team was coordinating jobs across shared sheets and a group chat, losing an afternoon a week to reconciling versions. A thin first release went live in four weeks and became the single place jobs were tracked.",
    image: "/cus.jpg",
  },

  faqs: {
    note: "Common questions, answered.",
    title: "Common questions.",
    items: [
      { question: "How do we know custom is the right call?", answer: "Often it is not, and we will tell you. If an off-the-shelf tool covers about 90% of what you need, buying it is cheaper. Custom pays off when your process is the thing that makes you competitive, or when no tool fits the way you work." },
      { question: "What does it actually cost?", answer: "It scales with scope. The builder above gives an indicative range so you have a number to react to; a real quote follows a scoping conversation about your data, integrations and approvals." },
      { question: "Do we own the code?", answer: "Yes. Source code, database and deployment are handed over to you. There is no per-seat licence and no lock-in." },
      { question: "Can it grow with us?", answer: "That is the point of building in modules. Each one ships independently, so you can add approvals or a mobile view later without rebuilding what already works." },
      { question: "What about our existing data?", answer: "We migrate it. Spreadsheets and current-tool exports are cleaned, mapped and imported, with a reconciliation pass before go-live." },
    ],
  },

  cta: {
    title: "Which spreadsheet is breaking?",
    description:
      "Start there. Show us the process and we'll come back with scope, timeline and a number.",
    primaryText: "Get a real quote",
    primaryLink: "/contact-us",
    secondaryText: "View portfolio",
    secondaryLink: "/portfolio",
  },
};

const CustomWebAppPage = ({ service }) => (
  <EditorialServicePage
    content={CONTENT}
    hero={<ScopeBuilder />}
    breadcrumb={service?.title?.trim() || "Custom Web Application"}
  />
);

export default CustomWebAppPage;
