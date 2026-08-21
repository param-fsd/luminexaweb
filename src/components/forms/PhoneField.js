"use client";

/**
 * Phone number input with a country-code selector, defaulting to India (+91).
 *
 * Shared by the contact form and the Get Started lead form so both collect and
 * store numbers the same way.
 *
 * The dial code and the national number are kept as separate pieces of state — a
 * single free-text field means you cannot tell "+91 98765 43210" from a number a
 * visitor typed with a local trunk prefix. Use `toE164` before writing to
 * Firestore so what lands in the collection is always dial code + digits with no
 * spaces, which is what a dialler or WhatsApp API expects.
 */

import React from "react";
import { ChevronDown, Phone } from "lucide-react";
import { ERROR_TEXT, LABEL, fieldClass, selectClass } from "./fieldStyles";

/**
 * Kept deliberately short: India first, then the markets that actually enquire.
 * `min`/`max` are national-number digit lengths, used for validation.
 */
export const COUNTRIES = [
  { iso: "IN", dial: "+91", name: "India", flag: "🇮🇳", min: 10, max: 10 },
  { iso: "AE", dial: "+971", name: "United Arab Emirates", flag: "🇦🇪", min: 8, max: 9 },
  { iso: "SA", dial: "+966", name: "Saudi Arabia", flag: "🇸🇦", min: 8, max: 9 },
  { iso: "US", dial: "+1", name: "United States", flag: "🇺🇸", min: 10, max: 10 },
  { iso: "GB", dial: "+44", name: "United Kingdom", flag: "🇬🇧", min: 9, max: 10 },
  { iso: "SG", dial: "+65", name: "Singapore", flag: "🇸🇬", min: 8, max: 8 },
  { iso: "AU", dial: "+61", name: "Australia", flag: "🇦🇺", min: 9, max: 9 },
  { iso: "CA", dial: "+1", name: "Canada", flag: "🇨🇦", min: 10, max: 10 },
  { iso: "QA", dial: "+974", name: "Qatar", flag: "🇶🇦", min: 8, max: 8 },
  { iso: "OM", dial: "+968", name: "Oman", flag: "🇴🇲", min: 8, max: 8 },
  { iso: "KW", dial: "+965", name: "Kuwait", flag: "🇰🇼", min: 8, max: 8 },
  { iso: "BH", dial: "+973", name: "Bahrain", flag: "🇧🇭", min: 8, max: 8 },
  { iso: "MY", dial: "+60", name: "Malaysia", flag: "🇲🇾", min: 9, max: 10 },
  { iso: "DE", dial: "+49", name: "Germany", flag: "🇩🇪", min: 10, max: 11 },
  { iso: "FR", dial: "+33", name: "France", flag: "🇫🇷", min: 9, max: 9 },
  { iso: "NL", dial: "+31", name: "Netherlands", flag: "🇳🇱", min: 9, max: 9 },
  { iso: "ZA", dial: "+27", name: "South Africa", flag: "🇿🇦", min: 9, max: 9 },
  { iso: "NZ", dial: "+64", name: "New Zealand", flag: "🇳🇿", min: 8, max: 10 },
  { iso: "LK", dial: "+94", name: "Sri Lanka", flag: "🇱🇰", min: 9, max: 9 },
  { iso: "NP", dial: "+977", name: "Nepal", flag: "🇳🇵", min: 10, max: 10 },
];

/* Country selects are keyed by ISO code — +1 covers both US and Canada. */
export const DEFAULT_COUNTRY = "IN";

export const countryByIso = (iso) =>
  COUNTRIES.find((c) => c.iso === iso) || COUNTRIES[0];

/** Strip everything that is not a digit; the dial code is stored separately. */
export const onlyDigits = (value) => String(value || "").replace(/\D/g, "");

/**
 * Dial code + national digits, no spaces — e.g. "+919876543210".
 * Returns "" when there is no number, so callers can store an empty field.
 */
export const toE164 = (iso, number) => {
  const digits = onlyDigits(number);
  if (!digits) return "";
  return `${countryByIso(iso).dial}${digits}`;
};

/**
 * Returns an error string, or "" when valid.
 * Pass `required: false` for forms where a number is optional.
 */
export const validatePhone = (iso, number, { required = true } = {}) => {
  const digits = onlyDigits(number);
  const country = countryByIso(iso);

  if (!digits) return required ? "Mobile number is required" : "";
  if (digits.length < country.min || digits.length > country.max) {
    const expected =
      country.min === country.max
        ? `${country.min} digits`
        : `${country.min}–${country.max} digits`;
    return `Enter a valid ${country.name} number (${expected})`;
  }
  /* Indian mobile numbers always start 6–9; catches landlines and typos early. */
  if (country.iso === "IN" && !/^[6-9]/.test(digits)) {
    return "Indian mobile numbers start with 6, 7, 8 or 9";
  }
  return "";
};

const PhoneField = ({
  country = DEFAULT_COUNTRY,
  number = "",
  onCountryChange,
  onNumberChange,
  error,
  label = "Mobile Number",
  required = true,
  inputClass = "",
  labelClass = LABEL,
  id = "phone",
}) => {
  const selected = countryByIso(country);

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className={labelClass}>
        {label} {required ? <span className="text-destructive">*</span> : null}
      </label>

      <div className="flex gap-2">
        {/* country code */}
        <div className="relative shrink-0">
          <select
            aria-label="Country calling code"
            value={country}
            onChange={(e) => onCountryChange?.(e.target.value)}
            className={`${selectClass(Boolean(error))} w-[108px] shrink-0 pl-3`}
          >
            {COUNTRIES.map((c) => (
              <option key={c.iso} value={c.iso}>
                {c.flag} {c.dial}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        {/* national number */}
        <div className="relative min-w-0 flex-1">
          <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id={id}
            name="mobile"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={selected.max}
            value={number}
            onChange={(e) => onNumberChange?.(onlyDigits(e.target.value))}
            placeholder={selected.iso === "IN" ? "98765 43210" : "Mobile number"}
            aria-invalid={error ? "true" : undefined}
            className={`${fieldClass(Boolean(error))} pl-9 ${inputClass}`}
          />
        </div>
      </div>

      {error ? <p className={ERROR_TEXT}>{error}</p> : null}
    </div>
  );
};

export default PhoneField;
