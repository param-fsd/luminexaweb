const nexaiServices = [
  {
    subSlug: "ai-agents",
    title: "AI Agents",
    description: "Intelligent agents for automated workflows.",
   overview: `
<p>AI Agents are intelligent systems designed to automate complex tasks across business operations.</p>
<p>They can handle processes like customer support, data analysis, content creation, and repetitive workflows, working 24/7 without manual intervention.</p>
<p>These agents adapt to your business needs and integrate seamlessly with existing systems via APIs and automation platforms.</p>
<p>By reducing errors and operational costs, AI Agents improve efficiency and free up human resources for higher-value tasks.</p>
<p>With AI Agents, businesses can scale processes, enhance accuracy, and deliver faster, smarter results.</p>
`,benefits: [
      "24/7 task automation.",
      "Improved efficiency and accuracy.",
      "Customizable to specific industries.",
      "Reduces operational costs.",
      "Seamless integration with existing systems."
    ],
    demos: [],
    caseStudies: [

    ],
    technologies: ["TensorFlow", "Python", "Node.js", "APIs", "n8n"],
    faqs: [
      { question: "Can AI Agents integrate with existing systems?", answer: "Yes, via APIs, n8n workflows, and custom integrations." },
      { question: "What training data is needed?", answer: "Depends on the use case; we provide pre-trained models and can customize based on client data." },
      { question: "Do AI Agents require maintenance?", answer: "Periodic updates improve accuracy and incorporate new data, but they largely run autonomously." }
    ]
  },
  {
    subSlug: "ai-chatbots",
    title: "AI Chatbots",
    description: "Conversational AI for customer engagement.",
    overview: "<p>AI Chatbots provide natural, human-like interactions for customer service, sales, and support, ensuring consistent and scalable engagement.</p>",
    benefits: [
      "Enhanced customer experience.",
      "Scalable support for large user bases.",
      "Multilingual capabilities.",
      "Available 24/7 without downtime.",
      "Reduces workload for human agents."
    ],
    demos: ["https://example.com/chatbot-demo.mp4"],
    caseStudies: [
      { title: "E-commerce Chatbot", description: "Increased sales by 20% through personalized recommendations." },
      { title: "Customer Service Automation", description: "Handled 60% of queries without human intervention." }
    ],
    technologies: ["Dialogflow", "Rasa", "AWS Lex", "n8n"],
    faqs: [
      { question: "Can chatbots handle complex queries?", answer: "Yes, with advanced NLP, workflow integration, and custom training." },
      { question: "Are they secure?", answer: "Built with encryption, secure APIs, and compliance standards." },
      { question: "Can chatbots integrate with CRM systems?", answer: "Yes, they can connect to CRMs, databases, and other platforms via n8n or APIs." }
    ]
  },
  {
    subSlug: "automation-workflows",
    title: "Automation Workflows (n8n)",
    description: "Custom workflow automation using n8n for businesses.",
    overview: "<p>Design and implement automated workflows that connect apps, databases, and services to streamline business processes and reduce manual work.</p>",
    benefits: [
      "Eliminate repetitive tasks.",
      "Integrate multiple apps and services seamlessly.",
      "Centralized data collection and reporting.",
      "Reduce human errors and operational costs.",
      "Fully customizable workflows for any industry."
    ],
    demos: ["https://example.com/n8n-workflows-demo.mp4"],
    caseStudies: [
      { title: "Marketing Automation", description: "Automated email campaigns and lead scoring for a SaaS client." },
      { title: "Sales Pipeline Automation", description: "Connected CRM and communication tools, saving 15 hours/week for the sales team." }
    ],
    technologies: ["n8n", "Node.js", "APIs", "Zapier Integration", "Custom scripts"],
    faqs: [
      { question: "Do I need programming knowledge to use n8n workflows?", answer: "No, we design workflows that are easy to use, with visual interfaces." },
      { question: "Can workflows be modified later?", answer: "Yes, workflows are fully editable and scalable." },
      { question: "Is it secure to automate sensitive data?", answer: "Yes, with encrypted connections and secure authentication methods." }
    ]
  }
];

export default nexaiServices;
