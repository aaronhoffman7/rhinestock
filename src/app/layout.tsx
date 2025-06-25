import type { Metadata } from "next";
import "./globals.css";
import ShootingStars from "./components/ShootingStars";

export const metadata: Metadata = {
  title: "ReDelicious - DC's Food Lab Co-op",
  description: "DC's Food Lab Co-op transforming food waste into delicious, sustainable, and educational experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/titania" rel="stylesheet" />
      </head>
      <body>
        <div id="star-container"></div>
        {children}
        <ShootingStars />
      </body>
    </html>
  );
}
