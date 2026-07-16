"use client";

import React from "react";
import { motion } from "framer-motion";

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
 */
const wordVariants = {
  hidden: { opacity: 0, y: "0.6em", rotate: 2 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { delay: 0.08 + i * 0.045, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`${centered ? "text-center mx-auto flex flex-col items-center" : ""} ${className}`}
    >
      {/* index + label row */}
      <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        {index && (
          <span className="inline-flex items-center justify-center h-6 min-w-6 px-1.5 rounded-md bg-lumen text-lumen-foreground text-[11px] font-bold tracking-wide">
            {index}
          </span>
        )}
        {label && (
          <span className={`section-label ${dark ? "!text-white/50" : ""}`}>{label}</span>
        )}
        {!centered && (
          <div className={`flex-1 h-px max-w-[120px] ${dark ? "bg-white/15" : "bg-border"}`} />
        )}
      </div>

      {/* word-by-word title reveal */}
      <h2
        className={`mt-4 text-[26px] sm:text-[32px] md:text-[38px] font-bold leading-[1.08] ${
          dark ? "text-white" : "text-foreground"
        }`}
        style={{
          fontFamily: "var(--font-display, 'Montserrat', sans-serif)",
          letterSpacing: "-0.04em",
        }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span
              custom={i}
              variants={wordVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              className="inline-block"
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </h2>

      {description && (
        <p
          className={`mt-3 text-[13px] sm:text-[14px] leading-relaxed max-w-xl ${
            dark ? "text-white/65" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
