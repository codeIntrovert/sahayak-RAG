import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sahayak - Find Local Jobs",
  description: "AI-powered multilingual job portal for blue-collar workers in India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50`}
      >
        <Header />
        <main className="pb-10">
          {children}
        </main>
        <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-10">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
            © 2025 Sahayak. Empowering India&apos;s Blue Collar Workforce 🇮🇳
          </div>
        </footer>
      </body>
    </html>
  );
}
