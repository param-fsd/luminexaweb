const virtualtourServices = [
  // ---------------------- 360 Virtual Tour ----------------------
  {
    subSlug: "360-tour",
    title: "360 Virtual Tour",
    description: "Interactive 360° walkthroughs with hotspots, navigation & branding.",
    image: "/virtualtour/360.jpg", // dummy path
    overview: `
      <p>Our 360 Virtual Tour solution lets users explore spaces remotely with a smooth, interactive experience.
      Add hotspots, room-to-room navigation, branding, and rich media to create an immersive digital walkthrough.</p>
      <p>Perfect for real estate, hotels, resorts, showrooms, campuses, and commercial spaces.</p>
    `,
    benefits: [
      "Boost enquiries with immersive property walkthroughs.",
      "Hotspots for details, CTA buttons, and media popups.",
      "Works on mobile and desktop browsers (no extra apps).",
      "Branding customization: logo, colors, and UI labels.",
      "Fast hosting + shareable link & QR code access.",
      "Analytics-ready for tracking views and engagement."
    ],
    demos: [],
    caseStudies: [
      {
        title: "Real Estate Showcase",
        description: "Increased qualified leads by improving remote property engagement."
      }
    ],
    technologies: [
      "Three.js / WebGL",
      "360 Stitching & Optimization",
      "Hotspot UI System",
      "CDN Hosting"
    ],
    faqs: [
      { question: "Does it work on mobile?", answer: "Yes, it works on mobile browsers and desktops." },
      { question: "Can we add hotspots?", answer: "Yes, hotspots can open info, images, videos, or contact CTAs." },
      { question: "Can we add branding?", answer: "Yes, we customize logo, theme, buttons, and UI labels." }
    ]
  },

  // ---------------------- Drone Virtual Tour ----------------------
  {
    subSlug: "drone-tour",
    title: "Drone Virtual Tour",
    description: "Aerial drone-based tours for resorts, farmlands, layouts & large properties.",
    image: "/virtualtour/drone.jpg", // dummy path
    overview: `
      <p>Drone Virtual Tours give a cinematic aerial perspective of large-scale spaces like resorts,
      farm layouts, campuses, villa projects, and industrial facilities.</p>
      <p>We combine drone capture with interactive navigation points, labels, and map-based exploration.</p>
    `,
    benefits: [
      "Best for large-scale projects and outdoor properties.",
      "Cinematic aerial storytelling for premium branding.",
      "Interactive labels for zones, amenities, and landmarks.",
      "Ideal for marketing, sales, approvals, and stakeholder walkthroughs.",
      "Optimized video delivery for web performance.",
      "Can be integrated with maps and site plans."
    ],
    demos: [],
    caseStudies: [
      {
        title: "Resort Marketing Tour",
        description: "Improved bookings by showcasing property scale and surroundings."
      }
    ],
    technologies: [
      "Drone Capture & Stabilization",
      "Web Video Optimization",
      "Interactive Labels",
      "Map Integration"
    ],
    faqs: [
      { question: "Do you provide drone shooting?", answer: "Yes, drone capture can be handled based on location availability." },
      { question: "Can we add markers/labels?", answer: "Yes, we add interactive labels for areas and amenities." },
      { question: "Is it heavy to load?", answer: "We optimize media and deliver using CDN for fast loading." }
    ]
  },

  // ---------------------- 3D Rendered Virtual Tour ----------------------
  {
    subSlug: "3d-rendered-tour",
    title: "3D Rendered Virtual Tour",
    description: "High-end 3D walkthroughs from design models, renders & animations.",
    image: "/virtualtour/3d.jpg", // dummy path
    overview: `
      <p>3D Rendered Virtual Tours are ideal for projects under construction or pre-launch.
      We create premium walkthrough experiences from 3D models, architectural designs, and renders.</p>
      <p>Users can explore interiors/exteriors with smooth camera transitions, hotspots, and interactive views.</p>
    `,
    benefits: [
      "Perfect for pre-launch real estate and upcoming projects.",
      "Show interior/exterior with premium lighting & detailing.",
      "Supports hotspots, floor navigation, and view switching.",
      "Better storytelling than static renders or PDFs.",
      "Works across web, mobile, and large screens for sales offices.",
      "Optional: integrate with AR/VR experiences."
    ],
    demos: [],
    caseStudies: [
      {
        title: "Pre-Launch Villa Tour",
        description: "Helped customers visualize spaces before construction completion."
      }
    ],
    technologies: [
      "3D Rendering Pipeline",
      "Three.js / WebGL",
      "Optimized Assets (GLB/Textures)",
      "Camera Path Animation"
    ],
    faqs: [
      { question: "Do we need to provide a 3D model?", answer: "If available, yes. Otherwise we can create models based on drawings/renders." },
      { question: "Can it run on mobile?", answer: "Yes, we optimize models and textures for mobile performance." },
      { question: "Can we add floor navigation?", answer: "Yes, we can add floors, rooms, and guided navigation." }
    ]
  }
];

export default virtualtourServices;
