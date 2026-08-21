"use client";

/**
 * Bespoke page for /services/3d-visualization.
 *
 * Renders without a hero widget, so the hero copy runs full width. (An earlier
 * version carried an interactive "staged scene" panel on the right; it was removed
 * on request and is recoverable from git history if it is ever wanted back.)
 *
 * Modules link to the sub-services in src/data/visualization.js.
 */

import React from "react";
import EditorialServicePage from "./editorial/EditorialServicePage";

/* ── content ─────────────────────────────────────────────────────────────── */

const CONTENT = {
  headline: ["See it before", "you build it."],
  subcopy:
    "Photo-real walkthroughs, product visualisation, and live digital twins that stay bound to your real inventory and sensor data long after the render is delivered.",
  tags: [
    "Photo-Real Rendering",
    "Real Estate Digital Twins",
    "Real-Time Walkthroughs",
    "AR-Ready Assets",
    "Source Files Handed Over",
  ],
  stats: [
    { value: "4K", label: "Render output as standard" },
    { value: "Live", label: "Twins bound to real inventory" },
    { value: "1 month", label: "Typical first twin delivered" },
  ],

  overview: {
    note: "Renders age. Twins don't.",
    title: "A render is true for one afternoon. A twin stays true.",
    html: `
      <p>Most 3D work for real estate is a photograph of an intention: beautiful on launch day, quietly wrong three months later when half the units are sold and the render still shows them available.</p>
      <p>We do both halves of the job. The cinematic side — walkthroughs, stills and real-time builds good enough to sell off-plan. And the live side, where the same model is bound to your CRM and your building systems, so unit availability, occupancy and open maintenance tickets are current every time someone opens it.</p>
      <p>That binding is the actual product. The geometry is just how you read it. It runs in a browser, it scales down to a broker's phone, and the model, the integrations and the source code are handed over to you at the end.</p>
    `,
  },

  modules: {
    label: "Capabilities",
    itemLabel: "Capability",
    note: "Three tracks, one pipeline.",
    title: "Three tracks, one pipeline.",
    hrefBase: "/services/3d-visualization",
    items: [
      {
        subSlug: "digital-twin",
        title: "Digital twin",
        description:
          "A live 3D replica of the property bound to CRM inventory and building data — availability, occupancy and tickets, current on every screen.",
        image: "/map3d.jpg",
      },
      {
        subSlug: "3d-walkthroughs",
        title: "3D walkthroughs",
        description:
          "Photo-real interior and exterior walkthroughs that let buyers move through a building months before it exists.",
        image: "/3d.jpg",
      },
      {
        subSlug: "product-visualization",
        title: "Product visualization",
        description:
          "Product models for listings, campaigns and AR, where a new colourway costs a render instead of a reshoot.",
        image: "/three.png",
      },
    ],
  },

  benefits: {
    note: "What it changes.",
    title: "What it changes.",
    items: [
      "Buyers commit earlier, because they have walked the space.",
      "One inventory truth across sales office, website and brokers.",
      "No unit ever gets sold twice.",
      "Faults located on the model instead of in a spreadsheet.",
      "New variants and angles cost a render, not a reshoot.",
      "Model, integrations and source code handed over to you.",
    ],
  },

  useCases: {
    note: "Where it fits best.",
    title: "Where it fits best.",
    items: [
      { title: "Off-plan sales", description: "Sell the building months before the structure is topped out." },
      { title: "Live inventory", description: "Availability across towers, floors and unit types, in sync." },
      { title: "Facilities management", description: "Assets, warranties and tickets pinned to real locations." },
      { title: "Energy monitoring", description: "Consumption per floor and tenant, tracked over time." },
      { title: "Construction progress", description: "Drone capture compared against programme each month." },
      { title: "Product catalogues", description: "Consistent 3D listings and AR previews at scale." },
    ],
  },

  process: {
    note: "How a twin gets built.",
    title: "How a twin gets built.",
    steps: [
      {
        step: "01",
        title: "Capture the asset",
        description:
          "Drone survey, laser scan or your existing BIM, reconciled against the as-built drawings so the geometry is trustworthy before anything is bound to it.",
      },
      {
        step: "02",
        title: "Bind the data",
        description:
          "Units mapped to CRM records, meters and sensors mapped to spaces. This mapping is the twin — the 3D is only how you read it.",
      },
      {
        step: "03",
        title: "Deploy & hand over",
        description:
          "A browser viewer with role-based access for sales and facilities, then the model, the integrations and the source code handed to you.",
      },
    ],
    technologies: ["Three.js", "React Three Fiber", "Unreal Engine", "Blender", "3ds Max", "V-Ray", "IFC / BIM", "Cesium", "MQTT", "PostgreSQL"],
    deliverables: [
      "As-built 3D model reconciled to drawings",
      "Unit-to-CRM binding with live status",
      "Sensor and meter mapping per space",
      "Browser viewer with role-based access",
      "Walkthrough film and print stills where scoped",
      "Integration and API documentation",
      "Full source code and model handover",
    ],
  },

  caseStudy: {
    note: "Proof, not promises.",
    title: "Proof, not promises.",
    result: "0",
    heading: "Units sold twice",
    description:
      "A tower launch was running availability on a whiteboard in the sales office and a spreadsheet emailed to brokers weekly. Binding the 3D model to the CRM put every channel on the same live inventory, and the double-booking problem disappeared entirely.",
    image: "/map3d.jpg",
  },

  faqs: {
    note: "Common questions, answered.",
    title: "Common questions.",
    items: [
      {
        question: "What is the difference between a digital twin and a virtual tour?",
        answer:
          "A tour is fixed — it shows one captured moment and goes out of date. A twin is bound to live data, so unit availability, sensor readings and open tickets are current every time it is opened.",
      },
      {
        question: "Do we need sensors installed?",
        answer:
          "No. Most real estate twins start with sales inventory only, which needs no hardware at all. The operations layer gets added later if the building has meters and a BMS worth reading.",
      },
      {
        question: "Will it connect to the CRM we already use?",
        answer:
          "Yes — Salesforce, Zoho, our own CRM builds, or a custom system. Anything with an API works; where there is none we fall back to scheduled sync and label the last refresh honestly.",
      },
      {
        question: "What hardware do visitors need?",
        answer:
          "A browser. It runs on a sales-office touchscreen, a laptop and a broker's phone with no install, and the detail level scales down on weaker devices rather than failing outright.",
      },
      {
        question: "How long does this take?",
        answer:
          "A walkthrough is typically three weeks. A first digital twin with live sales inventory is around a month. The operations layer is staged after that, once the building is actually running.",
      },
      {
        question: "Who owns the model at the end?",
        answer:
          "You do — the model, the data bindings and the source code. A twin is meant to outlive the sales campaign and be inherited by whoever operates the building.",
      },
    ],
  },

  cta: {
    title: "Let's build your twin.",
    description:
      "Bring us the drawings and the system your inventory lives in. We'll scope a twin that keeps them in sync.",
    primaryText: "Start a project",
    primaryLink: "/contact-us",
    secondaryText: "View portfolio",
    secondaryLink: "/portfolio",
  },
};

const ThreeDVisualizationPage = ({ service }) => (
  <EditorialServicePage
    content={CONTENT}
    breadcrumb={service?.title?.trim() || "3D Visualization"}
  />
);

export default ThreeDVisualizationPage;
