/**
 * Sub-services under /services/crm-erp.
 *
 * The parent route renders the bespoke CrmErpPage; its "Modules" cards link
 * straight to these three subSlugs, so keep the keys in sync with FEATURES in
 * src/components/services/CrmErpPage.js.
 */
const crmerpdevelopment = [
  {
    subSlug: "crm-development",
    title: "CRM Development",
    shortTitle: "Sales & Customer CRM",
    label: "Sales Operations",
    heroBadge: "Custom CRM Systems",
    description:
      "Lead capture, assignment, follow-ups, quotations and a pipeline your sales head can actually read.",
    image: "/crm.jpg",
    heroImage: "/crm.jpg",

    overview: `
<p>A CRM is only useful if your team fills it in, and they only fill it in if it matches how they already sell. We start from your actual sales motion rather than a template.</p>
<p>Leads arrive from your website, listing portals, ad campaigns and walk-ins, and are assigned automatically by territory, product or round-robin. Every call, visit and quotation is logged against the record, so a handover never loses history.</p>
<p>Managers get a pipeline view with stage-wise value and ageing, plus alerts when a deal goes quiet. Sales staff get a phone-friendly screen with today's follow-ups and nothing else.</p>
`,

    highlightTags: [
      "Multi-channel lead capture",
      "Assignment rules",
      "Quotation builder",
      "WhatsApp & SMS follow-ups",
      "Pipeline reporting",
    ],

    stats: [
      { value: "40%", label: "More follow-ups completed on time" },
      { value: "1 record", label: "Per customer, across every channel" },
      { value: "6 wks", label: "Typical first rollout" },
    ],

    features: [
      {
        title: "Lead capture & routing",
        description:
          "Website forms, portal feeds, ad integrations and walk-in entry, auto-assigned by your own rules.",
        image: "/crm.jpg",
      },
      {
        title: "Follow-up automation",
        description:
          "Reminders, call logs and templated WhatsApp or SMS nudges so nothing sits untouched.",
        image: "/net.jpg",
      },
      {
        title: "Quotations & approvals",
        description:
          "Build quotes from your price list, route discounts for approval, and track what was actually sent.",
        image: "/web.jpg",
      },
    ],

    benefits: [
      "Every lead is owned by someone, with a next action and a due date.",
      "Sales history survives staff turnover.",
      "Discounts and exceptions go through approval, not WhatsApp.",
      "Managers see stage-wise pipeline value without asking for a report.",
      "Mobile-first screens for staff who work from the field.",
    ],

    useCases: [
      { title: "Real estate sales", description: "Enquiry to site visit to booking, with unit inventory attached." },
      { title: "B2B sales teams", description: "Long cycles with multiple stakeholders and staged approvals." },
      { title: "Service businesses", description: "Recurring clients, renewals and retainer tracking." },
      { title: "Education admissions", description: "Enquiry, counselling, application and fee collection." },
    ],

    workflow: [
      { step: "01", title: "Map the sales motion", description: "We shadow your team and document the real stages, including the informal ones." },
      { step: "02", title: "Build & pilot", description: "One team runs the CRM live while we refine the rules and screens." },
      { step: "03", title: "Roll out & train", description: "Remaining teams onboarded, data migrated, dashboards handed to managers." },
    ],

    technologies: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Twilio & WhatsApp", "Razorpay", "Docker"],

    deliverables: [
      "Configured CRM with role-based logins",
      "Lead source integrations",
      "Quotation templates and approval chains",
      "Manager dashboards and scheduled reports",
      "Data migration from your current tools",
      "Source code and deployment handover",
    ],

    faqs: [
      {
        question: "Can it import our existing lead sheets?",
        answer:
          "Yes. We clean and map your spreadsheets or current CRM export, import them, and run a reconciliation pass before you go live.",
      },
      {
        question: "Will it work on our salespeople's phones?",
        answer:
          "The screens are built mobile-first, since most field sales work happens on a phone. It runs in the browser — no app install needed.",
      },
      {
        question: "Can we change the pipeline stages later?",
        answer:
          "Stages, assignment rules and fields are configurable from the admin panel, so you can adjust them without coming back to us.",
      },
    ],

    cta: {
      title: "Let's map your sales process.",
      description: "Show us how your team sells today and we'll scope a CRM around it.",
      primaryText: "Book a consultation",
      primaryLink: "/contact-us",
      secondaryText: "View portfolio",
      secondaryLink: "/portfolio",
    },
  },

  {
    subSlug: "erp-development",
    title: "ERP Development",
    shortTitle: "Operations & Inventory ERP",
    label: "Operations",
    heroBadge: "Custom ERP Systems",
    description:
      "Purchase, multi-warehouse inventory, production, dispatch, billing, HR and payroll — connected, not bolted together.",
    image: "/net.jpg",
    heroImage: "/net.jpg",

    overview: `
<p>ERP goes wrong when it is bought as a monolith and forced onto a business that works differently. We build it module by module, starting with whichever part is costing you the most time right now.</p>
<p>Purchase orders raised against live reorder levels. Stock tracked across warehouses with batch and serial numbers where you need them. Dispatch, gate passes and invoicing generated from the same record, so finance is never re-keying what the warehouse already entered.</p>
<p>Approvals are routed by value, department and cost centre, and every change leaves an audit trail that holds up when someone asks who approved what.</p>
`,

    highlightTags: [
      "Multi-warehouse stock",
      "Purchase & approvals",
      "Batch & serial tracking",
      "GST-compliant billing",
      "HR & payroll",
    ],

    stats: [
      { value: "60%", label: "Less manual data entry" },
      { value: "96%", label: "Typical order fill rate after rollout" },
      { value: "8 wks", label: "First module live" },
    ],

    features: [
      {
        title: "Purchase & inventory",
        description:
          "Reorder-level triggers, vendor comparison, goods receipt, and stock across every location in one view.",
        image: "/net.jpg",
      },
      {
        title: "Dispatch & billing",
        description:
          "Packing lists, gate passes and GST invoices generated from the order — no duplicate entry.",
        image: "/crm.jpg",
      },
      {
        title: "HR & payroll",
        description:
          "Attendance, leave, salary structures and statutory deductions, with payslips staff can access themselves.",
        image: "/web.jpg",
      },
    ],

    benefits: [
      "One stock figure that purchase, sales and finance all trust.",
      "Approvals by value band, department and cost centre.",
      "Audit trails on every edit, kept intact.",
      "Month-end close in days rather than weeks.",
      "Statutory reports generated, not assembled by hand.",
      "Runs on your cloud or your own servers.",
    ],

    useCases: [
      { title: "Manufacturing", description: "BOM, production planning, stores and dispatch against live order books." },
      { title: "Distribution", description: "Multi-location stock, pricing tiers and route-wise sales." },
      { title: "Retail chains", description: "Store-level stock, transfers and consolidated reporting." },
      { title: "Projects & contracting", description: "Site-wise material issue, and cost tracked against budget." },
    ],

    workflow: [
      { step: "01", title: "Audit the flow", description: "We trace a real order end to end and find where data gets re-typed." },
      { step: "02", title: "Ship the painful module", description: "The costliest bottleneck goes live first, usually in six to eight weeks." },
      { step: "03", title: "Extend & migrate", description: "Adjacent modules added, opening balances imported, staff trained on their own screens." },
    ],

    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Prisma", "Tally / Zoho sync", "REST & GraphQL", "Docker"],

    deliverables: [
      "Process map and module-by-module scope",
      "Working ERP with role-based access",
      "Opening balance and master data migration",
      "Approval chains and audit logging",
      "Statutory and management report pack",
      "API documentation for every integration",
      "Full source code and deployment handover",
    ],

    faqs: [
      {
        question: "Do we have to replace Tally?",
        answer:
          "Not necessarily. Many clients keep Tally or Zoho Books for statutory accounting and sync transactions across. We'll advise based on what your auditor needs.",
      },
      {
        question: "Can it handle multiple warehouses and branches?",
        answer:
          "Yes. Stock, pricing and permissions are location-aware, with transfers and consolidated reporting across locations.",
      },
      {
        question: "How is this different from an off-the-shelf ERP?",
        answer:
          "You are not paying per seat, you are not waiting on a vendor's roadmap, and the workflow matches your process rather than the other way round. You also own the source code.",
      },
    ],

    cta: {
      title: "Start with the module that hurts most.",
      description: "Tell us where your operations lose the most time and we'll scope that first.",
      primaryText: "Book a consultation",
      primaryLink: "/contact-us",
      secondaryText: "View portfolio",
      secondaryLink: "/portfolio",
    },
  },

  {
    subSlug: "dashboards-reporting",
    title: "Dashboards & Reporting",
    shortTitle: "Business Intelligence",
    label: "Analytics",
    heroBadge: "Live KPI Dashboards",
    description:
      "Live KPI boards per role, scheduled reports in the inbox, and drill-down from a number to the record behind it.",
    image: "/web.jpg",
    heroImage: "/web.jpg",

    overview: `
<p>Most businesses already have the data. What they lack is a number they trust, available on the morning it matters rather than three weeks later.</p>
<p>We build dashboards on top of your live operational data — no nightly export into a spreadsheet. Each role gets its own board: the sales head sees pipeline and conversion, the plant head sees output and rejection, the founder sees cash and margin.</p>
<p>Every figure is clickable. If receivables look wrong, you drill from the total to the invoice to the dispatch note without leaving the screen.</p>
`,

    highlightTags: [
      "Role-based dashboards",
      "Drill-down to source",
      "Scheduled email reports",
      "Threshold alerts",
      "Export to Excel & PDF",
    ],

    stats: [
      { value: "1 source", label: "Of truth across teams" },
      { value: "Live", label: "Not a nightly spreadsheet export" },
      { value: "4 wks", label: "Typical dashboard build" },
    ],

    features: [
      {
        title: "Role-based boards",
        description:
          "Each role sees the handful of numbers it can actually act on, and nothing it shouldn't see.",
        image: "/web.jpg",
      },
      {
        title: "Drill-down reporting",
        description:
          "Click a total to reach the transactions behind it, so a suspicious number gets resolved in seconds.",
        image: "/crm.jpg",
      },
      {
        title: "Alerts & scheduled reports",
        description:
          "Thresholds that email or message the right person, and report packs delivered on your reporting calendar.",
        image: "/net.jpg",
      },
    ],

    benefits: [
      "One agreed definition per metric, applied everywhere.",
      "Numbers available on the morning of the review, not after it.",
      "Drill-down means disputes get settled with data, not opinion.",
      "Alerts surface problems before the month-end report does.",
      "Exports for the people who will always want a spreadsheet.",
    ],

    useCases: [
      { title: "Founder & board reporting", description: "Cash, margin and growth in one board, refreshed live." },
      { title: "Sales performance", description: "Pipeline, conversion and rep-level activity tracking." },
      { title: "Operations control", description: "Output, rejection, downtime and fulfilment against target." },
      { title: "Finance & receivables", description: "Ageing, collections and overdue exposure by customer." },
    ],

    workflow: [
      { step: "01", title: "Agree the metrics", description: "We pin down the definition of each number before building anything." },
      { step: "02", title: "Model the data", description: "Sources connected and modelled so every board reads from the same base." },
      { step: "03", title: "Build & schedule", description: "Boards built per role, alerts configured, report packs put on schedule." },
    ],

    technologies: ["Next.js", "PostgreSQL", "Redis", "Recharts", "Node.js", "REST & GraphQL", "Docker"],

    deliverables: [
      "Agreed metric definitions document",
      "Role-based dashboards with live data",
      "Drill-down views to transaction level",
      "Scheduled report packs and alert rules",
      "Excel and PDF export",
      "Source code and deployment handover",
    ],

    faqs: [
      {
        question: "Can it pull from systems we already run?",
        answer:
          "Yes — anything with a database or an API. Where a tool has neither, we set up a scheduled import instead.",
      },
      {
        question: "How current is the data?",
        answer:
          "Live for most boards. Where a source only allows periodic pulls, the board shows its own last-refreshed timestamp so nobody is misled.",
      },
      {
        question: "Can we build new reports ourselves?",
        answer:
          "The admin panel covers filters, groupings and saved views. Genuinely new data models are a small change we can quote for.",
      },
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
];

export default crmerpdevelopment;
