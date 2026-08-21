"use client";

/**
 * Homepage FAQ.
 *
 * Rebuilt to sit on the site's shared system rather than its own:
 *
 *  - The heading comes from <SectionHeader>, so its face, weight and size track
 *    every other homepage section instead of being a one-off `text-2xl`.
 *  - Container is `max-w-7xl px-4 md:px-8`, matching the rest of the site.
 *  - Question and answer type were 13px/12px, far smaller than any other body copy
 *    on the page; they now sit at the site's normal reading sizes.
 *
 * Structure is simpler too: the old version wrapped the list in fake browser
 * chrome ("Knowledge Base", traffic-light dots), repeated "Tap to view answer" on
 * every row, and carried a sidebar of three cards whose content just restated the
 * answers about timelines, pricing and security. That sidebar is now a single
 * sticky panel that does something the list cannot — route people to a human.
 */

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import SectionHeader from "./motion/SectionHeader";

const FAQS = [
  {
    question: "How long does it take to build the complete solution?",
    answer:
      "Basic services or solutions typically take around 3 to 4 working days. For complex solutions, expect anywhere from 15 days to a month depending on scope, integrations and how many people need to sign off.",
  },
  {
    question: "Is everything subscription-based, or one-time?",
    answer:
      "Both, depending on the service. Custom builds are usually a one-time project fee with an optional support retainer. Hosted or continuously-running products work better as a subscription. We will tell you which applies before you commit.",
  },
  {
    question: "How secure is my data?",
    answer:
      "Data is encrypted in transit and at rest, held in access-controlled infrastructure, and reachable only by the people who need it. Enquiry details you submit are covered by our Privacy Policy, and you can ask us to delete them at any time.",
  },
  {
    question: "Do prices vary?",
    answer:
      "Pricing depends on scope, integrations and support level, and can shift with market and infrastructure costs. You get a fixed number in writing before work starts — we do not change it mid-project without agreeing it with you first.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "Email support on every engagement, priority response on retainer, and agreed response times for enterprise clients. Support scope is written into the proposal so there are no surprises after launch.",
  },
  {
    question: "Do you offer packages for multiple services?",
    answer:
      "Yes. Bundled pricing is usually cheaper than commissioning each piece separately, particularly where the work shares a data model — mapping plus CRM, for example. Tell us the full picture and we will quote it as one.",
  },
];

const FAQSection = () => (
  <section id="faq" className="relative w-full overflow-hidden py-20 md:py-28">
    {/* background, consistent with the other homepage sections */}
    <div className="absolute inset-0 -z-10 bg-background" />
    <div
      className="absolute inset-0 -z-10 opacity-[0.05]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.12) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }}
    />
    <div className="absolute -top-24 -left-24 -z-10 h-[420px] w-[420px] rounded-full bg-muted/40 blur-3xl" />
    <div className="absolute -bottom-28 -right-24 -z-10 h-[520px] w-[520px] rounded-full bg-muted/40 blur-3xl" />

    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <SectionHeader
        index="07"
        label="FAQ"
        title="Frequently asked questions"
        description="Timelines, pricing, security and support — answered plainly."
        className="max-w-3xl"
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px] lg:gap-12">
        {/* ── questions ── */}
        <div className="min-w-0 border-t border-border">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${i}`}
                className="border-b border-border"
              >
                <AccordionTrigger className="gap-6 py-5 text-left hover:no-underline md:py-6">
                  <span className="flex min-w-0 items-baseline gap-4">
                    <span className="w-6 shrink-0 font-[family-name:var(--font-geist-mono)] text-[11px] text-muted-foreground md:w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 text-[16px] font-semibold leading-snug text-foreground md:text-[18px]">
                      {faq.question}
                    </span>
                  </span>
                </AccordionTrigger>

                <AccordionContent className="pb-5 md:pb-6">
                  <p className="max-w-[680px] pl-10 text-[14px] leading-[1.7] text-muted-foreground md:pl-12 md:text-[15px]">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* ── ask a human ── */}
        <motion.aside
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="min-w-0 lg:sticky lg:top-24 lg:self-start"
        >
          <div className="rounded-2xl border border-border bg-muted/20 p-6">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-lumen">
              <MessageSquare className="size-5 text-lumen-foreground" />
            </span>

            <h3
              className="mt-4 text-[20px] font-bold leading-tight text-foreground"
              style={{
                fontFamily: "var(--font-display, 'Montserrat', sans-serif)",
                letterSpacing: "-0.03em",
              }}
            >
              Still deciding?
            </h3>

            <p className="mt-2.5 text-[14px] leading-[1.7] text-muted-foreground">
              Describe what you are trying to build and we will tell you the
              approach we would take, the rough timeline, and whether we are
              genuinely the right people for it.
            </p>

            <Link
              href="/contact-us"
              className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-lumen px-5 py-3 text-[14px] font-semibold text-lumen-foreground transition-opacity hover:opacity-90"
            >
              Ask us directly
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="/services"
              className="mt-2.5 inline-flex w-full items-center justify-center rounded-md border border-border px-5 py-3 text-[14px] font-medium text-foreground transition-colors hover:bg-muted/40"
            >
              Browse services
            </Link>
          </div>
        </motion.aside>
      </div>
    </div>
  </section>
);

export default FAQSection;
