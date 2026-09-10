import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "Marvel Fandom",
    template: "%s · Marvel Fandom",
  },
  description:
    "En statisk Marvel-wiki bygget med Next.js, Markdown/Frontmatter og Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb">
      <body className={`${display.variable} ${body.variable} bg-zinc-950 font-sans`}>
        <div className="min-h-screen bg-grid bg-[size:32px_32px]">
          <Header />
          <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
