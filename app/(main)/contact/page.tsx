import TextHero from "@/components/text-hero";
import { Fragment } from "react";
import ContactForm from "./contact-form";
import type { Metadata } from 'next';

const title = "Contact";
const description =
  "Contact page for WebPress to display a contact form to get in touch with WebPress.";
const url = "https://webpress.au/contact";
const siteName = "WebPress | Contact";

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

export default function Contact() {
  return (
    <Fragment>
      <TextHero
        title="Contact Us"
        words="Let's build something amazing together."
        backgroundImage="/content/contact.jpg"
      />
      <section className="max-w-7xl mx-auto p-4">
        <ContactForm />
      </section>
    </Fragment>
  )
}