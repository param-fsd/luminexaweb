"use client";

import { Geist, Geist_Mono, Space_Grotesk, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import Script from "next/script";
import { usePathname } from "next/navigation";

/* -------------------------------------------------------------------------- */
/*  Fonts                                                                      */
/* -------------------------------------------------------------------------- */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Montserrat — primary / display & heading font */
const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/* Space Grotesk — secondary / body font */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/* -------------------------------------------------------------------------- */
/*  Cookie Consent (Bottom Right)                                              */
/* -------------------------------------------------------------------------- */
const COOKIE_KEY = "cookieConsent";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [prefs, setPrefs] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) setIsVisible(true);
  }, []);

  const save = (nextPrefs) => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(nextPrefs));
    setIsVisible(false);
  };

  const acceptAll = () =>
    save({ necessary: true, analytics: true, marketing: true });

  const rejectAll = () =>
    save({ necessary: true, analytics: false, marketing: false });

  const savePrefs = () => save({ ...prefs, necessary: true });

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-4 right-4 z-[9999] w-[320px] sm:w-[360px]"
      role="dialog"
      aria-modal="true"
    >
      <Card className="rounded-xl border border-border bg-background shadow-2xl">
        <CardContent className="p-4 space-y-2">
          <h2 className="text-sm font-semibold">Cookie Preferences</h2>

          <p className="text-[11.5px] text-muted-foreground leading-relaxed">
            We use cookies to improve your experience and analyze usage. Read our{" "}
            <a href="/privacy-policy" className="underline hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>

          {showSettings && (
            <div className="pt-2 space-y-2">
              {/* Necessary */}
              <div className="flex justify-between items-start gap-2 rounded-lg border border-border p-2">
                <div>
                  <p className="text-xs font-medium">Necessary</p>
                  <p className="text-[10px] text-muted-foreground">
                    Required for core features.
                  </p>
                </div>
                <span className="text-[10px] text-emerald-500">Always on</span>
              </div>

              {/* Analytics */}
              <div className="flex justify-between items-start gap-2 rounded-lg border border-border p-2">
                <div>
                  <p className="text-xs font-medium">Analytics</p>
                  <p className="text-[10px] text-muted-foreground">
                    Usage tracking.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  onChange={(e) =>
                    setPrefs((p) => ({ ...p, analytics: e.target.checked }))
                  }
                  className="h-3.5 w-3.5 accent-primary"
                />
              </div>

              {/* Marketing */}
              <div className="flex justify-between items-start gap-2 rounded-lg border border-border p-2">
                <div>
                  <p className="text-xs font-medium">Marketing</p>
                  <p className="text-[10px] text-muted-foreground">
                    Personalized ads.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.marketing}
                  onChange={(e) =>
                    setPrefs((p) => ({ ...p, marketing: e.target.checked }))
                  }
                  className="h-3.5 w-3.5 accent-primary"
                />
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-2 px-4 pb-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={rejectAll}
              className="h-8 px-3 text-[11px] rounded-full"
            >
              Reject
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowSettings((s) => !s)}
              className="h-8 px-3 text-[11px] rounded-full"
            >
              {showSettings ? "Hide" : "Customize"}
            </Button>
          </div>

          <Button
            onClick={showSettings ? savePrefs : acceptAll}
            className="h-8 px-4 text-[11px] rounded-full"
          >
            {showSettings ? "Save" : "Accept"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Root Layout                                                                */
/* -------------------------------------------------------------------------- */
export default function RootLayout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Navbar scroll
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GA page tracking (SPA)
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "G-3CM0LCLPFT", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        {/* Primary SEO */}
        <title>Luminexa Technologies | AI-Driven Platforms, Mapping Systems, CRM & Immersive Experiences</title>

<meta
  name="description"
  content="Luminexa Technologies delivers AI-driven platforms, geospatial mapping systems, CRM solutions, 360 virtual tours, and immersive digital experiences. We build custom software that transforms real estate sales, brand engagement, and business operations."
/>

<meta
  name="keywords"
  content="AI platforms, geospatial mapping, plot mapping software, real estate mapping, CRM solutions, sales automation, 360 virtual tours, immersive experiences, WebAR, AR solutions, XR platforms, custom software development, digital transformation, Luminexa Technologies, nexMap AI, interactive mapping, real estate technology, AI sales tools"
/>
        <meta name="author" content="Luminexa Technologies" />
        <meta name="robots" content="index, follow" />

        {/* Canonical */}
        <link rel="canonical" href="https://luminexa.in/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Luminexa Technologies" />
        <meta
          property="og:title"
          content="Luminexa Technologies | AI-Driven Platforms, Mapping Systems, CRM & Immersive Experiences"
        />
        <meta
          property="og:description"
          content="Luminexa Technologies delivers AI-driven platforms, geospatial mapping systems, CRM solutions, 360 virtual tours, and immersive digital experiences. We build custom software that transforms real estate sales, brand engagement, and business operations."
        />
        <meta property="og:url" content="https://luminexa.in/" />
        <meta property="og:image" content="https://luminexa.in/preview.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Luminexa Technologies | AI-Driven Platforms, Mapping Systems, CRM & Immersive Experiences"
        />
        <meta
          name="twitter:description"
          content="Luminexa Technologies delivers AI-driven platforms, geospatial mapping systems, CRM solutions, 360 virtual tours, and immersive digital experiences. We build custom software that transforms real estate sales, brand engagement, and business operations."
        />
        <meta name="twitter:image" content="https://luminexa.in/preview.png" />

        {/* PWA / Theme */}
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Luminexa" />

        {/* Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3CM0LCLPFT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3CM0LCLPFT');
          `}
        </Script>

        {/* Structured Data (JSON-LD) */}
        <Script type="application/ld+json" strategy="afterInteractive">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Luminexa Technologies",
            "url": "https://luminexa.in",
            "logo": "https://luminexa.in/logo.png",
            "description": "Luminexa Technologies | AI-Driven Platforms, Mapping Systems, CRM & Immersive Experiences",
            "sameAs": [
              "https://www.instagram.com/luminexa",
              "https://www.linkedin.com/company/luminexa"
            ]
          }
        `}
        </Script>
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${spaceGrotesk.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Loader />
          <SmoothScroll />
          <ScrollProgress />
          <Navbar isScrolled={isScrolled} mounted={mounted} />
          {children}
          <CookieConsent />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
