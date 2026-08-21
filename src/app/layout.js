/**
 * Root layout — a server component, so site-wide SEO goes through Next's `metadata`
 * export and individual pages can override it.
 *
 * This file used to be `"use client"` with a hand-written <head>. That meant every
 * route emitted the same <title> and the same
 * `<link rel="canonical" href="https://luminexa.in/">`, which tells search engines
 * that every URL is a duplicate of the homepage — and any page-level metadata was
 * appended rather than replacing it, producing two <title> tags per page.
 *
 * Note there is deliberately no site-wide `alternates.canonical`: metadata is
 * inherited by child routes, so a root canonical would reapply the same bug. Pages
 * that need one (blog posts) declare their own.
 */

import { Geist, Geist_Mono, Space_Grotesk, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SiteChrome from "./SiteChrome";

/* -------------------------------------------------------------------------- */
/*  Fonts                                                                      */
/* -------------------------------------------------------------------------- */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Montserrat — primary / display & heading font */
const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/* Space Grotesk — secondary / body font */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/* -------------------------------------------------------------------------- */
/*  Metadata                                                                   */
/* -------------------------------------------------------------------------- */
const SITE_TITLE =
  "Luminexa Technologies | AI-Driven Platforms, Mapping Systems, CRM & Immersive Experiences";
const SITE_DESCRIPTION =
  "Luminexa Technologies delivers AI-driven platforms, geospatial mapping systems, CRM solutions, 360 virtual tours, and immersive digital experiences. We build custom software that transforms real estate sales, brand engagement, and business operations.";

export const metadata = {
  metadataBase: new URL("https://luminexa.in"),
  /* Pages supply complete titles, so the template passes them through unchanged. */
  title: { default: SITE_TITLE, template: "%s" },
  description: SITE_DESCRIPTION,
  keywords: [
    "AI platforms",
    "geospatial mapping",
    "plot mapping software",
    "real estate mapping",
    "CRM solutions",
    "sales automation",
    "360 virtual tours",
    "immersive experiences",
    "WebAR",
    "AR solutions",
    "XR platforms",
    "custom software development",
    "digital transformation",
    "Luminexa Technologies",
    "nexMap AI",
    "interactive mapping",
    "real estate technology",
    "AI sales tools",
  ],
  authors: [{ name: "Luminexa Technologies" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Luminexa Technologies",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://luminexa.in",
    images: [{ url: "/preview.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/preview.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: { capable: true, title: "Luminexa" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Luminexa Technologies",
  url: "https://luminexa.in",
  logo: "https://luminexa.in/logo.png",
  description: SITE_TITLE,
  sameAs: [
    "https://www.instagram.com/luminexa",
    "https://www.linkedin.com/company/luminexa",
  ],
};

/* -------------------------------------------------------------------------- */
/*  Root Layout                                                                */
/* -------------------------------------------------------------------------- */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <SiteChrome>{children}</SiteChrome>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3CM0LCLPFT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3CM0LCLPFT');
          `}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
      </body>
    </html>
  );
}
