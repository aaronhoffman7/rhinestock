import type { Metadata } from "next";
import "./globals.css";
import ShootingStars from "./components/ShootingStars";
import MarginShrooms from "./components/MarginShrooms";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "ReDelicious - DC's Food Lab Co-op",
  description:
    "DC's Food Lab Co-op, transforming food waste into delicious, sustainable, and educational experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get page title from page children (explained below)
  const pageTitle =
    (children as any)?.props?.pageTitle || "ReDelicious"; // fallback

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/titania" rel="stylesheet" />
      </head>
      <body>
        <Header title={pageTitle} />
        <main>{children}</main>
        <div id="star-container" />
        <MarginShrooms />
        <ShootingStars />
        <Footer />
      </body>
    </html>
  );
}

