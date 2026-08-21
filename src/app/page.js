"use client";

import React from "react";
import HeroSection from "@/components/HeroSection";
import WhatsNew from "@/components/WhatsNew";
import LogoSection from "@/components/LogoSection";
import FeatureSection from "@/components/FeatureSection";
import WorkingSection from "@/components/WorkingSection";
import ServicesOverview from "@/components/services/ServicesOverview";
import Blog from "@/app/blogs/page";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import MainProduct from "@/components/MainProduct";
import BelowHeroExperience from "@/components/BelowHeroExperience";

export default function LandingPage() {
  return (
    <main className="flex-1 relative">
      {/* Hero — headline reveal + capability ticker */}
      <HeroSection />

      {/* 01 · What's New — latest updates */}
      

      {/* 02 · Why Luminexa — animated counters */}
      <LogoSection />

      <WhatsNew />

      {/* Live preview video */}
      <BelowHeroExperience />

      {/* 03 · Flagship product — visualization platform */}
      <MainProduct />

      {/* Services overview */}
      <ServicesOverview variant="preview" />

      {/* 04 · Capabilities */}
      <FeatureSection />

      {/* 05 · Process timeline (scroll-driven) */}
      <WorkingSection />

      {/* 07 · FAQ */}
      <FAQSection />

      {/* Latest from the blog */}
      <Blog limit={3} showNewsletter={false} />

      {/* Final CTA */}
      <CTASection />
    </main>
  );
}
