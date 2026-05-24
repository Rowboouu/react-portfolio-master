import type { Metadata, Viewport } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "./App.css";
import Headermain from "../header";
import Footer from "../components/footer";
import AnimatedCursor from "../hooks/AnimatedCursor";
import { meta } from "../content_option";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  authors: [{ name: meta.title }],
  openGraph: {
    title: meta.title,
    description: meta.description,
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: meta.title,
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    images: ["/images/og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Marcellus&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,400;0,500;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <AnimatedCursor />
        <Headermain />
        {children}
        <Footer />
      </body>
    </html>
  );
}
