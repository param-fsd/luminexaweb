"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  ArrowLeft,
  Home,
  Search,
  Sparkles,
  Link2,
} from "lucide-react";

export default function NotFoundPage() {
  const quickLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Services", href: "/services", icon: Link2 },
    { label: "Contact", href: "/contact-us", icon: Search },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* ================= GLOBAL BACKGROUND (same system as your other pages) ================= */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.18) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-7xl px-4 md:px-8">
        <div className="w-full flex items-center justify-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="w-full max-w-2xl"
          >
            {/* top badge row */}
            <div className="mb-5 flex items-center gap-2">
              <Badge className="rounded-full px-4 py-1">404</Badge>
              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                <Sparkles className="size-3.5 text-primary" />
                Page not found
              </span>
            </div>

            {/* main card */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-background/60 backdrop-blur p-7 md:p-9 shadow-sm">
              {/* subtle dots */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.45) 1px, transparent 0)",
                  backgroundSize: "22px 22px",
                }}
              />

              {/* hover gradient (always subtle) */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-60" />

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl border border-border bg-muted/35 flex items-center justify-center">
                      <AlertTriangle className="size-5 text-primary" />
                    </div>

                    <div>
                      <p className="text-[12px] text-muted-foreground">
                        Error code
                      </p>
                      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                        404
                      </h1>
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex text-[10px] px-3 py-1 rounded-full bg-muted/40 border border-border text-muted-foreground">
                    Broken link / moved page
                  </span>
                </div>

                <h2 className="mt-5 text-[20px] md:text-[22px] font-semibold text-foreground">
                  We couldn’t find that page.
                </h2>

                <p className="mt-2 text-[13px] md:text-[14px] text-muted-foreground leading-relaxed">
                  The link may be incorrect, the page may have moved, or it may
                  no longer be available. Try one of the quick actions below.
                </p>

                {/* quick actions */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button asChild className="rounded-xl">
                    <Link href="/">
                      <Home className="mr-2 size-4" />
                      Go Home
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => {
                      if (typeof window !== "undefined") window.history.back();
                    }}
                  >
                    <ArrowLeft className="mr-2 size-4" />
                    Go Back
                  </Button>
                </div>

                {/* divider */}
                <div className="mt-7 h-px w-full bg-border/70" />

                {/* quick links */}
                <div className="mt-6">
                  <p className="text-[12px] font-medium text-foreground">
                    Quick links
                  </p>

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {quickLinks.map((l) => {
                      const Icon = l.icon;
                      return (
                        <Link
                          key={l.href}
                          href={l.href}
                          className="group rounded-2xl border border-border bg-background/60 backdrop-blur p-4 transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl border border-border bg-muted/35 flex items-center justify-center">
                              <Icon className="size-5 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-[13px] font-semibold text-foreground">
                                {l.label}
                              </div>
                              <div className="text-[11px] text-muted-foreground">
                                Open {l.label.toLowerCase()}
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* footer hint */}
                <p className="mt-6 text-[11px] text-muted-foreground">
                  Tip: If you reached this page from an external link, please
                  share it with us so we can fix it.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
