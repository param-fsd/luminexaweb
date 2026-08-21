"use client";

/**
 * Renders a bespoke service page from a content object plus an optional hero
 * widget. Omit `hero` and the hero copy runs full width.
 *
 * Every section is optional — omit a key from `content` and the section is skipped,
 * with the remaining sections renumbered automatically.
 *
 * Content shape:
 *   headline: string[]            hero lines, animated in
 *   subcopy, tags[], stats[{value,label}]
 *   overview: { title, note, html }
 *   modules:  { label, note, title, items[{title,description,image,subSlug?}], hrefBase? }
 *   benefits: { note, title, items[] }
 *   useCases: { note, title, items[{title,description}] }
 *   process:  { note, title, steps[{step,title,description}], technologies[], deliverables[] }
 *   caseStudy:{ note, title, result, heading, description, image }
 *   faqs:     { note, title, items[{question,answer}] }
 *   cta:      { title, description, primaryText, primaryLink, secondaryText, secondaryLink }
 */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Faqs,
  INNER,
  Mono,
  PAD,
  PRIMARY_BTN,
  Reveal,
  SECONDARY_BTN,
  Section,
  THEME,
} from "./shell";

const EditorialServicePage = ({ content, hero, breadcrumb }) => {
  const {
    headline = [],
    subcopy,
    tags = [],
    stats = [],
    overview,
    modules,
    benefits,
    useCases,
    process,
    caseStudy,
    faqs,
    cta = {},
  } = content;

  /* Section numbers follow whatever is actually present. */
  let n = 0;
  const idx = () => String(++n).padStart(2, "0");

  return (
    <main
      className="bg-background font-[family-name:var(--im-body)] text-[var(--im-ink)] antialiased"
      style={THEME}
    >
      {/* ── HERO ── */}
      <section
        className={`border-b border-[var(--im-line)] ${PAD} pb-12 pt-10 md:pb-16 md:pt-[72px]`}
      >
        <div
          className={`${INNER} grid items-center gap-8 md:gap-16 ${
            hero ? "md:grid-cols-2" : ""
          }`}
        >
          <div className={hero ? "min-w-0" : "min-w-0 max-w-[900px]"}>
            <nav aria-label="Breadcrumb">
              <Mono className="flex flex-wrap items-center gap-1.5 text-[11px] uppercase tracking-[0.11em] text-[var(--im-dim)] md:text-xs md:tracking-[0.12em]">
                <Link href="/services" className="transition-colors hover:text-[var(--im-ink)]">
                  Services
                </Link>
                <span className="text-[#C4C8C2]">/</span>
                <span className="text-[var(--im-deep)]">{breadcrumb}</span>
              </Mono>
            </nav>

            <h1 className="mt-5 font-[family-name:var(--im-display)] text-[44px] font-bold leading-[1.0] tracking-[-0.03em] sm:text-[58px] md:mt-7 md:text-[68px] md:leading-[0.98] lg:text-[76px]">
              {headline.map((line, i) => (
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

            {subcopy ? (
              <p className="mt-4 max-w-[480px] text-base leading-[1.6] text-[var(--im-muted)] md:mt-6 md:text-[19px] [text-wrap:pretty]">
                {subcopy}
              </p>
            ) : null}

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row md:mt-9 md:gap-3">
              <Link href={cta.primaryLink || "/contact-us"} className={`${PRIMARY_BTN} text-center`}>
                {cta.primaryText || "Book a consultation"}
              </Link>
              <Link
                href={cta.secondaryLink || "/portfolio"}
                className={`${SECONDARY_BTN} text-center`}
              >
                {cta.secondaryText || "View portfolio"}
              </Link>
            </div>

            {tags.length ? (
              <div className="no-scrollbar mt-7 flex gap-2 overflow-x-auto md:mt-10 md:flex-wrap md:overflow-visible">
                {tags.map((tag) => (
                  <Mono
                    key={tag}
                    className="shrink-0 whitespace-nowrap rounded border border-[var(--im-line-strong)] px-2.5 py-1.5 text-[11px] text-[var(--im-muted)] md:text-xs"
                  >
                    {tag}
                  </Mono>
                ))}
              </div>
            ) : null}
          </div>

          {hero ? (
            <motion.div
              className="min-w-0"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              {hero}
            </motion.div>
          ) : null}
        </div>
      </section>

      {/* ── STATS ── */}
      {stats.length ? (
        <div className={`border-b border-[var(--im-line)] ${PAD}`}>
          <div className={`${INNER} grid grid-cols-3`}>
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`min-w-0 py-6 md:py-10 ${
                  i > 0 ? "border-l border-[var(--im-line)] pl-4 sm:pl-8 md:pl-12" : ""
                } ${i < stats.length - 1 ? "pr-4 md:pr-12" : ""}`}
              >
                <div
                  className={`font-[family-name:var(--im-display)] text-[26px] font-bold leading-none tracking-[-0.02em] sm:text-[38px] md:text-[52px] ${
                    i === 0 ? "text-[var(--im-deep)]" : "text-[var(--im-ink)]"
                  }`}
                >
                  {stat.value}
                </div>
                <div className="mt-2.5 text-xs leading-snug text-[var(--im-muted)] sm:text-sm md:mt-3 md:text-[15px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* ── OVERVIEW ── */}
      {overview ? (
        <Section
          id="overview"
          index={idx()}
          label="Overview"
          note={overview.note}
          title={overview.title}
        >
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
              <div className="min-w-0">
                <h2 className="hidden font-[family-name:var(--im-display)] text-[34px] font-bold leading-[1.2] tracking-[-0.02em] md:block [text-wrap:pretty]">
                  {overview.title}
                </h2>
                <div
                  className="text-base leading-[1.7] text-[var(--im-muted)] md:mt-5 md:text-[17px] [&>p+p]:mt-4"
                  dangerouslySetInnerHTML={{ __html: overview.html }}
                />
              </div>

              {tags.length ? (
                <div className="min-w-0 border-t border-[var(--im-line-strong)] pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
                  <Mono className="text-[11px] uppercase tracking-[0.1em] text-[var(--im-dim)]">
                    Highlights
                  </Mono>
                  <div className="mt-3.5">
                    {tags.map((tag, i) => (
                      <div
                        key={tag}
                        className={`flex gap-3 py-3.5 text-[15px] text-[var(--im-ink)] ${
                          i < tags.length - 1 ? "border-b border-[rgba(17,19,21,0.09)]" : ""
                        }`}
                      >
                        <Mono className="text-xs text-[var(--im-deep)]">
                          {String(i + 1).padStart(2, "0")}
                        </Mono>
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </Reveal>
        </Section>
      ) : null}

      {/* ── MODULES / FEATURES ── */}
      {modules?.items?.length ? (
        <Section
          id="features"
          index={idx()}
          label={modules.label || "Modules"}
          note={modules.note}
          title={modules.title}
        >
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {modules.items.map((item, i) => {
              const card = (
                <article
                  className={`h-full overflow-hidden rounded-xl border border-[var(--im-line-strong)] bg-[var(--im-panel)] ${
                    item.subSlug ? "transition-colors hover:border-[rgba(17,19,21,0.28)]" : ""
                  }`}
                >
                  <div className="relative h-[168px] overflow-hidden border-b border-[var(--im-line)] md:h-[196px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={`object-cover ${
                        item.subSlug
                          ? "transition-transform duration-500 group-hover:scale-[1.03]"
                          : ""
                      }`}
                    />
                  </div>
                  <div className="p-[18px] md:p-[22px]">
                    <Mono className="text-[10px] text-[var(--im-dim)] md:text-[11px]">
                      {(modules.itemLabel || "Module")} {String(i + 1).padStart(2, "0")}
                    </Mono>
                    <h3 className="mt-2 font-[family-name:var(--im-display)] text-[19px] font-semibold text-[var(--im-ink)] md:mt-2.5 md:text-[21px]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-[1.6] text-[var(--im-muted)] md:mt-2.5 md:text-[15px]">
                      {item.description}
                    </p>
                    {item.subSlug ? (
                      <Mono className="mt-3.5 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] text-[var(--im-deep)]">
                        Explore
                        <span
                          aria-hidden="true"
                          className="transition-transform group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </Mono>
                    ) : null}
                  </div>
                </article>
              );

              return (
                <Reveal key={item.title} delay={i * 0.08}>
                  {item.subSlug && modules.hrefBase ? (
                    <Link
                      href={`${modules.hrefBase}/${item.subSlug}`}
                      className="group block h-full"
                    >
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </Reveal>
              );
            })}
          </div>
        </Section>
      ) : null}

      {/* ── BENEFITS ── */}
      {benefits?.items?.length ? (
        <Section
          id="benefits"
          index={idx()}
          label="Benefits"
          note={benefits.note}
          title={benefits.title}
        >
          <div className="grid md:grid-cols-2 md:gap-x-12">
            {benefits.items.map((benefit) => (
              <div
                key={benefit}
                className="flex gap-3.5 border-b border-[rgba(17,19,21,0.09)] py-4 text-[15px] text-[#262A2E] last:border-b-0 md:py-[18px] md:text-base"
              >
                <span className="text-[var(--im-deep)]" aria-hidden="true">
                  →
                </span>
                {benefit}
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* ── USE CASES ── */}
      {useCases?.items?.length ? (
        <Section
          id="use-cases"
          index={idx()}
          label="Use cases"
          note={useCases.note}
          title={useCases.title}
        >
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[rgba(17,19,21,0.11)] bg-[rgba(17,19,21,0.11)] md:grid-cols-3">
            {useCases.items.map((useCase, i) => (
              <div key={useCase.title} className="min-w-0 bg-background p-4 md:p-7">
                <Mono className="text-[10px] text-[var(--im-deep)] md:text-[11px]">
                  {String(i + 1).padStart(2, "0")}
                </Mono>
                <h3 className="mt-2.5 font-[family-name:var(--im-display)] text-[15px] font-semibold leading-snug text-[var(--im-ink)] md:mt-3.5 md:text-lg">
                  {useCase.title}
                </h3>
                <p className="mt-2 hidden text-sm leading-[1.6] text-[#6A7076] md:block">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* ── PROCESS + STACK ── */}
      {process?.steps?.length ? (
        <Section
          id="process"
          index={idx()}
          label="Process"
          note={process.note}
          title={process.title}
        >
          <div className="grid gap-5 md:grid-cols-3 md:gap-7">
            {process.steps.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.08}>
                <div
                  className="pt-3.5 md:pt-5"
                  style={{
                    borderTop: `2px solid ${
                      i === 0 ? "var(--lumen)" : "rgba(17,19,21,0.18)"
                    }`,
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

          {process.technologies?.length || process.deliverables?.length ? (
            <div className="mt-10 grid gap-8 border-t border-[var(--im-line)] pt-8 md:mt-14 md:grid-cols-2 md:gap-12 md:pt-10">
              {process.technologies?.length ? (
                <div className="min-w-0">
                  <Mono className="text-[11px] uppercase tracking-[0.1em] text-[var(--im-dim)]">
                    Stack
                  </Mono>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {process.technologies.map((tech) => (
                      <Mono
                        key={tech}
                        className="rounded border border-[rgba(17,19,21,0.14)] px-2.5 py-1.5 text-xs text-[#262A2E]"
                      >
                        {tech}
                      </Mono>
                    ))}
                  </div>
                </div>
              ) : null}

              {process.deliverables?.length ? (
                <div className="min-w-0">
                  <Mono className="text-[11px] uppercase tracking-[0.1em] text-[var(--im-dim)]">
                    What you receive
                  </Mono>
                  <div className="mt-2">
                    {process.deliverables.map((item) => (
                      <div
                        key={item}
                        className="border-b border-[rgba(17,19,21,0.09)] py-2.5 text-[15px] text-[#262A2E] last:border-b-0 md:py-[11px]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </Section>
      ) : null}

      {/* ── CASE STUDY ── */}
      {caseStudy ? (
        <Section
          id="results"
          index={idx()}
          label="Case study"
          note={caseStudy.note}
          title={caseStudy.title}
        >
          <Reveal>
            <div className="grid overflow-hidden rounded-xl border border-[var(--im-line-strong)] md:grid-cols-[1.2fr_1fr]">
              <div className="relative h-[220px] md:h-[320px]">
                <Image
                  src={caseStudy.image}
                  alt={caseStudy.heading}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-col justify-center bg-[var(--im-panel)] p-7 md:p-10">
                <div className="font-[family-name:var(--im-display)] text-[42px] font-bold tracking-[-0.02em] text-[var(--im-deep)] md:text-[56px]">
                  {caseStudy.result}
                </div>
                <h3 className="mt-3 font-[family-name:var(--im-display)] text-xl font-semibold text-[var(--im-ink)] md:mt-4 md:text-[22px]">
                  {caseStudy.heading}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.7] text-[var(--im-muted)]">
                  {caseStudy.description}
                </p>
              </div>
            </div>
          </Reveal>
        </Section>
      ) : null}

      {/* ── FAQS ── */}
      {faqs?.items?.length ? (
        <Section id="faqs" index={idx()} label="FAQs" note={faqs.note} title={faqs.title}>
          <Faqs faqs={faqs.items} />
        </Section>
      ) : null}

      {/* ── CLOSING CTA ── */}
      <section className={`border-b border-[var(--im-line)] ${PAD} py-12 md:py-[104px]`}>
        <div
          className={`${INNER} flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12`}
        >
          <div className="min-w-0">
            <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
              Ready to move forward
            </Mono>
            <h2 className="mt-3.5 font-[family-name:var(--im-display)] text-[36px] font-bold leading-[1.05] tracking-[-0.03em] md:mt-5 md:text-[58px] md:leading-[1.02]">
              {cta.title}
            </h2>
            <p className="mt-3.5 text-base text-[var(--im-muted)] md:mt-4 md:text-lg">
              {cta.description}
            </p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row md:shrink-0 md:gap-3">
            <Link href={cta.primaryLink || "/contact-us"} className={`${PRIMARY_BTN} text-center`}>
              {cta.primaryText || "Book a consultation"}
            </Link>
            <Link
              href={cta.secondaryLink || "/portfolio"}
              className={`${SECONDARY_BTN} text-center`}
            >
              {cta.secondaryText || "View portfolio"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EditorialServicePage;
