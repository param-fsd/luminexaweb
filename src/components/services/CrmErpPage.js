"use client";

/**
 * Bespoke page for /services/crm-erp.
 *
 * Layout comes from EditorialServicePage; this module supplies the copy and the
 * hero widget — a console whose module switcher (Sales CRM / Inventory ERP /
 * Finance) drives its KPI tiles and a clickable pipeline.
 *
 * The Modules cards present the sub-services without navigation links.
 */

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import EditorialServicePage from "./editorial/EditorialServicePage";
import { KpiRow, Mono, Panel, PanelHeader, SegmentedTabs } from "./editorial/shell";

/* ── hero console ────────────────────────────────────────────────────────── */

const MODULES = [
  {
    key: "crm",
    tab: "Sales CRM",
    project: "Acme Realty",
    kpis: [
      { label: "Open deals", value: "57" },
      { label: "Conversion", value: "18%" },
      { label: "Avg cycle", value: "22d" },
    ],
    stages: [
      { key: "new", name: "New enquiry", count: 24, share: 100, detail: "Captured from the website, portals and walk-ins, then auto-assigned by territory." },
      { key: "qualified", name: "Qualified", count: 16, share: 67, detail: "Budget and timeline confirmed. The scoring rules are yours to edit, not ours." },
      { key: "visit", name: "Site visit", count: 9, share: 38, detail: "Visits scheduled from the deal record, with reminders out over SMS and WhatsApp." },
      { key: "negotiation", name: "Negotiation", count: 5, share: 21, detail: "Quotes, discounts and approvals tracked against the deal so nothing is verbal." },
      { key: "booked", name: "Booked", count: 3, share: 13, detail: "Booking pushes straight into ERP — unit blocked, payment schedule generated." },
    ],
  },
  {
    key: "erp",
    tab: "Inventory ERP",
    project: "Acme Supply",
    kpis: [
      { label: "Active SKUs", value: "1,240" },
      { label: "Fill rate", value: "96%" },
      { label: "To dispatch", value: "3d" },
    ],
    stages: [
      { key: "po", name: "Purchase order", count: 31, share: 100, detail: "Raised against reorder levels, routed for approval by value band." },
      { key: "stock", name: "In stock", count: 27, share: 87, detail: "Multi-warehouse counts with batch and serial tracking where you need it." },
      { key: "allocated", name: "Allocated", count: 18, share: 58, detail: "Reserved against confirmed orders, so two teams cannot promise the same unit." },
      { key: "dispatched", name: "Dispatched", count: 12, share: 39, detail: "Packing lists, gate passes and courier handoff generated from one screen." },
      { key: "invoiced", name: "Invoiced", count: 9, share: 29, detail: "GST-compliant invoices raised on dispatch and posted to finance." },
    ],
  },
  {
    key: "finance",
    tab: "Finance",
    project: "Acme Group",
    kpis: [
      { label: "Receivables", value: "₹4.2 Cr" },
      { label: "Overdue", value: "6%" },
      { label: "Collection", value: "12d" },
    ],
    stages: [
      { key: "draft", name: "Draft", count: 14, share: 100, detail: "Built from the dispatch or milestone record — no re-keying." },
      { key: "approved", name: "Approved", count: 11, share: 79, detail: "Approval chains by amount, department and cost centre." },
      { key: "sent", name: "Sent", count: 10, share: 71, detail: "Delivered by email and WhatsApp with a payment link attached." },
      { key: "partpaid", name: "Part-paid", count: 4, share: 29, detail: "Part-payments reconciled against the schedule automatically." },
      { key: "settled", name: "Settled", count: 7, share: 50, detail: "Closed and locked, with the audit trail kept intact." },
    ],
  },
];

const Console = () => {
  const [moduleKey, setModuleKey] = useState(MODULES[0].key);
  const mod = MODULES.find((m) => m.key === moduleKey) || MODULES[0];

  /* Selection is tracked per module, so switching tabs always lands on a valid row. */
  const [stageKeys, setStageKeys] = useState(() =>
    Object.fromEntries(MODULES.map((m) => [m.key, m.stages[0].key])),
  );
  const stage = mod.stages.find((s) => s.key === stageKeys[mod.key]) || mod.stages[0];

  return (
    <Panel>
      <PanelHeader live={mod.project} right="This quarter" />

      <SegmentedTabs
        label="System module"
        items={MODULES.map((m) => ({ key: m.key, label: m.tab }))}
        value={moduleKey}
        onChange={setModuleKey}
        className="border-b border-[var(--im-line)] px-4 py-2.5"
      />

      <KpiRow kpis={mod.kpis} />

      {/* pipeline — a vertical list, so it never needs sideways scrolling */}
      <div className="px-4 py-3">
        {mod.stages.map((s) => {
          const on = s.key === stage.key;
          return (
            <button
              key={s.key}
              type="button"
              aria-pressed={on}
              onClick={() => setStageKeys((prev) => ({ ...prev, [mod.key]: s.key }))}
              className="flex w-full items-center gap-3 py-2 text-left"
            >
              <span
                className={`w-[92px] shrink-0 truncate text-[13px] transition-colors sm:w-[108px] sm:text-sm ${
                  on ? "text-[var(--im-ink)]" : "text-[var(--im-muted)]"
                }`}
              >
                {s.name}
              </span>

              <span className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[rgba(17,19,21,0.08)]">
                <motion.span
                  className="block h-full rounded-full"
                  style={{ background: on ? "var(--lumen)" : "rgba(17,19,21,0.24)" }}
                  initial={false}
                  animate={{ width: `${s.share}%` }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>

              <Mono
                className={`w-7 shrink-0 text-right text-[11px] sm:text-xs ${
                  on ? "text-[var(--im-deep)]" : "text-[var(--im-dim)]"
                }`}
              >
                {s.count}
              </Mono>
            </button>
          );
        })}
      </div>

      <div className="border-t border-[var(--im-line)] p-4">
        <Mono className="text-[10px] uppercase tracking-[0.08em] text-[var(--im-dim)]">
          {stage.name}
        </Mono>
        <p className="mt-2 text-sm leading-[1.6] text-[var(--im-muted)]">{stage.detail}</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/contact-us"
            className="rounded-[5px] bg-lumen px-4 py-2.5 text-center text-[13px] font-semibold text-lumen-foreground transition-opacity hover:opacity-90 sm:flex-1"
          >
            Book a walkthrough
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
  headline: ["One system.", "Every moving part."],
  subcopy:
    "CRM, ERP and finance built around how your team actually works — leads, stock, invoices and approvals in a single place you own outright.",
  tags: [
    "Role-Based Access",
    "Live Dashboards",
    "Workflow Automation",
    "API Integrations",
    "On-Premise or Cloud",
  ],
  stats: [
    { value: "60%", label: "Less manual data entry" },
    { value: "1 source", label: "Of truth across teams" },
    { value: "8 wks", label: "Typical first rollout" },
  ],

  overview: {
    note: "Why a custom build.",
    title: "Off-the-shelf software makes you work its way.",
    html: `
      <p>Most teams end up running their business across a CRM that doesn&rsquo;t know about stock, a spreadsheet that doesn&rsquo;t know about approvals, and an accounting package that knows about neither. The gaps between them are where margin quietly leaks.</p>
      <p>We build the system around your process instead. Lead capture, quotations, inventory, purchase, invoicing, payroll and reporting &mdash; designed as one flow, with role-based access so each team sees exactly what it should.</p>
      <p>You own the code and the data. It runs on your cloud or your servers, integrates with the tools you already pay for, and changes when your process changes.</p>
    `,
  },

  modules: {
    label: "Modules",
    note: "Three layers, one database.",
    title: "Three layers, one database.",
    // Keep these cards visible without linking to sub-service pages.
    items: [
      {
        subSlug: "crm-development",
        title: "CRM & sales pipeline",
        description:
          "Lead capture from every channel, assignment rules, follow-up reminders, quotations and a pipeline your sales head can actually read.",
        image: "/crm.jpg",
      },
      {
        subSlug: "erp-development",
        title: "ERP & operations",
        description:
          "Purchase, multi-warehouse inventory, production, dispatch, billing, HR and payroll — connected, not bolted together.",
        image: "/net.jpg",
      },
      {
        subSlug: "dashboards-reporting",
        title: "Dashboards & reporting",
        description:
          "Live KPI boards per role, scheduled reports in the inbox, and drill-down from a number to the record behind it.",
        image: "/web.jpg",
      },
    ],
  },

  benefits: {
    note: "What your team gains.",
    title: "What your team gains.",
    items: [
      "One record per customer, order and invoice — no reconciling three systems.",
      "Approvals and audit trails that hold up to a real audit.",
      "Role-based access, so field staff and finance see different screens.",
      "Automations replacing the manual re-keying between departments.",
      "Reports built once and delivered on schedule, not chased every month.",
      "Your data, your servers, your source code — no per-seat lock-in.",
    ],
  },

  useCases: {
    note: "Where it fits best.",
    title: "Where it fits best.",
    items: [
      { title: "Real estate & projects", description: "Enquiry to booking to collections, with unit inventory in the same system." },
      { title: "Manufacturing", description: "BOM, production planning, stores and dispatch against live order books." },
      { title: "Distribution & retail", description: "Multi-location stock, pricing tiers, and route-wise sales tracking." },
      { title: "Healthcare & clinics", description: "Patient records, appointments, pharmacy stock and billing in one flow." },
      { title: "Education", description: "Admissions, fee schedules, attendance and staff payroll." },
      { title: "Services & agencies", description: "Retainers, timesheets, project profitability and recurring invoicing." },
    ],
  },

  process: {
    note: "A simple delivery flow.",
    title: "A simple delivery flow.",
    steps: [
      { step: "01", title: "Map the process", description: "We sit with each team and document what actually happens today — including the workarounds. That map becomes the spec." },
      { step: "02", title: "Build in modules", description: "The module that hurts most ships first, usually in six to eight weeks. You use it while we build the next one." },
      { step: "03", title: "Migrate & train", description: "Existing data cleaned and imported, staff trained on their own screens, then support through the first close." },
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Prisma", "REST & GraphQL", "Tally / Zoho sync", "Razorpay", "Twilio & WhatsApp", "Docker"],
    deliverables: [
      "Process map and module-by-module scope",
      "Working system with role-based logins",
      "Data migration from your current tools",
      "Admin panel and configurable master data",
      "API documentation for every integration",
      "Full source code and deployment handover",
      "Staff training and post-launch support window",
    ],
  },

  caseStudy: {
    note: "Proof, not promises.",
    title: "Proof, not promises.",
    result: "60%",
    heading: "From four systems to one",
    description:
      "A regional developer was running sales on spreadsheets, inventory in Tally and approvals over WhatsApp. A single CRM+ERP build cut manual data entry by around 60% and closed the month-end books in days instead of weeks.",
    image: "/cus.jpg",
  },

  faqs: {
    note: "Common questions, answered.",
    title: "Common questions.",
    items: [
      { question: "Do we own the system, or is this a subscription?", answer: "You own it. The source code, the database and the deployment are handed over to you. We charge for the build and, if you want it, an ongoing support retainer — never per seat." },
      { question: "Can it work with the software we already use?", answer: "Usually, yes. We integrate with accounting tools like Tally and Zoho Books, payment gateways, WhatsApp and SMS providers, and anything else that exposes an API. Where there is no API we look at scheduled imports." },
      { question: "How long does a first rollout take?", answer: "A focused first module is typically six to eight weeks from signed scope. A full CRM and ERP across several departments is normally staged over four to six months, with each module going live as it is ready." },
      { question: "What happens to our existing data?", answer: "We migrate it. Customers, items, opening balances and historical transactions are cleaned, mapped and imported, with a reconciliation pass before you go live." },
      { question: "Cloud or our own servers?", answer: "Either. Most clients run on managed cloud, but if data residency or policy requires it we deploy on your own infrastructure and document the whole setup." },
    ],
  },

  cta: {
    title: "Let's map your process.",
    description:
      "Bring us the workflow that's costing you the most time. We'll come back with scope, timeline and a number.",
    primaryText: "Book a consultation",
    primaryLink: "/contact-us",
    secondaryText: "View portfolio",
    secondaryLink: "/portfolio",
  },
};

const CrmErpPage = ({ service }) => (
  <EditorialServicePage
    content={CONTENT}
    hero={<Console />}
    breadcrumb={service?.title?.trim() || "CRM | ERP System Development"}
  />
);

export default CrmErpPage;
