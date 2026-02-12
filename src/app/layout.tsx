import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RealityDistortion Agent - Cognitive Forensics Lab",
  description: "Advanced cognitive manipulation detection AI. Analyze how reality is being distorted across 7 dimensions of influence.",
  keywords: "cognitive manipulation, misinformation detection, reality distortion, content analysis, influence detection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
