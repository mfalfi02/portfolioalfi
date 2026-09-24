import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import { INITIAL_PROFILE, INITIAL_PROJECTS } from "@/lib/data";
import { Project, UserProfile } from "@/types";

export interface PortfolioContent {
  profile: UserProfile;
  projects: Project[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "portfolio.json");

export const DEFAULT_PORTFOLIO_CONTENT: PortfolioContent = {
  profile: INITIAL_PROFILE,
  projects: INITIAL_PROJECTS,
};

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(DEFAULT_PORTFOLIO_CONTENT, null, 2), "utf-8");
  }
}

export async function readPortfolioContent(): Promise<PortfolioContent> {
  await ensureDataFile();

  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Partial<PortfolioContent>;
    return {
      profile: parsed.profile ?? INITIAL_PROFILE,
      projects: Array.isArray(parsed.projects) ? parsed.projects : INITIAL_PROJECTS,
    };
  } catch {
    return DEFAULT_PORTFOLIO_CONTENT;
  }
}

export async function savePortfolioContent(content: PortfolioContent) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(content, null, 2), "utf-8");
  return content;
}
