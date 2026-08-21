/**
 * Portfolio entries.
 *
 * This file replaced an unrelated boilerplate file (a fictional "Alex Chen, Python
 * Developer") that nothing imported.
 *
 * /portfolio is still a "coming soon" page by choice, and renders only the
 * `type: "demo"` entries below. Client entries are kept here ready for when the
 * real portfolio launches — they are not shown anywhere yet.
 *
 * ─── HOW TO ADD A REAL PROJECT ───────────────────────────────────────────────
 * Copy the template at the bottom into `projects`, fill it in, and drop the image
 * into /public. To launch the full portfolio, render a grid over `projects` in
 * src/app/portfolio/page.js instead of the demos-only section.
 *
 * Entry shape:
 *   id          unique string, used as the React key
 *   type        "client" (real delivered work) or "demo" (something live on this site)
 *   title       what it is
 *   client      client or project name — omit for demos, or use "Under NDA"
 *   sector      e.g. "Real Estate", "Manufacturing"
 *   year        "2025"
 *   summary     one or two sentences on what was built and why
 *   services    string[] — matches the service names used elsewhere on the site
 *   image       path under /public
 *   href        where the card links (a live URL, a case study, or a service page)
 *   linkLabel   optional button text; defaults to "View project"
 *
 * Only claim results a client has approved in writing. Everything below is either
 * verifiable on this site or drawn from the published case study.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const projects = [
  /* ── Live demos: each of these is a working build on this site ── */
  {
    id: "demo-image-mapping",
    type: "demo",
    title: "Interactive plot map",
    sector: "Real Estate",
    summary:
      "A master layout turned into a live sales tool — clickable plots with status, pricing, area and facing, and a phase switcher across the development.",
    services: ["Image Mapping", "Plot Inventory", "Interactive Master Plan"],
    image: "/map3d.jpg",
    href: "/services/mapping/image-mapping",
    linkLabel: "Open the demo",
  },
  {
    id: "demo-digital-twin",
    type: "demo",
    title: "Real estate digital twin",
    sector: "Real Estate",
    summary:
      "A building model that stays bound to live data — unit availability from CRM, plus occupancy, energy and open tickets pinned to the spaces they belong to.",
    services: ["Digital Twin", "3D Visualization", "CRM Integration"],
    image: "/3d.jpg",
    href: "/services/3d-visualization/digital-twin",
    linkLabel: "Open the demo",
  },
  {
    id: "demo-crm-erp",
    type: "demo",
    title: "CRM & ERP console",
    sector: "Business Systems",
    summary:
      "Sales pipeline, inventory and finance in one interface, with KPI tiles and stage-by-stage drill-down across each module.",
    services: ["CRM Development", "ERP Development", "Dashboards"],
    image: "/crm.jpg",
    href: "/services/crm-erp",
    linkLabel: "Open the demo",
  },
  {
    id: "demo-ai-automation",
    type: "demo",
    title: "AI automation runs",
    sector: "Operations",
    summary:
      "Support, sales and back-office workflows stepped through end to end, including the confidence threshold that hands work back to a person.",
    services: ["AI Agents", "Workflow Automation"],
    image: "/nexai.jpg",
    href: "/services/artificial-intelligence",
    linkLabel: "Open the demo",
  },

  /* ── Delivered work ── */
  {
    id: "case-real-estate-visualization",
    type: "client",
    title: "Visualisation for a plotted development",
    client: "Real estate developer",
    sector: "Real Estate",
    year: "2025",
    summary:
      "Image mapping, 360° virtual tours and drone visualisation combined into one presentation, so buyers could understand layout, access and surroundings without a site visit.",
    services: [
      "Image Mapping",
      "360 Virtual Tour",
      "Drone Visualization",
      "Interactive Project Presentation",
    ],
    image: "/blog4.jpg",
    href: "/case-studies/lack-of-visualization-in-real-estate",
    linkLabel: "Read the case study",
  },

  /* ── TEMPLATE — copy, fill in, and remove the comment markers ──
  {
    id: "unique-id-here",
    type: "client",
    title: "What you built",
    client: "Client name, or \"Under NDA\"",
    sector: "Real Estate",
    year: "2026",
    summary: "One or two sentences: the problem, and what you delivered.",
    services: ["Image Mapping", "CRM Development"],
    image: "/your-image.jpg",
    href: "/contact-us",
    linkLabel: "View project",
  },
  ──────────────────────────────────────────────────────────────── */
];

export default projects;
export { projects };
