import type { Route } from "./+types/services";
import { createMeta } from "~/lib/meta";
import TextHero from "~/components/shared/text-hero";

export function meta({ }: Route.MetaArgs) {
  return createMeta({
    title: "Services",
    description: "Services page",
    url: "/services",
  });
}

export default function Services() {
  return (
    <TextHero
      title="Our Services"
      words="We implement future-proof technologies that deliver growing value long after deployment."
      backgroundImage="/content/services.jpg"
    />
  );
}