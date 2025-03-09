import type { Route } from "./+types/services";
import { createMeta } from "~/lib/meta";
import { useEffect, useRef, useState, Fragment } from "react";
import TextHero from "~/components/shared/text-hero";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";

export function meta({ }: Route.MetaArgs) {
  return createMeta({
    title: "Services",
    description: "Services page",
    url: "/services",
  });
}

const servicesData = [
  {
    "name": "AI",
    "id": "ai-services",
    "title": "AI Development and Services",
    "tagline": "Harness the power of artificial intelligence to elevate your digital presence",
    "content": "AI is revolutionizing how businesses operate and interact with customers. We make this powerful technology accessible and practical, implementing solutions that solve real problems and create meaningful advantages for your business.",
    "offerings": [
      {
        "title": "Custom AI Solution Development",
        "description": "Tailored AI systems designed to address your specific business challenges and opportunities."
      },
      {
        "title": "Chatbot Implementation",
        "description": "Intelligent conversational interfaces that enhance customer service and streamline operations."
      },
      {
        "title": "Predictive Analytics Integration",
        "description": "Data-driven insights that help you anticipate trends and make informed decisions."
      },
      {
        "title": "Content Generation Tools",
        "description": "AI-powered systems that create engaging, relevant content for your audience."
      },
      {
        "title": "AI-Powered Customer Insights",
        "description": "Deep understanding of customer behavior and preferences through advanced data analysis."
      }
    ],
  },
  {
    "name": "Website",
    "id": "website-development",
    "title": "Modern Website Development",
    "tagline": "Creating responsive, user-focused websites that deliver exceptional experiences",
    "content": "Your website is often the first impression potential customers have of your business. We craft beautiful, functional websites that not only look impressive but also convert visitors into customers. Whether you need a simple informational site or a complex e-commerce platform, we have the expertise to bring your vision to life.",
    "offerings": [
      {
        "title": "Custom Website Design & Development",
        "description": "Tailored solutions that reflect your brand's unique identity and goals."
      },
      {
        "title": "E-commerce Solutions",
        "description": "Secure, intuitive online stores that provide seamless shopping experiences."
      },
      {
        "title": "Content Management Systems",
        "description": "User-friendly platforms that make updating your site simple and efficient."
      },
      {
        "title": "Performance Optimization",
        "description": "Speed enhancements that improve user experience and search engine rankings."
      },
      {
        "title": "Responsive Design",
        "description": "Websites that look and function beautifully across all devices and screen sizes."
      }
    ],
  },
  {
    "name": "Blockchain",
    "id": "web3-services",
    "title": "Web3 Services",
    "tagline": "Step into the future of the internet with our Web3 solutions",
    "content": "The decentralized web represents the next evolution of the internet. Whether you're curious about how blockchain can benefit your business or ready to launch a full-scale Web3 project, we're here to guide you through this transformative technology landscape.",
    "offerings": [
      {
        "title": "Decentralized Application (dApp) Development",
        "description": "Custom applications built on blockchain technology that offer transparency, security, and user control."
      },
      {
        "title": "Smart Contract Creation & Auditing",
        "description": "Self-executing contracts with secure, verifiable terms coded directly into the blockchain."
      },
      {
        "title": "Blockchain Integration",
        "description": "Connect your existing systems with blockchain technology for enhanced security and transparency."
      },
      {
        "title": "NFT Marketplace Development",
        "description": "Platforms for creating, buying, selling, and trading digital assets and collectibles."
      },
      {
        "title": "Cryptocurrency Payment Integration",
        "description": "Accept digital currencies as payment with secure, efficient transaction processing."
      }
    ],
  },
  {
    "name": "Design",
    "id": "design-services",
    "title": "Design and Branding Services",
    "tagline": "Creating cohesive brand experiences that resonate across all digital touchpoints",
    "content": "Your brand is more than just a logo—it's the complete experience you offer. We help you develop and express a consistent, compelling identity that connects with your audience and distinguishes you from competitors.",
    "offerings": [
      {
        "title": "Brand Identity Development",
        "description": "Comprehensive brand strategies that define your unique market position and voice."
      },
      {
        "title": "UI/UX Design",
        "description": "Intuitive, engaging user interfaces that create meaningful experiences."
      },
      {
        "title": "Logo and Visual Asset Creation",
        "description": "Distinctive visual elements that capture your brand essence and create recognition."
      },
      {
        "title": "Brand Style Guides",
        "description": "Detailed documentation ensuring consistency across all brand applications."
      },
      {
        "title": "Digital Marketing Materials",
        "description": "Cohesive designs for social media, email campaigns, and other digital channels."
      }
    ],
  }];

export default function Services() {
  return (
    <Fragment>
      <TextHero
        title="Our Services"
        words="We implement future-proof technologies that deliver growing value long after deployment."
        backgroundImage="/content/services.jpg"
      />
      <ServicesDescription />
    </Fragment>
  );
}

export function ServicesDescription() {
  const data = servicesData.map(service => ({
    title: service.title,
    id: service.id,
    content: (
      <div>
        <p className="text-muted-foreground text-sm md:text-md font-normal mb-4">
          {service.tagline}
        </p>
        <p className="text-muted-foreground text-sm md:text-md font-normal mb-6">
          {service.content}
        </p>
        <div className="mt-8">
          <h3 className="text-xl font-normal mb-4">What We Offer</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {service.offerings.map((offering) => (
              <Card key={offering.title}>
                <CardHeader>
                  <CardTitle className="font-light">{offering.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{offering.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <div className="w-full mx-auto max-w-7xl">
      <Timeline data={data} />
    </div>
  );
}

interface TimelineEntry {
  title: string;
  id: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            id={item.id}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-normal text-black/80">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-black/80">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};