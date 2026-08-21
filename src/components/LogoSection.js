"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { FaStar, FaFire, FaCheck, FaMobileAlt } from "react-icons/fa";
import Counter from "./motion/Counter";

const LogoSection = () => {
  const highlights = useMemo(
    () => [
      { value: 50, suffix: "+", text: "Projects Delivered", sub: "Across industries", icon: FaCheck },
      { value: 99, suffix: "%", text: "Success Rate", sub: "Client satisfaction", icon: FaStar },
      { value: 10, suffix: "+", text: "Industries", sub: "Sectors served", icon: FaFire },
      { value: null, text: "Immersive UX", sub: "AR · 3D · AI", icon: FaMobileAlt },
    ],
    []
  );

  return (
    <section className="w-full border-b border-border/60">
      {/* ── Section label ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="py-4 flex items-center gap-3"
        >
          <span className="inline-flex h-5 items-center rounded-md bg-lumen px-1.5 text-[10px] font-bold text-lumen-foreground">02</span>
          <span className="section-label">Why Luminexa</span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>
      </div>

      {/* ── Stats grid ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border border-t border-border">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
                className="group px-6 py-8 transition-colors duration-300 cursor-default hover:bg-foreground hover:text-background"
              >
                {/* Icon */}
                <div className="mb-4 h-10 w-10 rounded-xl border border-border bg-foreground flex items-center justify-center transition-colors duration-300 group-hover:bg-lumen group-hover:border-lumen">
                  <Icon size={16} className="text-background transition-colors duration-300 group-hover:text-lumen-foreground" />
                </div>

                {/* Big animated number / text */}
                <p
                  className="text-2xl md:text-3xl font-black leading-none mb-1.5"
                  style={{ fontFamily: "var(--font-display, 'Montserrat', sans-serif)", letterSpacing: "-0.04em" }}
                >
                  {item.value !== null ? (
                    <Counter value={item.value} suffix={item.suffix} />
                  ) : (
                    <span className="text-xl md:text-2xl">AR·3D·AI</span>
                  )}
                </p>

                <p className="text-[13px] font-bold leading-snug">{item.text}</p>
                <p className="text-[12px] text-muted-foreground group-hover:text-background/60 transition-colors duration-300">
                  {item.sub}
                </p>

                {/* hover line */}
                <div className="mt-4 h-[2px] w-0 group-hover:w-8 bg-lumen transition-all duration-300 rounded-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LogoSection;
