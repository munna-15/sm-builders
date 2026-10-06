import type { Metadata } from "next";

import { SmoothScroll } from "@/components/providers/SmoothScroll";

import { Navbar } from "@/components/layout/Navbar";

import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

import "./globals.css";
import { PageTransition } from "@/components/providers/PageTransition";

export const metadata: Metadata = {
  title: "ESTORA — Real Estate & Development",
  description: "A cinematic real estate experience by ESTORA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />

       
        <Navbar />

        {children}

        <FloatingWhatsApp />
      </body>
    </html>
  );
}
