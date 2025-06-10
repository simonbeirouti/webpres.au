import React from "react";
import links from "../../data/links";
import "./Footer.css";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-row">
        <div className="footer-contact">
          <h3>
            Let&apos;s Collaborate <br />
            <a className="primary" href="mailto:admin@webpres.au">admin<span>@</span>webpres.au</a>
          </h3>

          <p className="secondary">
            From new ideas to existing businesses, I&apos;m always open to creative
            collaborations. Feel free to reach out anytime.
          </p>

          <Link to="/contact" className="btn">
            Get in Touch
          </Link>
        </div>

        <div className="footer-nav">
          {links.map((link) => (
            <Link to={link.link} key={link.id} className="footer-nav-item">
              <span>{link.name}</span>
              <span>&#8594;</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="footer-row">
        <div className="footer-header">
          <h1>WebPres</h1>
        </div>

        <div className="footer-copyright-line">
          <p className="primary sm">&copy; WebPres 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
