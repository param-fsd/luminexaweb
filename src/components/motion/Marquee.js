"use client";

import React from "react";

/**
 * Infinite horizontal marquee. Children are duplicated to create
 * a seamless loop (CSS-driven — see .marquee in globals.css).
 *
 * <Marquee duration={28} className="py-3">…items…</Marquee>
 */
export default function Marquee({ children, duration = 30, reverse = false, className = "" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="marquee"
        style={{
          "--marquee-duration": `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
