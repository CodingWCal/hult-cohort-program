import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { ErrorReporter } from "@/components/ErrorReporter";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LocalPlate — homemade meals from your block",
  description:
    "A Trinidad & Tobago micro-marketplace for homemade plates — doubles, roti, pelau, crab and dumpling — reserved for pickup in your town.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ErrorReporter />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
