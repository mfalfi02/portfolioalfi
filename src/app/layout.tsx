import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolioalfi.vercel.app"),
  title: "Muhammad Fatkhul Alfi — Web Developer",
  description:
    "Muhammad Fatkhul Alfi is an Information Systems graduate building web applications for operations, education, and decision support.",
  keywords: ["Information Systems", "Web Developer", "Laravel", "Next.js", "MySQL", "Portfolio"],
  authors: [{ name: "Muhammad Fatkhul Alfi" }],
  openGraph: {
    title: "Muhammad Fatkhul Alfi — Web Developer",
    description: "Selected web applications by Muhammad Fatkhul Alfi, an Information Systems graduate.",
    url: "https://portfolioalfi.vercel.app",
    siteName: "Muhammad Fatkhul Alfi",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Muhammad Fatkhul Alfi — Web Developer",
    description: "Selected web applications by Muhammad Fatkhul Alfi.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-background text-foreground antialiased selection:bg-[var(--accent)] selection:text-[#10110f]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
