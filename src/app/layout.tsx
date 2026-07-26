import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingAssistant } from "@/components/ai/floating-assistant";
import { Providers } from "@/components/providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ShowSync - AI-First Movie & Events Booking",
  description: "Book tickets for the latest movies and events in India. AI-powered recommendations, 3D seat previews, and seamless payments.",
  keywords: "movie tickets, events booking, India cinema, AI booking, ShowSync",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-16`}
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <FloatingAssistant />
        </Providers>
      </body>
    </html>
  );
}
