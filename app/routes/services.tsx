import type { Route } from "./+types/services";
import { createMeta } from "~/lib/meta";

export function meta({}: Route.MetaArgs) {
  return createMeta({
    title: "Services",
    description: "Services page",
    url: "/services",
  });
}

export default function Services() {
  return <h1>Services</h1>;
}
