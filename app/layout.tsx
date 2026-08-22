import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://machado-editor.com"),
  title: "Machado — Video Editor",
  description:
    "Lucas Machado is a video editor creating sharp, rhythmic and visually unforgettable stories for brands and creators.",
  openGraph: {
    title: "Machado — Video Editor",
    description: "Stories, cut with intent. Video editing, motion design and visual storytelling.",
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Machado — Video Editor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Machado — Video Editor",
    description: "Stories, cut with intent. Video editing, motion design and visual storytelling.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
