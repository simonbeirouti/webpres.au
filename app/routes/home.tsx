import type { Route } from "./+types/home";
import { createMeta } from "~/lib/meta";
import { Link } from "react-router";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "~/components/ui/accordion";

export function meta({ }: Route.MetaArgs) {
  return createMeta({
    title: "Home",
    description: "Transform your digital presence with WebPres",
    url: "/",
  });
}

export default function Home() {
  const [filledIndices, setFilledIndices] = useState<number[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentColors, setCurrentColors] = useState<string[]>([]);
  const sectionsRef = useRef<HTMLDivElement>(null);

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB',
    '#E74C3C', '#2ECC71', '#F1C40F', '#1ABC9C'
  ];

  useEffect(() => {
    const numFilled = Math.floor(Math.random() * 2) + 1;
    const indices = new Set<number>();
    while (indices.size < numFilled) {
      indices.add(Math.floor(Math.random() * 8));
    }
    setFilledIndices(Array.from(indices));

    setCurrentColors(Array(8).fill('').map(() =>
      colors[Math.floor(Math.random() * colors.length)]
    ));

    const intervalId = setInterval(() => {
      setCurrentColors(prevColors =>
        prevColors.map(() => colors[Math.floor(Math.random() * colors.length)])
      );

      const newNumFilled = Math.floor(Math.random() * 2) + 1;
      const newIndices = new Set<number>();
      while (newIndices.size < newNumFilled) {
        newIndices.add(Math.floor(Math.random() * 8));
      }
      setFilledIndices(Array.from(newIndices));
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const scrollToNextSection = () => {
    if (sectionsRef.current) {
      const nextSection = currentSection + 1;
      sectionsRef.current.scrollTo({
        top: nextSection * window.innerHeight,
        behavior: 'smooth'
      });
      setCurrentSection(nextSection);
    }
  };

  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (sectionsRef.current) {
        const section = Math.round(sectionsRef.current.scrollTop / window.innerHeight);
        setCurrentSection(section);
      }
    };

    const sectionsElement = sectionsRef.current;
    if (sectionsElement) {
      sectionsElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (sectionsElement) {
        sectionsElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden">
      <div ref={sectionsRef} className="h-screen overflow-y-auto snap-y snap-mandatory">
        <div className="relative h-screen snap-start pt-[64px]">
          <div className="absolute inset-0 overflow-hidden select-none" style={{ userSelect: 'none' }}>
            <div className="h-full flex flex-col justify-between">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`text-[120px] md:text-[180px] font-bold leading-[0.85]`}
                  style={{
                    WebkitTextStroke: filledIndices.includes(i) ? 'none' : '0.5px black',
                    color: filledIndices.includes(i) ? currentColors[i] : 'white',
                    opacity: 0.5,
                    whiteSpace: 'nowrap',
                    transition: 'color 0.5s ease'
                  }}
                >
                  WebPres WebPres WebPres WebPres WebPres
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-20 left-0 right-0 z-10 px-8">
            <Card
              onClick={scrollToNextSection}
              className="mx-auto max-w-xl cursor-pointer bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 hover:shadow-xl transition-all"
            >
              <CardContent className="p-8 text-center">
                <div className="text-2xl md:text-3xl mb-8">
                  See how WebPres,
                  <br />
                  can grow your brand.
                </div>

                <div
                  className="animate-bounce flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mx-auto"
                  aria-label="Scroll to next section"
                >
                  ↓
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <ExpertiseSection />

        <ServicesSection />

        <ContactSection />
      </div>
    </div>
  );
}

function ExpertiseSection() {
  return (
    <section className="h-screen bg-white snap-start flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-8">Your vision, Our expertise</h2>
        <p className="text-xl md:text-2xl text-gray-700">
          We transform ideas into digital realities. We believe in creating technology solutions
          that not only look great but deliver measurable results for your business or personal brand.
        </p>
      </div>
    </section>
  )
}

function ServicesSection() {
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
    <section className="h-screen bg-white snap-start p-8">
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

function ContactSection() {
  return (
    <section className="h-screen bg-black text-white snap-start flex items-center justify-center p-8">
      <div className="text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to transform your web presence?</h2>
        <p className="text-xl md:text-2xl mb-12">Let's discuss how WebPres can help you achieve your digital goals.</p>
        <Link
          to="/contact"
          className="inline-block bg-white text-black px-8 py-4 text-xl font-bold hover:bg-purple-100 transition-colors"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  )
}