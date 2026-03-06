export const ProjectsData = [
    {
    id: 1,
    title: "Big Data Lab",
    deploymentStatus: "active",
    description:
      "A full-stack movie analytics platform engineered to query 29M+ rows with millisecond precision via advanced PostgreSQL optimization and a responsive React dashboard.",
    achievements: [
      "\"Full-Stack Performance\": Built a high-velocity React dashboard integrated with a Node.js backend for real-time big data visualization.",
      "\"Query Mastery\": Slashed search latency 20× by implementing GIN and B-Tree indexing on 29M+ record datasets.",
      "\"Data Engineering\": Developed high-speed ETL pipelines in Python/Bash for automated multi-source data ingestion.",
      "\"DevOps & Cloud\": Orchestrated a scalable CI/CD pipeline via GitHub Actions and Docker Compose on Hetzner Cloud infrastructure."
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Python", "Docker", "GitHub Actions", "Hetzner Cloud", "Vite"],
    tags: ["Full-Stack", "React", "Big Data", "Data Engineering", "DevOps", "CI/CD"],
    link: "https://bigdatalab.anlam.app/",
    stack: "React + Node.js + PostgreSQL + Docker",
    mediaUrls: ["big-data-lab.gif"],
    git: "https://github.com/anlqt89/big-data-lab"
  },
  {
    id: 2,
    title: "Personal Portfolio",
    deploymentStatus: "active",
    description:
      "A high-performance personal portfolio engineered in a 32-hour rapid sprint, utilizing AI-augmented workflows for premium UI/UX and automated lead capture.",
    achievements: [
      "\"Rapid Delivery\": Accelerated 80+ hours of traditional development into a 32-hour sprint via AI-augmented prototyping and Tailwind iteration.",
      "\"Instant Utility\": Deployed a functional EmailJS communication layer with automated spam-check logic within the first 5 hours of production.",
      "\"Extreme Performance\": Optimized to sub-millisecond rendering speeds through a local-first data architecture and zero-latency routing.",
      "\"Fluent UI\": Integrated Framer Motion and Lucide React systems in a single 8-hour design-to-code session for a fluid user experience."
    ],
    technologies: ["React", "EmailJS", "Tailwind CSS", "Framer Motion", "Lucide React", "Gemini AI", "Vite"],
    tags: ["Rapid Delivery", "AI-Augmented", "Portfolio", "32-Hour Sprint"],
    link: "https://anlam.app",
    stack: "React + Tailwind + EmailJS + Gemini AI",
    mediaUrls: ["portfolio.gif"],
    git: "https://github.com/anlqt89/portfolio"
  },

  {
    id: 3,
    title: "Creatorverse",
    deploymentStatus: "active",
    description:
      "A specialized fandom management platform built in 8 hours, allowing users to discover, track, and manage their favorite digital content creators via a custom Supabase-backed CRUD engine.",
    achievements: [
      "\"8-Hour Sprint\": Engineered a full-stack React application with Supabase integration and dynamic routing in a single working day.",
      "\"Cloud Database\": Integrated Supabase for real-time data persistence, utilizing async/await patterns for performant CRUD operations.",
      "\"Responsive Design\": Optimized a creative card-based layout using Bootstrap and PicoCSS, featuring a mobile-first single-column view.",
      "\"Interactive UI\": Implemented custom hover states and React Icons for an intuitive UX, including unique SEO-friendly URLs for every creator."
    ],
    technologies: ["React", "Supabase", "JavaScript", "Bootstrap", "PicoCSS", "React Icons", "Axios"],
    tags: ["Full-Stack", "CRUD", "Supabase", "Rapid Development", "Fandom-Tech"],
    link: "https://creatorsverse.anlam.app/",
    stack: "React + Supabase + Bootstrap",
    mediaUrls: ["creatorverse-demo.gif"],
    git: "https://github.com/anlqt89/creatorverse"
  },
  {
    id: 4,
    title: "Movie Search Engine",
    deploymentStatus: "completed",
    description:
      "A full-stack movie discovery and management platform built with NestJS and Vite, featuring optimized API orchestration and persistent user favorite tracking.",
    achievements: [
      "\"Full-Stack Integration\": Architected a modular NestJS (Node.js) backend and Vite (React) frontend to handle complex movie data lifecycles.",
      "\"High-Performance Fetching\": Integrated TanStack React Query for infinite scrolling and intelligent caching, reducing redundant OMDb API calls.",
      "\"API Orchestration\": Engineered specialized REST endpoints for movie searching and favorite management (POST/DELETE) with persistent state.",
      "\"Modern UX\": Developed a fully responsive mobile-first interface featuring dynamic search debouncing and real-time list synchronization."
    ],
    technologies: ["React (Vite)", "NestJS", "TanStack Query", "Node.js", "Axios", "OMDb API", "REST APIs"],
    tags: ["Full-Stack", "NestJS", "Infinite Scroll", "React Query", "Vite"],
    link: "",
    stack: "NestJS + Vite + React Query",
    mediaUrls: ["moviesearch-demo.gif"],
    git: "https://github.com/anlqt89/MovieSearch"
  },
  {
    id: 5,
    title: "Find Team",
    deploymentStatus: "completed",
    description:
      "A full-stack collaborative Android application designed to streamline project formation and team management for academic and professional environments.",
    achievements: [
      "\"Mobile Solution\": Collaborated with a team of 4 to deliver a high-performance Android mobile solution.",
      "\"Database Design\": Designed and implemented a relational MySQL database for managing user, project, and team data.",
      "\"Feature Architecture\": Architected project management features allowing users to create and manage milestone activities.",
      "\"Discovery System\": Developed a robust filtering system for discovering projects based on skillsets.",
      "\"Lifecycle Management\": Managed the full project lifecycle, including task assignment and delivery."
    ],
    technologies: ["Java", "FastAPI", "Android SDK", "MySQL", "Project Management", "RESTful APIs"],
    tags: ["Mobile", "Teamwork", "Java", "Full-Stack", "Android"],
    link: "",
    stack: "Java + FastAPI + MySQL + Android",
    mediaUrls: ["findteam-1.png",
  "findteam-2.png",
  "findteam-3.png",
  "findteam-4.png",
  "findteam-5.png",
  "findteam-6.png",
  "findteam-7.png",
  "findteam-8.png"],
    git: "https://github.com/anlqt89/find-team"
  },
  {
    id: 6,
    title: "SeeFood",
    deploymentStatus: "completed",
    description:
      "An iOS application utilizing CoreML and Vision framework to identify food items in real-time.",
    achievements: [
      "\"AI Integration\": Integrated CoreML models for real-time image classification.",
      "\"Pipeline Implementation\": Implemented Vision framework for camera-to-model pipeline.",
      "\"Processing Optimization\": Optimized on-device processing for low-latency ID.",
      "\"UI Design\": Designed clean minimalist Swift UI."
    ],
    technologies: ["Swift", "iOS SDK", "CoreML", "Vision Framework", "XCode"],
    tags: ["Mobile", "Computer Vision", "AI", "iOS Development"],
    link: "",
    stack: "Swift + CoreML + Vision",
    mediaUrls: ["seefood.gif"],
    git: "https://github.com/anlqt89/Seefood_An"
  },
  {
    id: 7,
    title: "Biomedical Signal Classification (ECG)",
    deploymentStatus: "completed",
    description:
      "A high-precision machine learning pipeline engineered in a 32-hour sprint to detect life-threatening arrhythmias through advanced digital signal processing and multi-model classification.",
    achievements: [
      "\"Signal Engineering\": Developed a robust preprocessing engine using SciPy and PyWavelets for noise filtering and R-peak detection across 29M+ signal samples.",
      "\"Feature Extraction\": Engineered a 40+ dimensional feature set comprising FFT-based frequency domain, wavelet coefficients, and morphological heart-beat metrics.",
      "\"Multi-Model Intelligence\": Trained and optimized Random Forest, SVM, and MLP Neural Networks, achieving 96% accuracy on standard MIT-BIH/CU arrhythmia datasets.",
      "\"Production Optimization\": Implemented automated ETL pipelines for medical record ingestion (WFDB) and addressed class imbalance via stratified record-wise splitting."
    ],
    technologies: ["Python", "Scikit-Learn", "WFDB", "SciPy", "NumPy", "Pandas", "PyWavelets", "Random Forest", "Neural Networks (MLP)"],
    tags: ["Machine Learning", "Signal Processing", "Healthcare AI", "Bio-Engineering", "32-Hour Sprint"],
    link: "",
    stack: "Python + Scikit-Learn + SciPy + WFDB",
    mediaUrls: ["confusion_matrix.png", "mlp.png", "results.png", "segments.png"],
    git: "https://github.com/anlqt89/bio-ml"
  },
  {
    id: 8,
    title: "Meet to Eat",
    deploymentStatus: "completed",
    description:
      "A social networking iOS application built to connect people through dining experiences by leveraging real-time location data and restaurant reviews.",
    achievements: [
      "\"Team Leadership\": Spearheaded a development team of 5 to create an end-to-end iOS mobile platform.",
      "\"Backend Engineering\": Engineered a scalable back-end on Parse Server to handle user authentication.",
      "\"API Integration\": Integrated Yelp API to fetch live restaurant data and locations.",
      "\"UX Design\": Designed a user-centric UI focused on seamless communication."
    ],
    technologies: ["Swift", "iOS SDK", "Parse Server", "Yelp API", "JSON", "CocoaPods"],
    tags: ["iOS", "Social Media", "Geolocation", "API Integration"],
    link: "",
    stack: "Swift + Parse Server + Yelp API",
    mediaUrls: ["m2e_1.gif","m2e_2.gif","m2e_3.gif","m2e_4.gif"],
    git: "https://github.com/MEET2EAT/meet2eat"
  },
  {
    id: 9,
    title: "Intelligent Booking & Scheduling",
    deploymentStatus: "completed",
    description:
      "A full-stack technician scheduling platform that assigns jobs based on skill, availability, and throughput.",
    achievements: [
      "\"Engine Development\": Built full-stack scheduling engine with React/Node.",
      "\"Resource Optimization\": Optimized technician allocation with heuristics.",
      "\"Efficiency Gains\": Cut idle time by 1 hr / day per technician.",
      "\"Business Impact\": Raised revenue 15% via resource optimization."
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Python", "REST APIs", "Optimization Heuristics"],
    tags: ["SaaS", "Optimization", "Scheduling", "Business Systems"],
    link: "",
    stack: "React + Node.js + PostgreSQL + Python",
    mediaUrls: ["default.svg"],
    git: ""
  },
  {
    id: 10,
    title: "RISC-V Benchmarking Research",
    deploymentStatus: "completed",
    description:
      "An automated benchmarking framework for evaluating RISC-V compiler performance under concurrent workloads.",
    achievements: [
      "\"Pipeline Construction\": Built Bash/Makefile benchmarking pipelines.",
      "\"Data Collection\": Automated large-scale RISC-V data collection.",
      "\"Performance Analysis\": Analyzed compiler performance bottlenecks.",
      "\"Reproducible Workflows\": Created Linux-based reproducible workflows."
    ],
    technologies: ["C", "C++", "Bash", "Makefile", "Linux", "RISC-V"],
    tags: ["Systems", "Performance", "Research", "Low-Level"],
    link: "",
    stack: "C/C++ + Bash + Linux + RISC-V",
    mediaUrls: ["default.svg"],
    git: ""
  },
  {
    id: 11,
    title: "LARION E-Learning Platform",
    deploymentStatus: "completed",
    description:
      "A comprehensive internal web platform designed for corporate training and employee onboarding, featuring dynamic assessments and a complex relational architecture.",
    achievements: [
      "\"Project Leadership\": Led a team of 6 developers to build the codebase from scratch, successfully preparing the product for market release.",
      "\"Database Modeling\": Designed and modeled a robust PostgreSQL relational database with 26 tables to support high-scale training data.",
      "\"API Development\": Developed and maintained 100+ RESTful APIs to ensure seamless communication between services and the database.",
      "\"Algorithm Engineering\": Engineered a dynamic quiz generation algorithm using randomized logic and difficulty scaling.",
      "\"System Stability\": Executed 50+ rigorous test cases for core functionalities to ensure system stability."
    ],
    technologies: ["PostgreSQL", "REST APIs", "JavaScript", "Web Development", "Unit Testing", "Relational Modeling"],
    tags: ["EdTech", "Backend", "Leadership", "Database Design"],
    link: "",
    stack: "PostgreSQL + REST APIs + Node.js",
    mediaUrls: ["default.svg"],
    git: ""
  }
];