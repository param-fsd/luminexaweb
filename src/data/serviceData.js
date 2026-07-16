import nexar from './nexar';
import mapping from './mapping';
import virtualtour from './virtualtour.js';
import webdevelopment from './webdevelopment';
import visualization from './visualization';
import nexai from'./nexai';
import crmerpdevelopment from'./crmerpdevelopment';
import customweb from './customweb.js';


const services = [
  {
    slug: "mapping",
    title: "Mapping",
    description: "Accurate mapping solutions including land mapping, drone surveys & GIS visualizations.",
    image: "/map.png",
    overview: `
      <p>We provide advanced drone-based mapping, GIS mapping, and topographical analysis.
      Our mapping solutions serve real estate, construction, survey companies, and land developers.</p>
      <p>We deliver high-accuracy maps with 2D, 3D, and elevation-based results.</p>
    `,
    features: [
      { title: "Drone-Based Mapping", description: "High-accuracy aerial mapping using drones." },
      { title: "Topo & Contour Mapping", description: "Elevation and terrain mapping for construction & planning." },
      { title: "GIS Visualization", description: "Interactive maps for layouts, utilities, and land analysis." },
      { title: "Orthomosaic Generation", description: "High-resolution stitched maps from drone imagery." }
    ],
    applications: [
      "Real estate layouts",
      "Construction site planning",
      "Agriculture & land inspection",
      "Surveying & GIS projects"
    ],
    label: "2D/3D Mapping | Drone Mapping",
    icon: "Map",
    color: "#111111",
    subServices: mapping
  },
  // ---------------------- nexAR ----------------------
  {
    slug: "augmented-reality",
    title: "nexAR",
    description: "Immersive augmented reality solutions for brands, education, events, and marketing.",
    image: "/nexar.jpg",
    overview: `
      <p>nexAR transforms the physical world into interactive digital experiences. 
      Our AR solutions help brands engage audiences with immersive product demos, 
      educational content, gamified interactions, and location-based activations.</p>
      <p>Perfect for marketing, exhibitions, retail, and educational content delivery.</p>
    `,
    features: [
      { title: "Interactive AR Content", description: "Trigger AR using images, QR codes, objects, or GPS." },
      { title: "WebAR Support", description: "No app needed — AR works directly in smartphone browsers." },
      { title: "AR Analytics", description: "Track views, interactions, regions, and user activity." },
      { title: "3D & Video Overlay", description: "Display 3D models, videos, buttons, and animations in AR." },
      { title: "Cross-Device Support", description: "Compatible with Android, iOS, desktops, and tablets." }
    ],
    applications: [
      "Marketing posters & campaigns",
      "Retail product visualization",
      "Education AR books & learning models",
      "Event activations & exhibitions"
    ],
    label: "webXR | Image tracking | Tap to place | InstantApp",
    icon: "/camera.svg",
    color: "#111111",
    subServices: nexar
  },
  {
    slug: "360-virtual-tour",
    title: "360 Virtual Tour ",
    description: "Immersive 360° virtual experiences for real estate, hotels, resorts, and showrooms.",
    image: "/three.png",
    overview: `
      <p>We build interactive 360° virtual tours that let users explore spaces as if they're physically present.
      Perfect for properties, hotels, educational campuses, and product showcases.</p>
    `,
    features: [
      { title: "High-Quality 360 Capture", description: "Crystal-clear 360° photography & video tours." },
      { title: "Hotspots & Navigation", description: "Interactive points to navigate between rooms/areas." },
      { title: "Embedded Multimedia", description: "Add images, descriptions, videos, and menus inside the tour." },
      { title: "Web & VR Support", description: "Tours work on mobile, web, and VR headsets." }
    ],
    applications: [
      "Real estate property tours",
      "Hotel and resort walkthroughs",
      "Showroom & factory tours",
      "Educational campus tours"
    ],
    label: "360 VT | VR | Interactive 360 VT",
    icon: "Camera",
    color: "#111111",
    subServices: virtualtour
  },

  // ---------------------- Artificial Intelligence ----------------------
  {
    slug: "artificial-intelligence",
    title: "AI - Artificial Intelligence",
    description: "AI agents, automation, data analytics and business intelligence solutions.",
    image: "/ai.png",
    overview: `
      <p>We develop AI-powered systems to automate workflows, enhance customer experience, 
      and improve decision-making. Our solutions integrate ML, NLP, automation tools, and custom AI agents.</p>
    `,
    features: [
      { title: "AI Agents", description: "Custom automated agents for operations, support & workflows." },
      { title: "Predictive Analytics", description: "Accurate forecasting from business data." },
      { title: "AI Chatbots", description: "Intelligent chat & voice bots for support and sales." },
      { title: "Workflow Automation", description: "Integrations across apps using automation platforms." }
    ],
    applications: [
      "Customer support chatbots",
      "Sales & marketing automation",
      "Predictive business analytics",
      "Custom AI agent workflows"
    ],
    label: "Agents | Predictive Analytics | Workflow Automation",
    icon: "Cpu",
    color: "#111111",
    subServices: nexai
  },

  // ---------------------- CRM | ERP ----------------------
  {
    slug: "crm-erp",
    title: "CRM | ERP System Development",
    description: "Custom CRM, ERP, dashboards, workflow systems, and enterprise applications.",
    image: "/crm.jpg",
    overview: `
      <p>We build CRM and ERP systems tailored to your business workflow. 
      Our solutions include dashboards, lead management, task automation, inventory systems, 
      and data visualization platforms.</p>
    `,
    features: [
      { title: "End-to-End CRM Systems", description: "Lead management, sales tracking & communication tools." },
      { title: "ERP Solutions", description: "Stock, billing, HR, finance & operations in one platform." },
      { title: "Data Dashboards", description: "Custom visual reports and KPI analytics." },
      { title: "Custom API Integrations", description: "Connect external apps & tools for seamless operations." }
    ],
    applications: [
      "Real estate CRM",
      "Business dashboards",
      "Inventory & billing systems",
      "Custom enterprise portals"
    ],
    label: "CRM | ERP | Custom Managment Software",
    icon: "Globe",
    color: "#111111",
    subServices: crmerpdevelopment
  },

  // ---------------------- 3D Visualization ----------------------
  {
    slug: "3d-visualization",
    title: "3D Visualization",
    description: "3D modeling, product rendering, animations, and architectural visualization.",
    image: "/3d.jpg",
    overview: `
      <p>We create photorealistic 3D models, animations, walkthroughs, and renderings.
      Ideal for real estate, engineering, product design, and manufacturing.</p>
    `,
    features: [
      { title: "3D Product Modeling", description: "Detailed models for e-commerce & presentations." },
      { title: "Architectural Visualization", description: "Interior & exterior renders with lighting & textures." },
      { title: "3D Animations", description: "Explainer visuals for machines, products & concepts." },
      { title: "Virtual Walkthroughs", description: "Interactive 3D spaces with camera movement." }
    ],
    applications: [
      "Real estate renders",
      "E-commerce product demos",
      "Engineering visualization",
      "Interior/exterior design"
    ],
    label: "3D Visualization",
    icon: "Cube",
    color: "#111111",
    subServices: visualization
  },

  // ---------------------- Website & App Development ----------------------
  {
    slug: "website-app-development",
    title: "Website & App Development",
    description: "Custom websites, mobile apps, e-commerce stores, and full-stack platforms.",
    image: "/web.jpg",
    overview: `
      <p>We design and develop modern, high-performance websites and apps with a focus on UI/UX,
      speed, security, and scalability. From landing pages to full enterprise systems.</p>
    `,
    features: [
      { title: "Custom Websites", description: "Company sites, landing pages, portfolios & more." },
      { title: "Mobile App Development", description: "Android, iOS, and cross-platform apps." },
      { title: "E-commerce Solutions", description: "Custom storefronts, payments, carts & dashboards." },
      { title: "Full-Stack Development", description: "APIs, databases, dashboards & integrations." }
    ],
    applications: [
      "Corporate websites",
      "Mobile apps",
      "E-commerce platforms",
      "Admin dashboards"
    ],
    label: "Web & App Development",
    icon: "Layout",
    color: "#111111",
    subServices: webdevelopment
  },

  // ---------------------- Custom Web Application ----------------------
  {
    slug: "custom-web-application",
    title: "Custom Web Application",
    description: "Tailor-made web applications to match unique business workflows.",
    image: "/cus.jpg",
    overview: `
      <p>We develop fully customized web applications built around your business processes,
      including advanced dashboards, multi-user systems, automation tools, 
      and industry-specific platforms.</p>
    `,
    features: [
      { title: "Custom Dashboards", description: "Role-based dashboards with analytics & reports." },
      { title: "Industry-Specific Solutions", description: "Apps tailored for real estate, retail, education & more." },
      { title: "Automation Tools", description: "Automate manual workflows & integrations." },
      { title: "High Scalability", description: "Built for performance and future growth." }
    ],
    applications: [
      "Custom portals",
      "Industry-specific software",
      "Admin panels",
      "Automation systems"
    ],
    label: "Custom Web Application",
    icon: "Wrench",
    color: "#111111",
    subServices: customweb
  }
];

export default services;
