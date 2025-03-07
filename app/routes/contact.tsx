import type { Route } from "./+types/contact";
import { createMeta } from "~/lib/meta";

export function meta({}: Route.MetaArgs) {
  return createMeta({
    title: "Contact",
    description: "Contact page",
    url: "/contact",
  });
}

export default function Contact() {
  return <h1>Contact</h1>;
}
