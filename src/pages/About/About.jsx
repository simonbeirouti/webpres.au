import React, { useEffect } from "react";
import "./About.css";

import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";

import ReactLenis from "lenis/react";

import Transition from "../../components/Transition/Transition";
import { setMetadata, pageMetadata } from "../../utils/metadata";

const values = [
  {
    title: "Innovation",
    copy: "We stay at the forefront of technologies to bring you solutions that last.",
  },
  {
    title: "Accessibility",
    copy: "We believe powerful digital tools should be available and understandable to all.",
  },
  {
    title: "Partnership",
    copy: "We work with you, not just for you. Your success is our success.",
  },
  {
    title: "Forward-thinking",
    copy: "We build with the future in mind, ensuring your digital presence evolves with technology.",
  },
];

const About = () => {
  useEffect(() => {
    setMetadata(pageMetadata.about);
  }, []);
  
  return (
    <ReactLenis root>
      <div className="page about">
        <section className="about-header">
          <h1>Est</h1>
          <h1>2023</h1>
        </section>

        <section className="about-hero">
          <div className="about-hero-img">
            <img src="/about/about-hero.jpg" alt="" />
          </div>
        </section>

        <section className="about-me-copy">
          <div className="about-me-copy-wrapper">
            <AnimatedCopy animateOnScroll={true} tag="h3">
              Founded by Simon Beirouti, our focus has been to democratise digital experiences so every business can thrive in tomorrow's world.
            </AnimatedCopy>
          </div>
        </section>

        <section className="services">
          <div className="services-col">
            <div className="services-banner">
              <img src="/about/services-banner.jpg" alt="" />
            </div>
          </div>
          <div className="services-col">
            <h4>
              Our values, our ethos, our reason to breath.
            </h4>

            <div className="services-list">
              {values.map((value, index) => (
                <div className="service-list-row" key={index}>
                  <div className="service-list-col">
                    <h5>{value.title}</h5>
                  </div>
                  <div className="service-list-col">
                    <p>{value.copy}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* <section className="about-banner-img">
          <div className="about-banner-img-wrapper">
            <img src="/about/about-banner.jpg" alt="" />
          </div>
        </section> */}

        {/* <section className="fav-tools">
          <div className="fav-tools-header">
            <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
              Daily Stack
            </AnimatedCopy>
            <AnimatedCopy tag="h2" animateOnScroll={true} delay={0.25}>
              Favourite Tools
            </AnimatedCopy>
            <AnimatedCopy
              tag="p"
              animateOnScroll={true}
              className="secondary"
              delay={0.5}
            >
              My favorite stack includes Framer, Figma, and other cutting-edge
              technologies to ensure seamless and dynamic designs.
            </AnimatedCopy>
          </div>

          <div className="fav-tools-list">
            <div className="fav-tools-list-row">
              <div className="fav-tool">
                <div className="fav-tool-img">
                  <img src="/about/tool-1.jpg" alt="" />
                </div>
                <h4>DaVinci Resolve</h4>
                <p className="primary sm">Color Grading</p>
              </div>
              <div className="fav-tool">
                <div className="fav-tool-img">
                  <img src="/about/tool-2.jpg" alt="" />
                </div>
                <h4>Adobe Premiere Pro</h4>
                <p className="primary sm">Video Editing</p>
              </div>
              <div className="fav-tool">
                <div className="fav-tool-img">
                  <img src="/about/tool-3.jpg" alt="" />
                </div>
                <h4>Blackmagic Pocket</h4>
                <p className="primary sm">Cinematic Shooting</p>
              </div>
            </div>
            <div className="fav-tools-list-row">
              <div className="fav-tool">
                <div className="fav-tool-img">
                  <img src="/about/tool-4.jpg" alt="" />
                </div>
                <h4>ShotDeck</h4>
                <p className="primary sm">Visual References</p>
              </div>
              <div className="fav-tool">
                <div className="fav-tool-img">
                  <img src="/about/tool-5.jpg" alt="" />
                </div>
                <h4>Frame.io</h4>
                <p className="primary sm">Remote Collaboration</p>
              </div>
              <div className="fav-tool">
                <div className="fav-tool-img">
                  <img src="/about/tool-6.jpg" alt="" />
                </div>
                <h4>Celtx</h4>
                <p className="primary sm">Scriptwriting Tool</p>
              </div>
            </div>
          </div>
        </section> */}

        <ContactForm />

        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Transition(About);
