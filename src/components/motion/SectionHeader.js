"use client";

/**
 * Signature section header used across the site.
 *
 * <SectionHeader
 *   index="01"            — section number chip
 *   label="Services"      — overline label
 *   title="What we build" — heading (word-by-word reveal)
 *   description="..."     — optional sub copy
 *   align="left" | "center"
 *   dark                  — set true on dark sections
 * />
 *
 * IMPORTANT — why this does not use framer-motion for the reveal:
 *
 * This component previously wrapped the whole header in a `motion.div` with
 * `initial={{ opacity: 0 }}` and animated each word with `whileInView`. When those
 * animations did not fire — a suspended frame loop, a background tab, or the
 * viewport check never satisfying `amount: 0.6` on a small inline word span — the
 * wrapper AND every word stayed at opacity 0, so section titles like "Capabilities"
 * and the FAQ heading rendered completely invisible while still being present in
 * the DOM (and therefore still passing any check based on textContent).
 *
 * Now the heading is plain, visible text. An IntersectionObserver adds
 * `is-revealing`, which is what applies the CSS keyframes. If the observer never
 * runs the title is simply static — never missing.
 */

import React, { useEffect, useRef } from "react";

export default function SectionHeader({
  index,
  label,
  title,
  description,
  align = "left",
  dark = false,
  className = "",
}) {
  const words = String(title || "").split(" ");
  const centered = align === "center";
  const titleRef = useRef(null);

  useEffect(() => {
    const node = titleRef.current;
    if (!node) return undefined;

    /* Reveal once, when the heading first comes into view. */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealing");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`${centered ? "mx-auto flex flex-col items-center text-center" : ""} ${className}`}
    >
      {/* index + label row */}
      <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        {index && (
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-lumen px-1.5 text-[11px] font-bold tracking-wide text-lumen-foreground">
            {index}
          </span>
        )}
        {label && (
          <span className={`section-label ${dark ? "!text-white/50" : ""}`}>{label}</span>
        )}
        {!centered && (
          <div className={`h-px max-w-[120px] flex-1 ${dark ? "bg-white/15" : "bg-border"}`} />
        )}
      </div>

      {/* word-by-word title reveal — visible first, animated second */}
      <h2
        ref={titleRef}
        className={`word-rise mt-4 text-[26px] font-bold leading-[1.08] sm:text-[32px] md:text-[38px] ${
          dark ? "text-white" : "text-foreground"
        }`}
        style={{
          fontFamily: "var(--font-display, 'Montserrat', sans-serif)",
          letterSpacing: "-0.04em",
        }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            style={{ animationDelay: `${0.06 + i * 0.045}s` }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </h2>

      {description && (
        <p
          className={`mt-3 max-w-xl text-[13px] leading-relaxed sm:text-[14px] ${
            dark ? "text-white/65" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
