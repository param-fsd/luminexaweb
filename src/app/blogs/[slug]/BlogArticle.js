"use client";

/**
 * The rendered blog post. Server-side metadata and JSON-LD live in page.js; this
 * component is only the reading experience.
 *
 * Body copy arrives as an HTML string from blogData. Older posts carry inline
 * styles from when they were authored; newer ones are plain semantic HTML and get
 * their type from the `.blog-body` rules below, so both render acceptably.
 */

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import sanitizeHtml from "sanitize-html";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Calendar, Clock3, User2 } from "lucide-react";
import {
  INNER,
  Mono,
  PAD,
  PRIMARY_BTN,
  SECONDARY_BTN,
  THEME,
} from "@/components/services/editorial/shell";

const estimateReadingTime = (html) => {
  const words = String(html || "")
    .replace(/<[^>]*>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
};

/* Pull h2/h3 out of the body so the post gets a contents rail. */
const extractHeadings = (html) => {
  const out = [];
  const re = /<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m;
  while ((m = re.exec(html))) {
    const text = m[2].replace(/<[^>]*>/g, "").trim();
    if (text) {
      out.push({
        level: Number(m[1]),
        text,
        id: text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-"),
      });
    }
  }
  return out;
};

/* Give the same headings stable ids so the rail can link to them. */
const withHeadingIds = (html) =>
  html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (full, lvl, attrs, inner) => {
    const text = inner.replace(/<[^>]*>/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    return `<h${lvl}${attrs} id="${id}">${inner}</h${lvl}>`;
  });

const BlogArticle = ({ post, related = [] }) => {
  const [activeId, setActiveId] = useState(null);

  const readingTime = post.readingTime || estimateReadingTime(post.fullDescription);

  const body = useMemo(() => {
    const clean = sanitizeHtml(post.fullDescription || "", {
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
  }, [post.fullDescription]);

  const headings = useMemo(() => extractHeadings(body), [body]);

  /* Highlight whichever heading is currently nearest the top of the viewport. */
  useEffect(() => {
    if (!headings.length) return undefined;
    const nodes = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean);
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
              <Link href="/blogs" className="transition-colors hover:text-[var(--im-ink)]">
                Blog
              </Link>
              <span className="text-[#C4C8C2]">/</span>
              <span className="text-[var(--im-deep)]">{post.category}</span>
            </Mono>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-[900px] font-[family-name:var(--im-display)] text-[34px] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[44px] md:mt-7 md:text-[58px] md:leading-[1.02]"
          >
            {post.title}
          </motion.h1>

          {post.shortDescription ? (
            <p className="mt-4 max-w-[640px] text-base leading-[1.6] text-[var(--im-muted)] md:mt-5 md:text-[19px] [text-wrap:pretty]">
              {post.shortDescription}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-2 md:mt-7">
            {[
              { icon: Calendar, text: post.date },
              { icon: User2, text: post.author },
              { icon: Clock3, text: readingTime },
            ]
              .filter((m) => m.text)
              .map(({ icon: Icon, text }) => (
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

      {/* ── COVER ── */}
      {post.image ? (
        <section className={`border-b border-[var(--im-line)] ${PAD} py-8 md:py-10`}>
          <div className={INNER}>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--im-line-strong)] md:aspect-[21/9]">
              <Image
                src={post.image}
                alt={post.imageAlt || post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1216px"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      ) : null}

      {/* ── BODY + CONTENTS RAIL ── */}
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
          </aside>

          <article className="min-w-0">
            <div
              className="blog-body max-w-[760px]"
              dangerouslySetInnerHTML={{ __html: body }}
            />

            {post.faqs?.length ? (
              <div className="mt-12 max-w-[760px] border-t border-[var(--im-line-strong)] pt-8">
                <h2 className="font-[family-name:var(--im-display)] text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-[var(--im-ink)] md:text-[34px]">
                  Frequently asked questions
                </h2>
                <div className="mt-5">
                  {post.faqs.map((faq) => (
                    <details
                      key={faq.question}
                      className="group border-b border-[var(--im-line-strong)]"
                    >
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 text-left">
                        <span className="font-[family-name:var(--im-display)] text-base font-bold leading-[1.35] text-[var(--im-ink)] md:text-[19px]">
                          {faq.question}
                        </span>
                        <Mono className="shrink-0 text-base leading-tight text-[var(--im-deep)] md:text-lg">
                          <span className="group-open:hidden">+</span>
                          <span className="hidden group-open:inline">−</span>
                        </Mono>
                      </summary>
                      <p className="pb-5 text-sm leading-[1.7] text-[var(--im-muted)] md:text-base">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ) : null}

            {post.cta ? (
              <div className="mt-12 max-w-[760px] rounded-xl border border-[var(--im-line-strong)] bg-[var(--im-panel)] p-6 md:p-8">
                <Mono className="text-[11px] uppercase tracking-[0.1em] text-[var(--im-deep)]">
                  Next step
                </Mono>
                <p className="mt-3 font-[family-name:var(--im-display)] text-[20px] font-bold leading-[1.3] text-[var(--im-ink)] md:text-[24px]">
                  {post.cta.text}
                </p>
                <Link
                  href={post.cta.href || "/contact-us"}
                  className={`${PRIMARY_BTN} mt-5 inline-flex items-center gap-2`}
                >
                  Book a demo
                  <ArrowUpRight className="size-4" />
                </Link>
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
              Keep reading
            </Mono>
            <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-5">
              {related.map((r) => (
                <Link key={r.slug} href={`/blogs/${r.slug}`} className="group block min-w-0">
                  <article className="flex h-full flex-col overflow-hidden rounded-xl border border-[var(--im-line-strong)] bg-[var(--im-panel)] transition-colors hover:border-[rgba(17,19,21,0.28)]">
                    <div className="relative h-[160px] overflow-hidden border-b border-[var(--im-line)]">
                      <Image
                        src={r.image || "/placeholder.jpg"}
                        alt={r.imageAlt || r.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-5">
                      <Mono className="text-[10px] uppercase tracking-[0.08em] text-[var(--im-deep)]">
                        {r.category}
                      </Mono>
                      <h3 className="mt-2 font-[family-name:var(--im-display)] text-[19px] font-semibold leading-tight text-[var(--im-ink)]">
                        {r.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <Link
              href="/blogs"
              className={`${SECONDARY_BTN} mt-7 inline-flex items-center gap-2`}
            >
              <ArrowLeft className="size-4" />
              All posts
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  );
};

export default BlogArticle;
