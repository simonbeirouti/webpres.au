import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactLenis from "lenis/react";
import "./NotFound.css";

import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";
import Transition from "../../components/Transition/Transition";
import { setMetadata, pageMetadata } from "../../utils/metadata";
import Footer from "../../components/Footer/Footer";

const NotFound = () => {
  useEffect(() => {
    setMetadata(pageMetadata.notFound);
  }, []);

  return (
    <ReactLenis root>
      <div className="not-found">
        <section className="not-found-header">
          <AnimatedCopy
            delay={1}
            animateOnScroll={false}
            className="primary sm"
          >
            404 Error
          </AnimatedCopy>
          <AnimatedCopy tag="h2" delay={1}>
            Page Not Found
          </AnimatedCopy>
        </section>

        <section className="not-found-details">
          <div className="details">
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              <Link to="/" className="home-link">Return to Home Page</Link>
            </AnimatedCopy>
          </div>
        </section>
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Transition(NotFound);
