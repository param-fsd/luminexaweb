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
    title: "3D Walkthrough",
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
    "subSlug": "digital-twin",
    "title": "3D Immersive",
    "shortTitle": "Immersive Real Estate Experiences",
    "label": "Real Estate",
    "heroBadge": "Built for real estate developers",
    "description": "Give your sales and marketing teams an interactive way to present the entire development. Showcase high-rise apartments, villa communities, amenities, landscapes, and interiors in one connected 3D experience for project launches and buyer presentations.",
    "image": "/immersive-3d-aerial.webp",
    "heroImage": "/immersive-3d-aerial.webp",
    "overview": "Present the full scale and vision of your development, from an aerial master plan to individual buildings and interiors. Let buyers explore towers, villas, internal roads, landscaped spaces, clubhouses, and shared amenities in context. Your team can guide the presentation or let prospects explore independently, helping them understand how every part of the project connects before a site visit.",
    "projectHighlights": [
      { "title": "The complete master plan", "description": "Show the entire development in 3D, including building placement, project phases, access roads, and open spaces." },
      { "title": "Buildings, floors & homes", "description": "Take presentations from the project overview into selected towers, apartment layouts, villas, and interiors." },
      { "title": "Amenities & surroundings", "description": "Showcase clubhouses, recreation areas, gardens, and shared facilities as part of the complete project." },
      { "title": "Connected project exploration", "description": "Bring project routing and approved interior choices into the same experience for your sales gallery, website, and remote presentations." }
    ],
    "highlightTags": [
      "Complete project in 3D",
      "High-rise apartments",
      "Villa communities",
      "Interior customization",
      "Project routing",
      "Laptop, tablet & mobile"
    ],
    "compatibility": {
      "title": "One project. Every screen. Simple to explore.",
      "description": "Present your complete project in 3D on laptops, tablets, and mobile phones. Give your sales team and buyers a seamless browser experience on everyday devices, without high-end hardware or complex setup.",
      "devices": [
        { "title": "Laptop", "description": "Lead detailed project presentations in the sales office or during remote meetings." },
        { "title": "Tablet", "description": "Bring interactive project exploration into client meetings and on-site conversations." },
        { "title": "Mobile", "description": "Share a project link so prospects can explore the development wherever they are." }
      ],
      "highlights": ["No high-end configuration needed", "Open in a browser", "No app installation", "Simple, seamless exploration"]
    },
    "features": [
      {
        "title": "High-rise apartment projects in 3D",
        "description": "Explore the development from the skyline down to an individual apartment. Help buyers understand tower placement, floor layouts, shared spaces, and how their home connects to the wider community.",
        "image": "/3d.jpg",
        "points": [
          "Explore towers, floors, and apartment layouts",
          "View entrances, podiums, landscaped areas, and amenities",
          "Move from the project overview into selected home interiors"
        ]
      },
      {
        "title": "Villa projects in 3D",
        "description": "Present the character of every villa alongside the community around it. Let buyers explore home designs, gardens, internal roads, and shared facilities before visiting the site.",
        "image": "/immersive-3d-aerial.webp",
        "points": [
          "Explore villa exteriors, layouts, and private outdoor spaces",
          "Understand each home within the community master plan",
          "Discover access roads, green spaces, and lifestyle amenities"
        ]
      }
    ],
    "customization": {
      "title": "Present your interior options interactively.",
      "description": "Equip your sales team to demonstrate approved finishes, material palettes, and interior packages within the 3D property. Let buyers compare available combinations while your team explains the options offered for the project.",
      "image": "/interior-customization-bedroom.jpeg",
      "options": [
        {
          "title": "Wall colors & finishes",
          "description": "Explore curated paint palettes and feature-wall finishes."
        },
        {
          "title": "Flooring & materials",
          "description": "Compare selected tile, wood, and surface combinations."
        },
        {
          "title": "Furniture & layouts",
          "description": "Preview agreed furniture styles and arrangements in the room."
        },
        {
          "title": "Kitchen & cabinetry",
          "description": "Explore cabinet finishes and countertop options from the project palette."
        }
      ],
      "note": "Available choices are configured around your approved specifications and interior packages. Visual previews help buyers compare options; final inclusions are confirmed by your sales team."
    },
    "routing": {
      "title": "Show your project. Connect its surroundings.",
      "description": "Give buyers a complete location view with project boundaries, surrounding areas, and nearby landmarks. Our interactive routing system lets them select a destination in a single click to display the road route, distance in kilometres, and estimated travel duration. Help your sales team explain how the development connects to the places that matter.",
      "steps": [
        {
          "title": "Explore the project & boundaries",
          "description": "Locate the complete development, understand its boundaries, and discover surrounding areas and nearby landmarks."
        },
        {
          "title": "Select a destination",
          "description": "Choose a nearby landmark or destination in one click to request a road route from the project."
        },
        {
          "title": "See the route, kilometres & time",
          "description": "View the road connection on the map with distance and estimated travel duration, updated when a new destination is selected."
        }
      ],
      "note": "Routes are fetched on destination selection. Travel times are estimates from the routing service."
    },
    "faqs": [
      {
        "question": "Can one experience include apartments and villas?",
        "answer": "Yes. A mixed residential development can bring towers, apartments, villas, and shared amenities together within one project experience. The level of detail and accessible interiors are agreed during planning."
      },
      {
        "question": "What can buyers customize inside the home?",
        "answer": "The experience can include wall colors, flooring, furniture arrangements, cabinetry, and other agreed finishes. We build the selection around your approved design options and sales packages."
      },
      {
        "question": "How does the routing system work?",
        "answer": "The map presents the project, its boundaries, and surrounding landmarks. Selecting a destination requests a road route from the project and displays the distance in kilometres and estimated travel duration. Selecting another destination updates the route and journey details."
      },
      {
        "question": "Can we include unit details and availability?",
        "answer": "Yes. Property details can appear alongside the 3D experience. Availability can be connected to a compatible inventory or CRM system, with fields and update frequency agreed during scoping."
      },
      {
        "question": "What do you need to build our experience?",
        "answer": "Share your master plan, architectural drawings or 3D models, interior references, material options, and the routes you want visitors to explore. We use these to define the experience and delivery plan."
      }
    ],
    "cta": {
      "title": "Bring your complete development into 3D.",
      "description": "Share your master plan and project launch goals. We will build an immersive presentation around your development, interior options, and project routes to support your sales and marketing teams.",
      "primaryText": "Discuss your project",
      "primaryLink": "/contact-us",
      "secondaryText": "View portfolio",
      "secondaryLink": "/portfolio"
    }
  },
];

export default nex3dServices;
