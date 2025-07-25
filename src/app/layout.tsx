// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { PageTitleProvider } from "./context/PageTitleContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ShootingStars from "./components/ShootingStars";
import { Analytics } from '@vercel/analytics/react';


export const metadata: Metadata = {
  title: "Rhinestock",
  description:
    "First annual woooooooo",
    icons: {
    icon: "/photos/acid.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/titania" rel="stylesheet" />
      </head>
      <body>
        <PageTitleProvider>
          <Header title="Rhinestock" />
          <main>{children}</main>
          <Analytics />
          <div id="star-container" />
          <ShootingStars />
          <Footer />
        </PageTitleProvider>
      </body>
    </html>
  );
}
