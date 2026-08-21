"use client";

/**
 * Careers listing.
 *
 * Uses the same editorial shell as the bespoke service pages so the site reads as
 * one system.
 *
 * Every role in careerData appears here. The ones flagged `active` get full-width
 * cards linking to their posting; the rest are listed underneath, marked closed and
 * deliberately not linked (their detail pages render a closed state).
 */

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, Clock, MapPin } from "lucide-react";
import { activeJobs, benefits, jobs } from "@/data/careerData";
import {
  INNER,
  Mono,
  PAD,
  PRIMARY_BTN,
  Reveal,
  SECONDARY_BTN,
  Section,
  THEME,
} from "@/components/services/editorial/shell";

const CareersPage = () => {
  const count = activeJobs.length;
  /* Every role stays visible; the closed ones are listed but not linked. */
  const closedJobs = jobs.filter((job) => !job.active);

  return (
    <main
      className="bg-background font-[family-name:var(--im-body)] text-[var(--im-ink)] antialiased"
      style={THEME}
    >
      {/* ── HERO ── */}
      <section
        className={`border-b border-[var(--im-line)] ${PAD} pb-12 pt-10 md:pb-16 md:pt-[72px]`}
      >
        <div className={`${INNER} grid items-end gap-8 md:grid-cols-2 md:gap-16`}>
          <div className="min-w-0">
            <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
              Careers
            </Mono>

            <h1 className="mt-5 font-[family-name:var(--im-display)] text-[44px] font-bold leading-[1.0] tracking-[-0.03em] sm:text-[58px] md:mt-7 md:text-[68px] md:leading-[0.98] lg:text-[76px]">
              {["Build the future", "with Luminexa."].map((line, i) => (
                <motion.span
                  key={line}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + i * 0.1,
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="block"
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <p className="mt-4 max-w-[480px] text-base leading-[1.6] text-[var(--im-muted)] md:mt-6 md:text-[19px] [text-wrap:pretty]">
              Join a team of innovators, developers, designers, and creators working together to build intelligent technology, immersive digital experiences, and next-generation solutions that make a real-world impact
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row md:mt-9 md:gap-3">
              <Link href="#openings" className={`${PRIMARY_BTN} text-center`}>
                {count === 1 ? "See the open role" : `See the ${count} open roles`}
              </Link>
              <Link href="/about-us" className={`${SECONDARY_BTN} text-center`}>
                About Luminexa
              </Link>
            </div>
          </div>

          {/* openings summary panel */}
          <motion.div
            className="min-w-0"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="overflow-hidden rounded-[14px] border border-[var(--im-line-strong)] bg-[var(--im-panel)]">
              <div className="flex items-center justify-between gap-2 border-b border-[var(--im-line)] px-4 py-3">
                <Mono className="flex min-w-0 items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-[var(--im-dim)] sm:text-[11px]">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lumen lumen-pulse" />
                  <span className="truncate">Now hiring</span>
                </Mono>
                <Mono className="shrink-0 text-[10px] uppercase tracking-[0.1em] text-[var(--im-dim)] sm:text-[11px]">
                  {count} open
                </Mono>
              </div>

              {activeJobs.map((job) => (
                <Link
                  key={job.slug}
                  href={`/careers/${job.slug}`}
                  className="group flex items-center gap-3 border-b border-[var(--im-line)] px-4 py-3.5 transition-colors last:border-b-0 hover:bg-[rgba(17,19,21,0.03)]"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-[family-name:var(--im-display)] text-[15px] font-semibold text-[var(--im-ink)]">
                      {job.title}
                    </span>
                    <Mono className="mt-1 block truncate text-[10px] uppercase tracking-[0.08em] text-[var(--im-dim)]">
                      {job.type} · {job.location} · {job.experience}
                    </Mono>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-[var(--im-deep)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ))}

              <div className="p-4">
                <p className="text-sm leading-[1.6] text-[var(--im-muted)]">
                  Not seeing your role? We still read every open application that
                  comes with work attached.
                </p>
                <Link
                  href="mailto:careers@luminexa.in?subject=Open%20application"
                  className="mt-3.5 block rounded-[5px] border border-[rgba(17,19,21,0.22)] px-4 py-2.5 text-center text-[13px] text-[var(--im-ink)] transition-colors hover:bg-[rgba(17,19,21,0.04)]"
                >
                  Send an open application
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 01 OPENINGS ── */}
      <Section
        id="openings"
        index="01"
        label="Open roles"
        note={`${count} open now. The rest are roles we hire for when we grow.`}
        title="Open roles."
      >
        {count ? (
          <div className="grid gap-4 md:gap-5">
            {activeJobs.map((job, i) => (
              <Reveal key={job.slug} delay={i * 0.08}>
                <Link href={`/careers/${job.slug}`} className="group block">
                  <article className="overflow-hidden rounded-xl border border-[var(--im-line-strong)] bg-[var(--im-panel)] p-5 transition-colors hover:border-[rgba(17,19,21,0.28)] md:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Mono className="text-[10px] uppercase tracking-[0.08em] text-[var(--im-deep)] md:text-[11px]">
                          Role {String(i + 1).padStart(2, "0")}
                        </Mono>
                        <h3 className="mt-2 font-[family-name:var(--im-display)] text-[22px] font-semibold leading-tight text-[var(--im-ink)] md:mt-2.5 md:text-[26px]">
                          {job.title}
                        </h3>
                      </div>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(17,19,21,0.16)] bg-background transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRight className="size-4 text-[var(--im-ink)]" />
                      </span>
                    </div>

                    <p className="mt-3 max-w-[680px] text-[15px] leading-[1.7] text-[var(--im-muted)]">
                      {job.shortDescription}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {[
                        { icon: Briefcase, text: job.type },
                        { icon: MapPin, text: job.location },
                        { icon: Clock, text: `${job.experience} experience` },
                      ].map(({ icon: Icon, text }) => (
                        <Mono
                          key={text}
                          className="inline-flex items-center gap-1.5 rounded border border-[var(--im-line-strong)] px-2.5 py-1.5 text-[11px] text-[var(--im-muted)]"
                        >
                          <Icon className="size-3.5 text-[var(--im-deep)]" />
                          {text}
                        </Mono>
                      ))}
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-base leading-[1.7] text-[var(--im-muted)]">
            No roles are open right now. Open applications are still welcome at{" "}
            <a
              href="mailto:careers@luminexa.in"
              className="text-[var(--im-deep)] underline underline-offset-4"
            >
              careers@luminexa.in
            </a>
            .
          </p>
        )}

        {closedJobs.length ? (
          <div className="mt-10 border-t border-[var(--im-line-strong)] pt-6 md:mt-14 md:pt-8">
            <Mono className="text-[11px] uppercase tracking-[0.1em] text-[var(--im-dim)]">
              Not open right now
            </Mono>
            <p className="mt-2.5 max-w-[680px] text-sm leading-[1.7] text-[var(--im-muted)]">
              These are roles we hire for as the team grows. If one of them is
              clearly you, send your work anyway — we keep good applications on file.
            </p>

            <div className="mt-4">
              {closedJobs.map((job) => (
                <div
                  key={job.slug}
                  className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-b border-[rgba(17,19,21,0.09)] py-3.5 last:border-b-0"
                >
                  <span className="min-w-0 flex-1 text-[15px] text-[var(--im-muted)]">
                    {job.title}
                  </span>
                  <Mono className="shrink-0 text-[11px] text-[var(--im-dim)]">
                    {job.type} · {job.experience}
                  </Mono>
                  <Mono className="shrink-0 rounded border border-[var(--im-line-strong)] px-2 py-1 text-[10px] uppercase tracking-[0.08em] text-[var(--im-dim)]">
                    Closed
                  </Mono>
                </div>
              ))}
            </div>

            <Link
              href="mailto:careers@luminexa.in?subject=Open%20application"
              className="mt-5 inline-block rounded-[5px] border border-[rgba(17,19,21,0.22)] px-5 py-2.5 text-[13px] text-[var(--im-ink)] transition-colors hover:bg-[rgba(17,19,21,0.04)]"
            >
              Send an open application
            </Link>
          </div>
        ) : null}
      </Section>

      {/* ── 02 WHY JOIN ── */}
      <Section
        id="why"
        index="02"
        label="Why join"
        note="What the job is actually like."
        title="What the job is actually like."
      >
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[rgba(17,19,21,0.11)] bg-[rgba(17,19,21,0.11)] md:grid-cols-4">
          {benefits.map((benefit, i) => (
            <div key={benefit.title} className="min-w-0 bg-background p-4 md:p-6">
              <Mono className="text-[10px] text-[var(--im-deep)] md:text-[11px]">
                {String(i + 1).padStart(2, "0")}
              </Mono>
              <h3 className="mt-2.5 font-[family-name:var(--im-display)] text-[15px] font-semibold leading-snug text-[var(--im-ink)] md:mt-3.5 md:text-lg">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-[1.6] text-[#6A7076]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 03 HOW HIRING WORKS ── */}
      <Section
        id="process"
        index="03"
        label="Hiring"
        note="Three steps, roughly two weeks."
        title="How hiring works."
      >
        <div className="grid gap-5 md:grid-cols-3 md:gap-7">
          {[
            {
              step: "01",
              title: "Send work, not just a CV",
              description:
                "A portfolio, a repo, a reel — whatever shows how you actually think. For visualisation roles the reel matters more than the résumé.",
            },
            {
              step: "02",
              title: "A conversation",
              description:
                "Forty-five minutes on what you have built and what you want to build next. You will talk to the people you would work with.",
            },
            {
              step: "03",
              title: "A paid exercise",
              description:
                "A small, realistic task close to the actual job. We pay for your time on it, and we give you feedback either way.",
            },
          ].map((step, i) => (
            <Reveal key={step.step} delay={i * 0.08}>
              <div
                className="pt-3.5 md:pt-5"
                style={{
                  borderTop: `2px solid ${i === 0 ? "var(--lumen)" : "rgba(17,19,21,0.18)"}`,
                }}
              >
                <Mono
                  className={`text-[10px] md:text-[11px] ${
                    i === 0 ? "text-[var(--im-deep)]" : "text-[var(--im-dim)]"
                  }`}
                >
                  Step {step.step}
                </Mono>
                <h3 className="mt-2 font-[family-name:var(--im-display)] text-lg font-semibold text-[var(--im-ink)] md:mt-3 md:text-xl">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-[1.6] text-[var(--im-muted)] md:mt-2.5 md:text-[15px]">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── CLOSING CTA ── */}
      <section className={`border-b border-[var(--im-line)] ${PAD} py-12 md:py-[104px]`}>
        <div
          className={`${INNER} flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12`}
        >
          <div className="min-w-0">
            <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
              Think you fit
            </Mono>
            <h2 className="mt-3.5 font-[family-name:var(--im-display)] text-[36px] font-bold leading-[1.05] tracking-[-0.03em] md:mt-5 md:text-[58px] md:leading-[1.02]">
              Show us the work.
            </h2>
            <p className="mt-3.5 text-base text-[var(--im-muted)] md:mt-4 md:text-lg">
              A link to something you have built tells us more than three pages of
              bullet points ever will.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row md:shrink-0 md:gap-3">
            <Link
              href="mailto:careers@luminexa.in?subject=Open%20application"
              className={`${PRIMARY_BTN} text-center`}
            >
              Email careers@luminexa.in
            </Link>
            <Link href="/contact-us" className={`${SECONDARY_BTN} text-center`}>
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CareersPage;
