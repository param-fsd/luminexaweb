/**
 * Sub-services under /services/custom-web-application.
 *
 * The parent route renders the bespoke CustomWebAppPage; its "Applications" cards
 * link to these subSlugs, so keep them in sync with CONTENT.modules in
 * src/components/services/CustomWebAppPage.js.
 */
const customweb = [
  {
    subSlug: "custom-dashboards",
    title: "Dashboards & Portals",
    shortTitle: "Role-Based Dashboards",
    label: "Interfaces",
    heroBadge: "Custom Dashboards",
    description:
      "Role-based dashboards and customer or vendor portals, reading live from your operational data.",
    image: "/web.jpg",
    heroImage: "/web.jpg",

    overview: `
<p>A dashboard earns its place by answering a question its reader was already asking. We start from the decisions each role makes weekly, then build the smallest board that supports them.</p>
<p>Boards read live from your operational database rather than a nightly export, and every figure drills down to the records behind it — so a number that looks wrong gets resolved in seconds rather than becoming an email thread.</p>
<p>Portals extend the same idea outward. Customers and vendors get a scoped login showing their own orders, documents and status, which removes a surprising amount of inbound email.</p>
`,

    highlightTags: ["Role-based access", "Live data", "Drill-down", "Scheduled reports", "Self-service portals"],

    stats: [
      { value: "Live", label: "Not a nightly spreadsheet export" },
      { value: "4 wks", label: "Typical dashboard build" },
      { value: "1 login", label: "Per role, scoped correctly" },
    ],

    features: [
      { title: "Role-based boards", description: "Each role sees the handful of numbers it can act on, and nothing it shouldn't.", image: "/web.jpg" },
      { title: "Drill-down", description: "Click a total to reach the transactions behind it without leaving the screen.", image: "/crm.jpg" },
      { title: "Customer & vendor portals", description: "Scoped self-service logins for orders, documents and status.", image: "/net.jpg" },
    ],

    benefits: [
      "One agreed definition per metric, applied everywhere.",
      "Numbers ready on the morning of the review, not after it.",
      "Disputes settled by drilling down, not by opinion.",
      "Inbound status emails replaced by self-service.",
      "Permissions per role, enforced server-side.",
    ],

    useCases: [
      { title: "Management reporting", description: "Cash, margin and growth in one refreshed board." },
      { title: "Operations control", description: "Throughput, delays and fulfilment against target." },
      { title: "Customer portals", description: "Order status, invoices and documents, self-served." },
      { title: "Vendor portals", description: "Purchase orders, delivery and invoice submission." },
    ],

    workflow: [
      { step: "01", title: "Agree the questions", description: "We pin down the decisions each role makes before designing any chart." },
      { step: "02", title: "Model the data", description: "Sources connected so every board reads from the same base definitions." },
      { step: "03", title: "Build & schedule", description: "Boards per role, alerts configured, report packs put on schedule." },
    ],

    technologies: ["Next.js", "React", "PostgreSQL", "Prisma", "Recharts", "Redis", "Docker"],

    deliverables: [
      "Agreed metric definitions document",
      "Role-based dashboards on live data",
      "Drill-down views to transaction level",
      "Portal logins with scoped permissions",
      "Scheduled report packs and alert rules",
      "Source code and deployment handover",
    ],

    faqs: [
      { question: "Can it read from the systems we already run?", answer: "Yes — anything with a database or an API. Where a tool has neither, we set up a scheduled import and label the board with its last refresh time." },
      { question: "How current is the data?", answer: "Live for most boards. Where a source only allows periodic pulls, the board shows its own last-refreshed timestamp so nobody is misled." },
      { question: "Can customers log in safely?", answer: "Portal accounts are scoped server-side to their own records, with permissions enforced on every request rather than hidden in the UI." },
    ],

    cta: {
      title: "Which number do you not trust?",
      description: "Start there. We'll build the board that settles it.",
      primaryText: "Book a consultation",
      primaryLink: "/contact-us",
      secondaryText: "View portfolio",
      secondaryLink: "/portfolio",
    },
  },

  {
    subSlug: "industry-solutions",
    title: "Industry Solutions",
    shortTitle: "Sector-Specific Applications",
    label: "Verticals",
    heroBadge: "Industry-Specific Software",
    description:
      "Applications shaped around a sector's own vocabulary and rules — real estate, education, healthcare, logistics.",
    image: "/cus.jpg",
    heroImage: "/cus.jpg",

    overview: `
<p>Generic software makes every industry describe itself in the same words. That is where the friction starts: a field called "opportunity" when your team says "enquiry", a status list that does not include the one stage that actually matters to you.</p>
<p>We build in your sector's own vocabulary, with the rules that are specific to it — RERA milestones for real estate, attendance and fee cycles for education, batch expiry for pharmacy, proof of delivery for logistics.</p>
<p>The result is software people can use without translating their job into someone else's model first, which is most of what drives adoption.</p>
`,

    highlightTags: ["Sector vocabulary", "Compliance rules", "Configurable stages", "Role-based access", "Mobile-ready"],

    stats: [
      { value: "0", label: "Translation between your words and ours" },
      { value: "5 wks", label: "Typical first usable version" },
      { value: "100%", label: "Source code handed over" },
    ],

    features: [
      { title: "Your vocabulary", description: "Entities, stages and fields named the way your team already talks.", image: "/cus.jpg" },
      { title: "Sector rules", description: "The compliance and milestone logic specific to your industry, built in.", image: "/crm.jpg" },
      { title: "Configurable stages", description: "Change your workflow later from the admin panel, not a support ticket.", image: "/net.jpg" },
    ],

    benefits: [
      "Staff adopt it because it matches how they describe the work.",
      "Sector compliance handled in the system, not in a side spreadsheet.",
      "Stages and fields configurable as your process evolves.",
      "Reporting that already speaks your regulator's language.",
      "No per-seat licence and no vendor lock-in.",
    ],

    useCases: [
      { title: "Real estate", description: "Enquiry to booking to collections, with unit inventory attached." },
      { title: "Education", description: "Admissions, attendance, fee schedules and staff payroll." },
      { title: "Healthcare", description: "Patients, appointments, pharmacy stock and billing." },
      { title: "Logistics", description: "Consignments, routes, proof of delivery and settlements." },
    ],

    workflow: [
      { step: "01", title: "Learn the domain", description: "We sit with your team until we can describe the work in their words." },
      { step: "02", title: "Model & build", description: "Entities and rules built around that vocabulary rather than a template." },
      { step: "03", title: "Roll out", description: "Data migrated, staff trained on their own screens, support through the first cycle." },
    ],

    technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Docker"],

    deliverables: [
      "Domain model in your own vocabulary",
      "Working application with role-based access",
      "Sector compliance and milestone rules",
      "Configurable stages and master data",
      "Data migration from existing tools",
      "Full source code and deployment handover",
    ],

    faqs: [
      { question: "Do you already know our industry?", answer: "Sometimes. Where we don't, we spend the first phase learning it properly rather than assuming — and we'll say plainly which situation you're in." },
      { question: "Can we change the workflow later?", answer: "Stages, fields and permissions are configurable from the admin panel. Genuinely new data models are a small change we can quote for." },
      { question: "How is this different from an industry SaaS product?", answer: "A vertical SaaS product fits the average business in your sector. This fits yours, and you own it. If the average is close enough for you, buying is cheaper and we'll say so." },
    ],

    cta: {
      title: "Tell us how your sector works.",
      description: "We'll build software that speaks it back to you.",
      primaryText: "Book a consultation",
      primaryLink: "/contact-us",
      secondaryText: "View portfolio",
      secondaryLink: "/portfolio",
    },
  },

  {
    subSlug: "automation-tools",
    title: "Internal Tools & Automation",
    shortTitle: "Back-Office Tools",
    label: "Operations",
    heroBadge: "Internal Tooling",
    description:
      "The admin panels, approval queues and back-office screens that replace manual coordination.",
    image: "/net.jpg",
    heroImage: "/net.jpg",

    overview: `
<p>Most operational drag is not one big broken process. It is twenty small handoffs — a status pasted into a chat, an approval chased by phone, a number re-typed from one system into another.</p>
<p>Internal tools remove those handoffs. Approval queues with routing rules, admin panels that make a one-off data fix safe, scheduled jobs that move information between systems without anyone copying it.</p>
<p>Each tool is small enough to ship in a couple of weeks, which means you feel the benefit while the rest is still being built.</p>
`,

    highlightTags: ["Approval queues", "Admin panels", "Scheduled jobs", "Audit trails", "Integrations"],

    stats: [
      { value: "2 wks", label: "Typical single tool" },
      { value: "0", label: "Re-keying between systems" },
      { value: "Full", label: "Audit trail on every change" },
    ],

    features: [
      { title: "Approval queues", description: "Routing by value, department and cost centre, with escalation on delay.", image: "/net.jpg" },
      { title: "Admin panels", description: "Safe, permissioned screens for the data fixes that currently need a developer.", image: "/web.jpg" },
      { title: "Scheduled jobs", description: "Data moved between systems on a schedule, with failures surfaced not swallowed.", image: "/crm.jpg" },
    ],

    benefits: [
      "Approvals chased by the system rather than by your staff.",
      "Data fixes done safely without a developer in the loop.",
      "Handoffs between systems automated and logged.",
      "Failures surfaced with an owner rather than silently retried.",
      "Small tools that ship fast and compound.",
    ],

    useCases: [
      { title: "Purchase approvals", description: "Multi-level sign-off routed by value band." },
      { title: "Content moderation", description: "Review queues with clear accept and reject paths." },
      { title: "Data operations", description: "Bulk edits and corrections behind proper permissions." },
      { title: "System sync", description: "Scheduled transfers between the tools you already run." },
    ],

    workflow: [
      { step: "01", title: "Find the handoffs", description: "We trace one real case end to end and list every manual step." },
      { step: "02", title: "Automate the worst", description: "The most repeated handoff goes first, usually live in about two weeks." },
      { step: "03", title: "Extend", description: "Next handoff, then the next — each one shipped and used before the following starts." },
    ],

    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "n8n", "REST & GraphQL", "Docker"],

    deliverables: [
      "Handoff map with time-saved estimates",
      "Approval queues with routing and escalation",
      "Permissioned admin panels",
      "Scheduled jobs with failure alerting",
      "Audit logging across every tool",
      "Source code and deployment handover",
    ],

    faqs: [
      { question: "Can these connect to our existing systems?", answer: "Yes — anything with an API, and scheduled imports where there isn't one. That connective work is usually the whole point." },
      { question: "How small can a tool be and still be worth it?", answer: "If a handoff happens daily and takes ten minutes, it is worth automating. We'll do the arithmetic with you before building." },
      { question: "What happens when an automated job fails?", answer: "It surfaces with an owner and a clear error rather than retrying silently. Silent retries are how bad data spreads." },
    ],

    cta: {
      title: "What gets re-typed every day?",
      description: "That handoff is where we start.",
      primaryText: "Book a consultation",
      primaryLink: "/contact-us",
      secondaryText: "View portfolio",
      secondaryLink: "/portfolio",
    },
  },
];

export default customweb;
