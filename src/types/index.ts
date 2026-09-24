export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Fullstack' | '3D/WebXR' | 'Mobile' | 'AI/ML';
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  stars: number;
  date: string;
}

export interface UserProfile {
  name: string;
  fullName: string;
  roleTitle: string;
  hireStatus: string;
  heroBio: string;
  yearsExp: string;
  projectsCompleted: string;
  performanceScore: string;
  email: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
}

export interface SkillItem {
  name: string;
}

export interface SkillCategory {
  name: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}
