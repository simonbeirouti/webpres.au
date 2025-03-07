import type { Route } from "./+types/about";
import { createMeta } from "~/lib/meta";

export function meta({}: Route.MetaArgs) {
  return createMeta({
    title: "About",
    description: "About page",
    url: "/about",
  });
}

export default function About() {
  return <h1>About</h1>;
}
