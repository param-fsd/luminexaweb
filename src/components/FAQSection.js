"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { HelpCircle, Sparkles, ShieldCheck, Zap } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const FAQSection = () => {
  const faqs = [
    {
      question: "How many days will it take to build the complete solution?",
      answer:
        "Basic services or solutions typically take around 3 to 4 working days. For complex solutions, it may take anywhere from 15 days to 1 month depending on the requirements.",
    },
    {
      question:
        "Are all your products and services based on a subscription model or one-time payment?",
      answer:
        "Not all. Some services are offered as one-time payments, while others may follow a subscription model depending on the nature of the service.",
    },
    {
      question: "How secure is my data?",
      answer:
        "We take data security very seriously. All data is encrypted in transit and at rest, and we follow industry-standard practices to ensure your information is safe.",
    },
    {
      question: "Do prices vary?",
      answer:
        "Yes, our pricing may vary on a monthly basis depending on market conditions, usage requirements, and custom solutions.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "Support depends on the plan you choose. We offer email support for all users, priority support for premium plans, and 24/7 support for enterprise clients.",
    },
    {
      question: "Do you offer packages for buying multiple services or products?",
      answer:
        "Yes, we do offer bundled pricing or custom packages when you're purchasing multiple services or products. Contact us for a tailored quote.",
    },
  ];

  const quickChips = [
    { icon: Zap, label: "Fast Delivery" },
    { icon: ShieldCheck, label: "Secure by Design" },
    { icon: Sparkles, label: "Modern UI/UX" },
  ];

  return (
    <section id="faq" className="relative w-full py-20 md:py-28 bg-muted/30 overflow-hidden">
      {/* GLOBAL TOKEN BACKGROUND (same vibe like your other sections) */}
      <div className="absolute inset-0 -z-10 bg-background" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.12) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-muted/40 blur-3xl -z-10" />
      <div className="absolute -bottom-28 -right-24 h-[520px] w-[520px] rounded-full bg-muted/40 blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header (flex-start like main product) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center h-6 min-w-6 px-1.5 rounded-md bg-lumen text-lumen-foreground text-[11px] font-bold tracking-wide">07</span>
            <Badge variant="secondary" className="rounded-full px-4 py-1">
              FAQ
            </Badge>

            <span className="hidden sm:inline-flex items-center gap-2 text-[11px] text-muted-foreground">
              <HelpCircle className="size-4 text-muted-foreground" />
              Quick answers • Clear process
            </span>
          </div>

          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-display, 'Montserrat', sans-serif)", letterSpacing: "-0.035em" }}>
            Frequently Asked <span className="lumen-mark">Questions</span>
          </h2>

          <p className="mt-3 text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed">
            Everything you need to know about timelines, pricing, security, and support.
          </p>

          {/* Small chips row */}
          <div className="mt-5 flex flex-wrap gap-2">
            {quickChips.map((c) => {
              const Icon = c.icon;
              return (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur px-3 py-1 text-[11px] text-muted-foreground"
                >
                  <Icon className="size-4 text-foreground" />
                  {c.label}
                </span>
              );
            })}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* LEFT: Accordion */}
          <motion.div variants={item} className="lg:col-span-8">
            <div className="rounded-2xl border border-border bg-background/70 backdrop-blur overflow-hidden">
              {/* subtle top bar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/20">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                  <span className="ml-2 text-[11px] text-muted-foreground">
                    Knowledge Base
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground">
                  {faqs.length} questions
                </span>
              </div>

              <div className="p-2 sm:p-3">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, i) => (
                    <motion.div
                      key={i}
                      variants={item}
                      className="rounded-xl hover:bg-muted/20 transition-colors"
                    >
                      <AccordionItem
                        value={`item-${i}`}
                        className="border-b border-border last:border-b-0 px-3 sm:px-4"
                      >
                        <AccordionTrigger
                          className="text-left py-4 hover:no-underline"
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 h-8 w-8 rounded-xl border border-border bg-foreground flex items-center justify-center shrink-0">
                              <HelpCircle className="size-4 text-lumen" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-[13px] sm:text-[14px] font-semibold text-foreground leading-snug">
                                {faq.question}
                              </div>
                              <div className="mt-1 text-[11px] text-muted-foreground">
                                Tap to view answer
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="pb-4">
                          <div className="pl-11 pr-2 text-[12px] sm:text-[13px] text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Modern info panel */}
          <motion.div variants={item} className="lg:col-span-4">
            <div className="rounded-2xl border border-border bg-background/70 backdrop-blur overflow-hidden">
              <div className="px-5 py-4 border-b border-border bg-muted/20">
                <div className="text-[12px] font-semibold text-foreground">
                  Need help choosing?
                </div>
                <div className="mt-1 text-[12px] text-muted-foreground">
                  Share your requirement and we’ll recommend the best approach.
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="rounded-2xl border border-border bg-muted/20 p-4">
                  <div className="text-[12px] font-semibold text-foreground">
                    Typical timelines
                  </div>
                  <p className="mt-1 text-[12px] text-muted-foreground leading-relaxed">
                    MVP: 3–7 days • Advanced: 2–4 weeks • Full systems: 1–2 months
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-muted/20 p-4">
                  <div className="text-[12px] font-semibold text-foreground">
                    Pricing structure
                  </div>
                  <p className="mt-1 text-[12px] text-muted-foreground leading-relaxed">
                    One-time + subscription options available depending on service type and support level.
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-muted/20 p-4">
                  <div className="text-[12px] font-semibold text-foreground">
                    Security
                  </div>
                  <p className="mt-1 text-[12px] text-muted-foreground leading-relaxed">
                    Encryption in transit & at rest, plus best-practice access controls.
                  </p>
                </div>
              </div>
            </div>

            {/* small footer note */}
            <div className="mt-4 text-[11px] text-muted-foreground">
              Tip: Keep questions short, we reply faster.
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
