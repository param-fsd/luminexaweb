"use client";

/**
 * The rendered case study. Metadata and JSON-LD live in page.js.
 *
 * Body copy arrives as an HTML string carrying inline styles from when it was
 * authored; `.blog-body` supplies type for anything that doesn't, so old and new
 * entries both render acceptably.
 */

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import sanitizeHtml from "sanitize-html";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Calendar, Clock3, MapPin, User2 } from "lucide-react";
import {
  INNER,
  Mono,
  PAD,
  PRIMARY_BTN,
  SECONDARY_BTN,
  THEME,
} from "@/components/services/editorial/shell";

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const estimateReadingTime = (html) => {
  const words = String(html || "")
    .replace(/<[^>]*>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
};

const extractHeadings = (html) => {
  const out = [];
  const re = /<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m;
  while ((m = re.exec(html))) {
    const text = m[2].replace(/<[^>]*>/g, "").trim();
    if (text) out.push({ level: Number(m[1]), text, id: slugify(text) });
  }
  return out;
};

const withHeadingIds = (html) =>
  html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (full, lvl, attrs, inner) => {
    const text = inner.replace(/<[^>]*>/g, "").trim();
    return `<h${lvl}${attrs} id="${slugify(text)}">${inner}</h${lvl}>`;
  });

const CaseStudyArticle = ({ study, related = [] }) => {
  const [activeId, setActiveId] = useState(null);

  const readingTime = study.readingTime || estimateReadingTime(study.fullDescription);

  const body = useMemo(() => {
    const clean = sanitizeHtml(study.fullDescription || "", {
      allowedTags: [
        "h2", "h3", "h4", "p", "ul", "ol", "li", "strong", "em", "b", "i",
        "a", "br", "blockquote", "div", "span", "table", "thead", "tbody",
        "tr", "th", "td", "img", "code", "pre",
      ],
      allowedAttributes: {
        a: ["href", "target", "rel"],
        img: ["src", "alt"],
        "*": ["style", "id"],
      },
    });
    return withHeadingIds(clean);
  }, [study.fullDescription]);

  const headings = useMemo(() => extractHeadings(body), [body]);

  useEffect(() => {
    if (!headings.length) return undefined;
    const nodes = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [headings]);

  const meta = [
    { icon: Calendar, text: study.date },
    { icon: MapPin, text: study.location },
    { icon: User2, text: study.client },
    { icon: Clock3, text: readingTime },
  ].filter((m) => m.text);

  return (
    <main
      className="bg-background font-[family-name:var(--im-body)] text-[var(--im-ink)] antialiased"
      style={THEME}
    >
      {/* ── HERO ── */}
      <section
        className={`border-b border-[var(--im-line)] ${PAD} pb-10 pt-10 md:pb-14 md:pt-[72px]`}
      >
        <div className={INNER}>
          <nav aria-label="Breadcrumb">
            <Mono className="flex flex-wrap items-center gap-1.5 text-[11px] uppercase tracking-[0.11em] text-[var(--im-dim)] md:text-xs md:tracking-[0.12em]">
              <Link
                href="/case-studies"
                className="transition-colors hover:text-[var(--im-ink)]"
              >
                Case studies
              </Link>
              <span className="text-[#C4C8C2]">/</span>
              <span className="text-[var(--im-deep)]">{study.client || study.category}</span>
            </Mono>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-[900px] font-[family-name:var(--im-display)] text-[34px] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[44px] md:mt-7 md:text-[58px] md:leading-[1.02]"
          >
            {study.title}
          </motion.h1>

          {study.shortDescription ? (
            <p className="mt-4 max-w-[640px] text-base leading-[1.6] text-[var(--im-muted)] md:mt-5 md:text-[19px] [text-wrap:pretty]">
              {study.shortDescription}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-2 md:mt-7">
            {meta.map(({ icon: Icon, text }) => (
              <Mono
                key={text}
                className="inline-flex items-center gap-1.5 rounded border border-[var(--im-line-strong)] px-2.5 py-1.5 text-[11px] text-[var(--im-muted)]"
              >
                <Icon className="size-3.5 text-[var(--im-deep)]" />
                {text}
              </Mono>
            ))}
          </div>
        </div>
      </section>

      {/* ── METRICS ── */}
      {study.metrics?.length ? (
        <div className={`border-b border-[var(--im-line)] ${PAD}`}>
          <div className={`${INNER} grid grid-cols-3`}>
            {study.metrics.map((m, i) => (
              <div
                key={m.label}
                className={`min-w-0 py-6 md:py-10 ${
                  i > 0 ? "border-l border-[var(--im-line)] pl-4 sm:pl-8 md:pl-12" : ""
                } ${i < study.metrics.length - 1 ? "pr-4 md:pr-12" : ""}`}
              >
                <div
                  className={`font-[family-name:var(--im-display)] text-[26px] font-bold leading-none tracking-[-0.02em] sm:text-[38px] md:text-[52px] ${
                    i === 0 ? "text-[var(--im-deep)]" : "text-[var(--im-ink)]"
                  }`}
                >
                  {m.value}
                </div>
                <div className="mt-2.5 text-xs leading-snug text-[var(--im-muted)] sm:text-sm md:mt-3 md:text-[15px]">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* ── COVER ── */}
      {study.coverImage ? (
        <section className={`border-b border-[var(--im-line)] ${PAD} py-8 md:py-10`}>
          <div className={INNER}>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--im-line-strong)] md:aspect-[21/9]">
              <Image
                src={study.coverImage}
                alt={study.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1216px"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      ) : null}

      {/* ── BODY + RAIL ── */}
      <section className={`border-b border-[var(--im-line)] ${PAD} py-10 md:py-[72px]`}>
        <div className={`${INNER} grid gap-10 md:grid-cols-[210px_1fr] md:gap-14`}>
          <aside className="md:sticky md:top-24 md:self-start">
            <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
              Contents
            </Mono>
            {headings.length ? (
              <nav className="mt-3.5 hidden md:block">
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className={`block border-l py-1.5 text-[13px] leading-snug transition-colors ${
                      h.level === 3 ? "pl-5" : "pl-3"
                    } ${
                      activeId === h.id
                        ? "border-[var(--lumen)] text-[var(--im-ink)]"
                        : "border-[rgba(17,19,21,0.12)] text-[var(--im-dim)] hover:text-[var(--im-muted)]"
                    }`}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            ) : null}

            {study.services?.length ? (
              <div className="mt-8 hidden md:block">
                <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
                  Services used
                </Mono>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {study.services.map((s) => (
                    <Mono
                      key={s}
                      className="rounded border border-[var(--im-line-strong)] px-2 py-1 text-[10px] text-[var(--im-muted)]"
                    >
                      {s}
                    </Mono>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>

          <article className="min-w-0">
            <div
              className="blog-body max-w-[760px]"
              dangerouslySetInnerHTML={{ __html: body }}
            />

            {study.results?.length ? (
              <div className="mt-12 max-w-[760px] border-t border-[var(--im-line-strong)] pt-8">
                <Mono className="text-[11px] uppercase tracking-[0.1em] text-[var(--im-deep)]">
                  Outcome
                </Mono>
                <div className="mt-4">
                  {study.results.map((r, i) => (
                    <div
                      key={r}
                      className="flex gap-3.5 border-b border-[rgba(17,19,21,0.09)] py-3.5 text-[15px] leading-[1.6] text-[#262A2E] last:border-b-0 md:py-4 md:text-base"
                    >
                      <Mono className="shrink-0 text-xs text-[var(--im-deep)]">
                        {String(i + 1).padStart(2, "0")}
                      </Mono>
                      {r}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* services rail is desktop-only; repeat the tags inline on mobile */}
            {study.services?.length ? (
              <div className="mt-10 max-w-[760px] md:hidden">
                <Mono className="text-[11px] uppercase tracking-[0.1em] text-[var(--im-deep)]">
                  Services used
                </Mono>
                <div className="mt-3 flex flex-wrap gap-2">
                  {study.services.map((s) => (
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
          </article>
        </div>
      </section>

      {/* ── RELATED ── */}
      {related.length ? (
        <section className={`border-b border-[var(--im-line)] ${PAD} py-10 md:py-[72px]`}>
          <div className={INNER}>
            <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
              More work
            </Mono>
            <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/case-studies/${r.slug}`}
                  className="group block min-w-0"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-xl border border-[var(--im-line-strong)] bg-[var(--im-panel)] transition-colors hover:border-[rgba(17,19,21,0.28)]">
                    <div className="relative h-[160px] overflow-hidden border-b border-[var(--im-line)]">
                      <Image
                        src={r.coverImage || "/placeholder.jpg"}
                        alt={r.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-5">
                      <Mono className="text-[10px] uppercase tracking-[0.08em] text-[var(--im-deep)]">
                        {r.client || r.category}
                      </Mono>
                      <h3 className="mt-2 font-[family-name:var(--im-display)] text-[19px] font-semibold leading-tight text-[var(--im-ink)]">
                        {r.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── CLOSING CTA ── */}
      <section className={`border-b border-[var(--im-line)] ${PAD} py-12 md:py-[104px]`}>
        <div
          className={`${INNER} flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12`}
        >
          <div className="min-w-0">
            <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
              Same problem
            </Mono>
            <h2 className="mt-3.5 font-[family-name:var(--im-display)] text-[36px] font-bold leading-[1.05] tracking-[-0.03em] md:mt-5 md:text-[58px] md:leading-[1.02]">
              Let&rsquo;s solve yours.
            </h2>
            <p className="mt-3.5 text-base text-[var(--im-muted)] md:mt-4 md:text-lg">
              Tell us what your buyers are struggling to understand, and we&rsquo;ll
              scope the shortest route to fixing it.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row md:shrink-0 md:gap-3">
            <Link href="/contact-us" className={`${PRIMARY_BTN} text-center`}>
              Book a consultation
            </Link>
            <Link href="/case-studies" className={`${SECONDARY_BTN} text-center`}>
              <span className="inline-flex items-center gap-1.5">
                <ArrowLeft className="size-4" />
                All case studies
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CaseStudyArticle;
