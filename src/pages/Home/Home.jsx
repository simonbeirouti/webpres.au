import services from "../../data/services";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

import Transition from "../../components/Transition/Transition";
import { setMetadata, pageMetadata } from "../../utils/metadata";

const Home = () => {
  useEffect(() => {
    setMetadata(pageMetadata.home);
  }, []);

  const stickyTitlesRef = useRef(null);
  const titlesRef = useRef([]);

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    const stickySection = stickyTitlesRef.current;
    const titles = titlesRef.current.filter(Boolean);

    if (!stickySection || titles.length !== 3) {
      window.removeEventListener("resize", handleResize);
      return;
    }

    gsap.set(titles[0], { opacity: 1, scale: 1 });
    gsap.set(titles[1], { opacity: 0, scale: 0.75 });
    gsap.set(titles[2], { opacity: 0, scale: 0.75 });

    const pinTrigger = ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${window.innerHeight * 5}`,
      pin: true,
      pinSpacing: true,
    });

    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: stickySection,
        start: "top top",
        end: `+=${window.innerHeight * 4}`,
        scrub: 0.5,
      },
    });

    masterTimeline
      .to(
        titles[0],
        {
          opacity: 0,
          scale: 0.75,
          duration: 0.3,
          ease: "power2.out",
        },
        1
      )

      .to(
        titles[1],
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.in",
        },
        1.25
      );

    masterTimeline
      .to(
        titles[1],
        {
          opacity: 0,
          scale: 0.75,
          duration: 0.3,
          ease: "power2.out",
        },
        2.5
      )

      .to(
        titles[2],
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.in",
        },
        2.75
      );

    return () => {
      pinTrigger.kill();
      masterTimeline.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ReactLenis root>
      <div className="page home">
        <section className="hero">
          <div className="hero-img">
            <img src="/home/hero.jpg" alt="" />
          </div>

          <div className="hero-header">
            <AnimatedCopy tag="h1" animateOnScroll={false} delay={0.7}>
              WebPres
            </AnimatedCopy>
          </div>
        </section>

        <section ref={stickyTitlesRef} className="sticky-titles">
          <div className="sticky-titles-nav">
            <p className="primary sm">About WebPres</p>
          </div>
          <div className="sticky-titles-footer">
            <p className="primary sm">Storytelling Through Technology</p>
          </div>
          <h2 ref={(el) => (titlesRef.current[0] = el)}>
            We craft websites and technology to achieve your goals
          </h2>
          <h2 ref={(el) => (titlesRef.current[1] = el)}>
            Projects are driven with data, performance and user experience
          </h2>
          <h2 ref={(el) => (titlesRef.current[2] = el)}>
            Our work is a reflection of our commitment to delivering exceptional results
          </h2>
        </section>

        <section className="hobbies">
          {services.map((service) => (
            <Link to={`/services/${service.link}`} key={service.id} className="hobby">
              <AnimatedCopy tag="h4" animateOnScroll={true}>
                {service.title}
              </AnimatedCopy>
            </Link>
          ))}
        </section>

        <ContactForm />
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Transition(Home);
