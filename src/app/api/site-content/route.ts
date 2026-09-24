import { NextResponse } from "next/server";
import { readPortfolioContent, savePortfolioContent } from "@/lib/portfolio-store";

function isAuthorized(request: Request) {
  const adminPin = process.env.ADMIN_PIN ?? "1234";
  const providedPin = request.headers.get("x-admin-pin");
  return Boolean(providedPin && providedPin === adminPin);
}

export async function GET() {
  const content = await readPortfolioContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const profile = body?.profile;
    const projects = body?.projects;

    if (!profile || !Array.isArray(projects)) {
      return NextResponse.json(
        { error: "Payload must include profile and projects." },
        { status: 400 }
      );
    }

    const content = await savePortfolioContent({ profile, projects });
    return NextResponse.json(content);
  } catch {
    return NextResponse.json({ error: "Unable to save content." }, { status: 500 });
  }
}
