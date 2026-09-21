"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { getTrackingIds, trackConversion } from "@/lib/siteAnalytics";
import PhoneField, {
  DEFAULT_COUNTRY,
  countryByIso,
  toE164,
  validatePhone,
} from "@/components/forms/PhoneField";
import {
  FIELD,
  FIELD_ERROR,
  SELECT,
  TEXTAREA,
} from "@/components/forms/fieldStyles";
import ConsentCheckbox, {
  CONSENT_DOCS,
  CONSENT_TEXT,
  CONSENT_VERSION,
} from "@/components/forms/ConsentCheckbox";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Send,
  CheckCircle2,
  Sparkles,
  Clock,
  ShieldCheck,
  Rocket,
  ArrowUpRight,
  Phone,
  Mail,
  User2,
  Building2,
  Briefcase,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

const SectionBg = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-background" />
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.14) 1px, transparent 1px)",
        backgroundSize: "58px 58px",
      }}
    />
    <div className="absolute -top-24 -left-24 h-[340px] w-[340px] rounded-full bg-primary/10 blur-3xl" />
    <div className="absolute -bottom-24 -right-20 h-[380px] w-[380px] rounded-full bg-secondary/10 blur-3xl" />
  </div>
);

const trustPoints = [
  { icon: Clock, label: "24-hour response" },
  { icon: ShieldCheck, label: "Scope-based planning" },
  { icon: Sparkles, label: "Clean proposal flow" },
];

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    designation: "",
    solutionType: "",
    budget: "",
    /* Dial code and national number are tracked separately — see PhoneField. */
    country: DEFAULT_COUNTRY,
    mobile: "",
    email: "",
    details: "",
    /* Never pre-ticked — a pre-checked box is not consent. */
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const solutionOptions = useMemo(
    () => [
      "Web Development",
      "Mobile App",
      "WebAR / AR Experience",
      "Image Mapping",
      "360 Virtual Tour",
      "3D Immersive",
      "AI & Automation",
      "Cloud / Backend",
      "Other",
    ],
    []
  );

  const quickTags = useMemo(
    () => [
      "Requirement Intake",
      "Scope-Based Planning",
      "Proposal Ready",
      "Professional Discussion",
    ],
    []
  );

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    const phoneError = validatePhone(formData.country, formData.mobile);
    if (phoneError) newErrors.mobile = phoneError;

    if (!formData.consent) {
      newErrors.consent =
        "Please accept the Terms & Conditions and Privacy Policy to continue";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setSubmitError("");

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      await addDoc(collection(db, "leads"), {
        assignedTo: "",
        budget: formData.budget.trim(),
        businessCategory: "",
        companyAddress: "",
        companyName: formData.company.trim(),
        companyOtherDetails: formData.details.trim(),
        contactPoints: [
          {
            contactName: formData.name.trim(),
            designation: formData.designation.trim(),
            emailId: formData.email.trim().toLowerCase(),
            mobileNumber: toE164(formData.country, formData.mobile),
            mobileCountry: formData.country,
            mobileDialCode: countryByIso(formData.country).dial,
            mobileNationalNumber: formData.mobile.trim(),
            otherDetails: "",
          },
        ],
        /* Auditable record of what was agreed to, and when. */
        consentAccepted: true,
        consentAcceptedAt: serverTimestamp(),
        consentText: CONSENT_TEXT,
        consentVersion: CONSENT_VERSION,
        consentDocuments: CONSENT_DOCS,
        createdAt: serverTimestamp(),
        deleted: false,
        followUpDate: "",
        notes: "",
        projectType: formData.solutionType.trim(),
        source: "website enquiry",
        status: "new",
        /* Joins this lead to its browsing session, so the CRM can show the
           pages and campaign that produced it next to the lead itself. */
        ...getTrackingIds(),
        updatedAt: serverTimestamp(),
        website: "",
      });

      trackConversion("lead_form", { page: "/getstarted" });

      setSubmitted(true);

      setFormData({
        name: "",
        company: "",
        designation: "",
        solutionType: "",
        budget: "",
        country: DEFAULT_COUNTRY,
        mobile: "",
        email: "",
        details: "",
        consent: false,
      });

      setErrors({});

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting lead:", error);
      setSubmitError(
        "We couldn't submit your enquiry. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Field styling is shared across every form — see components/forms/fieldStyles. */
  const inputClass = FIELD;
  const inputClassError = FIELD_ERROR;
  const textareaClass = cx(TEXTAREA, "min-h-[110px]");
  const selectClass = SELECT;

  return (
    <section className="relative min-h-screen overflow-hidden py-4 sm:py-6 md:py-8">
      <SectionBg />

      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-5">
        {/* ============ HEADER / HERO (unchanged) ============ */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[20px] sm:rounded-[24px] md:rounded-[26px] border border-border/60 bg-gradient-to-br from-foreground to-foreground/90 text-background"
        >
          <div className="absolute inset-0 opacity-[0.08]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />
          </div>

          <div className="relative z-10 px-4 py-6 sm:px-6 sm:py-7 md:px-8 md:py-8 lg:px-10 lg:py-10">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur">
                  Enquiry
                </Badge>

                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] text-white/75">
                  <Sparkles className="size-3.5 text-white/90" />
                  Professional requirement intake
                </span>
              </div>

              <h2 className="mt-3 text-[24px] leading-tight sm:text-[34px] md:text-[44px] lg:text-[52px] font-semibold tracking-[-0.04em] text-white">
                Where Innovation Meets Excellence
              </h2>

              <p className="mt-3 max-w-2xl text-[11px] sm:text-[13px] md:text-[14px] leading-5 sm:leading-6 text-white/80">
                Whether you're looking for a website, mobile app, 3D visualization, digital twin, AI-powered solution, or custom software, we're here to help. Fill in a few details, and we'll get back to you with the best approach.
              </p>

              
            </div>
          </div>
        </motion.div>

        {/* ============ STATS + TAGS (unchanged) ============ */}
        <section className="mt-4 grid grid-cols-1 lg:grid-cols-[.9fr_1.1fr] gap-3 sm:gap-4">
          <div className="rounded-[18px] sm:rounded-[22px] border border-border/60 bg-background/70 px-3 py-3 sm:px-5 sm:py-4">
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div>
                <div className="text-[15px] sm:text-[22px] md:text-[26px] font-semibold tracking-tight text-foreground">
                  24h
                </div>
                <div className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Response Window
                </div>
              </div>

              <div>
                <div className="text-[15px] sm:text-[22px] md:text-[26px] font-semibold tracking-tight text-foreground">
                  Clear
                </div>
                <div className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Scope Review
                </div>
              </div>

              <div>
                <div className="text-[15px] sm:text-[22px] md:text-[26px] font-semibold tracking-tight text-foreground">
                  Ready
                </div>
                <div className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Proposal Flow
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[18px] sm:rounded-[22px] border border-border/60 bg-background/70 px-3 py-3 sm:px-5 sm:py-4 flex flex-wrap gap-2">
            {quickTags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full border border-border bg-muted/20 px-3 py-1 text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* ====== PROJECT GUIDANCE + PROJECT DETAILS (redesigned: image left, form right) ====== */}
        <section className="mt-8 grid grid-cols-1 overflow-hidden rounded-[20px] sm:rounded-[24px] border border-border/60 bg-background/70 shadow-sm backdrop-blur lg:grid-cols-2">
          {/* LEFT — image + guidance text */}
          <motion.div
            id="project-guidance"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="relative min-h-[280px] lg:min-h-full"
          >
            <Image
              src="/to.jpg"
              alt="Luminexa — immersive 3D & digital product work"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-foreground/20" />

            <div className="absolute inset-0 flex flex-col justify-between p-6 text-background sm:p-8 lg:p-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur">
                <Rocket className="size-3.5" />
                Project Guidance
              </span>

              <div>
                <h3 className="text-[24px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[30px] lg:text-[36px]">
                  Let's Build Something 
                  <br />
                  Extraordinary
                </h3>

                <p className="mt-3 max-w-sm text-[12px] leading-5 text-background/80 sm:text-[13px]">
                  Share a few details about your project and we’ll get back to
                  you within 24 hours.
                </p>

                <div className="mt-5 flex flex-col gap-2">
                  {trustPoints.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 text-[12px] text-background/85"
                    >
                      <Icon className="size-4 shrink-0 text-lumen" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — project details form */}
          <motion.div
            id="enquiry-form"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="px-5 py-4 sm:px-7 sm:py-5 md:px-9 md:py-6"
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="flex h-full min-h-[420px] flex-col items-center justify-center text-center"
              >
                <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="size-9 text-primary" />
                </div>
                <p className="mt-4 text-[18px] font-semibold text-foreground">
                  Thank you! We received your enquiry.
                </p>
                <p className="mt-2 max-w-sm text-[13px] leading-6 text-muted-foreground">
                  Our team will get back to you shortly with the next steps.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="mb-5">
                  <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    <Sparkles className="size-3.5 text-primary" />
                    Project Details
                  </div>
                  <h3 className="mt-2 text-[18px] font-semibold tracking-tight text-foreground sm:text-[22px]">
                    Tell us about your project
                  </h3>
                  <p className="mt-1 text-[12px] text-muted-foreground">
                    Fields marked <span className="text-destructive">*</span> are
                    required.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-foreground">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <User2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={cx(
                          errors.name ? inputClassError : inputClass,
                          "pl-9"
                        )}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-foreground">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company / Brand"
                        className={cx(inputClass, "pl-9")}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-foreground">
                      Designation
                    </label>
                    <div className="relative">
                      <Briefcase className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        placeholder="Founder, Manager, etc."
                        className={cx(inputClass, "pl-9")}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-foreground">
                      Solution Type
                    </label>
                    <div className="relative">
                      <select
                        name="solutionType"
                        value={formData.solutionType}
                        onChange={handleChange}
                        className={selectClass}
                      >
                        <option value="">Select a solution type</option>
                        {solutionOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                        ▾
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-foreground">
                      Budget
                    </label>
                    <Input
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="e.g. ₹50,000 - ₹2,00,000"
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-foreground">
                      Email ID <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className={cx(
                          errors.email ? inputClassError : inputClass,
                          "pl-9"
                        )}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <PhoneField
                      id="lead-mobile"
                      country={formData.country}
                      number={formData.mobile}
                      onCountryChange={(country) => {
                        setFormData((p) => ({ ...p, country }));
                        setErrors((p) => ({ ...p, mobile: "" }));
                      }}
                      onNumberChange={(mobile) => {
                        setFormData((p) => ({ ...p, mobile }));
                        setErrors((p) => ({ ...p, mobile: "" }));
                      }}
                      error={errors.mobile}
                      labelClass="text-[13px] font-medium text-foreground"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[13px] font-medium text-foreground">
                      Additional Details
                    </label>
                    <Textarea
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="Scope, references, timeline, expected deliverables..."
                      className={textareaClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <ConsentCheckbox
                      id="lead-consent"
                      checked={formData.consent}
                      onChange={(consent) => {
                        setFormData((p) => ({ ...p, consent }));
                        setErrors((p) => ({ ...p, consent: "" }));
                      }}
                      error={errors.consent}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-1 h-12 rounded-md text-sm font-semibold sm:col-span-2"
                  >
                    <Send className="mr-2 size-4" />
                    {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                  </Button>

                  {submitError && (
                    <p
                      role="alert"
                      className="text-center text-xs text-destructive sm:col-span-2"
                    >
                      {submitError}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-[11px] leading-5 text-muted-foreground sm:col-span-2">
                    <ArrowUpRight className="size-3.5 shrink-0 text-primary" />
                    Your information is secure. We never share your details with third parties.
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </section>

        {/* ============ FINAL CTA (unchanged) ============ */}
        <section className="mt-14 mb-6">
          <div className="relative overflow-hidden rounded-[20px] sm:rounded-[26px] border border-border/60 bg-foreground text-background">
            <div className="absolute inset-0 opacity-[0.06]">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
                  backgroundSize: "42px 42px",
                }}
              />
            </div>

            <div className="relative z-10 px-4 py-6 sm:px-6 md:px-8 md:py-9 text-center">
              <p className="text-[10px] sm:text-[12px] uppercase tracking-[0.18em] text-background/70">
                Ready to move ahead
              </p>

              <h2 className="mt-3 text-[20px] sm:text-[28px] md:text-[36px] font-semibold tracking-tight text-background">
                Empowering Businesses Through Technology
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-[11px] sm:text-[13px] md:text-[14px] leading-5 sm:leading-6 text-background/75">
                From concept to launch, we build scalable, high-performance digital solutions tailored to your business.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                <Button
                  asChild
                  variant="secondary"
                  className="rounded-full px-5 w-full sm:w-auto"
                >
                  <a href="/portfolio">Explore Portfolio</a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-5 border-background/20 bg-transparent text-background hover:bg-background/10 w-full sm:w-auto"
                >
                  <a href="/contact-us">Contact Us</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default EnquiryForm;
