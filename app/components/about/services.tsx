import { Link } from "react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "../ui/accordion";

export default function ServicesSection() {
    const services = [
        {
            id: "website-dev",
            title: "Modern Website Development",
            description: "Custom, responsive websites built with the latest technologies.",
        },
        {
            id: "web3",
            title: "Web3 Services",
            description: "Step into the future with decentralized applications and blockchain.",
        },
        {
            id: "ai-dev",
            title: "AI Development",
            description: "Harness the power of artificial intelligence for your business.",
        },
        {
            id: "design",
            title: "Design & Branding",
            description: "Create a cohesive visual identity that resonates with your audience.",
        }
    ];

    return (
        <section className="bg-white p-8 pt-36 md:pt-48">
            <div className="w-full sm:w-2/3 mx-auto h-full flex flex-col justify-center">
                <h1 className="text-4xl md:text-6xl font-light mb-8 text-center">Here&apos;s what we do</h1>
                <div className="space-y-4">
                    <Accordion type="single" collapsible>
                        {services.map((service) => (
                            <div key={service.id} className="border-b border-gray-200">
                                <AccordionItem value={service.id}>
                                    <AccordionTrigger className="text-xl font-light tracking-wide py-5">
                                        {service.title}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="py-4">
                                            <p className="text-gray-700 mb-2 text-lg">
                                                {service.description}
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </div>
                        ))}
                    </Accordion>
                </div>

                <div className="text-center mt-8">
                    <Link
                        to="/services"
                        className="inline-block bg-black text-white px-10 py-4 text-xl font-light hover:bg-gray-800 transition-colors"
                    >
                        View All Services
                    </Link>
                </div>
            </div>
        </section>
    )
}