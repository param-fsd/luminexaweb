"use client";

/**
 * Client-side site chrome: loader, smooth scroll, scroll progress, navbar, footer
 * and the cookie banner.
 *
 * Split out of layout.js so the root layout can stay a server component and export
 * real `metadata`. Previously the layout was `"use client"` and hardcoded a <head>
 * block, which meant every route shipped the same <title> and — worse — the same
 * `<link rel="canonical" href="https://luminexa.in/">`, telling search engines that
 * every page was a duplicate of the homepage.
 */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
/*  Site chrome                                                                */
/* -------------------------------------------------------------------------- */
export default function SiteChrome({ children }) {
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
      window.gtag("config", "G-3CM0LCLPFT", { page_path: pathname });
    }
  }, [pathname]);

  return (
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
  );
}
