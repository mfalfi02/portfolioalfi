import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Fatkhul Alfi | Web Developer Portfolio",
  description:
    "Portfolio of Muhammad Fatkhul Alfi, a web developer building practical web applications and digital tools.",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Web Developer", "Portfolio"],
  authors: [{ name: "Muhammad Fatkhul Alfi" }],
  openGraph: {
    title: "Muhammad Fatkhul Alfi | Web Developer Portfolio",
    description: "Selected web applications and digital products by Muhammad Fatkhul Alfi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-background text-foreground antialiased selection:bg-emerald-500 selection:text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
