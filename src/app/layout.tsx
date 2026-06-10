import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingBackground } from "@/components/FloatingBackground";
import { DATA } from "@/const/data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const title = `${DATA.name} | ${DATA.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: DATA.description,
  openGraph: {
    title,
    description: DATA.description,
    url: "/",
    siteName: DATA.name,
    images: [
      {
        url: "/profile/dhruv.png",
        width: 941,
        height: 1672,
        alt: DATA.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: DATA.description,
    images: ["/profile/dhruv.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-500 overflow-x-hidden">
        <FloatingBackground />
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
