import type { Route } from "./+types/services";
import { createMeta } from "~/lib/meta";
import { Fragment } from "react";
import TextHero from "~/components/shared/text-hero";
import BentoGridArea from "~/components/shared/bento-grid";

export function meta({ }: Route.MetaArgs) {
  return createMeta({
    title: "Services",
    description: "Services page",
    url: "/services",
  });
}

const servicesData = [
  {
    "name": "Modern Website Development",
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
    "process": {
      "title": "Our Development Process",
      "steps": [
        "Discovery & Planning",
        "Design & Prototype",
        "Development",
        "Testing & Refinement",
        "Launch & Support"
      ],
      "description": "We follow a collaborative approach, keeping you involved at every stage to ensure the final product exceeds your expectations."
    },
    "technologies": {
      "title": "Technologies We Use",
      "list": [
        "HTML5/CSS3",
        "JavaScript (React, Vue, Angular)",
        "Node.js",
        "PHP",
        "WordPress",
        "Shopify",
        "WooCommerce",
        "Custom solutions"
      ]
    }
  },
  {
    "name": "Web3 Services",
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
    "benefits": {
      "title": "Benefits of Web3 Technology",
      "list": [
        "Enhanced security and privacy",
        "Reduced need for intermediaries",
        "Increased transparency",
        "User ownership of data",
        "New revenue streams and business models"
      ],
      "description": "Web3 isn't just a technological shift—it's redefining how we think about ownership, value, and trust in the digital world."
    }
  },
  {
    "name": "AI Development",
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
    "applications": {
      "title": "Industry Applications",
      "industries": [
        {
          "name": "E-commerce",
          "applications": "Personalized recommendations, inventory management, price optimization"
        },
        {
          "name": "Healthcare",
          "applications": "Patient data analysis, appointment scheduling, diagnostic assistance"
        },
        {
          "name": "Finance",
          "applications": "Fraud detection, risk assessment, automated customer service"
        },
        {
          "name": "Marketing",
          "applications": "Content personalization, campaign optimization, customer segmentation"
        }
      ]
    },
    "process": {
      "title": "AI Implementation Process",
      "steps": [
        "Needs Assessment",
        "Data Evaluation",
        "Solution Design",
        "Training & Integration",
        "Monitoring & Optimization"
      ],
      "description": "We take a methodical approach to AI implementation, ensuring solutions that are not only powerful but also practical and aligned with your business goals."
    }
  },
  {
    "name": "Design",
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
    "philosophy": {
      "title": "Our Design Philosophy",
      "content": "We believe effective design balances aesthetics with functionality, emotion with clarity. Every visual choice should serve both your brand identity and your users' needs. We design not just for today's trends but for lasting impact and adaptability."
    }
  }];

export default function Services() {
  return (
    <Fragment>
      <TextHero
        title="Our Services"
        words="We implement future-proof technologies that deliver growing value long after deployment."
        backgroundImage="/content/services.jpg"
      />
      <BentoGridArea />
      {/* <div className="container mx-auto py-16 px-4">
        <div className="grid gap-24">
          {servicesData.map((service, index) => (
            <div key={service.name} className="grid gap-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">{service.title}</h2>
                <p className="text-xl text-muted-foreground">{service.tagline}</p>
                <div className="max-w-3xl">
                  <p className="text-muted-foreground">{service.content}</p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">What We Offer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {service.offerings.map((offering) => (
                    <div 
                      key={offering.title} 
                      className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-medium mb-2">{offering.title}</h4>
                      <p className="text-sm text-muted-foreground">{offering.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {service.process && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">{service.process.title}</h3>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {service.process.steps.map((step, stepIndex) => (
                      <div 
                        key={step} 
                        className="flex items-center gap-2"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                          {stepIndex + 1}
                        </div>
                        <span>{step}</span>
                        {stepIndex < service.process.steps.length - 1 && (
                          <span className="text-muted-foreground">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-muted-foreground">{service.process.description}</p>
                </div>
              )}
              
              {service.technologies && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">{service.technologies.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.list.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {service.benefits && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">{service.benefits.title}</h3>
                  <ul className="grid gap-2 ml-6 list-disc">
                    {service.benefits.list.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-muted-foreground">{service.benefits.description}</p>
                </div>
              )}
              
              {service.applications && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">{service.applications.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.applications.industries.map((industry) => (
                      <div 
                        key={industry.name} 
                        className="bg-card p-6 rounded-lg border"
                      >
                        <h4 className="font-medium mb-2">{industry.name}</h4>
                        <p className="text-sm text-muted-foreground">{industry.applications}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {service.philosophy && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">{service.philosophy.title}</h3>
                  <p className="text-muted-foreground">{service.philosophy.content}</p>
                </div>
              )}
              
              {index < servicesData.length - 1 && (
                <div className="w-full h-px bg-border mt-8"></div>
              )}
            </div>
          ))}
        </div>
      </div> */}
    </Fragment>
  );
}