import portfolioContent from '../../data/portfolio.json';
import { Project, SkillCategory, UserProfile } from '@/types';

export const INITIAL_PROFILE = portfolioContent.profile as UserProfile;
export const INITIAL_PROJECTS = portfolioContent.projects as Project[];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Application development',
    skills: [
      { name: 'Next.js' },
      { name: 'React' },
      { name: 'Laravel' },
      { name: 'PHP Native' },
      { name: 'Visual Basic' },
      { name: 'Delphi' },
    ],
  },
  {
    name: 'Data & tools',
    skills: [
      { name: 'MySQL' },
      { name: 'Figma' },
      { name: 'Visual Studio Code' },
      { name: 'Microsoft Word' },
      { name: 'Microsoft Excel' },
    ],
  },
];
