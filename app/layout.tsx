import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./side-bar/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agendamento APP",
  description: "Agendamento de Salões, Babearias e estúdios de beleza",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="min-h-screen lg:flex">
          <Sidebar />

          <main className="min-h-screen min-w-0 flex-1 px-4 pb-8 pt-20 sm:px-6 sm:pt-8 lg:ml-64 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}