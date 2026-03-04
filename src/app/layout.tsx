import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EscBack from "@/components/EscBack";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Maxwell Willis | Publication Portfolio",
  description:
    "Strategic forecasts, economic analyses, and professional publications by Maxwell Willis.",
  openGraph: {
    title: "Maxwell Willis | Publication Portfolio",
    description:
      "Strategic forecasts, economic analyses, and professional publications by Maxwell Willis.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <EscBack />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
