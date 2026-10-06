import type { Metadata } from "next";

import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { PageLoader } from "@/components/providers/PageLoader";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

import "./globals.css";

export const metadata: Metadata = {
  title: "SM Builders — Real Estate & Development",
  description: "A premium real estate experience by SM Builders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PageLoader />
        <SmoothScroll />
        <Navbar />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
