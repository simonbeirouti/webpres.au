import type { Route } from "./+types/about";
import { createMeta } from "~/lib/meta";
import { Fragment } from "react";
import TextHero from "~/components/shared/text-hero";
import FeaturedWork from "~/components/about/featured-work";
import BentoGridArea from "~/components/shared/bento-grid";

export function meta({ }: Route.MetaArgs) {
  return createMeta({
    title: "About",
    description: "Learn about WebPres - Empowering businesses to thrive in the evolving digital landscape",
    url: "/about",
  });
}

export default function About() {
  return (
    <Fragment>
      <TextHero
        title="Our Story"
        words="Democratizing digital excellence so every business can thrive in tomorrow's world."
        backgroundImage="/content/moon.jpg"
      />
      <BentoGridArea />
      <FeaturedWork />
    </Fragment>
  );
}