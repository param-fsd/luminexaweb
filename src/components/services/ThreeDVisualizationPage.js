"use client";

/**
 * Bespoke page for /services/3d-visualization.
 *
 * Hero widget is a scene that actually builds: pick a track (Walkthrough / Digital
 * twin / Product) and step through its stages, and an inline SVG gains geometry,
 * material, light and — in twin mode — a live sensor overlay. Drawn rather than
 * photographed, so it needs no assets and stays crisp at any size.
 *
 * Modules link to the sub-services in src/data/visualization.js.
 */

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import EditorialServicePage from "./editorial/EditorialServicePage";
import { KpiRow, Mono, Panel, PanelHeader, SegmentedTabs } from "./editorial/shell";

/* ── hero: staged scene ──────────────────────────────────────────────────── */

const TRACKS = [
  {
    key: "walkthrough",
    tab: "Walkthrough",
    subject: "Sunridge Tower",
    kpis: [
      { label: "Output", value: "4K" },
      { label: "Real-time", value: "60fps" },
      { label: "Scenes", value: "8" },
    ],
    stages: [
      { name: "Massing", detail: "Geometry from your CAD or Revit, with anything missing modelled and the volumes agreed before detailing." },
      { name: "Materials", detail: "PBR materials applied — glass, concrete, cladding — at a level that survives a projector." },
      { name: "Lighting", detail: "Real luminaire data and a sun study, so the light matches the hour you want to sell in." },
      { name: "Final render", detail: "Film, real-time build and print stills exported from the same scene, so nothing looks inconsistent." },
    ],
  },
  {
    key: "twin",
    tab: "Digital twin",
    subject: "Sunridge Tower · live",
    kpis: [
      { label: "Available", value: "34" },
      { label: "Occupancy", value: "72%" },
      { label: "Open tickets", value: "6" },
    ],
    stages: [
      { name: "Capture", detail: "Drone survey, laser scan or your BIM, reconciled against the as-built drawings." },
      { name: "Model", detail: "Units, floors and cores separated as addressable objects rather than one lump of geometry." },
      { name: "Bind data", detail: "Every unit mapped to its CRM record, every meter and sensor mapped to its space. This mapping is the twin." },
      { name: "Live", detail: "Availability, occupancy, energy and open tickets read live. Book a unit and it turns on every screen within seconds." },
    ],
  },
  {
    key: "product",
    tab: "Product",
    subject: "Product catalogue",
    kpis: [
      { label: "Variants", value: "∞" },
      { label: "Stills", value: "4K" },
      { label: "AR", value: "GLB" },
    ],
    stages: [
      { name: "Mesh", detail: "Modelled from CAD where it exists, from a physical sample where it does not." },
      { name: "Texture", detail: "PBR materials built to hold up under close inspection on a product page." },
      { name: "Light", detail: "One lighting rig reused across the catalogue, so every listing matches." },
      { name: "Turntable", detail: "Stills, a turntable and an optimised GLB for AR — all from the one model." },
    ],
  },
];

const STAGE_MS = 1800;

/* Building blocks: [x, width, height]. Drawn from a 260-high baseline. */
const BLOCKS = [
  { x: 40, w: 66, h: 96 },
  { x: 112, w: 82, h: 150 },
  { x: 200, w: 58, h: 118 },
  { x: 264, w: 74, h: 74 },
];

const SENSORS = [
  { x: 153, y: 88, label: "72%" },
  { x: 73, y: 132, label: "4.1kW" },
  { x: 229, y: 118, label: "21°C" },
];

const BASE = 214;

/*
 * Visibility here is derived straight from state as plain style props, with a CSS
 * transition for the movement — deliberately not framer-motion `animate`. Motion
 * libraries write inline styles from rAF, so a backgrounded tab or a suspended
 * frame loop can leave an element stuck at its initial opacity. Declarative style
 * is always correct; the transition is only polish on top.
 */
const ease = "opacity 450ms cubic-bezier(0.22,1,0.36,1)";

const StagedScene = ({ trackKey, stage }) => {
  const isTwin = trackKey === "twin";
  const showMaterial = stage >= 1;
  const showLight = stage >= 2;
  const showFinal = stage >= 3;

  /* Twin mode reads its stages as capture -> model -> bind -> live. */
  const showSensors = isTwin && stage >= 2;
  const sensorsLive = isTwin && stage >= 3;

  return (
    <svg
      viewBox="0 0 380 240"
      className="h-full w-full"
      role="img"
      aria-label={`${trackKey} scene, stage ${stage + 1} of 4`}
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dfe6ea" />
          <stop offset="100%" stopColor="#f4f4f0" />
        </linearGradient>
        <linearGradient id="face" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c9cfd4" />
          <stop offset="100%" stopColor="#9aa3ab" />
        </linearGradient>
        <linearGradient id="lit" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#eef3d9" />
          <stop offset="55%" stopColor="#c2cad1" />
          <stop offset="100%" stopColor="#7d868f" />
        </linearGradient>
      </defs>

      {/* sky appears only once we are lighting the scene */}
      <rect
        x="0"
        y="0"
        width="380"
        height="240"
        fill="url(#sky)"
        style={{ opacity: showLight ? 1 : 0, transition: ease }}
      />

      <line x1="16" y1={BASE} x2="364" y2={BASE} stroke="rgba(17,19,21,0.28)" strokeWidth="1" />

      {/* sun, once lit */}
      <circle
        cx="316"
        cy="46"
        r="16"
        fill="var(--lumen)"
        style={{ opacity: showLight ? 1 : 0, transition: ease }}
      />

      {BLOCKS.map((b, i) => {
        const y = BASE - b.h;
        const fill = showLight
          ? "url(#lit)"
          : showMaterial
            ? "url(#face)"
            : "rgba(17,19,21,0.03)";
        return (
          <g key={i}>
            {/* cast shadow at the final stage */}
            <polygon
              points={`${b.x},${BASE} ${b.x + b.w},${BASE} ${b.x + b.w - 20},${BASE + 13} ${b.x - 20},${BASE + 13}`}
              fill="rgba(17,19,21,0.13)"
              style={{ opacity: showFinal ? 1 : 0, transition: ease }}
            />

            {/* the mass itself — always present, gains material as stages advance */}
            <rect
              x={b.x}
              y={y}
              width={b.w}
              height={b.h}
              rx="2"
              fill={fill}
              stroke="rgba(17,19,21,0.55)"
              strokeWidth="1"
              style={{ transition: "fill 450ms cubic-bezier(0.22,1,0.36,1)" }}
            />

            {/* window grid arrives with materials */}
            <g style={{ opacity: showMaterial ? 1 : 0, transition: ease }}>
              {Array.from({ length: Math.floor(b.h / 18) }).map((_, r) =>
                Array.from({ length: Math.max(1, Math.floor(b.w / 20)) }).map((_, c) => {
                  /* a few windows read as lit once the sun is up */
                  const isLit = showFinal && (r * 7 + c * 3 + i) % 5 === 0;
                  return (
                    <rect
                      key={`${r}-${c}`}
                      x={b.x + 7 + c * 20}
                      y={y + 9 + r * 18}
                      width="11"
                      height="9"
                      rx="1"
                      fill={isLit ? "var(--lumen)" : "rgba(17,19,21,0.22)"}
                    />
                  );
                }),
              )}
            </g>
          </g>
        );
      })}

      {/* twin overlay: sensor pins bound to spaces */}
      {SENSORS.map((s, i) => (
        <g
          key={s.label}
          style={{
            opacity: showSensors ? 1 : 0,
            transition: ease,
            transitionDelay: `${i * 80}ms`,
          }}
        >
          <line x1={s.x} y1={s.y} x2={s.x + 26} y2={s.y - 20} stroke="rgba(17,19,21,0.5)" strokeWidth="1" />
          <rect x={s.x + 26} y={s.y - 32} width="46" height="17" rx="3" fill="#111315" />
          <text
            x={s.x + 49}
            y={s.y - 20}
            textAnchor="middle"
            fill="#ffffff"
            style={{ fontSize: 10, fontFamily: "var(--im-mono)" }}
          >
            {s.label}
          </text>
          <circle
            cx={s.x}
            cy={s.y}
            r="4"
            fill="var(--lumen)"
            stroke="#111315"
            strokeWidth="1"
            className={sensorsLive ? "lumen-pulse" : undefined}
          />
        </g>
      ))}
    </svg>
  );
};

const SceneBuilder = () => {
  const [trackKey, setTrackKey] = useState(TRACKS[0].key);
  const [stage, setStage] = useState(0);
  const track = TRACKS.find((t) => t.key === trackKey) || TRACKS[0];
  const timer = useRef(null);

  /* Build through the stages and hold on the last one, rather than looping back. */
  useEffect(() => {
    setStage(0);
    timer.current = setInterval(() => {
      setStage((s) => {
        if (s >= track.stages.length - 1) {
          clearInterval(timer.current);
          return s;
        }
        return s + 1;
      });
    }, STAGE_MS);
    return () => clearInterval(timer.current);
  }, [trackKey, track.stages.length]);

  const selectStage = (i) => {
    clearInterval(timer.current);
    setStage(i);
  };

  return (
    <Panel>
      <PanelHeader live={track.subject} right={`Stage ${stage + 1}/${track.stages.length}`} />

      <SegmentedTabs
        label="Visualisation track"
        items={TRACKS.map((t) => ({ key: t.key, label: t.tab }))}
        value={trackKey}
        onChange={setTrackKey}
        className="border-b border-[var(--im-line)] px-4 py-2.5"
      />

      <KpiRow kpis={track.kpis} />

      <div className="border-b border-[var(--im-line)] bg-[rgba(17,19,21,0.03)]">
        <div className="aspect-[380/240] w-full">
          <StagedScene trackKey={trackKey} stage={stage} />
        </div>
      </div>

      {/* stage stepper */}
      <div
        className="grid gap-1.5 px-4 py-3"
        style={{ gridTemplateColumns: `repeat(${track.stages.length}, minmax(0, 1fr))` }}
      >
        {track.stages.map((s, i) => {
          const done = i <= stage;
          return (
            <button
              key={s.name}
              type="button"
              aria-pressed={i === stage}
              onClick={() => selectStage(i)}
              className="min-w-0 text-left"
            >
              <span
                className="block h-[3px] rounded-full transition-colors"
                style={{
                  background: done ? "var(--lumen)" : "rgba(17,19,21,0.14)",
                }}
              />
              <Mono
                className={`mt-2 block truncate text-[10px] transition-colors sm:text-[11px] ${
                  i === stage ? "text-[var(--im-ink)]" : "text-[var(--im-dim)]"
                }`}
              >
                {s.name}
              </Mono>
            </button>
          );
        })}
      </div>

      <div className="border-t border-[var(--im-line)] p-4">
        <Mono className="text-[10px] uppercase tracking-[0.08em] text-[var(--im-dim)]">
          {track.stages[stage].name}
        </Mono>
        <p className="mt-2 text-sm leading-[1.6] text-[var(--im-muted)]">
          {track.stages[stage].detail}
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/contact-us"
            className="rounded-[5px] bg-lumen px-4 py-2.5 text-center text-[13px] font-semibold text-lumen-foreground transition-opacity hover:opacity-90 sm:flex-1"
          >
            Start a project
          </Link>
          <Link
            href="/services/3d-visualization/digital-twin"
            className="rounded-[5px] border border-[rgba(17,19,21,0.22)] px-4 py-2.5 text-center text-[13px] text-[var(--im-ink)] transition-colors hover:bg-[rgba(17,19,21,0.04)] sm:flex-1"
          >
            About digital twins
          </Link>
        </div>
      </div>
    </Panel>
  );
};

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
    { value: "6 wks", label: "Typical first twin delivered" },
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
          "A walkthrough is typically three weeks. A first digital twin with live sales inventory is around six. The operations layer is staged after that, once the building is actually running.",
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
    hero={<SceneBuilder />}
    breadcrumb={service?.title?.trim() || "3D Visualization"}
  />
);

export default ThreeDVisualizationPage;
