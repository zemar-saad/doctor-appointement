"use client";

import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/sonner"
const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current path

  // Define routes where you want to hide Header and Footer
  const hideLayoutRoutes = ["/login", "/register","/doctorlogin"];

  // Check if the current path is in the hideLayoutRoutes array
  const shouldHideLayout = hideLayoutRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className={outfit.className}>
        {!shouldHideLayout && <Header />}  {/* Conditionally render Header */}
        <div className={shouldHideLayout ? "" : "md:px-20"}>
          {children}
          <Toaster />
        </div>
        {!shouldHideLayout && <Footer />}  {/* Conditionally render Footer */}
      </body>
    </html>
  );
}
