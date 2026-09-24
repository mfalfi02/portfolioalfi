import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Fatkhul Alfi | Web Developer Portfolio",
  description:
    "A professional portfolio focused on frontend engineering, Next.js, design systems, and polished, fast digital products.",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Web Developer", "Portfolio"],
  authors: [{ name: "Muhammad Fatkhul Alfi" }],
  openGraph: {
    title: "Muhammad Fatkhul Alfi | Web Developer Portfolio",
    description: "A portfolio website focused on visual quality, performance, and maintainability.",
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
      </body>
    </html>
  );
}
