import React from "react";
import "./Footer.css";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-overlay"></div>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="footer-logo-wrapper">
              <div className="footer-icon">
                <Image
                  width={1000}
                  height={1000}
                  src="/icon.png"
                  alt="Bit Battles Icon"
                />
              </div>
              <div className="footer-title-container">
                <div className="footer-title">BIT</div>
                <div className="footer-title">BATTLES</div>
              </div>
            </div>
            <p className="footer-tagline">
              Intra BRAC University Programming Contest
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-links-column">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#schedule">Schedule</a>
                </li>
                <li>
                  <a href="#prizes">Prizes</a>
                </li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3>More Info</h3>
              <ul>
                <li>
                  <a href="#registration">Registration</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
                <li>
                  <a href="#sponsors">Sponsors</a>
                </li>
                <li>
                  <a
                    href="https://bucc.club"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    BUCC Website
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3>Contact Us</h3>
              <ul className="contact-info">
                <li>
                  <i className="fas fa-envelope"></i>{" "}
                  <a href="mailto:bucc@g.bracu.ac.bd">bucc@g.bracu.ac.bd</a>
                </li>
                <li>
                  <i className="fas fa-map-marker-alt"></i> BRAC University,
                  Merul Badda, Dhaka-1212
                </li>
              </ul>

              <div className="social-links">
                <a
                  href="https://www.facebook.com/BRACUCC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/bracucc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href="https://www.instagram.com/bracucc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://www.youtube.com/@bracucc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            &copy; {new Date().getFullYear()} Bit Battles. All rights reserved.
          </div>
          <div className="credits">
            Designed & Developed by BUCC Technical Team
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
