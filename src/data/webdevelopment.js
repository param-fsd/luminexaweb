/** Sub-services under /services/website-app-development. */
const webdevelopment = [
  {
    subSlug: "website-development",
    title: "Website Development",
    shortTitle: "Marketing & Corporate Sites",
    label: "Web",
    heroBadge: "Custom Websites",
    description:
      "Company sites, landing pages and portfolios built for speed, search and conversion.",
    image: "/web.jpg",
    heroImage: "/web.jpg",

    overview: `
<p>A website earns its keep by loading fast, ranking well and making the next step obvious. We build on Next.js so pages render server-side, images ship in modern formats, and Core Web Vitals stay green on a mid-range phone.</p>
<p>Content lives in a CMS your marketing team can edit without raising a ticket. Analytics, schema markup and sitemaps are wired in from the first deploy rather than retrofitted.</p>
`,

    highlightTags: ["Next.js", "SEO-ready", "CMS-editable", "Core Web Vitals", "Accessible"],

    stats: [
      { value: "90+", label: "Typical Lighthouse performance score" },
      { value: "3 wks", label: "Typical marketing site build" },
      { value: "100%", label: "Responsive down to 320px" },
    ],

    features: [
      { title: "Design & build", description: "A layout system built for your content, not a stretched template.", image: "/web.jpg" },
      { title: "CMS integration", description: "Marketing edits copy, images and pages without a developer.", image: "/net.jpg" },
      { title: "SEO foundations", description: "Server rendering, schema markup, sitemaps and clean metadata from day one.", image: "/crm.jpg" },
    ],

    benefits: [
      "Fast on mobile networks, not just on your office wifi.",
      "Content edits without a developer in the loop.",
      "Structured data and metadata handled correctly.",
      "Accessible markup that also happens to help search.",
      "Hosting and deployment documented and handed over.",
    ],

    useCases: [
      { title: "Corporate sites", description: "Multi-page company sites with careers, news and contact flows." },
      { title: "Campaign landing pages", description: "Fast, focused pages built to convert paid traffic." },
      { title: "Portfolios", description: "Media-heavy showcases that still load quickly." },
      { title: "Product marketing", description: "Feature, pricing and documentation sites." },
    ],

    workflow: [
      { step: "01", title: "Structure & content", description: "Sitemap, page intent and the content you actually have." },
      { step: "02", title: "Design & build", description: "Layouts built responsive-first and reviewed on real devices." },
      { step: "03", title: "Launch & measure", description: "Deploy, wire analytics, and tune against real traffic." },
    ],

    technologies: ["Next.js", "React", "Tailwind CSS", "Sanity / Strapi", "Vercel", "Google Analytics"],

    deliverables: [
      "Responsive site across all breakpoints",
      "CMS with editor accounts",
      "SEO metadata, sitemap and schema markup",
      "Analytics and event tracking",
      "Source code and deployment handover",
    ],

    faqs: [
      { question: "Can our team edit the content?", answer: "Yes. Pages, copy and images are editable through a CMS with per-user accounts. Structural changes still come to us." },
      { question: "Do you handle hosting?", answer: "We deploy to Vercel or your own infrastructure and hand over the setup documented. Ongoing hosting can be yours or ours." },
      { question: "How long does a site take?", answer: "A focused marketing site is usually about three weeks once content is ready. Larger sites with custom sections take longer." },
    ],

    cta: {
      title: "Let's build the site properly.",
      description: "Tell us what the site needs to do and we'll scope it.",
      primaryText: "Book a consultation",
      primaryLink: "/contact-us",
      secondaryText: "View portfolio",
      secondaryLink: "/portfolio",
    },
  },

  {
    subSlug: "mobile-app-development",
    title: "Mobile App Development",
    shortTitle: "Android, iOS & Cross-Platform",
    label: "Mobile",
    heroBadge: "Native & Cross-Platform Apps",
    description:
      "Android, iOS and cross-platform apps, from first build to store release.",
    image: "/net.jpg",
    heroImage: "/net.jpg",

    overview: `
<p>Most business apps do not need two separate native codebases. We build cross-platform with React Native so one team ships both stores, and drop to native modules only where the platform genuinely requires it.</p>
<p>Offline handling, push notifications, deep links and store release are treated as part of the build rather than an afterthought — because those are the things that decide whether an app gets used.</p>
`,

    highlightTags: ["React Native", "Offline-first", "Push notifications", "Store release", "Analytics"],

    stats: [
      { value: "2 stores", label: "From a single codebase" },
      { value: "10 wks", label: "Typical first release" },
      { value: "Offline", label: "Handled, not assumed away" },
    ],

    features: [
      { title: "Cross-platform build", description: "One codebase covering Android and iOS, with native modules where needed.", image: "/net.jpg" },
      { title: "Offline & sync", description: "Local storage with conflict-aware sync, for staff who work without signal.", image: "/crm.jpg" },
      { title: "Release & updates", description: "Store submission handled, plus over-the-air updates for quick fixes.", image: "/web.jpg" },
    ],

    benefits: [
      "One codebase to maintain instead of two.",
      "Works where the network doesn't.",
      "Push notifications and deep links wired in properly.",
      "Crash reporting and usage analytics from the first release.",
      "Store accounts and signing keys handed over to you.",
    ],

    useCases: [
      { title: "Field staff apps", description: "Data capture, attendance and job updates from site." },
      { title: "Customer apps", description: "Accounts, orders, tracking and support in one place." },
      { title: "Delivery & logistics", description: "Route lists, proof of delivery and live status." },
      { title: "Internal tools", description: "Approvals and dashboards for people away from a desk." },
    ],

    workflow: [
      { step: "01", title: "Define the core flow", description: "The one job the app must do well before anything else is added." },
      { step: "02", title: "Build & test on device", description: "Real devices, real networks, throughout the build." },
      { step: "03", title: "Release & iterate", description: "Store submission, then updates driven by actual usage data." },
    ],

    technologies: ["React Native", "Expo", "TypeScript", "Node.js", "PostgreSQL", "Firebase", "Sentry"],

    deliverables: [
      "Android and iOS builds",
      "Store listings and submission",
      "Backend API and admin panel",
      "Crash reporting and analytics",
      "Signing keys and store account handover",
      "Full source code",
    ],

    faqs: [
      { question: "Native or cross-platform?", answer: "Cross-platform for most business apps — it halves the maintenance. We recommend native only when the app leans heavily on platform-specific hardware or performance." },
      { question: "Do you handle store submission?", answer: "Yes, including listing copy, screenshots and the review process. The accounts stay in your name." },
      { question: "What about updates after launch?", answer: "Over-the-air updates cover most fixes without a store review. Larger changes go through a normal release." },
    ],

    cta: {
      title: "Let's scope your app.",
      description: "Tell us the one job it has to do and we'll plan the first release around it.",
      primaryText: "Book a consultation",
      primaryLink: "/contact-us",
      secondaryText: "View portfolio",
      secondaryLink: "/portfolio",
    },
  },

  {
    subSlug: "ecommerce-development",
    title: "E-commerce Development",
    shortTitle: "Storefronts & Payments",
    label: "Commerce",
    heroBadge: "Custom Online Stores",
    description:
      "Custom storefronts, carts, payments and order dashboards built around your catalogue.",
    image: "/crm.jpg",
    heroImage: "/crm.jpg",

    overview: `
<p>Platform stores work until your catalogue, pricing or fulfilment stops fitting the platform's assumptions. Tiered pricing, made-to-order items, regional stock and B2B accounts are usually where that happens.</p>
<p>We build storefronts around your actual catalogue and checkout rules, integrate the payment and shipping providers you already use, and give operations a dashboard that reflects how you really fulfil orders.</p>
`,

    highlightTags: ["Custom checkout", "Tiered pricing", "Payment gateways", "Order dashboard", "Inventory sync"],

    stats: [
      { value: "Custom", label: "Checkout rules, not platform defaults" },
      { value: "Live", label: "Inventory synced with operations" },
      { value: "6 wks", label: "Typical storefront build" },
    ],

    features: [
      { title: "Storefront & catalogue", description: "Fast product browsing, search and filtering built for your category structure.", image: "/crm.jpg" },
      { title: "Cart & checkout", description: "Your pricing tiers, discounts and shipping rules — not a platform's approximation.", image: "/web.jpg" },
      { title: "Orders & fulfilment", description: "An operations dashboard covering picking, dispatch, returns and refunds.", image: "/net.jpg" },
    ],

    benefits: [
      "Pricing and discount rules that match how you actually sell.",
      "B2B and B2C on one platform, with separate pricing.",
      "Inventory shared with your ERP instead of duplicated.",
      "No per-transaction platform fee on top of the gateway's.",
      "Own the storefront code and the customer data.",
    ],

    useCases: [
      { title: "D2C brands", description: "Own the storefront, the data and the margin." },
      { title: "B2B ordering", description: "Account-based pricing, credit terms and repeat orders." },
      { title: "Made-to-order", description: "Configurable products with lead times and deposits." },
      { title: "Multi-region", description: "Region-wise stock, pricing and delivery rules." },
    ],

    workflow: [
      { step: "01", title: "Model the catalogue", description: "Variants, pricing tiers and stock rules mapped before any UI." },
      { step: "02", title: "Build & integrate", description: "Storefront, checkout, payment gateway and shipping providers." },
      { step: "03", title: "Launch & tune", description: "Go live, then improve against real checkout drop-off data." },
    ],

    technologies: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Razorpay", "Stripe", "Redis", "Docker"],

    deliverables: [
      "Storefront with catalogue and search",
      "Custom checkout and pricing rules",
      "Payment and shipping integrations",
      "Order and fulfilment dashboard",
      "Inventory sync with your ERP",
      "Source code and deployment handover",
    ],

    faqs: [
      { question: "Why not just use Shopify?", answer: "For a straightforward catalogue, a platform store is often the right call and we'll say so. Custom pays off when your pricing, fulfilment or B2B rules fight the platform." },
      { question: "Which payment gateways do you support?", answer: "Razorpay, Stripe, PayU and most gateways with a documented API. We can run more than one." },
      { question: "Can it share stock with our ERP?", answer: "Yes — that's usually the point. Stock stays in one system and the storefront reads from it." },
    ],

    cta: {
      title: "Let's look at your catalogue.",
      description: "Bring us the pricing and fulfilment rules that don't fit your current store.",
      primaryText: "Book a consultation",
      primaryLink: "/contact-us",
      secondaryText: "View portfolio",
      secondaryLink: "/portfolio",
    },
  },
];

export default webdevelopment;
