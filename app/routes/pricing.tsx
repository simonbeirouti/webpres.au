import type { Route } from "./+types/pricing";
import { createMeta } from "~/lib/meta";
import { Fragment } from "react";
import TextHero from "~/components/shared/text-hero";
import PricingDisplay from "~/components/pricing/pricing-display";

export function meta({ }: Route.MetaArgs) {
    return createMeta({
        title: "Pricing",
        description: "Get more information about our pricing and services, and how we can help your business grow.",
        url: "/pricing",
    });
}

export default function Pricing() {
    return (
        <Fragment>
            <TextHero
                title="Pricing"
                words="We offer a range of pricing options to suit your business needs."
                backgroundImage="/content/pricing.jpg"
            />
            <PricingDisplay />
        </Fragment>
    );
}