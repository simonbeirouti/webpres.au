import type { Route } from "./+types/contact";
import { createMeta } from "~/lib/meta";
import ContactForm from "~/components/shared/contact-form";

export function meta({ }: Route.MetaArgs) {
  return createMeta({
    title: "Contact",
    description: "Contact page",
    url: "/contact",
  });
}

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <ContactForm />
    </div>
  )
}
