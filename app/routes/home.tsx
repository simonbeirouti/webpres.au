import type { Route } from "./+types/home";
import { createMeta } from "~/lib/meta";
import { Link } from "react-router";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { useSection } from "~/hooks/useSection";

export function meta({ }: Route.MetaArgs) {
  return createMeta({
    title: "Home",
    description: "Transform your digital presence with WebPres",
    url: "/",
  });
}

export default function Home() {
  const [filledIndices, setFilledIndices] = useState<number[]>([]);
  const [currentColors, setCurrentColors] = useState<string[]>([]);
  const { sectionsRef, scrollToNextSection } = useSection();

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

        <FeaturedWork />

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

function FeaturedWork() {
  const works = [
    {
      name: "Oh Banh Mi",
      website: "ohbanhmi.cafe",
      image: "/works/ohbanhmi.png",
      workCompleted: ["Custom site", "Square integration", "Animations", "Online ordering"],
    },
    {
      name: "CWscales",
      website: "cwscales.com.au",
      image: "/works/cwscales.jpg",
      workCompleted: ["Custom site", "WordPress replacement", "Database", "Content management system", "SEO optimisation"],
    },
    {
      name: "Mortgage Fishing",
      website: "mortgage.fishing",
      image: "/works/mortgage-fishing.jpg",
      workCompleted: ["Headless frontend", "WordPress backend", "AI generated content"],
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const startTimer = () => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start new interval
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % works.length);
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % works.length);
    startTimer();
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + works.length) % works.length);
    startTimer();
  };

  const goToProject = (index: number) => {
    setCurrentIndex(index);
    startTimer();
  };

  return (
    <section className="h-screen bg-black text-white snap-start flex flex-col items-center overflow-hidden justify-center p-8">
      <h2 className="text-3xl md:text-5xl font-light mb-8">Featured Work</h2>
      <div className="w-full sm:w-2/3 mx-auto relative">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {works.map((work, index) => (
              <div
                key={work.name}
                className="w-full flex-shrink-0 px-4 text-center"
              >
                <div className="w-full overflow-hidden rounded-md mb-4">
                  <img
                    src={work.image}
                    alt={`${work.name} website`}
                    className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium mb-1">{work.name}</h3>
                <a href={`https://${work.website}`} className="text-gray-400 mb-3">{work.website}</a>
                <div className="flex flex-wrap gap-2 justify-center w-full mt-4">
                  {work.workCompleted.map((item) => (
                    <span
                      className="px-2 py-1 bg-white/10 rounded text-sm"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={prevProject}
          className="absolute left-0 bottom-1/4 -translate-y-1/2 bg-white hover:bg-white/70 text-black p-5 rounded-full transition-colors"
          aria-label="Previous project"
        >
          ←
        </Button>
        <Button
          onClick={nextProject}
          className="absolute right-0 bottom-1/4 -translate-y-1/2 bg-white hover:bg-white/70 text-black p-5 rounded-full transition-colors"
          aria-label="Next project"
        >
          →
        </Button>

        <div className="flex justify-center gap-2 mt-4">
          {works.map((_, index) => (
            <button
              key={index}
              onClick={() => goToProject(index)}
              className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/30'}`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
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