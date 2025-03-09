import type { Route } from "./+types/about";
import { createMeta } from "~/lib/meta";
import { Fragment } from "react";
import TextHero from "~/components/shared/text-hero";
import FeaturedWork from "~/components/about/featured-work";
import BentoGridArea from "~/components/shared/bento-grid";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return createMeta({
    title: "About",
    description: "Learn about WebPres - Empowering businesses to thrive in the evolving digital landscape",
    url: "/about",
  });
}

export default function About() {
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
          <Link className="w-full md:w-auto text-center" to="/services">
            <Button variant="outline" className="w-2/3 md:w-auto cursor-pointer">Learn More</Button>
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-24">
        <h2 className="text-3xl font-light mb-12 text-center">Our Work</h2>
        <FeaturedWork />
      </section>
    </Fragment>
  );
}