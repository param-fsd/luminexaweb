/**
 * Sub-services under /services/3d-visualization.
 *
 * The parent route renders the bespoke ThreeDVisualizationPage; its "Capabilities"
 * cards link to these subSlugs, so keep them in sync with CONTENT.modules in
 * src/components/services/ThreeDVisualizationPage.js.
 */
const nex3dServices = [
  {
    subSlug: "3d-walkthroughs",
    title: "3D Walkthroughs",
    shortTitle: "Architectural Walkthroughs",
    label: "Architecture",
    heroBadge: "Cinematic Walkthroughs",
    description:
      "Photo-real interior and exterior walkthroughs that let buyers move through a building before it exists.",
    image: "/3d.jpg",
    heroImage: "/3d.jpg",

    overview: `
<p>A floor plan asks a buyer to imagine the space. A walkthrough shows it to them — the ceiling height, the light at four in the afternoon, how the kitchen actually reads when you stand in the doorway.</p>
<p>We build from your CAD, Revit or SketchUp files, model what is missing, and render at a level of material and lighting detail that survives being projected on a sales-office wall.</p>
<p>Output is whatever the sales process needs: a cinematic film for the launch, a real-time build people can steer themselves, or stills for the brochure — all from the same scene, so nothing looks inconsistent.</p>
`,

    highlightTags: ["4K cinematic", "Real-time builds", "PBR materials", "Day / night states", "VR-ready"],

    stats: [
      { value: "4K", label: "Render resolution as standard" },
      { value: "3 wks", label: "Typical walkthrough delivery" },
      { value: "1 scene", label: "Film, real-time and stills from it" },
    ],

    features: [
      { title: "Exterior & massing", description: "The building in its real context — surroundings, landscape and approach.", image: "/3d.jpg" },
      { title: "Interior detailing", description: "Materials, furniture and lighting at the level a buyer actually notices.", image: "/to.jpg" },
      { title: "Real-time build", description: "An Unreal or Twinmotion build the visitor steers themselves.", image: "/three.png" },
    ],

    benefits: [
      "Buyers commit earlier because they have seen the space.",
      "One scene feeds film, real-time and print without mismatches.",
      "Design problems surface before they are built.",
      "Day, dusk and night states from the same model.",
      "Assets you own outright, in editable project files.",
    ],

    useCases: [
      { title: "Pre-launch sales", description: "Sell the building months before the structure is topped out." },
      { title: "Design review", description: "Spot spatial problems while they are still cheap to fix." },
      { title: "Planning submissions", description: "Contextual views for approval and consultation." },
      { title: "Interior fit-out", description: "Compare material and lighting schemes side by side." },
    ],

    workflow: [
      { step: "01", title: "Model & block out", description: "CAD and Revit files brought in, missing geometry built, massing agreed before any detailing." },
      { step: "02", title: "Material & light", description: "PBR materials, real luminaire data and the light states you want to sell in." },
      { step: "03", title: "Render & deliver", description: "Film, real-time build and stills exported from the one scene, with project files handed over." },
    ],

    technologies: ["3ds Max", "V-Ray / Corona", "Blender", "Unreal Engine", "Twinmotion", "Photoshop", "After Effects"],

    deliverables: [
      "4K walkthrough film with sound design",
      "Real-time build for Windows or web",
      "Still renders for print and listings",
      "Day, dusk and night variants",
      "Editable scene and project files",
      "Source assets and texture library",
    ],

    faqs: [
      { question: "What do you need from us to start?", answer: "Whatever you have — CAD, Revit, SketchUp or even good drawings. We build what is missing and confirm the massing with you before detailing." },
      { question: "How many rounds of changes are included?", answer: "Two rounds at massing and two at final render. Changes after the lighting is locked cost more, so we front-load the decisions." },
      { question: "Can it work in VR?", answer: "Yes. The real-time build runs on Quest and tethered headsets — worth it for sales suites, less so for a website." },
    ],

    cta: {
      title: "Show them the building.",
      description: "Send us the drawings and we'll come back with scope and a timeline.",
      primaryText: "Book a consultation",
      primaryLink: "/contact-us",
      secondaryText: "View portfolio",
      secondaryLink: "/portfolio",
    },
  },

  {
    subSlug: "digital-twin",
    title: "Digital Twin",
    shortTitle: "Real Estate Digital Twins",
    label: "Real Estate",
    heroBadge: "Live Building Twins",
    description:
      "A live 3D replica of a property, bound to real inventory, sensor and operations data — not a render that goes stale the week it ships.",
    image: "/map3d.jpg",
    heroImage: "/map3d.jpg",

    overview: `
<p>A render is a photograph of an intention. A digital twin is a model wired to the systems that actually run the building, so what you see on screen is what is true right now.</p>
<p>For a project under sale, that means the 3D model is bound to your CRM: a unit that gets booked turns from available to sold on the model within seconds, on every screen showing it — the sales office, the website, the broker's phone. Nobody sells the same flat twice.</p>
<p>For a building in operation, the same model carries the live layer: occupancy, energy draw, HVAC state, open maintenance tickets, each attached to the floor or unit it belongs to. Facilities teams stop hunting through spreadsheets to find out which riser a fault is on.</p>
<p>We build it from your survey, drone capture or BIM, connect it to the systems you already run, and hand over the model and the integration code.</p>
`,

    highlightTags: [
      "Live CRM inventory",
      "BIM & survey accurate",
      "IoT sensor layer",
      "Floor & unit drill-down",
      "Web-based, no install",
    ],

    stats: [
      { value: "Live", label: "Inventory, not a nightly export" },
      { value: "1 month", label: "Typical first twin delivered" },
      { value: "0", label: "Double-sold units" },
    ],

    features: [
      { title: "Live sales inventory", description: "Every unit bound to your CRM — availability, price and hold status update on the model in seconds.", image: "/map3d.jpg" },
      { title: "Operations layer", description: "Occupancy, energy, HVAC and maintenance tickets attached to the floor and unit they belong to.", image: "/net.jpg" },
      { title: "As-built accuracy", description: "Built from drone capture, laser survey or your BIM, so the twin matches what was actually constructed.", image: "/drone.jpg" },
    ],

    benefits: [
      "One inventory truth across sales office, website and brokers.",
      "Faults located on the model instead of in a spreadsheet.",
      "Energy and occupancy read per floor, not per building.",
      "Handover pack that stays useful after practical completion.",
      "Runs in a browser — no plugin, no headset, no install.",
      "Model, integrations and source code handed to you.",
    ],

    useCases: [
      { title: "Sales inventory", description: "Live availability across towers, floors and unit types." },
      { title: "Facilities management", description: "Assets, warranties and tickets pinned to real locations." },
      { title: "Energy monitoring", description: "Consumption per floor and per tenant, tracked over time." },
      { title: "Construction progress", description: "Drone capture against programme, month by month." },
      { title: "Tenant portals", description: "Tenants see their own floor, their own tickets." },
      { title: "Asset handover", description: "A model the operator inherits instead of a box of PDFs." },
    ],

    workflow: [
      { step: "01", title: "Capture the asset", description: "Drone survey, laser scan or your existing BIM, reconciled against the as-built drawings so the geometry is trustworthy." },
      { step: "02", title: "Bind the data", description: "Units mapped to CRM records, sensors and meters mapped to spaces. This mapping is the twin — the geometry is just how you read it." },
      { step: "03", title: "Deploy & hand over", description: "Browser-based viewer, role-based access for sales and facilities, then the model, integrations and code handed to you." },
    ],

    technologies: ["Three.js", "React Three Fiber", "Cesium", "IFC / BIM", "PostgreSQL", "MQTT", "Node.js", "Docker"],

    deliverables: [
      "As-built 3D model reconciled to drawings",
      "Unit-to-CRM binding with live status",
      "Sensor and meter mapping per space",
      "Browser viewer with role-based access",
      "Drill-down from building to floor to unit",
      "Integration and API documentation",
      "Full source code and model handover",
    ],

    faqs: [
      {
        question: "How is this different from a 3D render or a virtual tour?",
        answer:
          "A render and a tour are fixed — they show one moment, and they go out of date. A twin is bound to live data, so unit availability, sensor readings and open tickets are current every time someone opens it.",
      },
      {
        question: "Does it connect to our existing CRM?",
        answer:
          "Yes. We bind units to records in whatever you run — our own CRM builds, Salesforce, Zoho, or a custom system. Anything with an API works; where there is none we fall back to scheduled sync and label the last refresh.",
      },
      {
        question: "Do we need sensors installed for this to be useful?",
        answer:
          "No. Most real estate twins start with sales inventory only, which needs no hardware at all. The operations layer gets added later if and when the building has meters and BMS worth reading.",
      },
      {
        question: "What does it run on?",
        answer:
          "A browser. It works on a sales-office touchscreen, a laptop and a broker's phone without an install, and the level of detail scales down on weaker devices rather than failing.",
      },
      {
        question: "What happens at project handover?",
        answer:
          "The operator inherits the model, the data bindings and the source code. It is designed to outlive the sales campaign rather than be switched off at the end of it.",
      },
    ],

    cta: {
      title: "Build the twin of your project.",
      description:
        "Bring us the drawings and your inventory system. We'll scope a twin that keeps them in sync.",
      primaryText: "Book a consultation",
      primaryLink: "/contact-us",
      secondaryText: "View portfolio",
      secondaryLink: "/portfolio",
    },
  },

  {
    subSlug: "product-visualization",
    title: "Product Visualization",
    shortTitle: "3D Product & Packaging",
    label: "Product",
    heroBadge: "3D Product Modeling",
    description:
      "Photo-real product models for listings, campaigns and AR — cheaper to change than a reshoot.",
    image: "/three.png",
    heroImage: "/three.png",

    overview: `
<p>Once a product exists as a 3D model, a new colourway, a new angle or a new campaign background costs a render rather than a studio day. That is usually the whole business case.</p>
<p>We model from your CAD or from physical samples, build materials that hold up under close inspection, and deliver whatever the channel needs — stills, turntables, exploded views, or a GLB you can drop into a product page for AR.</p>
`,

    highlightTags: ["PBR materials", "Turntables", "Exploded views", "AR-ready GLB", "Unlimited variants"],

    stats: [
      { value: "∞", label: "Colourways from one model" },
      { value: "4K", label: "Stills and turntable output" },
      { value: "AR", label: "GLB ready for product pages" },
    ],

    features: [
      { title: "Product modeling", description: "Built from CAD or from a physical sample, accurate to the tolerances that show.", image: "/three.png" },
      { title: "Turntables & exploded views", description: "Rotations and breakdowns that explain construction better than copy does.", image: "/3d.jpg" },
      { title: "AR-ready assets", description: "Optimised GLB so shoppers can place the product in their own room.", image: "/nexar.jpg" },
    ],

    benefits: [
      "New variants cost a render, not a reshoot.",
      "Consistent lighting across an entire catalogue.",
      "Angles that are impossible to photograph.",
      "AR previews cut returns on size-sensitive products.",
      "Assets you own and can re-render forever.",
    ],

    useCases: [
      { title: "E-commerce listings", description: "A consistent catalogue shot on every product." },
      { title: "Campaign imagery", description: "Hero visuals without booking a studio." },
      { title: "Packaging mockups", description: "Approve artwork on the real form before print." },
      { title: "Technical explainers", description: "Exploded views for manuals and training." },
    ],

    workflow: [
      { step: "01", title: "Model", description: "From CAD where it exists, from measurements and photos where it does not." },
      { step: "02", title: "Material & light", description: "PBR materials and a lighting rig reused across the catalogue for consistency." },
      { step: "03", title: "Render & optimise", description: "Stills, turntables and an optimised GLB for AR, with source files handed over." },
    ],

    technologies: ["Blender", "KeyShot", "Substance", "Three.js", "glTF / GLB", "Photoshop"],

    deliverables: [
      "Production 3D model with PBR materials",
      "4K stills at agreed angles",
      "Turntable animation",
      "Exploded or cutaway views where useful",
      "Optimised GLB for web and AR",
      "Editable source files",
    ],

    faqs: [
      { question: "Do you need the physical product?", answer: "Helpful but not essential. CAD is ideal; failing that we work from a sample, or from measurements and detailed photographs." },
      { question: "How does this compare to photography on cost?", answer: "The first product usually costs about the same as a shoot. Every variant and re-angle after that is dramatically cheaper, which is where it pays back." },
      { question: "Will it work for AR on our product page?", answer: "Yes — we deliver an optimised GLB sized for mobile, which works with the AR viewers built into iOS and Android." },
    ],

    cta: {
      title: "Model it once, shoot it forever.",
      description: "Send us a product and we'll come back with a per-SKU number.",
      primaryText: "Book a consultation",
      primaryLink: "/contact-us",
      secondaryText: "View portfolio",
      secondaryLink: "/portfolio",
    },
  },
];

export default nex3dServices;
