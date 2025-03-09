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
      <div className="flex flex-col items-center justify-start">
        <ContactForm />
      </div>
    </Fragment>
  )
}