import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "./fonts/Inter-VariableFont_opsz_wght.ttf",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "./fonts/Inter-Italic-VariableFont_opsz_wght.ttf",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ecomcraft SEO — Online Visibility Reports for UK Small Businesses",
  description:
    "An affordable SEO visibility report built for UK small businesses. Know exactly where you stand — and what to fix first.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
