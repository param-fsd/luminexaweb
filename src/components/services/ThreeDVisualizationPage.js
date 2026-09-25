"use client";

import React from "react";
import EditorialServicePage from "./editorial/EditorialServicePage";

// Keep capability links in sync with src/data/visualization.js.
const CONTENT = {
  headline: ["Bring your property", "vision to life."],
  subcopy: "Bring apartments and villa communities to life with 3D Immersive experiences and cinematic walkthroughs. Help buyers explore homes, personalize interiors, and navigate the development before they visit the site.",
  tags: ["3D Immersive Experiences", "3D Walkthroughs", "Interior & Exterior Views", "Amenities & Landscapes", "Property Sales Experiences"],
  stats: [
    { value: "3D", label: "Explore the complete development" },
    { value: "Inside", label: "Discover layouts, finishes, and spaces" },
    { value: "Online", label: "Present your project to remote buyers" },
  ],
  overview: {
    note: "Your project, clearly presented.",
    title: "Help buyers picture their future property.",
    html: `
      <p>Give buyers a clear sense of your development, from the arrival experience and landscaped surroundings to the layout and character of each home. Our 3D visualization brings architectural plans to life for residential communities, villas, apartments, and commercial properties.</p>
      <p>Cinematic walkthroughs showcase interiors, exteriors, and shared amenities. Interactive 3D immersive experiences let visitors explore the master plan, navigate buildings and floors, and view property information in one connected experience.</p>
      <p>Created from your project drawings, design references, and approved specifications, these experiences support project launches, sales presentations, and online property discovery.</p>
    `,
  },
  modules: {
    columns: 2,
    label: "Capabilities",
    itemLabel: "Capability",
    note: "Two ways to experience your project.",
    title: "3D Immersive & 3D Walkthrough",
    hrefBase: "/services/3d-visualization",
    items: [
      { subSlug: "digital-twin", title: "3D Immersive", description: "Showcase your complete real estate project in 3D. Give your sales team one experience for presenting high-rise apartments, villas, amenities, interior options, and project routes.", image: "/immersive-3d-aerial.webp" },
      { subSlug: "3d-walkthroughs", title: "3D Walkthrough", description: "A guided journey through your property, showcasing architecture, interiors, landscaping, and lifestyle amenities with realistic materials and lighting.", image: "/3d.jpg" },
    ],
  },
  benefits: {
    note: "Designed for property decisions.",
    title: "Make every presentation more meaningful.",
    items: [
      "Help buyers understand room layouts, scale, and the flow between spaces.",
      "Showcase the architecture, finishes, and amenities that define your project.",
      "Give remote buyers a convenient way to explore the development.",
      "Support sales conversations with clear visual context for each property.",
      "Keep property availability aligned with your connected inventory system.",
      "Create consistent visuals for launches, listings, and sales presentations.",
    ],
  },
  useCases: {
    note: "From first launch to site visits.",
    title: "Built around your real estate project.",
    items: [
      { title: "Residential launches", description: "Introduce apartments, villas, and gated communities before construction is complete." },
      { title: "Master plan exploration", description: "Show how buildings, roads, green spaces, and amenities fit together." },
      { title: "Interior presentations", description: "Present room layouts, material palettes, and furnishing concepts." },
      { title: "Unit discovery", description: "Help buyers explore towers, floors, and property options in context." },
      { title: "Commercial properties", description: "Present offices, retail spaces, access points, and shared facilities." },
      { title: "Sales galleries & websites", description: "Bring an engaging property experience to sales meetings and online enquiries." },
    ],
  },
  process: {
    note: "From drawings to a property experience.",
    title: "Your vision, developed in three steps.",
    steps: [
      { step: "01", title: "Understand your project", description: "Review your plans, elevations, master plan, and design references. Agree on the spaces, buyer journey, and presentation formats to include." },
      { step: "02", title: "Build & refine the experience", description: "Develop the 3D environment, materials, landscaping, and lighting. Review key views together and add navigation and property data for 3D immersive experiences." },
      { step: "03", title: "Prepare for launch", description: "Deliver the agreed walkthrough films, still renders, or interactive experience for your website and sales presentations, with guidance for your team." },
    ],
    technologies: ["Unreal Engine", "Blender", "3ds Max", "V-Ray", "Three.js", "React Three Fiber", "IFC / BIM"],
    deliverables: [
      "3D project environment based on approved designs",
      "Interior, exterior, landscape, and amenity views",
      "Walkthrough films and still renders as scoped",
      "Interactive 3D immersive experience with project navigation as scoped",
      "Floor and unit information with agreed inventory integration",
      "Launch assets and handover guidance for your team",
    ],
  },
  faqs: {
    note: "Planning your property experience.",
    title: "Common questions.",
    items: [
      { question: "Which is right for our project: a 3D immersive experience or a walkthrough?", answer: "A walkthrough takes buyers on a curated journey through your property. A 3D immersive experience lets them explore the development interactively and view project or unit information. We can scope either experience or combine both for your sales journey." },
      { question: "Can you visualize a project before construction starts?", answer: "Yes. We can build the experience from architectural drawings, 3D models, and design references. Proposed finishes, landscaping, and amenities are reviewed with your team so the presentation reflects the approved design intent." },
      { question: "What do you need to get started?", answer: "Share your master plan, floor plans, elevations, available CAD or BIM models, and references for materials and landscaping. We will review the available information and identify anything else needed for the agreed scope." },
      { question: "Can a 3D immersive experience show unit availability?", answer: "Yes. Where your CRM or inventory system supports integration, unit information can be connected to the model. The fields, refresh frequency, and access requirements are agreed during scoping." },
      { question: "Where can we use the experience?", answer: "Walkthrough films and stills can support project websites, property listings, presentations, and launch campaigns. Interactive 3D immersive experiences can be prepared for browsers and sales gallery displays, with the target devices agreed at the start." },
      { question: "How long will the project take?", answer: "The schedule depends on the size of the development, available design files, level of detail, and integrations. After reviewing your brief, we provide a delivery plan with review stages and launch milestones." },
    ],
  },
  cta: {
    title: "Bring your real estate project to life.",
    description: "Share your plans and launch goals. We will help shape a 3D experience that presents your property clearly and supports your sales team.",
    primaryText: "Discuss your project",
    primaryLink: "/contact-us",
    secondaryText: "View portfolio",
    secondaryLink: "/portfolio",
  },
};

const ThreeDVisualizationPage = ({ service }) => (
  <EditorialServicePage content={CONTENT} breadcrumb={service?.title?.trim() || "3D Visualization"} />
);

export default ThreeDVisualizationPage;
