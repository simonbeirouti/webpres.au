import type { Route } from "./+types/home";
import { createMeta } from "~/lib/meta";
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
    <Hero />
  );
}