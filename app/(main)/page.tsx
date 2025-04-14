import HeroSection from "./hero-section";
import type { Metadata } from 'next';

const title = "Home";
const description =
  "Homepage for WebPress to display links and inforamtion to get started.";
const url = "https://webpress.au";
const siteName = "WebPress | Home";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || url),
  robots: "index, follow",
  title,
  description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title,
    description,
    url,
    siteName,
    images: [
      {
        url: "https://webpress.au/content/og.jpg",
        width: 1200,
        height: 630,
        alt: "OG image for WebPress",
        type: "image/jpg",
      },
    ],
  },
};

export default function HomePage() {
    return <HeroSection />
} 