const mapping = [
  {
    subSlug: "image-mapping",
    title: "Image Mapping",
    shortTitle: "Interactive Layout Mapping",
    label: "Real Estate Tech",
    heroBadge: "Smart Property Navigation",
    description:
      "Interactive real estate project layouts with one-click access to details, media, and availability.",
    image: "/map3d.jpg",
    heroImage: "/map3d.jpg",
    thumbnail: "/map.png",
    gallery: [
      "/assets/6.png",
      "/assets/7.png",
      "/assets/8.png",
    ],

    /* ── editorial copy for the bespoke Image Mapping page ── */
    headline: ["Every plot,", "one tap away."],
    heroSubcopy:
      "We turn a flat master layout into a live, clickable sales tool — pricing, specs, media and availability behind every unit.",
    overviewTitle: "A brochure can't answer questions. A map can.",
    overviewNote: "What it is, and why it works.",

    /* ── live layout demo shown in the hero ── */
    liveProject: {
      name: "Sunridge Farms, Phase 2",
      shortName: "Sunridge Farms",
      image: "/map3d.jpg",
      phases: ["Phase 1", "Phase 2", "Amenities"],
      activePhase: "Phase 2",
    },

    plots: [
      {
        key: "a14",
        id: "A-14",
        status: "Available",
        area: "2,400 sqft",
        price: "₹42.6 L",
        facing: "East",
        block: "A",
        points: "12,22 30,19 32,34 14,37",
      },
      {
        key: "b02",
        id: "B-02",
        status: "Reserved",
        area: "1,800 sqft",
        price: "₹31.9 L",
        facing: "North",
        block: "B",
        points: "34,18 52,16 54,32 36,34",
      },
      {
        key: "b07",
        id: "B-07",
        status: "Sold",
        area: "3,200 sqft",
        price: "₹56.4 L",
        facing: "West",
        block: "B",
        points: "56,16 74,15 76,31 58,32",
      },
      {
        key: "c11",
        id: "C-11",
        status: "Available",
        area: "2,000 sqft",
        price: "₹35.5 L",
        facing: "South",
        block: "C",
        points: "14,44 34,42 36,60 16,62",
      },
      {
        key: "c12",
        id: "C-12",
        status: "Available",
        area: "2,150 sqft",
        price: "₹38.2 L",
        facing: "East",
        block: "C",
        points: "38,42 58,41 60,58 40,60",
      },
      {
        key: "d03",
        id: "D-03",
        status: "Reserved",
        area: "4,000 sqft",
        price: "₹71.0 L",
        facing: "North-East",
        block: "D",
        points: "62,40 80,39 82,56 64,58",
      },
    ],

    overview: `
      <p>Image Mapping turns your master layout into an interactive exploration tool. Every plot, block or section becomes clickable and intelligent — tap a unit and get pricing, specs, brochures, video, location advantages and live status.</p>
      <p>The result is a Google-Maps-like experience for property discovery: buyers understand the project in seconds, and your sales team stops explaining geometry.</p>
    `,

    highlightTags: [
      "Interactive Layouts",
      "Live Availability",
      "Mobile Friendly",
      "Sales Ready",
      "CRM Integration",
    ],

    stats: [
      { value: "40%", label: "Higher buyer engagement" },
      { value: "1 click", label: "To full unit detail" },
      { value: "24/7", label: "Site visits without the site" },
    ],

    benefits: [
      "Google-Maps-like navigation buyers already know.",
      "One-click access to pricing, specs and media.",
      "Seamless on mobile, tablet and desktop.",
      "Real-time availability and price updates.",
      "Rich media: video, brochures, 360° views.",
      "Nearby landmarks and location context.",
      "Fewer repeated questions for the sales desk.",
      "Every interaction lands in your CRM.",
    ],

    features: [
      {
        title: "Clickable plot selection",
        description:
          "Every plot or unit is interactive — tap to explore details instantly.",
        icon: "MapPinned",
        image: "/assets/1.png",
      },
      {
        title: "Integrated media",
        description:
          "Brochures, videos, 360° views and images live inside the layout.",
        icon: "Image",
        image: "/assets/2.png",
      },
      {
        title: "Live information",
        description:
          "Status, pricing and specs update dynamically — no redeploys.",
        icon: "BadgeInfo",
        image: "/assets/3.png",
      },
    ],

    useCases: [
      {
        title: "Plotted developments",
        description: "Live pricing, size and availability on every plot.",
      },
      {
        title: "Townships & gated communities",
        description: "Phase-wise master plans made explorable.",
      },
      {
        title: "Managed farmland",
        description: "Crop details, ownership info and visit booking.",
      },
      {
        title: "Villa & row-house projects",
        description: "Floor plans, elevations and walkthroughs per unit.",
      },
      {
        title: "Commercial & industrial parks",
        description: "Units, warehouses and the specs investors ask for.",
      },
      {
        title: "Resorts & holiday property",
        description: "Cottages, activities and the booking journey.",
      },
    ],

    workflow: [
      {
        step: "01",
        title: "Layout preparation",
        description:
          "We prep your master layout and define every clickable section.",
      },
      {
        step: "02",
        title: "Data integration",
        description:
          "Pricing, brochures, media and CRM links map to each plot.",
      },
      {
        step: "03",
        title: "Interactive deployment",
        description:
          "Optimised for web and mobile, ready for your sales team.",
      },
    ],

    demos: [
      {
        url: "/img.mp4",
        title: "Plot mapping, walked through.",
        poster: "/map.png",
        thumbnail: "/m.png",
        description:
          "Instead of static blueprints, buyers get an accurate interactive representation of plots, boundaries and features — on any device, in any browser.",
        notes: ["No app install", "Works offline-first"],
      },
    ],

    caseStudies: [
      {
        title: "Real estate visualization",
        description:
          "A developer lifted client engagement 40% after replacing brochure layouts with interactive exploration.",
        image: "/map.png",
        result: "+40%",
      },
    ],

    deliverables: [
      "Interactive project layout",
      "Clickable unit details",
      "Integrated brochures and videos",
      "Responsive mobile interface",
      "Optional CRM / lead integration",
    ],

    technologies: [
      "React",
      "Next.js",
      "Interactive UI layers",
      "Media embeds",
      "CRM integration",
    ],

    faqs: [
      {
        question: "Can it integrate with our CRM or booking system?",
        answer:
          "Yes. Plot enquiries, brochure downloads and demo requests push straight into your CRM, so every tap on the map becomes an attributable lead.",
      },
      {
        question: "Is it mobile-friendly?",
        answer:
          "Fully. Pinch-zoom, pan and tap targets are designed mobile-first — most buyers open the layout on a phone.",
      },
      {
        question: "Can we showcase videos and brochures?",
        answer:
          "Any media can sit behind a plot or block: PDFs, walkthrough video, 360° tours and image galleries.",
      },
      {
        question: "How long does it take to build?",
        answer:
          "A typical single-phase layout goes live in two to three weeks from receiving your master plan and data sheet.",
      },
      {
        question: "Can our sales team update plot status themselves?",
        answer:
          "Yes — a simple admin view lets your team flip units between available, reserved and sold, and edit pricing without us.",
      },
    ],

    cta: {
      title: "Bring your layouts to life.",
      description: "Send us a master plan — we'll map one block free.",
      primaryText: "Book demo",
      primaryLink: "/contact-us",
      secondaryText: "View portfolio",
      secondaryLink: "/portfolio",
    },
  },

  {
    subSlug: "drone-mapping",
    title: "Drone Mapping",
    shortTitle: "Aerial Survey & Analysis",
    label: "Survey & Intelligence",
    heroBadge: "High Accuracy Aerial Mapping",
    description:
      "High-accuracy aerial land mapping, surveying, and topographical analysis using drones.",
    image: "/drone.jpg",
    heroImage: "/drone.jpg",
    thumbnail: "/drone-thumb.jpg",
    gallery: [],

    overview: `
      <p>Drone Mapping provides precise aerial data for land developers, construction companies, real estate projects, and surveyors.</p>
      <p>Using advanced drones, we capture high-resolution aerial imagery to generate orthomosaic maps, 3D models, contour maps, and topographical outputs.</p>
      <p>This helps businesses make faster and more accurate decisions related to planning, site analysis, land development, and boundary validation.</p>
      <p>Compared to manual surveying, drone mapping offers a faster turnaround, broader coverage, and highly professional deliverables.</p>
    `,

    highlightTags: [
      "2D Mapping",
      "3D Models",
      "Contour Maps",
      "DGCA Ready",
      "High Precision",
    ],

    stats: [
      { value: "2–10 cm", label: "Survey accuracy" },
      { value: "45%", label: "Faster planning" },
      { value: "Large Area", label: "Coverage" },
    ],

    benefits: [
      "High-accuracy land measurements using GPS-enabled drone flights.",
      "Detailed 2D and 3D mapping for layouts, planning, and development.",
      "Contour and elevation mapping for construction and architecture.",
      "Large-area surveying completed faster than manual methods.",
      "Helps identify boundaries, slopes, utilities, and structural planning.",
      "Faster turnaround time with professional-grade output.",
      "Cost-effective and more accurate than traditional surveying.",
    ],

    features: [],

    useCases: [
      {
        title: "Land Surveys & Boundaries",
        description:
          "Validate plot boundaries and acreage with GPS-accurate aerial data.",
      },
      {
        title: "Construction Monitoring",
        description:
          "Track site progress over time with repeatable aerial captures.",
      },
      {
        title: "Layout Planning",
        description:
          "Plan roads, plots, and drainage on accurate terrain and contour data.",
      },
      {
        title: "Agriculture & Plantations",
        description:
          "Map farm extents, crop zones, and irrigation with large-area coverage.",
      },
    ],

    workflow: [
      {
        step: "01",
        title: "Site Assessment",
        description:
          "We understand the location, scope, terrain, and required survey outputs.",
      },
      {
        step: "02",
        title: "Drone Capture",
        description:
          "Professional drone flights capture high-resolution images with planned overlap.",
      },
      {
        step: "03",
        title: "Processing & Analysis",
        description:
          "Captured imagery is processed into orthomosaic maps, contours, and 3D models.",
      },
    ],

    demos: [],

    caseStudies: [],

    deliverables: [
      "Orthomosaic maps",
      "2D aerial layouts",
      "3D terrain models",
      "Contour and elevation maps",
      "Survey-ready outputs",
    ],

    technologies: [
      "DJI Drones",
      "Photogrammetry Software",
      "GIS Tools",
      "Orthomosaic Generators",
      "3D Terrain Processing",
    ],

    faqs: [
      {
        question: "What accuracy can be achieved?",
        answer:
          "Drone surveys can achieve accuracy between 2–10 cm depending on terrain and equipment.",
      },
      {
        question: "Is drone mapping legal?",
        answer:
          "Yes, surveys are done under DGCA guidelines with required permissions.",
      },
      {
        question: "Can we generate 3D models?",
        answer:
          "Yes, we provide 3D maps, elevation maps, and contour models.",
      },
      {
        question: "How large areas can be mapped?",
        answer:
          "From small plots to hundreds of acres depending on requirements.",
      },
    ],

    testimonial: null,

    cta: {
      title: "Map your land with precision",
      description:
        "Get aerial insights, topographical clarity, and faster survey results.",
      primaryText: "Request Survey",
      primaryLink: "/contact-us",
      secondaryText: "Explore Portfolio",
      secondaryLink: "/portfolio",
    },
  },
];

export default mapping;
