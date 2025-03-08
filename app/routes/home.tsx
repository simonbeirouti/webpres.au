import type { Route } from "./+types/home";
import { createMeta } from "~/lib/meta";
import ServicesSection from "~/components/home/services";
import FeaturedWork from "~/components/home/featured-work";
import Hero from "~/components/home/hero";

export function meta({ }: Route.MetaArgs) {
  return createMeta({
    title: "Home",
    description: "Transform your digital presence with WebPres",
    url: "/",
  });
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ServicesSection />
      <FeaturedWork />
    </div>
  );
}