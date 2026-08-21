/**
 * One field style for every form on the site.
 *
 * The contact form, the Get Started lead form and PhoneField each used to define
 * their own: `rounded-xl` translucent pills on one page, `rounded-lg` bordered
 * boxes with a different focus colour on another. These are the shared classes —
 * square-ish corners, a crisp hairline border and a lumen focus ring, matching the
 * panels and buttons used across the editorial pages.
 *
 * Import these rather than writing new ones so the forms stay in step.
 */

const BASE =
  "w-full rounded-md border bg-background px-3.5 text-[15px] shadow-none " +
  "transition-colors placeholder:text-muted-foreground/70 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0";

const OK = "border-[rgba(17,19,21,0.16)] focus-visible:border-lumen focus-visible:ring-lumen/35";
const BAD = "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/25";

export const FIELD = `h-12 ${BASE} ${OK}`;
export const FIELD_ERROR = `h-12 ${BASE} ${BAD}`;

export const TEXTAREA = `min-h-[150px] py-3 ${BASE} ${OK}`;
export const TEXTAREA_ERROR = `min-h-[150px] py-3 ${BASE} ${BAD}`;

/* Native <select> needs the arrow suppressed; pair with a ChevronDown. */
export const SELECT = `h-12 appearance-none ${BASE} ${OK} pr-9`;
export const SELECT_ERROR = `h-12 appearance-none ${BASE} ${BAD} pr-9`;

export const LABEL = "text-[13px] font-medium text-foreground";
export const ERROR_TEXT = "text-xs text-destructive";

export const fieldClass = (hasError) => (hasError ? FIELD_ERROR : FIELD);
export const textareaClass = (hasError) => (hasError ? TEXTAREA_ERROR : TEXTAREA);
export const selectClass = (hasError) => (hasError ? SELECT_ERROR : SELECT);
