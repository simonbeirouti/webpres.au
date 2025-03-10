import type { Route } from "./+types/contact";
import { createMeta } from "~/lib/meta";
import { Fragment } from "react"
import TextHero from "~/components/shared/text-hero";
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
    <Fragment>
      <TextHero
        title="Contact Us"
        words="Let's build something amazing together."
        backgroundImage="/content/contact.jpg"
      />
      <section className="max-w-7xl mx-auto p-4">
        <ContactForm />
      </section>
    </Fragment>
  )
}