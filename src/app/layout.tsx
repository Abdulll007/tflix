import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
const inter = Inter({ subsets: ["latin"] });
import "hls-video-element";


export const metadata: Metadata = {
  title: "TFLIX",
  icons:[{
    rel:"icon",
    type:"image/png",
    url:"/favicon.svg",
    sizes:"32x32"
  }],
  
  description: "Stream movies & Tv shows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <div className="flex flex-col min-h-screen ">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
