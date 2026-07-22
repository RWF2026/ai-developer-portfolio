export const site = {
  name: "Jashwanth B",
  firstName: "Jashwanth",
  lastName: "B",
  role: "Data Analyst · Business Analyst",
  tagline:
    "Turning operational data into clear dashboards, SLA insights, and decisions — process visibility, root-cause analysis, and stakeholder-ready reporting.",
  email: "jashwanthgowda23@gmail.com",
  phone: "+91 91482 26055",
  phoneRaw: "9148226055",
  location: "Bangalore, Karnataka, India",
  summary:
    "Detail-oriented analyst with hands-on experience in data analysis, reporting, dashboards, and process optimization. Skilled at consolidating validation metrics, monitoring SLA adherence, documenting workflows, and partnering with cross-functional teams to improve visibility and decision quality in industrial and academic settings.",
  targetRoles: [
    "Data Analyst",
    "Business Analyst",
    "Quality Analyst",
    "Operations Analyst",
  ],
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jashwanth-b-gowda-/",
      handle: "in/jashwanth-b-gowda-",
    },
    {
      label: "GitHub",
      href: "https://github.com/RWF2026?tab=repositories",
      handle: "@RWF2026",
    },
    {
      label: "Email",
      href: "mailto:jashwanthgowda23@gmail.com",
      handle: "jashwanthgowda23@gmail.com",
    },
  ],
  github: "https://github.com/RWF2026",
  linkedin: "https://www.linkedin.com/in/jashwanth-b-gowda-/",
  photo: "/jashwanth-photo.jpg",
  resumePath: "/Jashwanth_B_Resume.pdf",
} as const;

/** Analyst-first skill matrix */
export const skills = [
  "Power BI",
  "Advanced Excel",
  "SQL / MySQL",
  "Python",
  "Data Visualization",
  "Trend Analysis",
  "Root Cause Analysis",
  "Process Mapping",
  "SLA Monitoring",
  "MS Office",
  "Requirements Gathering",
  "Stakeholder Reporting",
] as const;

export const competencies = [
  {
    title: "Process & Quality",
    items: [
      "Root Cause Analysis (RCA)",
      "Process Mapping",
      "SLA Adherence Monitoring",
      "Defect Tracking",
      "Workflow Standardization",
    ],
  },
  {
    title: "Data & Dashboards",
    items: [
      "Power BI",
      "Advanced Excel (Pivot Tables, Data Modeling)",
      "Trend Analysis",
      "Performance Metrics",
      "KPI Reporting",
    ],
  },
  {
    title: "Enablement Tools",
    items: [
      "SQL / Database Management",
      "Python for analysis & automation",
      "Technical Documentation",
      "Cross-functional Collaboration",
    ],
  },
] as const;

export const flagshipProject = {
  title: "Factory Vehicle & Wheel Ops Dashboard",
  description:
    "Built reporting and monitoring views for Rail Wheel Factory — consolidated entry/exit and axle-count data into structured SQL logs, tracked transit-time SLA compliance, and delivered leadership-ready insights on logistics throughput and process variability.",
  tags: ["SQL", "Python", "Dashboards", "SLA", "Excel", "Reporting"],
  github: "https://github.com/RWF2026?tab=repositories",
  live: "https://github.com/RWF2026?tab=repositories",
  metrics: [
    { label: "Focus", value: "SLA" },
    { label: "Output", value: "Dashboards" },
    { label: "Domain", value: "Ops Data" },
  ],
} as const;

/** Internships only — separate from education */
export const internships = [
  {
    year: "Jan 2026 – Present",
    title: "Intern — Full Stack Development & Data Operations",
    org: "Rail Wheel Factory",
    detail:
      "Developed a web-based Vehicle and Rail Wheel Monitoring System with detailed technical documentation and review reports. Consolidated system validation data into structured formats for stakeholders. Collaborated cross-functionally to gather requirements and deliver modules on schedule. Analyzed operational bottlenecks and data streams to reduce tracking discrepancies and improve process visibility.",
  },
  {
    year: "Jul 2025 – Dec 2025",
    title: "Project Lead — Academic Initiatives",
    org: "Sustainable Fertilizer & BHOOMI Programs",
    detail:
      "Managed a 17-week Gantt plan for the Fertilizer Usage Optimizer, maintained status reports for review panels, and translated stakeholder requirements into UI workflows and milestone trackers. Supported BHOOMI delivery through structured debugging and API synchronization.",
  },
  {
    year: "May 2022",
    title: "Inplant Trainee — ITK Innovation Center",
    org: "Indian Tech Keys",
    detail:
      "Assisted in web application development and prepared documentation outlining application logic and project milestones. Coordinated over digital channels to clarify tasks, reviewed assets for accuracy/formatting before deployment, and strengthened documentation discipline.",
  },
] as const;

/** Education only — separate from internships */
export const education = [
  {
    year: "2023 – 2026",
    title: "B.Tech — Computer Science & Engineering",
    org: "Presidency University, Bangalore",
    detail:
      "CGPA: 7.1. Coursework and project work spanning data systems, analytics-oriented applications, and structured documentation for technical reviews.",
  },
  {
    year: "2019 – 2022",
    title: "Diploma — Computer Science & Engineering",
    org: "Nitte Meenakshi Institute of Technology",
    detail:
      "Percentage: 73.65%. Foundation in programming, databases, and web technologies supporting later analytics and reporting work.",
  },
] as const;

/** @deprecated use internships + education — kept for any legacy imports */
export const timeline = internships;

export const projects = [
  {
    name: "Vehicle & Rail Wheel Ops Analytics",
    blurb:
      "Organized entry/exit and wheel-count datasets in SQL, built monitoring views for transit SLA compliance, and packaged performance/reliability metrics for stakeholder reviews.",
    stack: ["SQL", "Python", "Dashboards", "Reporting"],
  },
  {
    name: "Sustainable Fertilizer Decision App",
    blurb:
      "Structured agricultural parameters into recommendation workflows, tracked development progress with Gantt/status reports, and presented clear project updates to technical review panels.",
    stack: ["Python", "ML Insights", "Excel", "Stakeholder Comms"],
  },
  {
    name: "BHOOMI — Delivery & Issue Tracking",
    blurb:
      "Stabilized build/integration issues, documented defects and resolutions, and kept Weather API integrations aligned so delivery milestones stayed first-time-right.",
    stack: ["Issue Tracking", "APIs", "Documentation"],
  },
] as const;

export const certifications = [
  {
    title: "Deloitte Certificate",
    issuer: "Deloitte",
    file: "/certificates/deloitte.pdf",
    type: "pdf" as const,
  },
  {
    title: "Internship — Indian Tech Keys",
    issuer: "Indian Tech Keys · ITK Innovation Center",
    file: "/certificates/indian-tech-keys.pdf",
    type: "pdf" as const,
  },
  {
    title: "Data Visualization using Python",
    issuer: "Infosys / DHV Program",
    file: "/certificates/data-viz-python.pdf",
    type: "pdf" as const,
  },
  {
    title: "Python Certificate",
    issuer: "Python Training Program",
    file: "/certificates/python.pdf",
    type: "pdf" as const,
  },
  {
    title: "Rail Wheel Factory Internship",
    issuer: "Rail Wheel Factory",
    file: "/certificates/rwf-internship.pdf",
    type: "pdf" as const,
  },
  {
    title: "DSA Skill Assessment — 100%",
    issuer: "Scaler Topics · Certificate of Excellence",
    file: "/certificates/scaler-dsa.png",
    type: "image" as const,
    verifyUrl: "https://moonshot.scaler.com/s/sl/yE0SenD6vN",
  },
] as const;

export const splineScenes = {
  hero: "",
  tech: "",
} as const;
