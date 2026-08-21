"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Layers,
  UserCheck,
  Server,
  BadgeCheck,
  Ban,
  Copyright,
  Receipt,
  Lock,
  CloudOff,
  LogOut,
  ShieldCheck,
  Handshake,
  LifeBuoy,
  Scale,
  RefreshCw,
  Mail,
  Sparkles,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const TermsAndConditions = () => {
  const sections = useMemo(
    () => [
      {
        id: "acceptance",
        title: "Acceptance of Terms",
        icon: FileText,
        content: [
          "These Terms & Conditions govern the use of the Luminexa Technologies (“we”, “us”, or “our”) website and the services we provide to clients (“you”).",
          "By using our website, submitting an enquiry, or engaging us for a project, you agree to these terms. Specific projects may also be governed by a separate signed Service Agreement, which shall prevail in case of conflict.",
        ],
      },
      {
        id: "services",
        title: "Services & Scope",
        icon: Layers,
        content: [
          "We provide software, web, AR/VR, visualization, and related digital services as described in the applicable proposal, invoice, or scope of work.",
          "Any work not covered by the agreed scope will be treated as a separate request, with fees and timelines to be mutually agreed in writing.",
        ],
      },
      {
        id: "client-responsibilities",
        title: "Client Responsibilities",
        icon: UserCheck,
        content: [
          "You agree to promptly provide the information, data, materials, access, and approvals required for the work. Delays in essential inputs may impact timelines.",
          "You will designate a primary point of contact and provide clear, timely feedback on deliverables, milestones, and design elements.",
          "You agree to participate in reasonable testing and quality-assurance activities before final acceptance.",
        ],
      },
      {
        id: "enquiry-data",
        title: "Enquiries & Personal Data You Submit",
        icon: UserCheck,
        content: [
          "Our Contact and Get Started forms ask for details such as your name, email address and mobile number with its country code, along with optional company and project information. You must tick the consent box before the form can be submitted.",
          "By submitting a form you confirm that the details are accurate, that you are at least 18 years old, and that you are entitled to share them. If you provide someone else’s details, you confirm you have their permission to do so.",
          "You consent to us contacting you about the enquiry you raised, by email, phone, or messaging, using the details you provided. You can ask us to stop at any time.",
          "We record the wording of the consent you accepted, its version, and the time of acceptance, so that both parties have a clear record of what was agreed.",
          "Do not submit passwords, financial account details, government identification numbers, health information, or other sensitive personal data through our forms. Where a project requires such data, we will agree a secure channel with you separately.",
          "Submitting an enquiry does not by itself create a contract or oblige either party to proceed. Any engagement begins only under an agreed proposal or signed Service Agreement.",
          "How we store, use, retain and protect the information you submit is described in our Privacy Policy, which forms part of these terms.",
        ],
      },
      {
        id: "data-protection",
        title: "Data Protection & Security Commitments",
        icon: Lock,
        content: [
          "We handle personal data collected through this website in line with our Privacy Policy and applicable data protection law, including India’s Digital Personal Data Protection Act, 2023 where it applies to you.",
          "Enquiry and client data is held in access-controlled systems, transmitted over encrypted connections, and made available only to team members who need it for the purpose you provided it.",
          "We do not sell personal data, and we do not share it with third parties for their own marketing.",
          "Where we use service providers to operate our systems, we choose providers that offer appropriate security safeguards and permit them to use your data only for the services they provide to us.",
          "You may request access to, correction of, or deletion of the enquiry details we hold about you, and you may withdraw consent for future contact, as described in the Privacy Policy.",
          "No system can be guaranteed completely secure. If a breach occurs that is likely to affect your rights, we will act to contain it and notify affected individuals and the relevant authority as required by law.",
        ],
      },
      {
        id: "hosting-deployment",
        title: "Hosting & Deployment",
        icon: Server,
        content: [
          "Unless agreed otherwise in writing, software and web applications we develop are hosted by us or on domains we own or approve.",
          "Self-hosting or deployment on third-party domains is not permitted without our prior written authorization.",
        ],
      },
      {
        id: "branding-attribution",
        title: "Branding & Attribution",
        icon: BadgeCheck,
        content: [
          "Where applicable, our watermark, branding, or identifiers included in the delivered product must remain visible to end users.",
          "You may not alter, mask, or remove our identifiers unless we authorize it in writing.",
        ],
      },
      {
        id: "acceptable-use",
        title: "Acceptable Use & Restrictions",
        icon: Ban,
        content: [
          "You agree not to share, license, distribute, sublicense, or replicate any part of our software for third-party use or development.",
          "Any attempt to reverse engineer, copy, or develop a substantially similar product is prohibited and may result in legal action.",
        ],
      },
      {
        id: "intellectual-property",
        title: "Intellectual Property & Developer Tools",
        icon: Copyright,
        content: [
          "Deliverables created specifically for your project are treated as work made for hire and, upon clearance of all dues, become your property.",
          "Pre-existing tools, frameworks, generic code, algorithms, and methodologies used to build your project (“Developer Tools”) remain our property.",
          "No rights to our intellectual property are granted to you except as expressly stated in writing.",
        ],
      },
      {
        id: "fees-payment",
        title: "Fees, Taxes & Payment",
        icon: Receipt,
        content: [
          "Fees are payable as specified in the applicable invoice and are inclusive of GST and other applicable taxes unless stated otherwise.",
          "If payment is delayed, we may suspend further services until outstanding dues are cleared.",
          "Where an invoice or completed work is genuinely disputed, the disputed amount becomes due only once the dispute is resolved.",
        ],
      },
      {
        id: "confidentiality",
        title: "Confidentiality",
        icon: Lock,
        content: [
          "Non-public business, technical, and project information shared between the parties is kept strictly confidential and used only for the purpose of the engagement.",
          "These confidentiality obligations continue during the engagement and for three (3) years after it ends.",
        ],
      },
      {
        id: "force-majeure",
        title: "Force Majeure",
        icon: CloudOff,
        content: [
          "Neither party is liable for delays or non-performance caused by events beyond reasonable control, such as natural disasters, acts of God, war, civil unrest, or pandemics.",
          "If such an event continues beyond ninety (90) business days, either party may terminate the engagement with written notice.",
        ],
      },
      {
        id: "term-termination",
        title: "Term & Termination",
        icon: LogOut,
        content: [
          "Either party may terminate an engagement without cause by giving thirty (30) days’ prior written notice.",
          "We may terminate with immediate effect on material breach, unlawful conduct, or insolvency, where a notified breach is not cured within seven (7) days.",
          "Obligations already accrued, along with confidentiality, indemnity, and payment obligations, survive termination.",
        ],
      },
      {
        id: "indemnity",
        title: "Indemnity & Liability",
        icon: ShieldCheck,
        content: [
          "Each party shall be responsible for losses arising directly from its own breach, negligence, or wilful default in connection with the engagement.",
          "Neither party is liable for indirect, incidental, or consequential losses except as required by applicable law.",
        ],
      },
      {
        id: "relationship",
        title: "Independent Relationship",
        icon: Handshake,
        content: [
          "We act as an independent service provider on a principal-to-principal basis; neither party is the agent or employee of the other.",
          "We remain solely responsible for our own personnel and their statutory obligations.",
        ],
      },
      {
        id: "business-continuity",
        title: "Business Continuity",
        icon: LifeBuoy,
        content: [
          "In the event of our winding up, liquidation, or permanent cessation of business, we will transfer hosting access of your active products to you, subject to clearance of all outstanding dues.",
          "Such transfer does not include our source code, proprietary software, Developer Tools, or other confidential assets.",
        ],
      },
      {
        id: "governing-law",
        title: "Governing Law & Jurisdiction",
        icon: Scale,
        content: [
          "These terms are governed by and construed in accordance with the laws of India.",
          "The courts located in Bengaluru, Karnataka shall have exclusive jurisdiction over any dispute arising out of or in connection with these terms or our services.",
        ],
      },
      {
        id: "changes",
        title: "Changes to These Terms",
        icon: RefreshCw,
        content: [
          "We may update these terms periodically to reflect changes in our practices, technology, or legal requirements.",
          "Significant changes may be posted on this page. Continued use of our website or services constitutes acceptance of the updated terms.",
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
            <Badge className="rounded-full px-4 py-1">Legal</Badge>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" />
              Clear terms of engagement
            </span>
          </div>

          <h1 className="text-[30px] sm:text-[36px] md:text-[46px] font-bold tracking-tight text-foreground">
            Terms & Conditions
          </h1>

          <p className="mt-3 max-w-2xl text-sm md:text-[14px] text-muted-foreground leading-relaxed">
            These terms explain how we work together — covering services, hosting,
            intellectual property, payments, and the responsibilities of both
            parties when you engage Luminexa Technologies.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">
              Last updated: <span className="ml-1 font-medium">Jun 2026</span>
            </Badge>
            <Badge variant="outline" className="rounded-full">
              Applies to: Website • Services • Project engagements
            </Badge>
          </div>

          <div className="mt-6 h-1 w-32 rounded-full bg-gradient-to-r from-primary to-primary/60" />
        </motion.div>

        {/* ================= SECTIONS — ONE TERM PER ROW ================= */}
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

        {/* ================= BOTTOM — START A PROJECT ================= */}
        <motion.div {...fadeUp} transition={{ duration: 0.45 }} className="mt-12">
          <div className="grid gap-6 md:grid-cols-[300px_1fr] md:gap-x-10">
            <div>
              <h3 className="text-[17px] md:text-[19px] font-semibold tracking-tight text-foreground">
                Have a project in mind?
              </h3>
            </div>

            <div>
              <p className="text-[13.5px] md:text-[14px] text-muted-foreground leading-relaxed">
                Reach out and we’ll align on scope, terms, and the right next steps.
              </p>

              <Button asChild className="mt-5 h-11 rounded-lg px-7 w-fit">
                <Link href="/getstarted">
                  <Mail className="mr-2 size-4" />
                  Start a Project
                </Link>
              </Button>

              <p className="mt-8 text-[12px] text-muted-foreground">
                Note: This page is for general information and does not constitute
                legal advice. Specific engagements are governed by the signed
                Service Agreement between the parties.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
