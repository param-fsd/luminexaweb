"use client";

/**
 * Portfolio — a deliberate coming-soon page, kept minimal.
 *
 * The two links are the only additions: "View portfolio" CTAs across the site land
 * here, so without them the page would be a dead end.
 *
 * To launch the real portfolio, render a grid over `projects` from
 * src/data/portfolioData.js — that file documents the entry shape and carries a
 * copy-paste template.
 */

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  INNER,
  Mono,
  PAD,
  PRIMARY_BTN,
  SECONDARY_BTN,
  THEME,
} from "@/components/services/editorial/shell";

const PortfolioPage = () => (
  <main
    className="flex min-h-[70vh] items-center bg-background font-[family-name:var(--im-body)] text-[var(--im-ink)] antialiased"
    style={THEME}
  >
    <section className={`w-full ${PAD} py-20 md:py-32`}>
      <div className={INNER}>
        <Mono className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[var(--im-deep)] md:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-lumen lumen-pulse" />
          Portfolio
        </Mono>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 font-[family-name:var(--im-display)] text-[48px] font-bold leading-[1.0] tracking-[-0.03em] sm:text-[64px] md:mt-7 md:text-[80px]"
        >
          Coming soon.
        </motion.h1>

        <div className="mt-8 flex flex-col gap-2.5 sm:flex-row md:mt-10 md:gap-3">
          <Link href="/case-studies" className={`${PRIMARY_BTN} text-center`}>
            Read case studies
          </Link>
          <Link href="/contact-us" className={`${SECONDARY_BTN} text-center`}>
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  </main>
);

export default PortfolioPage;
