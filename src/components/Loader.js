"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Full-screen website preloader.
 * Shows the logo3 mark snapping in 120° steps with a lumen progress bar,
 * then fades out and unmounts after ~3.5s.
 *
 * Hide/unmount is driven by setTimeout (not an exit animation) so it always
 * completes, and the fade is a plain CSS opacity transition.
 */
const Loader = ({ duration = 3500 }) => {
  // "show" -> "hide" (fading out) -> "done" (unmounted)
  const [phase, setPhase] = useState("show");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const release = () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };

    const fade = setTimeout(() => setPhase("hide"), duration);
    const remove = setTimeout(() => {
      setPhase("done");
      release();
    }, duration + 600);

    return () => {
      clearTimeout(fade);
      clearTimeout(remove);
      release();
    };
  }, [duration]);

  if (phase === "done") return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        phase === "hide" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* logo only — breathing pulse */}
      <div className="loader-breathe">
        <Image
          src="/logo3.png"
          width={56}
          height={56}
          alt="Luminexa"
          priority
          className="h-14 w-14 object-contain dark:invert"
        />
      </div>
    </div>
  );
};

export default Loader;
