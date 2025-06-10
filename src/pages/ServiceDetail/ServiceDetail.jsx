import React, { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import services from "../../data/services";
import "./ServiceDetail.css";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";

import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";
import { PricingCard } from "../../components/Pricing/PricingCard";
import ParallaxImage from "../../components/ParallaxImage/ParallaxImage";

import ReactLenis from "lenis/react";

import Transition from "../../components/Transition/Transition";
import { setMetadata, generateServiceMetadata } from "../../utils/metadata";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const currentService = services.find(s => s.link === serviceId);
    setService(currentService);
    
    // Set dynamic metadata based on the current service
    if (currentService) {
      setMetadata(generateServiceMetadata(currentService));
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [serviceId]);

  if (!loading && !service) {
    return <Navigate to="/not-found" replace />;
  }

  if (loading) {
    return <div className="loading" />;
  }

  const getNextService = () => {
    const currentIndex = services.findIndex(s => s.link === serviceId);

    if (currentIndex === -1) return services[0];

    const nextIndex = (currentIndex + 1) % services.length;
    return services[nextIndex];
  };

  const nextService = getNextService();

  return (
    <ReactLenis root>
      <div className="page service-detail">
        <section className="service-header">
          <AnimatedCopy
            delay={1}
            animateOnScroll={false}
            className="primary sm"
          >
            {service.tagline}
          </AnimatedCopy>
          <AnimatedCopy tag="h2" delay={1}>
            {service.title}
          </AnimatedCopy>
        </section>

        <section className="about-hero">
          <div className="about-hero-img">
            <img src={service.image} alt={service.title} />
          </div>
        </section>

        <section className="service-details">
          <div className="details">
            <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
              Overview
            </AnimatedCopy>
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              {service.content}
            </AnimatedCopy>
          </div>
        </section>

        {service.offerings && (
          <section className="service-details">
            {service.offerings.map((offering, index) => (
              <div className="details" key={index}>
                <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
                  {offering.description}
                </AnimatedCopy>
                <AnimatedCopy tag="h4" animateOnScroll={true}>
                  {offering.title}
                </AnimatedCopy>
              </div>
            ))}
          </section>
        )}

        {service.pricing && (
          <section className="pricing-section">
            <AnimatedCopy tag="h3" animateOnScroll={true} className="pricing-title">
              Pricing Options
            </AnimatedCopy>
            <div className="pricing-cards-container">
              {service.pricing.map((pricing, index) => (
                <PricingCard
                  key={index}
                  title={pricing.type}
                  price={`$${pricing.price}`}
                  description={pricing.description}
                  features={pricing.features || []}
                  isPopular={index === 1}
                  isEnterprise={index === 2}
                  link={pricing.link}
                />
              ))}
            </div>
          </section>
        )}

        <section className="next-project" onClick={() => navigate(`/services/${nextService.link}`)}>
          <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
            {`0${services.findIndex(s => s.link === nextService.link) + 1} - 0${services.length}`}
          </AnimatedCopy>
          <AnimatedCopy tag="h3" animateOnScroll={true}>
            Next
          </AnimatedCopy>

          <div className="next-project-img">
            <div className="next-project-img-wrapper">
              <ParallaxImage src={nextService.image || "/work/work-2.jpg"} alt={nextService.title} />
            </div>
          </div>

          <AnimatedCopy tag="h4" animateOnScroll={true}>
            {nextService.title}
          </AnimatedCopy>
        </section>
      </div>

      <ContactForm />
      <Footer />
    </ReactLenis>
  );
};

export default Transition(ServiceDetail);
