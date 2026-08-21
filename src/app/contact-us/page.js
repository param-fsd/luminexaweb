"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import PhoneField, {
  DEFAULT_COUNTRY,
  countryByIso,
  toE164,
  validatePhone,
} from "@/components/forms/PhoneField";
import {
  FIELD,
  FIELD_ERROR,
  TEXTAREA,
  TEXTAREA_ERROR,
} from "@/components/forms/fieldStyles";
import ConsentCheckbox, {
  CONSENT_DOCS,
  CONSENT_TEXT,
  CONSENT_VERSION,
} from "@/components/forms/ConsentCheckbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Marquee from "@/components/motion/Marquee";
import {
  ArrowLeft,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  ShieldCheck,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const displayFont = {
  fontFamily: "var(--font-display, 'Montserrat', sans-serif)",
  letterSpacing: "-0.035em",
};

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

/* ----- shared bits (match the global theme) ----- */
const Label = ({ children }) => (
  <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
    <span className="h-1.5 w-1.5 rounded-full bg-lumen" />
    {children}
  </div>
);

const Heading = ({ children, className = "" }) => (
  <h2
    style={displayFont}
    className={`mt-4 text-[26px] sm:text-[34px] md:text-[42px] font-bold leading-[1.05] text-foreground ${className}`}
  >
    {children}
  </h2>
);

const InfoCard = ({ icon: Icon, title, value, href, description }) => {
  const Wrapper = href ? "a" : "div";
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
      <Wrapper
        {...(href ? { href } : {})}
        className={cx(
          "group flex items-start gap-4 rounded-[22px] border border-border/60 bg-background/70 p-5 transition-colors",
          href ? "hover:border-lumen/50" : ""
        )}
      >
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-lumen group-hover:text-lumen-foreground">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {title}
          </p>
          <p className="mt-1.5 text-[14px] sm:text-[15px] font-semibold text-foreground break-words">
            {value}
          </p>
          {description ? (
            <p className="mt-1.5 text-[12px] leading-5 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      </Wrapper>
    </motion.div>
  );
};

const TrustRow = ({ icon: Icon, title, text }) => (
  <div className="flex items-start gap-3 rounded-[18px] border border-border/60 bg-background/70 p-4 transition-colors hover:border-lumen/50">
    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-lumen/15 text-foreground">
      <Icon className="size-5" />
    </span>
    <div>
      <p className="text-[13px] sm:text-[14px] font-semibold text-foreground">
        {title}
      </p>
      <p className="mt-1 text-[11px] sm:text-[12px] leading-5 text-muted-foreground">
        {text}
      </p>
    </div>
  </div>
);

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    /* Dial code and national number are tracked separately — see PhoneField. */
    country: DEFAULT_COUNTRY,
    mobile: "",
    message: "",
    /* Never pre-ticked — a pre-checked box is not consent. */
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    const phoneError = validatePhone(form.country, form.mobile);
    if (phoneError) newErrors.mobile = phoneError;

    if (!form.message.trim()) newErrors.message = "Message is required";

    if (!form.consent) {
      newErrors.consent =
        "Please accept the Terms & Conditions and Privacy Policy to continue";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      await addDoc(collection(db, "contactUs"), {
        name: form.name.trim(),
        email: form.email.trim(),
        /* Full dialable number, plus the parts so the code can be filtered on. */
        phone: toE164(form.country, form.mobile),
        phoneCountry: form.country,
        phoneDialCode: countryByIso(form.country).dial,
        phoneNumber: form.mobile.trim(),
        message: form.message.trim(),
        /* Auditable record of what was agreed to, and when. */
        consentAccepted: true,
        consentAcceptedAt: serverTimestamp(),
        consentText: CONSENT_TEXT,
        consentVersion: CONSENT_VERSION,
        consentDocuments: CONSENT_DOCS,
        status: "new",
        source: "website contact page",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        country: DEFAULT_COUNTRY,
        mobile: "",
        message: "",
        consent: false,
      });
      setErrors({});

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Something went wrong while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Field styling is shared across every form — see components/forms/fieldStyles. */
  const inputClass = FIELD;
  const inputClassError = FIELD_ERROR;
  const textareaClass = TEXTAREA;
  const textareaClassError = TEXTAREA_ERROR;

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "support@luminexa.in",
      href: "mailto:support@luminexa.in",
      description: "For enquiries and project discussions.",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 86604 49970",
      href: "tel:+918660449970",
      description: "Call us for quick assistance.",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "1st Stage Banashankari, Bangalore, Karnataka",
      description: "India",
    },
  ];

  return (
    <main className="relative w-full overflow-hidden">
      {/* global background — matches the rest of the site */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 opacity-[0.04] line-grid" />
        <div className="absolute -top-40 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8 pb-6">
        {/* ============ breadcrumb ============ */}
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="mt-6 mb-5 flex flex-wrap items-center gap-2 text-[11px] sm:text-[12px] text-muted-foreground"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3" />
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">Contact Us</span>
        </motion.div>

        {/* ============ HERO (dark) ============ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[28px] border border-border/60 bg-foreground text-background"
        >
          {/* inner grid */}
          <div className="absolute inset-0 opacity-[0.06]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
          </div>

          {/* lumen glows */}
          <motion.div
            className="absolute -top-24 -left-24 h-[280px] w-[280px] rounded-full bg-lumen/25 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute -bottom-24 -right-16 h-[280px] w-[280px] rounded-full bg-white/10 blur-3xl" />

          {/* ghost marquee */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-3 select-none"
            aria-hidden
          >
            <Marquee duration={40} className="opacity-[0.3]">
              {["LET'S TALK", "GET IN TOUCH", "LUMINEXA", "LET'S TALK", "GET IN TOUCH", "LUMINEXA"].map(
                (word, i) => (
                  <span
                    key={`${word}-${i}`}
                    className="display-outline display-outline-light px-8 text-[58px] sm:text-[84px] md:text-[104px] leading-none whitespace-nowrap"
                  >
                    {word}
                  </span>
                )
              )}
            </Marquee>
          </div>

          <div className="relative z-10 px-5 py-8 sm:px-8 md:px-12 md:py-12 lg:py-14">
            <span className="inline-flex items-center gap-2 rounded-full bg-lumen px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-lumen-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-lumen-foreground lumen-pulse" />
              Contact Luminexa
            </span>

            <h1
              style={displayFont}
              className="mt-5 max-w-4xl text-[30px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-bold leading-[1.02] text-background"
            >
              Let&apos;s build something{" "}
              <span className="text-lumen">worth talking about.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-[13px] sm:text-[15px] leading-7 text-background/75">
              Share your requirement and our team will get back to you — usually
              within 24 hours. From immersive experiences to intelligent
              platforms, we&apos;re ready to help.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                asChild
                className="group rounded-full px-6 h-11 bg-lumen text-lumen-foreground font-semibold hover:bg-lumen/90"
              >
                <Link href="#contact-form">
                  Send a Message
                  <ArrowUpRight className="size-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full px-6 h-11 border-background/25 bg-transparent text-background hover:bg-background/10 hover:text-background"
              >
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </div>

            {/* quick contact strip */}
            <div className="mt-7 grid max-w-2xl grid-cols-1 gap-4 border-t border-white/10 pt-5 sm:grid-cols-3">
              {[
                { icon: Mail, label: "Email", value: "support@luminexa.in" },
                { icon: Phone, label: "Phone", value: "+91 86604 49970" },
                { icon: Clock, label: "Response", value: "Within 24 hours" },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex items-center gap-3">
                    <span className="inline-flex size-9 items-center justify-center rounded-xl bg-white/10 text-lumen">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-background/55">
                        {s.label}
                      </div>
                      <div className="text-[13px] font-semibold text-background">
                        {s.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* ============ CONTACT INFO + FORM ============ */}
        <section className="mt-10 grid grid-cols-1 gap-8 md:mt-14 xl:grid-cols-[0.9fr_1.1fr] xl:gap-12 items-start">
          {/* left — info */}
          <motion.div {...fadeUp} transition={{ duration: 0.55 }}>
            <Label>Contact Information</Label>
            <Heading>Reach us directly.</Heading>

            <p className="mt-4 max-w-xl text-[13px] sm:text-[14px] leading-7 text-muted-foreground">
              Prefer a direct line? Use the details below — or fill in the form
              and we&apos;ll get back to you shortly.
            </p>

            <div className="mt-6 space-y-3">
              {contactInfo.map((info) => (
                <InfoCard key={info.title} {...info} />
              ))}
            </div>

            <div className="mt-4 grid gap-3">
              <TrustRow
                icon={Clock}
                title="Response time"
                text="Within 24 hours on business days."
              />
              <TrustRow
                icon={ShieldCheck}
                title="Privacy-first"
                text="Your details are used only to respond to your enquiry."
              />
            </div>

            <div className="mt-6">
              <Button
                asChild
                variant="outline"
                className="group rounded-full px-6 h-11 hover:border-lumen/50"
              >
                <Link href="/privacy-policy">
                  Read Privacy Policy
                  <ArrowUpRight className="size-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* right — form */}
          <motion.div
            id="contact-form"
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="relative scroll-mt-24"
          >
            <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[30px] bg-gradient-to-br from-lumen/15 via-transparent to-primary/10 opacity-80 blur-2xl" />

            <div className="rounded-[26px] border border-border/60 bg-background/75 backdrop-blur px-5 py-6 sm:px-7 sm:py-8 md:px-9 md:py-9 shadow-sm">
              <Label>Send Message</Label>

              <Heading className="!text-[22px] sm:!text-[28px] md:!text-[32px]">
                Tell us about your project.
              </Heading>

              <p className="mt-3 text-[12px] sm:text-[13px] md:text-[14px] leading-6 text-muted-foreground max-w-2xl">
                Fill in the form and we&apos;ll get back to you shortly.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="mt-6 rounded-[22px] border border-lumen/40 bg-lumen/5 px-6 py-10 text-center"
                >
                  <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-lumen text-lumen-foreground">
                    <CheckCircle2 className="size-9" />
                  </div>
                  <p className="mt-4 text-[18px] font-semibold text-foreground">
                    Thank you! Your message has been sent.
                  </p>
                  <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
                    Our team will get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 grid gap-5 md:grid-cols-2"
                >
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Your Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className={errors.name ? inputClassError : inputClass}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Your Email <span className="text-destructive">*</span>
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={errors.email ? inputClassError : inputClass}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <PhoneField
                      id="contact-mobile"
                      country={form.country}
                      number={form.mobile}
                      onCountryChange={(country) => {
                        setForm((p) => ({ ...p, country }));
                        setErrors((p) => ({ ...p, mobile: "" }));
                      }}
                      onNumberChange={(mobile) => {
                        setForm((p) => ({ ...p, mobile }));
                        setErrors((p) => ({ ...p, mobile: "" }));
                      }}
                      error={errors.mobile}
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-sm font-medium text-foreground">
                      Your Message <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirement..."
                      className={
                        errors.message ? textareaClassError : textareaClass
                      }
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">
                        {errors.message}
                      </p>
                    )}
                    <p className="text-[11px] leading-5 text-muted-foreground">
                      Mention your requirement briefly.
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <ConsentCheckbox
                      id="contact-consent"
                      checked={form.consent}
                      onChange={(consent) => {
                        setForm((p) => ({ ...p, consent }));
                        setErrors((p) => ({ ...p, consent: "" }));
                      }}
                      error={errors.consent}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="group md:col-span-2 h-12 rounded-full bg-lumen text-lumen-foreground text-sm font-semibold hover:bg-lumen/90"
                  >
                    <Send className="mr-2 size-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </section>

        {/* ============ CTA (dark) ============ */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="mt-12 mb-6 md:mt-16"
        >
          <div className="relative overflow-hidden rounded-[28px] border border-border/60 bg-foreground text-background">
            <div className="absolute inset-0 opacity-[0.06]">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              />
            </div>
            <div className="absolute -bottom-20 left-1/2 h-[240px] w-[240px] -translate-x-1/2 rounded-full bg-lumen/20 blur-3xl" />

            <div className="relative z-10 px-5 py-10 text-center sm:px-8 md:px-10 md:py-14">
              <p className="text-[10px] uppercase tracking-[0.2em] text-background/70 sm:text-[12px]">
                Ready to connect
              </p>

              <h2
                style={displayFont}
                className="mx-auto mt-3 max-w-3xl text-[24px] font-bold leading-[1.1] text-background sm:text-[32px] md:text-[42px]"
              >
                Have a project in mind? Let&apos;s talk.
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-[13px] leading-7 text-background/75 sm:text-[14px]">
                Reach out and we&apos;ll get back to you soon — no obligation,
                strategy-first, built to scale.
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  className="rounded-full px-6 h-11 bg-lumen text-lumen-foreground font-semibold hover:bg-lumen/90 w-full sm:w-auto"
                >
                  <Link href="mailto:support@luminexa.in">Email Us</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-6 h-11 border-background/25 bg-transparent text-background hover:bg-background/10 hover:text-background w-full sm:w-auto"
                >
                  <Link href="tel:+918660449970">Call Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default ContactPage;
