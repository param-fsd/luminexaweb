"use client";

/**
 * Blog listing, in the same editorial language as the services and careers pages.
 *
 * The newest post is given a full-width feature block; the rest run as a numbered
 * index with category filters. Also rendered on the homepage via
 * `<Blog limit={3} showNewsletter={false} />`, so both props are still honoured.
 */

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import blogs from "@/data/blogData";
import {
  INNER,
  Mono,
  PAD,
  PRIMARY_BTN,
  Reveal,
  SECONDARY_BTN,
  THEME,
} from "@/components/services/editorial/shell";

/* "September 2025" sorts fine through Date; anything unparseable sinks to the end. */
const toTime = (d) => {
  const t = new Date(d).getTime();
  return Number.isNaN(t) ? 0 : t;
};

const estimateReadingTime = (post) => {
  if (post.readingTime) return post.readingTime;
  const words = String(post.fullDescription || "")
    .replace(/<[^>]*>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
};

const BlogPage = ({ limit, showNewsletter = true }) => {
  const isPreview = Boolean(limit);
  const [category, setCategory] = useState("all");

  const sorted = useMemo(
    () => [...blogs].sort((a, b) => toTime(b.date) - toTime(a.date)),
    [],
  );

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(sorted.map((b) => b.category).filter(Boolean)))],
    [sorted],
  );

  const filtered = useMemo(
    () => (category === "all" ? sorted : sorted.filter((b) => b.category === category)),
    [category, sorted],
  );

  if (isPreview) {
    /* ── HOMEPAGE PREVIEW ── */
    const shown = sorted.slice(0, limit);
    return (
      <section
        className={`border-y border-[var(--im-line)] bg-background font-[family-name:var(--im-body)] text-[var(--im-ink)] antialiased ${PAD} py-14 md:py-20`}
        style={THEME}
      >
        <div className={INNER}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="min-w-0">
              <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
                Blog
              </Mono>
              <h2 className="mt-3.5 max-w-[620px] font-[family-name:var(--im-display)] text-[32px] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[40px] md:mt-4 md:text-[48px]">
                What we&rsquo;ve been building.
              </h2>
            </div>

            <Link
              href="/blogs"
              className="group inline-flex shrink-0 items-center gap-1.5 border-b border-[var(--im-ink)] pb-1 text-[15px] font-medium text-[var(--im-ink)]"
            >
              All posts
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
            {shown.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06} className="min-w-0">
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const [featured, ...rest] = filtered;

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
            Blog
          </Mono>

          <h1 className="mt-5 max-w-[900px] font-[family-name:var(--im-display)] text-[44px] font-bold leading-[1.0] tracking-[-0.03em] sm:text-[58px] md:mt-7 md:text-[68px] md:leading-[0.98]">
            {["Notes from", "the build."].map((line, i) => (
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
            How we think about mapping, immersive technology and the software that
            actually runs a property business — written by the people building it.
          </p>
        </div>
      </section>

      {/* ── FEATURED ── */}
      {featured ? (
        <section className={`border-b border-[var(--im-line)] ${PAD} py-10 md:py-14`}>
          <div className={INNER}>
            <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
              Latest
            </Mono>

            <Link href={`/blogs/${featured.slug}`} className="group mt-5 block">
              <article className="grid overflow-hidden rounded-xl border border-[var(--im-line-strong)] bg-[var(--im-panel)] transition-colors hover:border-[rgba(17,19,21,0.28)] lg:grid-cols-[1.15fr_1fr]">
                <div className="relative h-[220px] overflow-hidden border-b border-[var(--im-line)] lg:h-full lg:min-h-[340px] lg:border-b-0 lg:border-r">
                  <Image
                    src={featured.image || "/placeholder.jpg"}
                    alt={featured.imageAlt || featured.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex min-w-0 flex-col justify-center p-6 md:p-9">
                  <Mono className="text-[10px] uppercase tracking-[0.08em] text-[var(--im-deep)] md:text-[11px]">
                    {featured.category} · {estimateReadingTime(featured)}
                  </Mono>

                  <h2 className="mt-3 font-[family-name:var(--im-display)] text-[26px] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--im-ink)] md:mt-4 md:text-[36px]">
                    {featured.title}
                  </h2>

                  <p className="mt-3 max-w-[520px] text-[15px] leading-[1.7] text-[var(--im-muted)] md:mt-4 md:text-base">
                    {featured.shortDescription}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3 md:mt-6">
                    <Mono className="inline-flex items-center gap-1.5 text-[11px] text-[var(--im-dim)]">
                      <Calendar className="size-3.5 text-[var(--im-deep)]" />
                      {featured.date}
                    </Mono>
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

      {/* ── INDEX ── */}
      <section className={`border-b border-[var(--im-line)] ${PAD} py-10 md:py-[72px]`}>
        <div className={INNER}>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
              All posts
            </Mono>
            <Mono className="text-[11px] text-[var(--im-dim)]">
              {filtered.length} of {sorted.length}
            </Mono>
          </div>

          <div
            role="tablist"
            aria-label="Filter posts by category"
            className="no-scrollbar mt-4 flex gap-2 overflow-x-auto md:flex-wrap md:overflow-visible"
          >
            {categories.map((c) => {
              const on = category === c;
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setCategory(c)}
                  className={`shrink-0 whitespace-nowrap rounded border px-3 py-1.5 transition-colors ${
                    on
                      ? "border-transparent bg-lumen text-lumen-foreground"
                      : "border-[var(--im-line-strong)] text-[var(--im-muted)] hover:bg-[rgba(17,19,21,0.04)]"
                  }`}
                >
                  <Mono className="text-[11px] md:text-xs">{c === "all" ? "All" : c}</Mono>
                </button>
              );
            })}
          </div>

          {rest.length ? (
            <div className="mt-7 border-t border-[var(--im-line-strong)]">
              {rest.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="group block border-b border-[var(--im-line-strong)]"
                >
                  <div className="flex items-start gap-4 py-5 md:gap-7 md:py-6">
                    <Mono className="w-7 shrink-0 pt-1 text-[11px] text-[var(--im-dim)] md:w-10 md:text-xs">
                      {String(i + 2).padStart(2, "0")}
                    </Mono>

                    <div className="min-w-0 flex-1">
                      <Mono className="text-[10px] uppercase tracking-[0.08em] text-[var(--im-deep)] md:text-[11px]">
                        {post.category} · {post.date}
                      </Mono>
                      <h3 className="mt-1.5 font-[family-name:var(--im-display)] text-[20px] font-bold leading-[1.2] tracking-[-0.02em] text-[var(--im-ink)] sm:text-[24px] md:text-[28px]">
                        {post.title}
                      </h3>
                      <p className="mt-2 max-w-[620px] text-sm leading-[1.6] text-[var(--im-muted)] md:text-[15px]">
                        {post.shortDescription}
                      </p>
                    </div>

                    <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-lg border border-[var(--im-line-strong)] sm:h-[84px] sm:w-[112px]">
                      <Image
                        src={post.image || "/placeholder.jpg"}
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
          ) : (
            <p className="mt-7 text-base text-[var(--im-muted)]">
              {featured ? "That's the only post in this category." : "Nothing here yet."}
            </p>
          )}
        </div>
      </section>

      {/* ── CTA / NEWSLETTER ── */}
      {showNewsletter ? (
        <section className={`border-b border-[var(--im-line)] ${PAD} py-12 md:py-[104px]`}>
          <div
            className={`${INNER} flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12`}
          >
            <div className="min-w-0">
              <Mono className="text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
                Working on something similar
              </Mono>
              <h2 className="mt-3.5 font-[family-name:var(--im-display)] text-[36px] font-bold leading-[1.05] tracking-[-0.03em] md:mt-5 md:text-[58px] md:leading-[1.02]">
                Let&rsquo;s talk about it.
              </h2>
              <p className="mt-3.5 text-base text-[var(--im-muted)] md:mt-4 md:text-lg">
                Tell us what you&rsquo;re trying to build and we&rsquo;ll tell you
                honestly whether we&rsquo;re the right people for it.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row md:shrink-0 md:gap-3">
              <Link href="/contact-us" className={`${PRIMARY_BTN} text-center`}>
                Book a demo
              </Link>
              <Link href="/services" className={`${SECONDARY_BTN} text-center`}>
                See services
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
};

/* Compact card used by the homepage preview. */
const PostCard = ({ post }) => (
  <Link href={`/blogs/${post.slug}`} className="group block h-full">
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-[var(--im-line-strong)] bg-[var(--im-panel)] transition-colors hover:border-[rgba(17,19,21,0.28)]">
      <div className="relative h-[168px] overflow-hidden border-b border-[var(--im-line)]">
        <Image
          src={post.image || "/placeholder.jpg"}
          alt={post.imageAlt || post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-[18px] md:p-5">
        <Mono className="block truncate text-[10px] uppercase tracking-[0.08em] text-[var(--im-deep)]">
          {post.category} · {post.date}
        </Mono>
        <h3 className="mt-2 font-[family-name:var(--im-display)] text-[18px] font-semibold leading-tight text-[var(--im-ink)] md:text-[20px]">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-[1.6] text-[var(--im-muted)]">
          {post.shortDescription}
        </p>
      </div>
    </article>
  </Link>
);

export default BlogPage;
