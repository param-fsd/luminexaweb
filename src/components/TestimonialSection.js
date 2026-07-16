"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import Marquee from "./motion/Marquee";
import SectionHeader from "./motion/SectionHeader";

const testimonials = [
  {
    quote:
      "The interactive plot map changed how we sell. Buyers explore layouts, pricing, and documents on their own — our team just closes.",
    author: "Rajesh Kumar",
    role: "Director, Real Estate Group",
    rating: 5,
  },
  {
    quote:
      "Their 360° virtual tour cut our site-visit load in half. Out-of-town buyers make decisions before they ever step on the property.",
    author: "Priya Sharma",
    role: "Sales Head, Property Ventures",
    rating: 5,
  },
  {
    quote:
      "The WebAR launch experience got our product into customers' hands instantly — no app download, just a link. Engagement tripled.",
    author: "Arun Mehta",
    role: "Brand Manager, Consumer Products",
    rating: 5,
  },
  {
    quote:
      "From first workshop to launch, the process was transparent. Weekly demos meant zero surprises and a product that matched the vision.",
    author: "Sneha Reddy",
    role: "Founder, EdTech Startup",
    rating: 5,
  },
  {
    quote:
      "The custom CRM they built actually fits how our team works. Lead response time dropped from hours to minutes.",
    author: "Vikram Singh",
    role: "Operations Head, Services Co.",
    rating: 5,
  },
  {
    quote:
      "Photoreal 3D renders of unbuilt phases helped us pre-sell with confidence. Investors finally see what we see.",
    author: "Anita Desai",
    role: "CEO, Development Group",
    rating: 5,
  },
];

const TestimonialCard = ({ t }) => (
  <div className="group mx-3 w-[320px] sm:w-[380px] shrink-0 rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:border-foreground/30 hover:shadow-lg hover:shadow-black/5">
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-0.5">
        {Array(t.rating)
          .fill(0)
          .map((_, j) => (
            <Star key={j} className="size-3.5 text-foreground fill-foreground" />
          ))}
      </div>
      <Quote className="size-5 text-lumen fill-lumen" />
    </div>

    <p className="text-[13px] sm:text-[14px] leading-relaxed text-foreground/85 min-h-[88px]">
      “{t.quote}”
    </p>

    <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
      <div className="size-9 rounded-full bg-foreground text-background flex items-center justify-center text-[13px] font-bold transition-colors duration-300 group-hover:bg-lumen group-hover:text-lumen-foreground">
        {t.author.charAt(0)}
      </div>
      <div>
        <p className="text-[13px] font-semibold text-foreground">{t.author}</p>
        <p className="text-[11.5px] text-muted-foreground">{t.role}</p>
      </div>
    </div>
  </div>
);

const TestimonialSection = () => {
  const rowA = testimonials.slice(0, 3);
  const rowB = testimonials.slice(3);

  return (
    <section id="testimonials" className="relative w-full py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-background" />
      <div className="absolute inset-0 -z-10 opacity-[0.04] dot-grid" />

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <SectionHeader
          index="06"
          label="Testimonials"
          title="What our clients say"
          description="Real teams, real launches — from interactive mapping to WebAR campaigns."
          align="center"
          className="mb-12"
        />
      </div>

      {/* dual-direction marquee rows */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <Marquee duration={42} className="py-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          {rowA.map((t) => (
            <TestimonialCard key={t.author} t={t} />
          ))}
        </Marquee>

        <Marquee duration={48} reverse className="py-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          {rowB.map((t) => (
            <TestimonialCard key={t.author} t={t} />
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
};

export default TestimonialSection;
