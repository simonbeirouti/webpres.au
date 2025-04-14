import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe';
import PricingDisplay from './pricing-display';
import TextHero from '@/components/text-hero';
import { Fragment } from 'react';
import type { Metadata } from 'next';

const title = "Pricing";
const description =
  "Pricing page for WebPress to display pricing information for the services offered by WebPress.";
const url = "https://webpress.au/pricing";
const siteName = "WebPress | Pricing";

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

// Prices are fresh for one hour max
export const revalidate = 3600;

export default async function PricingPage() {
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ]);

  return (
    <Fragment>
      <TextHero
        title="Pricing"
        words="We offer a range of pricing options to suit your business needs."
        backgroundImage="/content/pricing.jpg"
      />
      <PricingDisplay stripePrices={prices} stripeProducts={products} />
    </Fragment>
  );
}
