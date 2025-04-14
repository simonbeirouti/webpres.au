import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import TextHero from "@/components/text-hero";
import BentoGridArea from "./bento-grid";
// import FeaturedWork from "./featured-work";
import Link from "next/link";
import type { Metadata } from 'next';

const title = "About";
const description =
  "About page for WebPress to display information about the company.";
const url = "https://webpress.au/about";
const siteName = "WebPress | About";

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

export default function AboutPage() {
    const values = [
        {
            title: "Innovation",
            description: "We stay at the forefront of technologies to bring you solutions that last."
        },
        {
            title: "Accessibility",
            description: "We believe powerful digital tools should be available and understandable to all."
        },
        {
            title: "Partnership",
            description: "We work with you, not just for you. Your success is our success."
        },
        {
            title: "Forward-thinking",
            description: "We build with the future in mind, ensuring your digital presence evolves with technology."
        }
    ];

    return (
        <Fragment>
            <TextHero
                title="Our Mission"
                words="Democratizing digital excellence so every business can thrive in tomorrow's world."
                backgroundImage="/content/moon.jpg"
            />

            <section className="max-w-7xl mx-auto px-4 py-24">
                <h2 className="text-3xl font-light mb-12 text-center">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {values.map((value) => (
                        <Card key={value.title}>
                            <CardHeader>
                                <CardTitle className="font-light">{value.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{value.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 pb-24">
                <h2 className="text-3xl font-light mb-12 text-center">Our Services</h2>
                <BentoGridArea />
                <div className="flex justify-center mt-12">
                    <Link className="w-full md:w-auto text-center" href="/services">
                        <Button variant="outline" className="w-2/3 md:w-auto cursor-pointer">Learn More</Button>
                    </Link>
                </div>
            </section>

            {/* <section className="max-w-7xl mx-auto px-4 pb-24">
                <h2 className="text-3xl font-light mb-12 text-center">Our Work</h2>
                <FeaturedWork />
            </section> */}
        </Fragment>
    );
}