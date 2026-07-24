"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Full-screen website preloader — Luminexa logo reveal.
 *
 * The wordmark letters blur-fade in with a stagger, the triangle mark flies in
 * from the centre and scales into place, and a sheen sweeps across the mark.
 * The whole reveal is CSS-keyframe driven (see globals.css: lxIconMove /
 * lxIconSpin / lxLetterIn / lxSheen) and paced by the --dur variable.
 *
 * Hide/unmount is driven by setTimeout (not an exit animation) so it always
 * completes, and the fade is a plain CSS opacity transition.
 *
 * Colours are fixed to the light theme (mark on a soft white radial) so the
 * reveal is always visible regardless of the device's system theme — the site
 * defines no dark palette, so a theme-reactive loader would go invisible.
 */

// SVG reveal markup ported from the exported "Luminexa Logo Reveal" design.
// Injected as HTML so the inline animation styles carry over verbatim.
const REVEAL_SVG = `
<svg viewBox="120 1180 2760 660" style="width:min(64vw,230px);height:auto;overflow:visible" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="lx-mark">
      <path d="M846.3,1343.55V1516.7c0,1.43,0,2.84,0,4.24v.1q-.12,7.07-.68,13.79a168.06,168.06,0,0,1-9,43.47,124.29,124.29,0,0,1-30.79,48.2c-15,14.54-34.94,25-58,31.47-18.3,5.12-38.59,7.68-60,7.68H267.45v-321.9h107.2V1578.3H540.11q-9.71-27-9.71-61.6V1343.55H640.6v170q0,36,13,51.07a41.84,41.84,0,0,0,22.49,13.68,54.08,54.08,0,0,0,12.61,1.4,55.49,55.49,0,0,0,12.8-1.4,41.11,41.11,0,0,0,22.52-13.68q12.82-15.06,12.83-51.07v-170Z"></path>
      <path d="M1264.67,1343.61v271.23a50.84,50.84,0,0,1-50.85,50.85h0a50.85,50.85,0,0,1-50.85-50.85V1343.65Z"></path>
      <polygon points="1127.83 1665.55 1030.08 1665.55 1029.32 1514.87 960.78 1630.19 913.98 1630.19 881.44 1577.69 881.44 1417.49 938.85 1511.19 1038.63 1343.55 1126.93 1343.55 1127.83 1665.55"></polygon>
      <path d="M2230.51,1501.05l118.31-156.76H2229.88l-59.06,81.27-56.91-81.27H1987.29L2105.9,1504.9,2049,1579.84H1855q-24.19-.33-41.82-9.15a64.63,64.63,0,0,1-28.11-26.33,69.77,69.77,0,0,1-6.59-16h232.91c.38-4.34.78-9.07,1.17-14.2s.6-9.66.6-13.61q0-53.25-23.07-90.53a149.4,149.4,0,0,0-62.13-56.5q-39.06-19.23-86.39-19.23-50.29,0-90.52,21t-63,58.58q-22.79,37.58-22.78,85.49t23.36,85.5q23.38,37.59,65.69,59.18t99.11,21.59h252.2l61.33-84.11,57.6,84.11H2353Zm-446.91-52.84a60.2,60.2,0,0,1,23.37-25.16q15.09-8.85,35.21-8.87t35.2,8.87a62.61,62.61,0,0,1,23.68,24.86,66.73,66.73,0,0,1,7,21.3H1776.75A73.57,73.57,0,0,1,1783.6,1448.21Z"></path>
      <path d="M1647.6,1505.29v160.36h-111v-156a59.69,59.69,0,0,0-60.72-59.69c-32.73.55-58.66,27.94-58.66,60.67v155h-111V1505.29a170.7,170.7,0,0,1,170.7-170.71h0A170.7,170.7,0,0,1,1647.6,1505.29Z"></path>
      <path d="M2542.76,1343.65l-189.8,322h379.59Zm0,261.95a50.5,50.5,0,1,1,35.71-14.79A50.31,50.31,0,0,1,2542.76,1605.6Z"></path>
    </clipPath>
  </defs>

  <g data-anim style="animation:lxLetterIn calc(var(--dur,3.5s)*.26) both;animation-delay:calc(var(--dur,3.5s)*.44);animation-timing-function:cubic-bezier(.22,1,.36,1);transform-box:fill-box;transform-origin:center">
    <path d="M846.3,1343.55V1516.7c0,1.43,0,2.84,0,4.24v.1q-.12,7.07-.68,13.79a168.06,168.06,0,0,1-9,43.47,124.29,124.29,0,0,1-30.79,48.2c-15,14.54-34.94,25-58,31.47-18.3,5.12-38.59,7.68-60,7.68H267.45v-321.9h107.2V1578.3H540.11q-9.71-27-9.71-61.6V1343.55H640.6v170q0,36,13,51.07a41.84,41.84,0,0,0,22.49,13.68,54.08,54.08,0,0,0,12.61,1.4,55.49,55.49,0,0,0,12.8-1.4,41.11,41.11,0,0,0,22.52-13.68q12.82-15.06,12.83-51.07v-170Z" fill="var(--fg,#111111)"></path>
  </g>
  <g data-anim style="animation:lxLetterIn calc(var(--dur,3.5s)*.26) both;animation-delay:calc(var(--dur,3.5s)*.50);animation-timing-function:cubic-bezier(.22,1,.36,1);transform-box:fill-box;transform-origin:center">
    <polygon points="1127.83 1665.55 1030.08 1665.55 1029.32 1514.87 960.78 1630.19 913.98 1630.19 881.44 1577.69 881.44 1417.49 938.85 1511.19 1038.63 1343.55 1126.93 1343.55 1127.83 1665.55" fill="var(--fg,#111111)"></polygon>
  </g>
  <g data-anim style="animation:lxLetterIn calc(var(--dur,3.5s)*.26) both;animation-delay:calc(var(--dur,3.5s)*.56);animation-timing-function:cubic-bezier(.22,1,.36,1);transform-box:fill-box;transform-origin:center">
    <path d="M1264.67,1343.61v271.23a50.84,50.84,0,0,1-50.85,50.85h0a50.85,50.85,0,0,1-50.85-50.85V1343.65Z" fill="var(--fg,#111111)"></path>
  </g>
  <g data-anim style="animation:lxLetterIn calc(var(--dur,3.5s)*.26) both;animation-delay:calc(var(--dur,3.5s)*.62);animation-timing-function:cubic-bezier(.22,1,.36,1);transform-box:fill-box;transform-origin:center">
    <path d="M1647.6,1505.29v160.36h-111v-156a59.69,59.69,0,0,0-60.72-59.69c-32.73.55-58.66,27.94-58.66,60.67v155h-111V1505.29a170.7,170.7,0,0,1,170.7-170.71h0A170.7,170.7,0,0,1,1647.6,1505.29Z" fill="var(--fg,#111111)"></path>
  </g>
  <g data-anim style="animation:lxLetterIn calc(var(--dur,3.5s)*.26) both;animation-delay:calc(var(--dur,3.5s)*.68);animation-timing-function:cubic-bezier(.22,1,.36,1);transform-box:fill-box;transform-origin:center">
    <path d="M2230.51,1501.05l118.31-156.76H2229.88l-59.06,81.27-56.91-81.27H1987.29L2105.9,1504.9,2049,1579.84H1855q-24.19-.33-41.82-9.15a64.63,64.63,0,0,1-28.11-26.33,69.77,69.77,0,0,1-6.59-16h232.91c.38-4.34.78-9.07,1.17-14.2s.6-9.66.6-13.61q0-53.25-23.07-90.53a149.4,149.4,0,0,0-62.13-56.5q-39.06-19.23-86.39-19.23-50.29,0-90.52,21t-63,58.58q-22.79,37.58-22.78,85.49t23.36,85.5q23.38,37.59,65.69,59.18t99.11,21.59h252.2l61.33-84.11,57.6,84.11H2353Zm-446.91-52.84a60.2,60.2,0,0,1,23.37-25.16q15.09-8.85,35.21-8.87t35.2,8.87a62.61,62.61,0,0,1,23.68,24.86,66.73,66.73,0,0,1,7,21.3H1776.75A73.57,73.57,0,0,1,1783.6,1448.21Z" fill="var(--fg,#111111)"></path>
  </g>

  <g data-anim style="transform-box:view-box;transform-origin:0 0;animation:lxIconMove var(--dur,3.5s) both;animation-timing-function:ease-out">
    <g style="transform-box:fill-box;transform-origin:center;animation:lxIconSpin var(--dur,3.5s) both;animation-timing-function:ease-out">
      <path d="M1456.47,585.67,408.86,2363c-19.87,33.71,4.43,76.24,43.55,76.24H2547.59c39.12,0,63.42-42.53,43.55-76.23L1543.59,585.68C1524,552.49,1476,552.49,1456.47,585.67ZM1500,2079.76a302.26,302.26,0,0,1-302.29-302.28c0-167,135.28-302.29,302.29-302.29a302.29,302.29,0,1,1,0,604.57Z" fill="var(--fg,#111111)"></path>
    </g>
  </g>

  <g clip-path="url(#lx-mark)">
    <rect data-anim x="0" y="1180" width="620" height="660" fill="var(--sheen,rgba(255,255,255,.85))" style="animation:lxSheen var(--dur,3.5s) both;transform-box:view-box"></rect>
  </g>
</svg>
`;

const Loader = ({ duration = 3500, endPause = 400 }) => {
  const [done, setDone] = useState(false);
  const overlayRef = useRef(null);
  const finishedRef = useRef(false);
  const fadeTimerRef = useRef(null);
  const removeTimerRef = useRef(null);

  const finishReveal = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    // The SVG uses fill-mode "both", so it remains on its final frame during
    // this short pause before the page is revealed.
    fadeTimerRef.current = setTimeout(() => {
      const overlay = overlayRef.current;
      if (overlay) {
        // Mutate only the wrapper. A React state update here would reapply the
        // embedded SVG HTML and restart its CSS animations.
        overlay.classList.add("pointer-events-none", "opacity-0");
      }

      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      removeTimerRef.current = setTimeout(() => setDone(true), 500);
    }, endPause);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Safety fallback only; the normal transition is triggered by the
    // lxIconMove animationend event below.
    const fallback = setTimeout(finishReveal, duration + 100);

    return () => {
      clearTimeout(fallback);
      clearTimeout(fadeTimerRef.current);
      clearTimeout(removeTimerRef.current);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [duration, endPause]);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-label="Loading"
      onAnimationStart={(event) => {
        if (event.animationName !== "lxIconMove") return;

        if (window.__luminexaLogoRevealPlayed) {
          finishReveal();
          return;
        }

        window.__luminexaLogoRevealPlayed = true;
      }}
      onAnimationEnd={(event) => {
        if (event.animationName === "lxIconMove") finishReveal();
      }}
      className="logo-reveal fixed inset-0 z-[10000] flex items-center justify-center opacity-100 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(circle at 50% 44%, #ffffff 0%, #e9ebef 80%)",
        // Reveal variables consumed by the injected SVG animations.
        "--fg": "#111114",
        "--sheen": "rgba(255,255,255,.92)",
        "--dur": `${duration / 1000}s`,
      }}
      dangerouslySetInnerHTML={{ __html: REVEAL_SVG }}
    />
  );
};

export default Loader;
