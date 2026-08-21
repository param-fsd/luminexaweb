"use client";

/**
 * Case studies listing, in the editorial system.
 *
 * There is only one study today, so the layout leads with a full feature block and
 * degrades gracefully: the numbered index below only renders once there is a second
 * study, and the honest "more coming" note takes its place until then.
 */

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import caseStudies from "@/data/caseStudyData";
import {
  INNER,
  Mono,
  PAD,
  PRIMARY_BTN,
  SECONDARY_BTN,
  THEME,
} from "@/components/services/editorial/shell";

const toTime = (d) => {
  const t = new Date(d).getTime();
  return Number.isNaN(t) ? 0 : t;
};

const CaseStudiesPage = () => {
  const sorted = useMemo(
    () => [...caseStudies].sort((a, b) => toTime(b.date) - toTime(a.date)),
    [],
  );

  const [featured, ...rest] = sorted;

  /* Every service touched across all studies — a quick read of what we actually do. */
  const allServices = useMemo(
    () => Array.from(new Set(sorted.flatMap((s) => s.services || []))),
    [sorted],
  );

  return (
    <main
      className="bg-background font-[family-name:var(--im-body)] text-[var(--im-ink)] antialiased"
      style={THEME}
    >
      {/* ── HERO ── */}
      <section
        className={`border-b border-[var(--im-line)] ${PAD} pb-10 pt-10 md:pb-12 md:pt-[72px]`}
      >
        <div className={INNER}>
          <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
            Case studies
          </Mono>

          <h1 className="mt-5 max-w-[900px] font-[family-name:var(--im-display)] text-[44px] font-bold leading-[1.0] tracking-[-0.03em] sm:text-[58px] md:mt-7 md:text-[68px] md:leading-[0.98]">
            {["The problem,", "and the fix."].map((line, i) => (
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

          <p className="mt-4 max-w-[560px] text-base leading-[1.6] text-[var(--im-muted)] md:mt-6 md:text-[19px] [text-wrap:pretty]">
            Real projects, written up honestly — what was actually going wrong, what we
            built, and what changed afterwards.
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row md:mt-9 md:gap-3">
            <Link href="/contact-us" className={`${PRIMARY_BTN} text-center`}>
              Discuss your project
            </Link>
            <Link href="/services" className={`${SECONDARY_BTN} text-center`}>
              See services
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED ── */}
      {featured ? (
        <section className={`border-b border-[var(--im-line)] ${PAD} py-10 md:py-14`}>
          <div className={INNER}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
                Latest
              </Mono>
              <Mono className="text-[11px] text-[var(--im-dim)]">
                {sorted.length} {sorted.length === 1 ? "study" : "studies"}
              </Mono>
            </div>

            <Link href={`/case-studies/${featured.slug}`} className="group mt-5 block">
              <article className="grid overflow-hidden rounded-xl border border-[var(--im-line-strong)] bg-[var(--im-panel)] transition-colors hover:border-[rgba(17,19,21,0.28)] lg:grid-cols-[1.15fr_1fr]">
                <div className="relative h-[220px] overflow-hidden border-b border-[var(--im-line)] lg:h-full lg:min-h-[360px] lg:border-b-0 lg:border-r">
                  <Image
                    src={featured.coverImage || "/placeholder.jpg"}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex min-w-0 flex-col justify-center p-6 md:p-9">
                  <Mono className="text-[10px] uppercase tracking-[0.08em] text-[var(--im-deep)] md:text-[11px]">
                    {featured.client || featured.category}
                  </Mono>

                  <h2 className="mt-3 font-[family-name:var(--im-display)] text-[26px] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--im-ink)] md:mt-4 md:text-[36px]">
                    {featured.title}
                  </h2>

                  <p className="mt-3 max-w-[520px] text-[15px] leading-[1.7] text-[var(--im-muted)] md:mt-4 md:text-base">
                    {featured.shortDescription}
                  </p>

                  {featured.services?.length ? (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {featured.services.map((s) => (
                        <Mono
                          key={s}
                          className="rounded border border-[var(--im-line-strong)] px-2 py-1 text-[10px] text-[var(--im-muted)]"
                        >
                          {s}
                        </Mono>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-5 flex flex-wrap items-center gap-3 md:mt-6">
                    {featured.date ? (
                      <Mono className="inline-flex items-center gap-1.5 text-[11px] text-[var(--im-dim)]">
                        <Calendar className="size-3.5 text-[var(--im-deep)]" />
                        {featured.date}
                      </Mono>
                    ) : null}
                    {featured.location ? (
                      <Mono className="inline-flex items-center gap-1.5 text-[11px] text-[var(--im-dim)]">
                        <MapPin className="size-3.5 text-[var(--im-deep)]" />
                        {featured.location}
                      </Mono>
                    ) : null}
                    <Mono className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] text-[var(--im-deep)]">
                      Read it
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Mono>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      ) : null}

      {/* ── INDEX (only once there is more than one) ── */}
      {rest.length ? (
        <section className={`border-b border-[var(--im-line)] ${PAD} py-10 md:py-[72px]`}>
          <div className={INNER}>
            <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
              All case studies
            </Mono>

            <div className="mt-6 border-t border-[var(--im-line-strong)]">
              {rest.map((study, i) => (
                <Link
                  key={study.slug}
                  href={`/case-studies/${study.slug}`}
                  className="group block border-b border-[var(--im-line-strong)]"
                >
                  <div className="flex items-start gap-4 py-5 md:gap-7 md:py-6">
                    <Mono className="w-7 shrink-0 pt-1 text-[11px] text-[var(--im-dim)] md:w-10 md:text-xs">
                      {String(i + 2).padStart(2, "0")}
                    </Mono>

                    <div className="min-w-0 flex-1">
                      <Mono className="text-[10px] uppercase tracking-[0.08em] text-[var(--im-deep)] md:text-[11px]">
                        {study.client || study.category}
                        {study.location ? ` · ${study.location}` : ""}
                      </Mono>
                      <h3 className="mt-1.5 font-[family-name:var(--im-display)] text-[20px] font-bold leading-[1.2] tracking-[-0.02em] text-[var(--im-ink)] sm:text-[24px] md:text-[28px]">
                        {study.title}
                      </h3>
                      <p className="mt-2 max-w-[620px] text-sm leading-[1.6] text-[var(--im-muted)] md:text-[15px]">
                        {study.shortDescription}
                      </p>
                    </div>

                    <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-lg border border-[var(--im-line-strong)] sm:h-[84px] sm:w-[112px]">
                      <Image
                        src={study.coverImage || "/placeholder.jpg"}
                        alt=""
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className={`border-b border-[var(--im-line)] ${PAD} py-10 md:py-[72px]`}>
          <div className={INNER}>
            <div className="grid gap-8 md:grid-cols-[210px_1fr] md:gap-14">
              <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
                More coming
              </Mono>
              <div className="min-w-0 max-w-[680px]">
                <p className="text-base leading-[1.7] text-[var(--im-muted)] md:text-[17px]">
                  We write these up as clients approve them, so the list grows slowly
                  and on purpose. If you want to talk to someone we have actually built
                  for, ask — we will put you in touch rather than paraphrase them here.
                </p>

                {allServices.length ? (
                  <div className="mt-7">
                    <Mono className="text-[11px] uppercase tracking-[0.1em] text-[var(--im-dim)]">
                      Work covered so far
                    </Mono>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {allServices.map((s) => (
                        <Mono
                          key={s}
                          className="rounded border border-[var(--im-line-strong)] px-2.5 py-1.5 text-[11px] text-[var(--im-muted)]"
                        >
                          {s}
                        </Mono>
                      ))}
                    </div>
                  </div>
                ) : null}

                <Link
                  href="/contact-us"
                  className={`${SECONDARY_BTN} mt-7 inline-flex items-center gap-2`}
                >
                  Ask for a reference
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CLOSING CTA ── */}
      <section className={`border-b border-[var(--im-line)] ${PAD} py-12 md:py-[104px]`}>
        <div
          className={`${INNER} flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12`}
        >
          <div className="min-w-0">
            <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
              Recognise the problem
            </Mono>
            <h2 className="mt-3.5 font-[family-name:var(--im-display)] text-[36px] font-bold leading-[1.05] tracking-[-0.03em] md:mt-5 md:text-[58px] md:leading-[1.02]">
              Let&rsquo;s fix yours.
            </h2>
            <p className="mt-3.5 text-base text-[var(--im-muted)] md:mt-4 md:text-lg">
              Describe what is slowing your sales or operations down and we&rsquo;ll
              come back with scope, timeline and a number.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row md:shrink-0 md:gap-3">
            <Link href="/contact-us" className={`${PRIMARY_BTN} text-center`}>
              Book a consultation
            </Link>
            <Link href="/services" className={`${SECONDARY_BTN} text-center`}>
              See services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CaseStudiesPage;
