import { UserProfile, Project, SkillCategory, ExperienceItem } from "@/types";

export const INITIAL_PROFILE: UserProfile = {
  name: "ALEX RIVERA",
  fullName: "Alex Rivera",
  roleTitle: "Senior Frontend Engineer",
  hireStatus: "Available for freelance and full-time roles",
  heroBio:
    "I build fast, polished, and maintainable websites and digital products. My focus is on Next.js, design systems, performance, and thoughtful user experiences.",
  yearsExp: "5+",
  projectsCompleted: "30+",
  performanceScore: "Core Web Vitals focused",
  email: "alex.dev@example.com",
  location: "Jakarta, Indonesia",
  githubUrl: "https://github.com/mfalfi02",
  linkedinUrl: "https://www.linkedin.com/in/muhammad-alfi-98a22a304/",
  twitterUrl: "https://www.instagram.com/mfalfi_?stkn=NHR1MXhsNTYxYjFz",
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "1",
    title: "StudioSite Redesign",
    description:
      "Redesigned a company profile website with a clearer content structure, faster performance, and components that the internal team can update easily.",
    category: "Fullstack",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "API Routes"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    stars: 18,
    date: "2025-05",
  },
  {
    id: "2",
    title: "Portfolio CMS",
    description:
      "A lightweight content panel for managing profiles, experience, and project lists without manually editing component files.",
    category: "Fullstack",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    tags: ["Next.js", "Node.js", "JSON Store", "Admin Panel"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    stars: 12,
    date: "2025-04",
  },
  {
    id: "3",
    title: "Team Dashboard",
    description:
      "An internal dashboard for viewing task status, weekly reports, and team activity summaries in one simple interface.",
    category: "Fullstack",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Charts", "REST API", "Responsive UI"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    stars: 24,
    date: "2025-02",
  },
  {
    id: "4",
    title: "Motion Landing Page",
    description:
      "A promotional landing page with smooth animations, clearer calls to action, and a layout that remains easy to read on mobile devices.",
    category: "3D/WebXR",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
    tags: ["Three.js", "Framer Motion", "Accessibility", "Performance"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    stars: 16,
    date: "2025-01",
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Frontend engineering",
    skills: [
      { name: "Next.js App Router" },
      { name: "React and state architecture" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Design systems" },
    ]
  },
  {
    name: "Backend and delivery",
    skills: [
      { name: "Node.js API routes" },
      { name: "File-based data stores" },
      { name: "REST APIs" },
      { name: "Vercel deployment" },
      { name: "Performance tuning" },
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Information Systems Student",
    company: "Widya Dharma University, Pontianak",
    period: "2022 - 2026",
    description:
      "Pursuing a degree in Information Systems, with a focus on building a strong foundation in technology, business processes, and digital solutions."
  },
  {
    role: "Member of the Student Senate",
    company: "Faculty of Information Technology, Widya Dharma University, Pontianak",
    period: "2024 - 2025",
    description:
      "Contributed to student representation and faculty initiatives, helping foster communication, collaboration, and a supportive academic environment."
  },
  {
    role: "Interactive Web Developer",
    company: "Creative Agency",
    period: "2024 - 2025",
    description:
      "Developed promotional websites, microsites, and lightweight visual interactions for digital campaigns that required fast, polished execution."
  }
];
