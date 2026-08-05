"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Menu,
  ChevronRight,
  ChevronDown,
  Grid2X2,
  Layers3,
  Info,
  MessageCircle,
  Home,
  Sparkles,
  Search,
  ArrowRight,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Database,
  Layout,
  Code2,
  Cpu,
  ScanLine,
  Camera,
  Box,
  Map,
} from "lucide-react";
import { Button } from "./ui/button";

const Navbar = ({ isScrolled }) => {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDock, setShowDock] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // close the services mega-menu on route change
  useEffect(() => {
    setServicesOpen(false);
  }, [pathname]);

  // Hide/Show top navbar based on scroll direction
  const [hideTopNav, setHideTopNav] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;

      setShowDock(y > 140);

      const lastY = lastYRef.current;
      const delta = y - lastY;

      if (Math.abs(delta) > 8) {
        if (delta > 0 && y > 120) setHideTopNav(true);
        if (delta < 0) setHideTopNav(false);
      }

      lastYRef.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = useMemo(
    () => [
      { href: "/services", label: "Services", desc: "AI, Mapping, WebAR, 3D & More" },
      { href: "/case-studies", label: "Case Studies", desc: "Real results & launches" },
      { href: "/blogs", label: "Blog", desc: "Guides, insights, updates" },
      { href: "/careers", label: "Careers", desc: "Join our team" },
      { href: "/portfolio", label: "Portfolio", desc: "Python Developer Showcase" },
      { href: "/about-us", label: "About Us", desc: "Who we are & why" },
    ],
    []
  );

  const dockItems = useMemo(
    () => [
      { href: "/", label: "Home", icon: Home },
      { href: "/services", label: "Services", icon: Layers3 },
      { href: "/portfolio", label: "Work", icon: Grid2X2 },
      { href: "/about-us", label: "About", icon: Info },
    ],
    []
  );

  // Services mega-menu (two list columns + featured card)
  const serviceMenu = useMemo(
    () => ({
      groups: [
        {
          heading: "Software & Data",
          items: [
            { href: "/services/crm-erp", label: "CRM | ERP Systems", icon: Database },
            { href: "/services/website-app-development", label: "Website & App Dev", icon: Layout },
            { href: "/services/custom-web-application", label: "Custom Web Apps", icon: Code2 },
            { href: "/services/artificial-intelligence", label: "AI & Automation", icon: Cpu },
          ],
        },
        {
          heading: "Immersive & Mapping",
          items: [
            { href: "/services/mapping", label: "Mapping & GIS", icon: Map },
            { href: "/services/360-virtual-tour", label: "360° Virtual Tour", icon: Camera },
            { href: "/services/3d-visualization", label: "3D Visualization", icon: Box },
            { href: "/services/augmented-reality", label: "nexAR — WebAR", icon: ScanLine },
          ],
        },
      ],
      features: [
        {
          href: "/services/mapping",
          image: "/map3d.jpg",
          badge: "Featured",
          title: "Mapping & GIS",
          desc: "Drone surveys, GIS & 3D terrain visualization.",
        },
        {
          href: "/services/3d-visualization",
          image: "/3d.jpg",
          badge: "Featured",
          title: "3D Immersive",
          desc: "Photoreal 3D models, renders & walkthroughs.",
        },
      ],
    }),
    []
  );

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  // Animations
  const sheetVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.18 } },
    exit: { opacity: 0, transition: { duration: 0.16 } },
  };

  const panelVariants = {
    hidden: { y: 24, opacity: 0, scale: 0.985 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.22, ease: "easeOut" },
    },
    exit: {
      y: 24,
      opacity: 0,
      scale: 0.985,
      transition: { duration: 0.18, ease: "easeIn" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.2, ease: "easeOut" },
    }),
  };

  return (
    <>
      {/* TOP NAVBAR */}
      <motion.header
        initial={false}
        animate={{ y: hideTopNav ? -90 : 0, opacity: hideTopNav ? 0.2 : 1 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        onMouseLeave={() => setServicesOpen(false)}
        className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 px-4 md:px-10 ${
          isScrolled || servicesOpen ? "bg-background/80 border-b border-border shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-[120px]">
              <Image
                src="/logo.png"
                width={160}
                height={40}
                alt="Logo"
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <span className="hidden lg:inline text-xs text-muted-foreground">
              • Elevate with AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const active = isActive(item.href);

              // "Services" opens the mega-menu dropdown
              if (item.label === "Services") {
                return (
                  <div key={item.href} onMouseEnter={() => setServicesOpen(true)}>
                    <Link
                      href={item.href}
                      className={`group relative flex items-center gap-1 text-sm font-medium transition-colors ${
                        active || servicesOpen
                          ? "text-foreground"
                          : "text-foreground/75 hover:text-foreground"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`size-3.5 transition-transform duration-200 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                      <span
                        className={`absolute left-0 -bottom-1.5 h-[2px] rounded-full bg-lumen transition-all duration-300 ${
                          active || servicesOpen ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setServicesOpen(false)}
                  className={`group relative text-sm font-medium transition-colors ${
                    active
                      ? "text-foreground"
                      : "text-foreground/75 hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 -bottom-1.5 h-[2px] rounded-full bg-lumen transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex gap-3 items-center">
            <Link
              href="/faq"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </Link>

            <Link href="/getstarted">
              <Button className="rounded-full text-sm group py-5 relative overflow-hidden bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 shadow-sm">
                <span className="relative z-10 flex items-center">
                  Get Started
                  <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-lumen text-lumen-foreground transition-transform duration-200 group-hover:translate-x-0.5">
                    <ChevronRight className="size-3.5" />
                  </span>
                </span>
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen((s) => !s)}
              className="rounded-full"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* ✅ SERVICES MEGA-MENU (desktop) */}
        <AnimatePresence>
          {servicesOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full z-50 hidden md:block"
            >
              <div className="mx-auto max-w-6xl px-4 md:px-6 pb-4 pt-1">
                <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px]">
                    {/* Two list columns */}
                    <div className="grid grid-cols-1 gap-x-10 gap-y-7 p-6 sm:grid-cols-2 md:p-8">
                      {serviceMenu.groups.map((group) => (
                        <div key={group.heading}>
                          <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            {group.heading}
                          </p>

                          <ul className="mt-3 space-y-1">
                            {group.items.map((s) => {
                              const Icon = s.icon;
                              return (
                                <li key={s.href}>
                                  <Link
                                    href={s.href}
                                    onClick={() => setServicesOpen(false)}
                                    className="group flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-accent/40"
                                  >
                                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-lumen group-hover:text-lumen-foreground">
                                      <Icon className="size-[18px]" />
                                    </span>
                                    <span className="text-sm font-medium text-foreground">
                                      {s.label}
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Featured cards — vertical, centered with gap */}
                    <div className="flex flex-col justify-center gap-4 border-t border-border bg-muted/30 px-4 py-7 lg:border-l lg:border-t-0 lg:py-8">
                      {serviceMenu.features.map((f) => (
                        <Link
                          key={f.href}
                          href={f.href}
                          onClick={() => setServicesOpen(false)}
                          className="group overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <div className="relative h-20 w-full overflow-hidden">
                            <Image
                              src={f.image}
                              alt={f.title}
                              fill
                              sizes="280px"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/10 to-transparent" />
                            <span className="absolute left-2.5 top-2.5 rounded-full bg-lumen px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-lumen-foreground">
                              {f.badge}
                            </span>
                          </div>

                          <div className="px-3.5 py-3">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-[13px] font-semibold text-foreground">
                                {f.title}
                              </p>
                              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                            </div>
                            <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
                              {f.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ✅ CLEAN MODERN MOBILE MENU (Sheet style) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[80]"
          >
            {/* Backdrop */}
            <button
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="
                absolute right-3 top-3 bottom-3 left-3
                rounded-3xl
                bg-background/90
                backdrop-blur-2xl
                border border-border/60
                shadow-2xl
                overflow-hidden
                flex flex-col
              "
            >
              {/* Header */}
              <div className="px-5 pt-5 pb-4 flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3"
                >
                  <div className="relative w-9 h-9 rounded-2xl   overflow-hidden">
                    <Image src="/logo3.png" alt="Logo" fill className="object-contain p-1.5" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-foreground">Luminexa</p>
                    <p className="text-[12px] text-muted-foreground">
                      AI • Mapping • XR • 3D Experiences
                    </p>
                  </div>
                </Link>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full"
                >
                  <X className="size-5" />
                </Button>
              </div>

              {/* Search / Quick */}
              <div className="px-5 pb-4">
                

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Link
                    href="/getstarted"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-2xl border border-foreground/15 bg-foreground/5 px-3 py-3"
                  >
                    <p className="text-[12px] text-muted-foreground">Start</p>
                    <p className="text-sm font-semibold text-foreground flex items-center gap-1">
                      Get Started <ArrowRight className="size-4" />
                    </p>
                  </Link>

                  <Link
                    href="/contact-us"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-2xl border border-border/60 bg-background/60 px-3 py-3"
                  >
                    <p className="text-[12px] text-muted-foreground">Talk</p>
                    <p className="text-sm font-semibold text-foreground flex items-center gap-1">
                      Contact <MessageCircle className="size-4" />
                    </p>
                  </Link>
                </div>
              </div>

              {/* Links */}
              <div className="px-5 pb-5 flex-1 overflow-y-auto">
                <p className="text-[11px] tracking-wide text-muted-foreground uppercase mb-3">
                  Menu
                </p>

                <div className="space-y-2">
                  {navItems.map((item, index) => {
                    const active = isActive(item.href);
                    return (
                      <motion.div
                        key={item.href}
                        custom={index}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`
                            group
                            flex items-start justify-between gap-3
                            rounded-2xl
                            border border-border/60
                            px-4 py-3
                            transition-all duration-200
                            ${active ? "bg-accent/45" : "bg-background/60 hover:bg-accent/30"}
                          `}
                        >
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {item.label}
                            </p>
                            <p className="text-[12px] text-muted-foreground mt-0.5">
                              {item.desc}
                            </p>
                          </div>

                          <div className="mt-1 flex items-center gap-2">
                            {active && (
                              <span className="text-[11px] font-semibold text-primary">
                                Active
                              </span>
                            )}
                            <ChevronRight className="size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer mini cards */}
                <div className="mt-5 grid grid-cols-3 gap-2">
                  <Link
                    href="/faq"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-2xl border border-border/60 bg-background/60 px-3 py-3"
                  >
                    <p className="text-[12px] font-semibold text-foreground">FAQ</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Help</p>
                  </Link>

                  <Link
                    href="/contact-us"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-2xl border border-border/60 bg-background/60 px-3 py-3"
                  >
                    <p className="text-[12px] font-semibold text-foreground">Support</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Chat</p>
                  </Link>

                  <Link
                    href="/about-us"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-2xl border border-border/60 bg-background/60 px-3 py-3"
                  >
                    <p className="text-[12px] font-semibold text-foreground">Company</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">About</p>
                  </Link>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="px-5 py-4 border-t border-border/60 bg-background/60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                    <MapPin className="size-4" />
                    <span>Bengaluru, IN</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="tel:+918660449970"
                      className="rounded-full border border-border/60 bg-background/70 px-3 py-2 text-[12px] font-semibold text-foreground flex items-center gap-1.5"
                    >
                      <Phone className="size-4" /> Call
                    </a>
                    <a
                      href="mailto:info@luminexa.in"
                      className="rounded-full border border-border/60 bg-background/70 px-3 py-2 text-[12px] font-semibold text-foreground flex items-center gap-1.5"
                    >
                      <Mail className="size-4" /> Email
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ BOTTOM CAPSULE DOCK (reduced height) */}
      <AnimatePresence>
        {showDock && !mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] w-[92vw] max-w-[560px]"
          >
            <div
              className="
                relative
                flex items-center justify-between
                rounded-[36px]
                px-3.5 sm:px-4
                py-2
                bg-white
                backdrop-blur-2xl
                shadow-2xl
                border border-white/10
                overflow-hidden
              "
            >
              <div className="pointer-events-none absolute inset-0 opacity-80 bg-gradient-to-r from-primary/15 via-transparent to-secondary/15" />
              <div className="pointer-events-none absolute -inset-24 blur-3xl opacity-40 bg-gradient-to-r from-primary/40 via-transparent to-secondary/40" />

              <Link
                href="/"
                className="relative z-10 flex items-center gap-2 rounded-full px-2.5 py-1.5 hover:bg-white/10 transition"
                aria-label="Home"
              >
                <div className="relative w-7 h-7">
                  <Image src="/logo3.png" alt="Logo" fill className="object-contain" />
                </div>
              </Link>

              <div className="relative z-10 mx-2 hidden sm:block h-7 w-px bg-white/10" />

              <div className="relative z-10 flex items-center gap-1.5">
                {dockItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        group relative flex items-center gap-2 rounded-full
                        px-3 py-1.5 text-[12px] font-medium transition-all duration-200
                        ${
                          active
                            ? "bg-white/12 text-foreground"
                            : "text-foreground/75 hover:text-foreground hover:bg-white/10"
                        }
                      `}
                    >
                      <Icon
                        className={`size-[15px] transition-transform duration-200 ${
                          active ? "" : "group-hover:scale-110"
                        }`}
                      />
                      <span className="hidden sm:inline">{item.label}</span>

                      {active && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-lumen lumen-pulse" />
                      )}
                    </Link>
                  );
                })}
              </div>

              <Link href="/contact-us" className="relative z-10">
                <button
                  className="
                    group flex items-center gap-2 rounded-full
                    px-3.5 py-1.5 bg-white text-black text-[12px] font-semibold
                    shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]
                  "
                >
                  <MessageCircle className="size-[15px] group-hover:rotate-6 transition-transform duration-200" />
                  <span className="hidden xs:inline">Contact</span>
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
