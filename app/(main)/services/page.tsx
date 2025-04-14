import TextHero from '@/components/text-hero';
import ServicesDescription from './services-description';
import { Fragment } from 'react';
import type { Metadata } from 'next';

const title = "Services";
const description =
  "Services page for WebPress to display the services offered by WebPress.";
const url = "https://webpress.au/services";
const siteName = "WebPress | Services";

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

export default function Services() {
  return (
    <Fragment>
      <TextHero
        title="Our Services"
        words="We implement future-proof technologies that deliver growing value long after deployment."
        backgroundImage="/content/services.jpg"
      />
      <ServicesDescription />
    </Fragment>
  );
}