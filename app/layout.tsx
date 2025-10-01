import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "./(ui)/SiteHeader";
import ThemeScript from "./(ui)/ThemeScript";
import MobileNav from "./(ui)/MobileNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Violet Paper",
  description: "A simple purple & yellow blog in Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> 
        <div className="min-h-screen">
          <SiteHeader />
          {children}
          <MobileNav />
        </div>
        <ThemeScript />
      </body>
    </html>
  );
}
