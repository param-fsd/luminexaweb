"use client";

/**
 * "I accept the Terms & Conditions and Privacy Policy" checkbox.
 *
 * Shared by the contact form and the Get Started lead form.
 *
 * A tick box is only worth having if the acceptance is recorded, so `CONSENT_TEXT`
 * and `CONSENT_VERSION` are exported alongside it: write them to the same document
 * as the enquiry, together with a server timestamp, so you can later show exactly
 * what wording a person agreed to and when. Bump CONSENT_VERSION whenever the
 * wording or the linked documents change materially.
 *
 * Deliberately unchecked by default — a pre-ticked box is not consent.
 */

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

export const CONSENT_VERSION = "2026-08-21";

export const CONSENT_TEXT =
  "I accept the Terms & Conditions and the Privacy Policy, and consent to Luminexa Technologies storing the details I have submitted and contacting me about my enquiry.";

export const CONSENT_DOCS = ["/terms", "/privacy-policy"];

const ConsentCheckbox = ({ checked, onChange, error, id = "consent" }) => (
  <div className="space-y-1.5">
    <label
      htmlFor={id}
      className="flex cursor-pointer select-none items-start gap-3 text-[13px] leading-[1.6] text-muted-foreground"
    >
      <span className="relative mt-0.5 flex size-[18px] shrink-0 items-center justify-center">
        <input
          id={id}
          name="consent"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="peer size-[18px] cursor-pointer appearance-none rounded-[4px] border bg-background transition-colors checked:border-lumen checked:bg-lumen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lumen/40 focus-visible:ring-offset-1"
          style={{ borderColor: error ? "var(--destructive)" : "rgba(17,19,21,0.28)" }}
        />
        <Check
          aria-hidden="true"
          className="pointer-events-none absolute size-3 text-lumen-foreground opacity-0 peer-checked:opacity-100"
        />
      </span>

      <span>
        I accept the{" "}
        <Link
          href="/terms"
          className="font-medium text-foreground underline underline-offset-2 hover:text-lumen-foreground hover:decoration-lumen"
        >
          Terms &amp; Conditions
        </Link>{" "}
        and the{" "}
        <Link
          href="/privacy-policy"
          className="font-medium text-foreground underline underline-offset-2 hover:text-lumen-foreground hover:decoration-lumen"
        >
          Privacy Policy
        </Link>
        , and consent to my details being stored and used to contact me about this
        enquiry. <span className="text-destructive">*</span>
      </span>
    </label>

    {error ? (
      <p id={`${id}-error`} className="text-xs text-destructive">
        {error}
      </p>
    ) : null}
  </div>
);

export default ConsentCheckbox;
