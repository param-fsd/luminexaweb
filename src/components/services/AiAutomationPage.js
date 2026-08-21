"use client";

/**
 * Bespoke page for /services/artificial-intelligence.
 *
 * Hero widget is an automation run: pick a workflow and watch its steps advance,
 * which is a more honest demonstration of "AI automation" than a static graphic.
 * The run advances on a timer and loops; it also restarts when you switch workflow.
 *
 * Modules link to the sub-services already defined in src/data/nexai.js.
 */

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import EditorialServicePage from "./editorial/EditorialServicePage";
import { KpiRow, Mono, Panel, PanelHeader, SegmentedTabs } from "./editorial/shell";

/* ── hero: automation run ────────────────────────────────────────────────── */

const FLOWS = [
  {
    key: "support",
    tab: "Support",
    trigger: "Customer email received",
    kpis: [
      { label: "Handled", value: "72%" },
      { label: "First reply", value: "20s" },
      { label: "Escalated", value: "28%" },
    ],
    steps: [
      { name: "Read & classify", detail: "Intent, urgency and language detected from the message body." },
      { name: "Look up account", detail: "Order history and open tickets pulled from your CRM." },
      { name: "Draft reply", detail: "Answer grounded in your own help content, not invented." },
      { name: "Check confidence", detail: "Below threshold, it routes to a human instead of guessing." },
      { name: "Send or escalate", detail: "Reply sent, or assigned to the right agent with context attached." },
    ],
  },
  {
    key: "sales",
    tab: "Sales",
    trigger: "New lead submitted",
    kpis: [
      { label: "Response", value: "<1m" },
      { label: "Enriched", value: "94%" },
      { label: "Routed", value: "100%" },
    ],
    steps: [
      { name: "Capture lead", detail: "Form, ad platform or portal feed lands in one queue." },
      { name: "Enrich & score", detail: "Company data appended, then scored against your own criteria." },
      { name: "Assign owner", detail: "Routed by territory, product line or round-robin." },
      { name: "Send first touch", detail: "Templated WhatsApp or email within the first minute." },
      { name: "Book the call", detail: "Calendar link offered and the meeting written back to the CRM." },
    ],
  },
  {
    key: "backoffice",
    tab: "Back office",
    trigger: "Invoice PDF arrives",
    kpis: [
      { label: "Auto-posted", value: "88%" },
      { label: "Per doc", value: "6s" },
      { label: "Error rate", value: "0.4%" },
    ],
    steps: [
      { name: "Extract fields", detail: "Vendor, line items, tax and totals read straight off the PDF." },
      { name: "Match to PO", detail: "Reconciled against the purchase order and goods receipt." },
      { name: "Flag mismatches", detail: "Anything outside tolerance is held for a human to look at." },
      { name: "Post to ledger", detail: "Clean documents posted to your accounting system." },
      { name: "File & notify", detail: "Archived against the vendor record, with the owner notified." },
    ],
  },
];

const STEP_MS = 1100;

const AutomationRun = () => {
  const [flowKey, setFlowKey] = useState(FLOWS[0].key);
  const [active, setActive] = useState(0);
  const flow = FLOWS.find((f) => f.key === flowKey) || FLOWS[0];
  const stepCount = flow.steps.length;
  const timer = useRef(null);

  /* Advance through the steps and loop. Restarts whenever the workflow changes. */
  useEffect(() => {
    setActive(0);
    timer.current = setInterval(
      () => setActive((i) => (i + 1) % stepCount),
      STEP_MS,
    );
    return () => clearInterval(timer.current);
  }, [flowKey, stepCount]);

  const selectStep = (i) => {
    clearInterval(timer.current);
    setActive(i);
  };

  return (
    <Panel>
      <PanelHeader live={flow.trigger} right={`Step ${active + 1}/${stepCount}`} />

      <SegmentedTabs
        label="Workflow"
        items={FLOWS.map((f) => ({ key: f.key, label: f.tab }))}
        value={flowKey}
        onChange={setFlowKey}
        className="border-b border-[var(--im-line)] px-4 py-2.5"
      />

      <KpiRow kpis={flow.kpis} />

      {/* run steps — a vertical list, so nothing needs sideways scrolling */}
      <div className="px-4 py-3">
        {flow.steps.map((s, i) => {
          const done = i < active;
          const on = i === active;
          return (
            <button
              key={s.name}
              type="button"
              aria-pressed={on}
              onClick={() => selectStep(i)}
              className="flex w-full items-center gap-3 py-2 text-left"
            >
              <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                {on ? (
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--lumen)" }}
                    animate={{ opacity: [0.35, 1, 0.35] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                ) : null}
                <span
                  className="relative flex h-5 w-5 items-center justify-center rounded-full border"
                  style={{
                    borderColor: done || on ? "transparent" : "rgba(17,19,21,0.20)",
                    background: done
                      ? "rgba(17,19,21,0.82)"
                      : on
                        ? "var(--lumen)"
                        : "transparent",
                  }}
                >
                  <Mono className="text-[9px]">
                    <span
                      style={{ color: done ? "#fff" : on ? "#0a0a0a" : "var(--im-dim)" }}
                    >
                      {done ? "✓" : i + 1}
                    </span>
                  </Mono>
                </span>
              </span>

              <span
                className={`min-w-0 flex-1 truncate text-[13px] transition-colors sm:text-sm ${
                  on ? "text-[var(--im-ink)]" : "text-[var(--im-muted)]"
                }`}
              >
                {s.name}
              </span>

              {on ? (
                <Mono className="shrink-0 text-[10px] uppercase tracking-[0.08em] text-[var(--im-deep)]">
                  Running
                </Mono>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="border-t border-[var(--im-line)] p-4">
        <Mono className="text-[10px] uppercase tracking-[0.08em] text-[var(--im-dim)]">
          {flow.steps[active].name}
        </Mono>
        <p className="mt-2 text-sm leading-[1.6] text-[var(--im-muted)]">
          {flow.steps[active].detail}
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/contact-us"
            className="rounded-[5px] bg-lumen px-4 py-2.5 text-center text-[13px] font-semibold text-lumen-foreground transition-opacity hover:opacity-90 sm:flex-1"
          >
            Map your workflow
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
  headline: ["The work that", "runs itself."],
  subcopy:
    "AI agents, chatbots and workflow automation wired into the systems you already run — handling the repetitive work and handing you the rest with context attached.",
  tags: [
    "AI Agents",
    "Grounded Answers",
    "Human Handoff",
    "Workflow Automation",
    "Predictive Analytics",
  ],
  stats: [
    { value: "72%", label: "Of routine queries handled end to end" },
    { value: "24/7", label: "Without a shift roster" },
    { value: "4 wks", label: "Typical first automation live" },
  ],

  overview: {
    note: "What this actually is.",
    title: "Automation only helps if it knows when to stop.",
    html: `
      <p>The failure mode of business AI is not that it cannot answer. It is that it answers confidently when it should have escalated, and nobody finds out until a customer does.</p>
      <p>We build automations that are grounded in your own content and your own records, with an explicit confidence threshold. Above it, the agent acts. Below it, the work goes to a person with the context already gathered, which is faster than starting from scratch anyway.</p>
      <p>Everything is logged: what triggered a run, what the model saw, what it decided, and what a human changed afterwards. That log is what lets you widen the automation safely over time instead of guessing.</p>
    `,
  },

  modules: {
    label: "Capabilities",
    itemLabel: "Capability",
    note: "Three places to start.",
    title: "Three places to start.",
    hrefBase: "/services/artificial-intelligence",
    items: [
      {
        subSlug: "ai-agents",
        title: "AI agents",
        description:
          "Agents that carry out multi-step work across your tools — reading, deciding and acting, with a human threshold built in.",
        image: "/ai.png",
      },
      {
        subSlug: "ai-chatbots",
        title: "AI chatbots",
        description:
          "Support and sales chat grounded in your own help content, with clean handoff to a person when it matters.",
        image: "/nexai.jpg",
      },
      {
        subSlug: "automation-workflows",
        title: "Workflow automation",
        description:
          "The connective tissue between apps: triggers, enrichment, routing and writebacks, without the manual re-keying.",
        image: "/aii.jpg",
      },
    ],
  },

  benefits: {
    note: "What your team gains.",
    title: "What your team gains.",
    items: [
      "Routine queries answered in seconds, around the clock.",
      "Escalations arrive with the context already gathered.",
      "Answers grounded in your content, so they are checkable.",
      "Every run logged — trigger, decision and human correction.",
      "Staff time moved off re-keying and onto the exceptions.",
      "Automations widened gradually, on evidence rather than hope.",
    ],
  },

  useCases: {
    note: "Where it earns its keep.",
    title: "Where it earns its keep.",
    items: [
      { title: "Customer support", description: "Tier-one queries answered, the rest routed with history attached." },
      { title: "Lead response", description: "Enrichment, scoring and a first touch inside the first minute." },
      { title: "Document processing", description: "Invoices, POs and forms read, matched and posted." },
      { title: "Internal helpdesk", description: "HR and IT questions answered from your own policy documents." },
      { title: "Reporting", description: "Recurring report packs assembled and delivered on schedule." },
      { title: "Forecasting", description: "Demand and pipeline predictions from your own history." },
    ],
  },

  process: {
    note: "How we roll it out.",
    title: "How we roll it out.",
    steps: [
      { step: "01", title: "Find the repetitive work", description: "We look at volume and handling time to find the task where automation actually pays, rather than the one that demos well." },
      { step: "02", title: "Build with a threshold", description: "The agent is grounded in your content and ships with an explicit confidence cutoff and a human handoff path from day one." },
      { step: "03", title: "Measure and widen", description: "Run logs show where it was right, wrong or unsure. We widen scope on that evidence and tighten where it slipped." },
    ],
    technologies: ["Claude API", "Python", "Node.js", "n8n", "LangChain", "PostgreSQL", "pgvector", "Twilio & WhatsApp", "Docker"],
    deliverables: [
      "Workflow map with volume and time-saved estimates",
      "Deployed agents or automations with a confidence threshold",
      "Knowledge base grounded in your own content",
      "Human handoff path and escalation rules",
      "Run logging and a quality dashboard",
      "Integration documentation and source code handover",
    ],
  },

  caseStudy: {
    note: "Proof, not promises.",
    title: "Proof, not promises.",
    result: "72%",
    heading: "Tier-one support, handled",
    description:
      "A support desk was spending most of its day on the same dozen questions. An agent grounded in their existing help content now closes around 72% of incoming queries end to end, and escalates the rest with the account history already attached.",
    image: "/nexai.jpg",
  },

  faqs: {
    note: "Common questions, answered.",
    title: "Common questions.",
    items: [
      { question: "Will it make things up?", answer: "Answers are grounded in your own documents and records rather than generated from general knowledge, and anything below the confidence threshold is routed to a person instead of answered. Every run is logged so you can check." },
      { question: "Does our data get used to train a model?", answer: "No. We use the providers' API tiers, where your inputs are not used for training, and we can deploy models on your own infrastructure where policy requires it." },
      { question: "Can it work with the tools we already use?", answer: "Yes — CRM, helpdesk, accounting, WhatsApp, email and anything with an API. Where a tool has no API we look at scheduled imports instead." },
      { question: "What happens when it gets something wrong?", answer: "The correction is logged against the run. Those corrections are what we use to tighten the prompts, the grounding content and the threshold, so the same mistake does not repeat." },
      { question: "How quickly does something go live?", answer: "A first, narrowly-scoped automation is usually live in about four weeks. Widening it is deliberately gradual and driven by the run logs." },
    ],
  },

  cta: {
    title: "What are you doing twice?",
    description:
      "Tell us the task your team repeats most. We'll tell you honestly whether automating it is worth the money.",
    primaryText: "Map your workflow",
    primaryLink: "/contact-us",
    secondaryText: "View portfolio",
    secondaryLink: "/portfolio",
  },
};

const AiAutomationPage = ({ service }) => (
  <EditorialServicePage
    content={CONTENT}
    hero={<AutomationRun />}
    breadcrumb={service?.title?.trim() || "AI - Artificial Intelligence"}
  />
);

export default AiAutomationPage;
