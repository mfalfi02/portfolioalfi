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
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
}

export interface SkillItem {
  name: string;
}

export interface SkillCategory {
  name: string;
  skills: SkillItem[];
}
