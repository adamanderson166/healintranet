import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HEAL Intranet",
  description: "Your central hub for company resources, collaboration, and growth",
  icons: {
    icon: [
      {
        url: '/images/heal-logo.png',
        href: '/images/heal-logo.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <div className="min-h-full">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
