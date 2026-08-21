"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Lock,
  Share2,
  UserCheck,
  RefreshCw,
  Mail,
  Sparkles,
  Cookie,
  Database,
  Globe,
  FileText,
  Copyright,
  Scale,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const PrivacyPolicy = () => {
  const sections = useMemo(
    () => [
      {
        id: "overview",
        title: "Overview",
        icon: FileText,
        content: [
          "This Privacy Policy explains how Luminexa Technologies (“we”, “us”, or “our”) collects, uses, and protects information when you visit our website, use our services, or submit an enquiry.",
          "By using our website or submitting information through our forms, you agree to the practices described in this policy.",
        ],
      },
      {
        id: "info-we-collect",
        title: "Information We Collect",
        icon: UserCheck,
        content: [
          "Information you provide directly: name, phone number, email address, company name, designation, budget range, project requirements, and any other details you choose to share in an enquiry or contact form.",
          "Technical/usage information: IP address, device type, browser type, pages viewed, and basic interaction data collected for security and analytics purposes.",
          "If you contact us via email or phone, we may keep a record of that communication to respond and improve support quality.",
        ],
      },
      {
        id: "enquiry-lead-data",
        title: "Enquiry & Lead Data",
        icon: UserCheck,
        content: [
          "When you submit our Contact or Get Started form, we collect the details you enter — typically your name, email address, mobile number including its country dialling code, and, where offered, your company name, designation, budget range, solution type and project description.",
          "We collect this information only after you tick the consent box confirming that you accept these terms. We record the wording you agreed to, the version of this policy in force, and the date and time of acceptance, so that both you and we have a clear record.",
          "This information is used to respond to your enquiry, prepare proposals or estimates, arrange demonstrations, and follow up about the project you described. We do not use enquiry data for unrelated marketing without asking you separately.",
          "Submitting an enquiry does not create an obligation on either side. You may ask us to stop contacting you at any time, and we will act on that request.",
          "Please do not include passwords, financial account details, government identification numbers, health information, or other sensitive personal data in a form. If a project genuinely requires such data, we will agree a secure method separately.",
        ],
      },
      {
        id: "how-we-use",
        title: "How We Use Your Information",
        icon: Sparkles,
        content: [
          "To respond to enquiries and provide proposals, estimates, demos, and consultations.",
          "To deliver and improve our services, user experience, and website performance.",
          "To communicate updates about your request, including follow-ups related to project scope or requirements.",
          "To maintain security, prevent fraud or abuse, and ensure system reliability.",
          "To comply with legal obligations where applicable.",
        ],
      },
      {
        id: "cookies-analytics",
        title: "Cookies & Analytics",
        icon: Cookie,
        content: [
          "We may use cookies or similar technologies to keep the website functional and understand how visitors interact with our pages.",
          "Analytics data is generally collected in aggregated form to improve performance, usability, and content.",
          "You can typically control cookies through your browser settings. Disabling cookies may affect certain website features.",
        ],
      },
      {
        id: "sharing",
        title: "Sharing Your Information",
        icon: Share2,
        content: [
          "We do not sell your personal information.",
          "We may share information with trusted service providers (such as hosting, email delivery, analytics, or customer support tools) only to operate and improve our services.",
          "These partners are expected to protect your data and use it only for permitted service-related purposes.",
          "We may disclose information if required by law, legal process, or to protect our rights and safety.",
        ],
      },
      {
        id: "data-retention",
        title: "Data Retention",
        icon: Database,
        content: [
          "We keep personal information only as long as needed for the purposes described in this policy (for example, to respond to your enquiry, maintain business records, or meet legal requirements).",
          "When information is no longer required, we take reasonable steps to delete or anonymize it.",
        ],
      },
      {
        id: "security",
        title: "Security Measures",
        icon: Lock,
        content: [
          "We apply reasonable administrative, technical, and organizational safeguards designed to protect your information.",
          "Our website is served over HTTPS, so information you type into a form is encrypted in transit between your browser and our systems.",
          "Enquiry and lead records are held in access-controlled cloud infrastructure. Access is limited to the team members who need it to respond to you or to administer the system, and administrative accounts are individually identified rather than shared.",
          "We review who holds access as the team changes, and remove access when it is no longer needed.",
          "However, no method of transmission or storage over the internet is completely secure. We encourage you to avoid sharing highly sensitive personal information in forms unless it is genuinely necessary.",
          "If a breach occurs that is likely to affect your rights, we will act to contain it and notify affected individuals and the relevant authority as required by applicable law.",
        ],
      },
      {
        id: "your-choices",
        title: "Consent, Access & Deletion",
        icon: ShieldCheck,
        content: [
          "Consent for enquiry data is given knowingly through the tick box on our forms. It is never pre-selected, and you can decline simply by not submitting the form.",
          "You may withdraw consent at any time by writing to us. Withdrawal applies going forward and does not affect processing already carried out lawfully.",
          "You may ask us for a copy of the enquiry details we hold about you, ask us to correct anything inaccurate, or ask us to delete the record. We will respond within a reasonable period.",
          "We may retain a minimal record where we are required to do so by law, or to establish or defend a legal claim — for example, the fact and date of your consent.",
          "To make any of these requests, contact us using the details on our Contact page and tell us which enquiry the request relates to.",
        ],
      },
      {
        id: "international",
        title: "International Transfers",
        icon: Globe,
        content: [
          "Depending on our service providers, your data may be processed or stored in different regions.",
          "Where applicable, we take reasonable steps to ensure appropriate protections are in place when transferring or processing data.",
        ],
      },
      {
        id: "your-rights",
        title: "Your Rights",
        icon: ShieldCheck,
        content: [
          "You may request access, correction, or deletion of your personal information.",
          "You may also request that we stop contacting you for promotional messages (if any).",
          "To exercise these rights, please contact us using the support link below. We will respond within a reasonable timeframe.",
        ],
      },
      {
        id: "confidentiality",
        title: "Confidentiality",
        icon: Lock,
        content: [
          "Any non-public business, technical, or project information you share with us is treated as strictly confidential and is accessed only by team members directly involved in delivering your project.",
          "We do not disclose your confidential information to third parties without your consent, except where disclosure is required by law or competent authority.",
          "Our confidentiality obligations continue both during our engagement and for a period of three (3) years after it ends.",
        ],
      },
      {
        id: "intellectual-property",
        title: "Intellectual Property",
        icon: Copyright,
        content: [
          "Final deliverables created specifically for your project are treated as work made for hire and, upon clearance of all dues, become your property.",
          "Pre-existing tools, frameworks, generic code, algorithms, and methodologies we use to build your project (our “Developer Tools”) remain the property of Luminexa Technologies.",
          "Where our branding or identifiers are included in delivered software, they must remain intact unless we authorize their removal in writing.",
        ],
      },
      {
        id: "governing-law",
        title: "Governing Law & Jurisdiction",
        icon: Scale,
        content: [
          "This policy and any related engagement are governed by and construed in accordance with the laws of India.",
          "The courts located in Bengaluru, Karnataka shall have exclusive jurisdiction over any dispute arising out of or in connection with our services or this policy.",
        ],
      },
      {
        id: "changes",
        title: "Changes to This Policy",
        icon: RefreshCw,
        content: [
          "We may update this policy periodically to reflect changes in our practices, technology, or legal requirements.",
          "If we make significant changes, we may post a notice on this page. We encourage you to review this policy occasionally.",
        ],
      },
    ],
    []
  );

  return (
    <section className="relative w-full overflow-hidden py-20 md:py-28">
      {/* ================= GLOBAL BACKGROUND ================= */}
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

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* ================= HEADER (LEFT / FLEX START) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl text-left mt-16"
        >
          <div className="mb-3 flex items-center gap-2">
            <Badge className="rounded-full px-4 py-1">Privacy</Badge>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" />
              Transparency matters
            </span>
          </div>

          <h1 className="text-[30px] sm:text-[36px] md:text-[46px] font-bold tracking-tight text-foreground">
            Privacy Policy
          </h1>

          <p className="mt-3 max-w-2xl text-sm md:text-[14px] text-muted-foreground leading-relaxed">
            Your privacy is important to us. This policy explains how we collect,
            use, and protect your information when you interact with Luminexa
            Technologies.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">
              Last updated: <span className="ml-1 font-medium">Jan 2026</span>
            </Badge>
            <Badge variant="outline" className="rounded-full">
              Applies to: Website • Enquiry forms • Support
            </Badge>
          </div>

          <div className="mt-6 h-1 w-32 rounded-full bg-gradient-to-r from-primary to-primary/60" />
        </motion.div>

        {/* ================= SECTIONS — ONE POLICY PER ROW ================= */}
        <div className="mt-14 divide-y divide-border border-y border-border">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                id={section.id}
                {...fadeUp}
                transition={{ duration: 0.45 }}
                className="grid scroll-mt-24 gap-x-10 gap-y-4 py-8 md:grid-cols-[300px_1fr] md:py-10"
              >
                {/* Left — label */}
                <div>
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-[18px] text-primary" />
                    <span className="text-[11px] font-semibold tabular-nums tracking-wider text-muted-foreground/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mt-2.5 text-[17px] md:text-[19px] font-semibold tracking-tight text-foreground">
                    {section.title}
                  </h2>
                </div>

                {/* Right — content */}
                <div className="space-y-3">
                  {section.content.map((line, i) => (
                    <p
                      key={i}
                      className="text-[13.5px] md:text-[14px] text-muted-foreground leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= BOTTOM — REQUESTS & SUPPORT ================= */}
        <motion.div {...fadeUp} transition={{ duration: 0.45 }} className="mt-12">
          <div className="grid gap-6 md:grid-cols-[300px_1fr] md:gap-x-10">
            <div>
              <h3 className="text-[17px] md:text-[19px] font-semibold tracking-tight text-foreground">
                Privacy requests & support
              </h3>
            </div>

            <div>
              <p className="text-[13.5px] md:text-[14px] text-muted-foreground leading-relaxed">
                Contact us for any privacy-related questions or requests.
              </p>

              <Button asChild className="mt-5 h-11 rounded-lg px-7 w-fit">
                <Link href="/contact-us">
                  <Mail className="mr-2 size-4" />
                  Contact Support
                </Link>
              </Button>

              <p className="mt-8 text-[12px] text-muted-foreground">
                Note: This page is for general information and does not constitute
                legal advice.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
