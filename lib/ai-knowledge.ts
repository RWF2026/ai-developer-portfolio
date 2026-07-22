import {
  certifications,
  education,
  flagshipProject,
  internships,
  projects,
  site,
  skills,
} from "./portfolio-data";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const knowledge = {
  about: `${site.name} is targeting ${site.targetRoles.join(", ")} roles. Based in ${site.location}. ${site.summary}`,
  skills: `Analyst toolkit: ${skills.join(", ")}. Strong at RCA, process mapping, SLA monitoring, Power BI / Excel dashboards, SQL reporting, and stakeholder communication.`,
  projects: `Flagship: ${flagshipProject.title} — ${flagshipProject.description} Other work: ${projects.map((p) => `${p.name} (${p.stack.join("/")})`).join("; ")}.`,
  internships: internships
    .map((t) => `${t.year}: ${t.title} @ ${t.org} — ${t.detail}`)
    .join(" "),
  education: education
    .map((e) => `${e.year}: ${e.title} @ ${e.org} — ${e.detail}`)
    .join(" "),
  certifications: `Certifications: ${certifications.map((c) => `${c.title} (${c.issuer})`).join("; ")}. Click any certificate on the site to view the file.`,
  contact: `Email ${site.email}. Phone ${site.phone}. Location ${site.location}. LinkedIn: ${site.socials[0].href}. Resume download available on this site.`,
};

function matchIntent(
  input: string,
): keyof typeof knowledge | "greeting" | "fallback" {
  const q = input.toLowerCase();
  if (/^(hi|hello|hey|yo|sup)\b/.test(q) || q.includes("who are you"))
    return "greeting";
  if (/skill|stack|tool|excel|power bi|sql|analyst|dashboard|kpi|rca/.test(q))
    return "skills";
  if (/project|work|portfolio|rail|wheel|fertilizer|bhoomi|dashboard|sla/.test(q))
    return "projects";
  if (/intern|experience|job|career|factory|itk|rail wheel/.test(q))
    return "internships";
  if (/educat|college|university|degree|cgpa|diploma|presidency|nitte/.test(q))
    return "education";
  if (/certif|course|infosys|scaler|simplilearn/.test(q)) return "certifications";
  if (/contact|email|phone|hire|reach|social|linkedin/.test(q)) return "contact";
  if (/about|yourself|bio|background|who is|summary|business analyst|data analyst/.test(q))
    return "about";
  return "fallback";
}

export function answerPortfolioQuestion(input: string): string {
  const intent = matchIntent(input);
  switch (intent) {
    case "greeting":
      return `Hey — I'm ${site.name}'s portfolio assistant (Data / Business Analyst focus). Ask about skills, internships, education, dashboards/projects, or contact details.`;
    case "about":
      return knowledge.about;
    case "skills":
      return knowledge.skills;
    case "projects":
      return knowledge.projects;
    case "internships":
      return knowledge.internships;
    case "education":
      return knowledge.education;
    case "certifications":
      return knowledge.certifications;
    case "contact":
      return knowledge.contact;
    default:
      return `I can cover ${site.name}'s analyst skills (Excel, Power BI, SQL, RCA), Rail Wheel Factory data ops internship, education, projects, and contact info. Try: "What tools do you use?" or "Tell me about your internship."`;
  }
}

export const suggestedPrompts = [
  "What analyst tools do you use?",
  "Tell me about your internship",
  "What's your education?",
  "How can I contact Jashwanth?",
] as const;
