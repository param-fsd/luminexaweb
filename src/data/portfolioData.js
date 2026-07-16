// Portfolio data for Python Developer
export const portfolioData = {
  name: "Alex Chen",
  title: "Python Software Developer",
  tagline: "Building scalable solutions with Python",
  about: {
    description: `I'm a passionate Python developer with over 5 years of experience building web applications, APIs, and automation solutions. I specialize in Django, FastAPI, and cloud technologies, helping businesses transform their ideas into robust software solutions.`,
    avatar: "/profile.jpg",
    location: "San Francisco, CA",
    email: "alex.chen@example.com",
    github: "https://github.com/alexchen",
    linkedin: "https://linkedin.com/in/alexchen",
    resume: "/resume.pdf"
  },
  skills: {
    languages: [
      { name: "Python", level: 95, icon: "🐍" },
      { name: "JavaScript", level: 80, icon: "📜" },
      { name: "TypeScript", level: 75, icon: "📘" },
      { name: "SQL", level: 85, icon: "🗃️" }
    ],
    frameworks: [
      { name: "Django", level: 90, icon: "🎯" },
      { name: "FastAPI", level: 88, icon: "⚡" },
      { name: "Flask", level: 82, icon: "🌶️" },
      { name: "React", level: 75, icon: "⚛️" }
    ],
    databases: [
      { name: "PostgreSQL", level: 85, icon: "🐘" },
      { name: "MongoDB", level: 80, icon: "🍃" },
      { name: "Redis", level: 75, icon: "🔴" },
      { name: "MySQL", level: 78, icon: "🟦" }
    ],
    devops: [
      { name: "Docker", level: 82, icon: "🐳" },
      { name: "AWS", level: 78, icon: "☁️" },
      { name: "Git", level: 90, icon: "📝" },
      { name: "CI/CD", level: 75, icon: "🔄" }
    ]
  },
  projects: [
    {
      id: 1,
      title: "E-Commerce API",
      description: "Scalable REST API for e-commerce platform with microservices architecture",
      tech: ["Python", "FastAPI", "PostgreSQL", "Docker", "AWS"],
      github: "https://github.com/alexchen/ecommerce-api",
      demo: "https://ecommerce-api.demo.com",
      image: "/project1.jpg",
      featured: true
    },
    {
      id: 2,
      title: "Task Management System",
      description: "Full-stack project management tool with real-time collaboration",
      tech: ["Django", "React", "WebSocket", "Redis"],
      github: "https://github.com/alexchen/task-manager",
      demo: "https://taskmanager.demo.com",
      image: "/project2.jpg",
      featured: true
    },
    {
      id: 3,
      title: "Data Pipeline Automator",
      description: "Automated data pipeline for ETL processes with monitoring",
      tech: ["Python", "Airflow", "Spark", "AWS Glue"],
      github: "https://github.com/alexchen/data-pipeline",
      demo: null,
      image: "/project3.jpg",
      featured: false
    },
    {
      id: 4,
      title: "ML Model Deployment",
      description: "ML model serving platform with FastAPI and Kubernetes",
      tech: ["Python", "FastAPI", "TensorFlow", "Kubernetes"],
      github: "https://github.com/alexchen/ml-deployment",
      demo: "https://ml-serving.demo.com",
      image: "/project4.jpg",
      featured: true
    },
    {
      id: 5,
      title: "Chat Application",
      description: "Real-time chat app with end-to-end encryption",
      tech: ["Python", "Django Channels", "WebSocket", "PostgreSQL"],
      github: "https://github.com/alexchen/chat-app",
      demo: "https://chatapp.demo.com",
      image: "/project5.jpg",
      featured: false
    },
    {
      id: 6,
      title: "Portfolio CMS",
      description: "Headless CMS for content management with GraphQL",
      tech: ["Python", "Django Graphene", "PostgreSQL", "Vue.js"],
      github: "https://github.com/alexchen/cms",
      demo: "https://cms.demo.com",
      image: "/project6.jpg",
      featured: false
    }
  ],
  experience: [
    {
      id: 1,
      company: "TechCorp Inc.",
      role: "Senior Python Developer",
      period: "2022 - Present",
      description: "Leading the development of core backend services using Django and FastAPI. Architected microservices for high-traffic applications serving 10M+ users.",
      technologies: ["Django", "FastAPI", "PostgreSQL", "Docker", "AWS"]
    },
    {
      id: 2,
      company: "StartupXYZ",
      role: "Full Stack Developer",
      period: "2020 - 2022",
      description: "Built and maintained multiple web applications using Python and React. Implemented CI/CD pipelines and improved deployment efficiency by 40%.",
      technologies: ["Python", "Django", "React", "AWS", "Docker"]
    },
    {
      id: 3,
      company: "DataFlow Systems",
      role: "Backend Developer",
      period: "2018 - 2020",
      description: "Developed data processing pipelines and APIs for analytics platform. Optimized database queries reducing load time by 60%.",
      technologies: ["Python", "Flask", "MongoDB", "Redis"]
    }
  ],
  education: [
    {
      id: 1,
      institution: "Stanford University",
      degree: "M.S. Computer Science",
      period: "2016 - 2018",
      focus: "Machine Learning & Distributed Systems"
    },
    {
      id: 2,
      institution: "UC Berkeley",
      degree: "B.S. Computer Science",
      period: "2012 - 2016",
      focus: "Software Engineering"
    }
  ],
  testimonials: [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CTO at TechCorp",
      content: "Alex is an exceptional developer who consistently delivers high-quality code. His expertise in Python and system design has been invaluable to our team.",
      avatar: "/testimonial1.jpg"
    },
    {
      id: 2,
      name: "Michael Lee",
      role: "Engineering Manager at StartupXYZ",
      content: "Working with Alex was a pleasure. He brings deep technical knowledge and great communication skills to every project he touches.",
      avatar: "/testimonial2.jpg"
    }
  ],
  contact: {
    email: "alex.chen@example.com",
    github: "https://github.com/alexchen",
    linkedin: "https://linkedin.com/in/alexchen",
    twitter: "https://twitter.com/alexchen",
    calendly: "https://calendly.com/alexchen"
  }
};
