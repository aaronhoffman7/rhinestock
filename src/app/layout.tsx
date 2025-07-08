// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { PageTitleProvider, usePageTitle } from "./context/PageTitleContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MarginShrooms from "./components/MarginShrooms";
import ShootingStars from "./components/ShootingStars";

export const metadata: Metadata = {
  title: "ReDelicious - DC's Food Lab Co-op",
  description:
    "DC's Food Lab Co-op, transforming food waste into delicious, sustainable, and educational experiences",
};

// Create a wrapper to pull title from context
function HeaderWithTitle() {
  const [title] = usePageTitle();
  return <Header title={title} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/titania" rel="stylesheet" />
      </head>
      <body>
        <PageTitleProvider>
          <HeaderWithTitle />
          <main>{children}</main>
          <div id="star-container" />
          <MarginShrooms />
          <ShootingStars />
          <Footer />
        </PageTitleProvider>
      </body>
    </html>
  );
}
