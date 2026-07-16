import { Rocket, Lightbulb, Users, Briefcase } from "lucide-react";

/**
 * Job structure:
 *  slug, title, shortDescription, location, type, experience
 *  apply: { email, url? }
 *  sections: [{ heading, body?: string[], items?: (string | { label, text })[] }]
 *
 * Content is plain data — the page renders it with theme-aware styles, so no
 * inline HTML/styles are needed.
 */
const jobs = [
  {
    slug: "full-stack-developer-mern",
    title: "Full Stack Developer",
    shortDescription:
      "Luminexa is looking for a talented Full Stack Developer to build next-gen, custom web applications with AI and 3D experiences.",
    location: "On-Site",
    type: "Full-Time",
    experience: "3+ years",
    apply: { email: "careers@luminexa.in", url: "https://forms.gle/mxQfhnTx6U65VUqw5" },
    sections: [
      {
        heading: "About the Job",
        body: [
          "Luminexa is looking for a talented Full Stack Developer to build next-gen, custom web applications with seamless integration of AI and emerging technologies. You’ll play a key role in delivering immersive, high-performance digital experiences that blend custom web solutions, AI, and 3D visual content.",
          "This is an ideal opportunity for someone with at least 4 years of experience who’s excited about working at the intersection of AI, full-stack development, and Three.js.",
        ],
      },
      {
        heading: "Key Responsibilities",
        items: [
          "Design, build, and deploy custom full-stack web application experiences.",
          "Build interactive custom web apps using ReactJS, NextJS, and Three.js/WebGL for 3D visualizations or immersive experiences.",
          "Integrate AI APIs (e.g., OpenAI, Grok) into scalable backend systems.",
          "Build modular, responsive frontend components using React.js or similar frameworks.",
          "Create and manage RESTful/GraphQL APIs, integrating databases like MongoDB, Firebase, PostgreSQL, or MySQL.",
          "Maintain secure and scalable backend infrastructure using Node.js/Express.js, implementing authentication (e.g., JWT, OAuth) and data encryption.",
          "Ensure applications are user-friendly, high-performance, and work seamlessly across all devices and browsers.",
          "Rapidly learn and implement new technologies by reading official documentation.",
          "Continuously optimize the performance and user experience of the full-stack application.",
          "Collaborate with designers and developers in agile sprints and team discussions.",
        ],
      },
      {
        heading: "Required Skills",
        items: [
          "3+ years of full-stack web development experience with the MERN stack.",
          "Proficiency in React.js, Next.js, and Three.js/WebGL for 3D visualizations.",
          "Experience building and integrating RESTful/GraphQL APIs with MongoDB or PostgreSQL.",
          "Familiarity with Node.js/Express.js for backend development.",
          "Strong understanding of Git, Docker, and CI/CD pipelines.",
        ],
      },
      {
        heading: "Nice-to-Have",
        items: [
          "Experience integrating AI APIs (e.g., OpenAI, Grok) or working with TensorFlow.js/ONNX.",
          "Familiarity with Python (Django/FastAPI), Vue.js, or Angular.",
          "Knowledge of cloud platforms like AWS (EC2, Lambda, S3), Netlify, or Azure.",
        ],
      },
      {
        heading: "Qualifications",
        items: [
          "Bachelor’s degree in Computer Science, Engineering, or a related technical field.",
          "Portfolio of building and delivering custom web applications.",
          "Ability to think critically, solve problems, and work efficiently in a startup environment.",
          "Strong communication skills and a collaborative, team-first mindset.",
        ],
      },
      {
        heading: "Why Luminexa?",
        items: [
          { label: "Real Business Impact", text: "Work on live client projects with visible, measurable outcomes." },
          { label: "Startup Agility", text: "Contribute meaningfully in a flexible, fast-paced environment." },
          { label: "Growth Opportunities", text: "Take ownership, lead initiatives, and grow your skillset rapidly." },
          { label: "Remote-Friendly Culture", text: "Work from anywhere with a supportive and collaborative team." },
        ],
      },
    ],
  },
  {
    slug: "android-ios-developer",
    title: "Android & iOS Developer",
    shortDescription:
      "Luminexa is seeking a skilled Android & iOS Developer to create next-generation mobile applications merging design, functionality, AI, and AR.",
    location: "On-Site",
    type: "Full-Time",
    experience: "3+ years",
    apply: { email: "careers@luminexa.in" },
    sections: [
      {
        heading: "About the Job",
        body: [
          "Luminexa is seeking a skilled Android & iOS Developer to create next-generation mobile applications that merge design, functionality, and emerging tech. You’ll play a vital role in building immersive and intelligent mobile experiences, working across both native and cross-platform environments, with AI and AR integrations that set our apps apart.",
          "This is a perfect opportunity for someone with at least 3 years of mobile development experience who is passionate about delivering innovative, high-performance mobile solutions in a startup setting.",
        ],
      },
      {
        heading: "Key Responsibilities",
        items: [
          "Design, develop, and deploy cutting-edge mobile apps for Android and iOS.",
          "Build cross-platform applications using Flutter or React Native where appropriate.",
          "Create native modules and SDKs using Swift, Kotlin, or Objective-C/Java.",
          "Integrate AI-powered features and AR technologies (e.g., ARCore, ARKit).",
          "Collaborate closely with UI/UX designers to implement smooth, user-centric interfaces.",
          "Optimize apps for performance, responsiveness, and battery efficiency.",
          "Implement secure APIs and connect mobile apps to backend systems (RESTful/GraphQL).",
          "Manage code quality, CI/CD, and testing using tools like GitHub Actions or Fastlane.",
          "Debug and troubleshoot bugs quickly and efficiently in production environments.",
          "Stay updated with the latest mobile trends, frameworks, and SDKs.",
        ],
      },
      {
        heading: "Must-Have Skills",
        items: [
          "3+ years of professional experience in mobile application development.",
          "Proficiency in Flutter or React Native (plus native development in Swift and Kotlin).",
          "Experience integrating RESTful/GraphQL APIs and third-party SDKs.",
          "Familiarity with mobile AI SDKs (e.g., Google ML Kit, Core ML) and AR frameworks.",
          "Strong understanding of mobile architecture, design patterns, and animations.",
          "Experience with Firebase, SQLite, Realm, or similar mobile databases.",
          "Understanding of mobile deployment processes via Google Play Store and Apple App Store.",
          "Familiar with CI/CD tools, Git version control, and agile development workflows.",
          "Strong debugging, optimization, and performance-tuning skills.",
        ],
      },
      {
        heading: "Qualifications",
        items: [
          "Bachelor’s degree in Computer Science, Software Engineering, or equivalent.",
          "Proven ability to launch and maintain high-quality mobile applications.",
          "Startup-ready mindset: adaptable, collaborative, and self-driven.",
          "Strong communication and time-management skills.",
        ],
      },
      {
        heading: "Why Luminexa?",
        items: [
          { label: "Next-Gen Innovation", text: "Work at the frontier of mobile, AI, and immersive experiences." },
          { label: "Real Client Work", text: "Contribute directly to mobile products used by businesses and customers." },
          { label: "Growth Acceleration", text: "Own features end-to-end and evolve into a tech lead role." },
          { label: "Remote-Friendly Culture", text: "Work from anywhere with a supportive and collaborative team." },
        ],
      },
    ],
  },
  {
    slug: "architecture-visualizer",
    title: "Architecture Visualizer",
    shortDescription:
      "Luminexa is expanding its creative team and looking for a highly skilled Architecture Visualizer who can bring architectural concepts to life through immersive 3D renders and animated walkthroughs.",
    location: "On-Site",
    type: "Full-Time",
    experience: "4+ years",
    apply: { email: "careers@luminexa.in" },
    sections: [
      {
        heading: "About the Role",
        body: [
          "Luminexa is expanding its creative team and looking for a highly skilled Architecture Visualizer who can bring architectural concepts to life through immersive 3D renders and animated walkthroughs. You’ll be responsible for creating visually stunning environments and spatial experiences that enhance how people envision and interact with architectural projects — often blending technology with emotion and realism.",
          "This is an exciting opportunity for a professional with at least 4 years of experience in architectural visualization, rendering, and real-time walkthroughs.",
        ],
      },
      {
        heading: "Key Responsibilities",
        items: [
          "Create photo-realistic exterior and interior renders, landscapes, and material detailing.",
          "Design cinematic 3D walkthroughs using Unreal Engine, Lumion, or Twinmotion.",
          "Collaborate with architects and designers to interpret concepts and translate CAD drawings into visually stunning representations.",
          "Develop 3D models from scratch or enhance client-provided files (SketchUp, Revit, AutoCAD).",
          "Ensure lighting, texturing, and composition create immersive, believable environments.",
          "Work on landscape design visualizations including topography, vegetation, and environmental effects.",
          "Create 360° renders or interactive virtual environments for web or AR/VR platforms (a plus).",
          "Manage rendering pipelines and optimize scenes for high performance and realism.",
          "Stay up to date with rendering tools, design trends, and software techniques.",
        ],
      },
      {
        heading: "Must-Have Skills",
        items: [
          "4+ years of professional experience in architectural visualization.",
          "Expertise in 3ds Max + V-Ray/Corona, Blender, or Cinema4D.",
          "Proficient in real-time engines: Unreal Engine, Twinmotion, or Lumion.",
          "Strong knowledge of lighting, PBR materials, UV mapping, and camera animation.",
          "Ability to read and interpret architectural drawings (CAD, Revit, SketchUp, Rhino).",
          "Skills in Photoshop for render cleanup, compositing, 2D landscape designing, and color grading.",
          "Portfolio of photo-realistic renders, animation walkthroughs, and landscape visuals.",
          "Experience with tools like Photoshop, After Effects for post-production.",
          "Understanding of composition, mood, scale, and environmental storytelling.",
          "Excellent communication and time-management skills.",
        ],
      },
      {
        heading: "Qualifications",
        items: [
          "Bachelor’s degree in Architecture, 3D Design, Visualization, or related field.",
          "Proven experience delivering high-quality renders and walkthroughs for clients.",
          "Attention to detail, artistic eye, and a passion for architectural aesthetics.",
          "Startup-ready: fast, flexible, and quality-focused.",
        ],
      },
      {
        heading: "Why Luminexa?",
        items: [
          { label: "Next-Level Visualization", text: "Be at the forefront of architectural storytelling and immersive tech." },
          { label: "Creative Ownership", text: "Lead visualization efforts and influence the visual language of our projects." },
          { label: "Work with Real Clients", text: "Contribute to real estate, retail, and product-based spatial design." },
          { label: "Cross-Disciplinary Environment", text: "Collaborate with mobile, AR, and UI/UX teams." },
          { label: "Culture That Grows You", text: "Fast-moving, supportive, and always pushing creative boundaries." },
        ],
      },
    ],
  },
  {
    slug: "junior-architect",
    title: "Junior Architect",
    shortDescription:
      "Luminexa is looking for a passionate Junior Architect to support architecture and 3D teams in creating compelling designs, realistic models, and immersive visual narratives.",
    location: "On-Site",
    type: "Full-Time",
    experience: "2+ years",
    apply: { email: "careers@luminexa.in" },
    sections: [
      {
        heading: "About the Role",
        body: [
          "Luminexa is looking for a passionate Junior Architect with a strong eye for design and an eagerness to grow in the fields of architecture and visualization. You will support our architecture and 3D team in creating compelling designs, realistic models, and immersive visual narratives that blend space, form, and function.",
          "This role is ideal for a young professional with 2+ years of experience who is hands-on with 3D tools, CAD, and render workflows, and wants to work at the intersection of innovation and aesthetics.",
        ],
      },
      {
        heading: "Key Responsibilities",
        items: [
          "Assist in developing architectural concepts and translating them into 2D/3D visuals.",
          "Support senior visualizers with 3D modeling, texturing, and lighting for renders and walkthroughs.",
          "Work with CAD drawings, floor plans, and sketches to generate presentation-ready visuals.",
          "Collaborate with interior and landscape designers on spatial layouts and visual ideas.",
          "Contribute to material studies, mood boards, and conceptual visualizations.",
          "Help produce real-time scenes and animations in software like Lumion or Twinmotion.",
          "Assist in post-production using tools like Photoshop and After Effects.",
          "Manage and organize model libraries, textures, and reference materials.",
        ],
      },
      {
        heading: "Must-Have Skills",
        items: [
          "2+ years of experience in architecture or architectural visualization.",
          "Proficiency in SketchUp, Revit, or AutoCAD for drafting and modeling.",
          "Working knowledge of 3D rendering tools such as Lumion, Twinmotion, or Blender.",
          "Basic understanding of materials, lighting, and architectural presentation.",
          "Ability to interpret architectural drawings and communicate design ideas clearly.",
          "Familiarity with Photoshop or other tools for render touch-ups.",
          "Creative thinking, attention to detail, and eagerness to learn from senior teammates.",
        ],
      },
      {
        heading: "Qualifications",
        items: [
          "Bachelor’s degree in Architecture, Interior Design, or a related field.",
          "Strong academic or internship portfolio demonstrating design and visualization skills.",
          "Open to feedback, fast learner, and comfortable in a fast-paced, collaborative studio environment.",
        ],
      },
      {
        heading: "Why Join Luminexa?",
        items: [
          { label: "Hands-On Experience", text: "Contribute to real client projects in architectural and immersive design." },
          { label: "Learn from the Best", text: "Collaborate with senior architects, visualizers, and tech experts." },
          { label: "Creative Playground", text: "Work at the intersection of space, design, and emerging technology (AR/VR)." },
          { label: "Growth-Driven Culture", text: "Build your skills rapidly and grow into more senior roles over time." },
        ],
      },
    ],
  },
  {
    slug: "business-development-associate",
    title: "Business Development Associate",
    shortDescription:
      "Luminexa is looking for a dynamic Business Development Associate (BDA) who will be a key player in driving our growth.",
    location: "On-Site",
    type: "Full-Time",
    experience: "3+ years",
    apply: { email: "careers@luminexa.in" },
    sections: [
      {
        heading: "About the Role",
        body: [
          "Luminexa is looking for a dynamic Business Development Associate (BDA) who will be a key player in driving our growth. As the main front-line contributor, you will generate leads, manage sales pipelines, and build strong client relationships to expand our business footprint. If you thrive in fast-paced environments and have a proven track record of closing deals, this is your opportunity to make a significant impact.",
        ],
      },
      {
        heading: "Key Responsibilities",
        items: [
          "Generate high-quality leads through cold calling, emailing, networking, and referrals.",
          "Identify and qualify potential customers using tools like LinkedIn Sales Navigator, Apollo, Lusha, and various online directories.",
          "Manage and maintain customer data and interactions using CRM tools (e.g., Zoho CRM, HubSpot, Salesforce).",
          "Understand and manage the entire sales funnel from prospecting to closing.",
          "Pitch Luminexa’s products and solutions effectively to potential clients.",
          "Conduct detailed market research to identify opportunities and develop tailored strategies.",
          "Build and nurture long-term relationships with clients and partners.",
          "Collaborate with marketing and product teams to align sales strategies and campaigns.",
          "Prepare sales presentations, proposals, and reports.",
          "Meet or exceed monthly and quarterly sales targets and KPIs.",
        ],
      },
      {
        heading: "Must-Have Skills",
        items: [
          "3+ years of professional experience in business development, sales, or lead generation.",
          "Proficiency in CRM platforms and lead management tools.",
          "Strong understanding of sales funnels and pipeline management.",
          "Excellent cold calling and email outreach skills.",
          "Strong presentation and product pitching abilities.",
          "Analytical mindset with experience in market research and strategy formulation.",
          "Exceptional relationship-building and negotiation skills.",
          "Self-motivated, goal-oriented, and able to work independently and collaboratively.",
        ],
      },
      {
        heading: "Qualifications",
        items: [
          "Bachelor’s degree in Business, Marketing, or a related field preferred.",
          "Proven success in meeting sales targets and driving revenue growth.",
          "Comfortable working in a startup environment with a hands-on approach.",
        ],
      },
      {
        heading: "Why Luminexa?",
        items: [
          { label: "Core Team Member", text: "Join a fast-growing startup and help lead our sales efforts." },
          { label: "Cutting-Edge Technology", text: "Work with products in AI, AR, and VR." },
          { label: "Growth Opportunities", text: "Clear path into leadership roles." },
          { label: "Supportive Culture", text: "Collaborative, innovative, and supportive work environment." },
        ],
      },
    ],
  },
];

const benefits = [
  {
    icon: Rocket,
    iconClass: "size-10 text-primary",
    title: "Fast-Paced Growth",
    description: "Work in a dynamic environment where innovation meets execution.",
  },
  {
    icon: Lightbulb,
    iconClass: "size-10 text-yellow-400",
    title: "Innovative Culture",
    description: "We foster creativity and provide a space for your ideas to thrive.",
  },
  {
    icon: Users,
    iconClass: "size-10 text-blue-500",
    title: "Collaborative Team",
    description: "Join a team of like-minded professionals who push boundaries together",
  },
  {
    icon: Briefcase,
    iconClass: "size-10 text-green-500",
    title: "Career Advancement",
    description: "We invest in your growth with mentorship and upskilling programs.",
  },
];

export { jobs, benefits };
