"use client";

/**
 * Career posting detail.
 *
 * Same editorial shell as the careers listing and the bespoke service pages:
 * hairline rules, a sticky index rail per section, mono micro-labels.
 *
 * A role flagged `active: false` in careerData keeps its URL but renders a closed
 * state rather than reading as a live posting.
 */

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Briefcase, Clock, MapPin } from "lucide-react";
import { activeJobs, jobs } from "@/data/careerData";
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

/* Shared frame so the closed/not-found states match the posting's look. */
const Shell = ({ children }) => (
  <main
    className="bg-background font-[family-name:var(--im-body)] text-[var(--im-ink)] antialiased"
    style={THEME}
  >
    {children}
  </main>
);

const Notice = ({ title, body }) => (
  <Shell>
    <section className={`${PAD} py-20 md:py-32`}>
      <div className={`${INNER} max-w-[560px]`}>
        <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
          Careers
        </Mono>
        <h1 className="mt-5 font-[family-name:var(--im-display)] text-[32px] font-bold leading-[1.1] tracking-[-0.03em] md:text-[44px]">
          {title}
        </h1>
        <p className="mt-4 text-base leading-[1.7] text-[var(--im-muted)]">{body}</p>
        <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
          <Link href="/careers" className={`${PRIMARY_BTN} text-center`}>
            See open roles
          </Link>
          <Link
            href="mailto:careers@luminexa.in?subject=Open%20application"
            className={`${SECONDARY_BTN} text-center`}
          >
            Send an open application
          </Link>
        </div>
      </div>
    </section>
  </Shell>
);

const CareerDetails = () => {
  const { slug } = useParams();
  const job = jobs.find((j) => j.slug === slug);

  if (!job) {
    return (
      <Notice
        title="This role isn't available."
        body="The posting you were looking for has been taken down. Here's what we're hiring for right now."
      />
    );
  }

  if (!job.active) {
    return (
      <Notice
        title={`${job.title} is closed for now.`}
        body="We hire for this role as the team grows. If it's clearly you, send your work anyway — we keep good applications on file."
      />
    );
  }

  const mailHref = `mailto:${job.apply?.email || "careers@luminexa.in"}?subject=${encodeURIComponent(
    `Application — ${job.title}`,
  )}`;
  const applyHref = job.apply?.url || mailHref;
  const externalProps = job.apply?.url
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  const otherRoles = activeJobs.filter((j) => j.slug !== job.slug);

  const meta = [
    { icon: Briefcase, text: job.type },
    { icon: MapPin, text: job.location },
    { icon: Clock, text: `${job.experience} experience` },
  ];

  return (
    <Shell>
      {/* ── HERO ── */}
      <section
        className={`border-b border-[var(--im-line)] ${PAD} pb-12 pt-10 md:pb-16 md:pt-[72px]`}
      >
        <div className={`${INNER} grid items-start gap-8 md:grid-cols-2 md:gap-16`}>
          <div className="min-w-0">
            <nav aria-label="Breadcrumb">
              <Mono className="flex flex-wrap items-center gap-1.5 text-[11px] uppercase tracking-[0.11em] text-[var(--im-dim)] md:text-xs md:tracking-[0.12em]">
                <Link href="/careers" className="transition-colors hover:text-[var(--im-ink)]">
                  Careers
                </Link>
                <span className="text-[#C4C8C2]">/</span>
                <span className="text-[var(--im-deep)]">{job.title}</span>
              </Mono>
            </nav>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-[family-name:var(--im-display)] text-[38px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[48px] md:mt-7 md:text-[58px] md:leading-[1.0]"
            >
              {job.title}
            </motion.h1>

            <p className="mt-4 max-w-[520px] text-base leading-[1.6] text-[var(--im-muted)] md:mt-6 md:text-[18px] [text-wrap:pretty]">
              {job.shortDescription}
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row md:mt-8 md:gap-3">
              <a href={applyHref} {...externalProps} className={`${PRIMARY_BTN} text-center`}>
                Apply for this role
              </a>
              <Link href="/careers" className={`${SECONDARY_BTN} text-center`}>
                All open roles
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-2 md:mt-9">
              {meta.map(({ icon: Icon, text }) => (
                <Mono
                  key={text}
                  className="inline-flex items-center gap-1.5 rounded border border-[var(--im-line-strong)] px-2.5 py-1.5 text-[11px] text-[var(--im-muted)] md:text-xs"
                >
                  <Icon className="size-3.5 text-[var(--im-deep)]" />
                  {text}
                </Mono>
              ))}
            </div>
          </div>

          {/* role summary panel */}
          <motion.div
            className="min-w-0 md:sticky md:top-24"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="overflow-hidden rounded-[14px] border border-[var(--im-line-strong)] bg-[var(--im-panel)]">
              <div className="flex items-center justify-between gap-2 border-b border-[var(--im-line)] px-4 py-3">
                <Mono className="flex min-w-0 items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-[var(--im-dim)] sm:text-[11px]">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lumen lumen-pulse" />
                  <span className="truncate">Actively hiring</span>
                </Mono>
                <Mono className="shrink-0 text-[10px] uppercase tracking-[0.1em] text-[var(--im-dim)] sm:text-[11px]">
                  Role
                </Mono>
              </div>

              <dl className="px-4 py-1">
                {[
                  ["Type", job.type],
                  ["Location", job.location],
                  ["Experience", job.experience],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between gap-3 border-b border-[rgba(17,19,21,0.09)] py-3 last:border-b-0"
                  >
                    <Mono className="text-[10px] uppercase tracking-[0.08em] text-[var(--im-dim)]">
                      {k}
                    </Mono>
                    <dd className="min-w-0 truncate text-[15px] text-[var(--im-ink)]">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="border-t border-[var(--im-line)] p-4">
                <p className="text-sm leading-[1.6] text-[var(--im-muted)]">
                  Send a CV plus something you have actually built — a portfolio, a
                  repo or a reel. The work matters more than the format.
                </p>
                <a
                  href={applyHref}
                  {...externalProps}
                  className="mt-3.5 flex items-center justify-center gap-1.5 rounded-[5px] bg-lumen px-4 py-2.5 text-center text-[13px] font-semibold text-lumen-foreground transition-opacity hover:opacity-90"
                >
                  {job.apply?.url ? "Apply via form" : "Apply by email"}
                  <ArrowUpRight className="size-4" />
                </a>
                <a
                  href={mailHref}
                  className="mt-2 block truncate text-center font-[family-name:var(--im-mono)] text-[11px] text-[var(--im-deep)] underline underline-offset-4"
                >
                  {job.apply?.email || "careers@luminexa.in"}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ROLE SECTIONS ── */}
      {job.sections.map((section, i) => (
        <Section
          key={section.heading}
          id={`section-${i + 1}`}
          index={String(i + 1).padStart(2, "0")}
          label={section.heading}
          title={section.heading}
        >
          <Reveal>
            <div className="max-w-[760px]">
              <h2 className="hidden font-[family-name:var(--im-display)] text-[30px] font-bold leading-[1.2] tracking-[-0.02em] md:mb-5 md:block [text-wrap:pretty]">
                {section.heading}
              </h2>

              {section.body?.map((para, j) => (
                <p
                  key={j}
                  className="text-base leading-[1.7] text-[var(--im-muted)] md:text-[17px] [&+p]:mt-4"
                >
                  {para}
                </p>
              ))}

              {section.items ? (
                <ul className={section.body?.length ? "mt-6" : ""}>
                  {section.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex gap-3.5 border-b border-[rgba(17,19,21,0.09)] py-3.5 text-[15px] leading-[1.6] text-[#262A2E] last:border-b-0 md:py-4 md:text-base"
                    >
                      <Mono className="shrink-0 text-xs text-[var(--im-deep)]">
                        {String(j + 1).padStart(2, "0")}
                      </Mono>
                      <span className="min-w-0">
                        {typeof item === "string" ? (
                          item
                        ) : (
                          <>
                            <span className="font-semibold text-[var(--im-ink)]">
                              {item.label}
                            </span>{" "}
                            — {item.text}
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Reveal>
        </Section>
      ))}

      {/* ── HOW TO APPLY ── */}
      <Section
        id="apply"
        index={String(job.sections.length + 1).padStart(2, "0")}
        label="How to apply"
        note="What to send, and what happens next."
        title="How to apply."
      >
        <Reveal>
          <div className="max-w-[760px]">
            <p className="text-base leading-[1.7] text-[var(--im-muted)] md:text-[17px]">
              Send your CV, a portfolio or repo, and a short note on why this role in
              particular, to{" "}
              <a
                href={mailHref}
                className="text-[var(--im-deep)] underline underline-offset-4"
              >
                {job.apply?.email || "careers@luminexa.in"}
              </a>
              .
            </p>

            <div className="mt-7 grid gap-5 md:grid-cols-3 md:gap-7">
              {[
                { step: "01", title: "Send work", description: "A portfolio, repo or reel alongside the CV. For visualisation roles the reel matters most." },
                { step: "02", title: "A conversation", description: "Forty-five minutes with the people you would actually work with." },
                { step: "03", title: "A paid exercise", description: "A small, realistic task close to the job. We pay for your time and give feedback either way." },
              ].map((step, i) => (
                <div
                  key={step.step}
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
                  <h3 className="mt-2 font-[family-name:var(--im-display)] text-lg font-semibold text-[var(--im-ink)] md:mt-3">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-[1.6] text-[var(--im-muted)] md:mt-2.5 md:text-[15px]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <a
              href={applyHref}
              {...externalProps}
              className={`${PRIMARY_BTN} mt-8 inline-flex items-center gap-2`}
            >
              {job.apply?.url ? "Apply via form" : "Apply by email"}
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Reveal>
      </Section>

      {/* ── OTHER ROLES ── */}
      {otherRoles.length ? (
        <Section
          id="other-roles"
          index={String(job.sections.length + 2).padStart(2, "0")}
          label="Also open"
          note="The other seats on the team."
          title="Also open."
        >
          <div className="grid gap-4 md:gap-5">
            {otherRoles.map((other) => (
              <Link key={other.slug} href={`/careers/${other.slug}`} className="group block">
                <article className="rounded-xl border border-[var(--im-line-strong)] bg-[var(--im-panel)] p-5 transition-colors hover:border-[rgba(17,19,21,0.28)] md:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Mono className="text-[10px] uppercase tracking-[0.08em] text-[var(--im-deep)] md:text-[11px]">
                        {other.type} · {other.location}
                      </Mono>
                      <h3 className="mt-2 font-[family-name:var(--im-display)] text-[22px] font-semibold leading-tight text-[var(--im-ink)] md:text-[26px]">
                        {other.title}
                      </h3>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(17,19,21,0.16)] bg-background transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="size-4 text-[var(--im-ink)]" />
                    </span>
                  </div>
                  <p className="mt-3 max-w-[680px] text-[15px] leading-[1.7] text-[var(--im-muted)]">
                    {other.shortDescription}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

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
            <a href={applyHref} {...externalProps} className={`${PRIMARY_BTN} text-center`}>
              Apply for this role
            </a>
            <Link href="/careers" className={`${SECONDARY_BTN} text-center`}>
              <span className="inline-flex items-center gap-1.5">
                <ArrowLeft className="size-4" />
                All roles
              </span>
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
};

export default CareerDetails;
