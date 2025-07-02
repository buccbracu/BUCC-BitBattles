import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./About.css";
import { ChevronDown, Columns, Microchip, Shield } from "lucide-react";

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create animation timeline
    const tl = gsap.timeline();

    // Animate title with fade-in
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 }
    );

    // Animate content with fade-in
    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4"
    );

    // Animate icons with staggered fade-in
    if (iconsRef.current)
      tl.fromTo(
        iconsRef.current.children,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

    // Floating animation for icons
    gsap.to(".floating-icon", {
      y: "-10px",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    });

    return () => {
      // Clean up animations
      tl.kill();
    };
  }, []);

  const scrollToNextSection = () => {
    const scheduleSection = document.getElementById("schedule");
    if (scheduleSection) {
      scheduleSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="section about-section" ref={sectionRef}>
      <div className="dark-overlay"></div>
      <div className="container">
        <h2 className="section-title" ref={titleRef}>
          About the Event
        </h2>

        <div className="about-content" ref={contentRef}>
          <div className="about-text">
            <p>
              BUCC Bit Battles is the premier intra-university programming
              contest at BRAC University, bringing together the brightest coding
              minds to compete, learn, and showcase their problem-solving
              skills.
            </p>
            <p>
              This contest combines the classical traditions of algorithmic
              challenges with modern coding techniques, creating a unique blend
              of old and new - much like our Roman-tech inspired design.
            </p>
          </div>

          <div className="floating-icons" ref={iconsRef}>
            <div className="floating-icon icon-column">
              <div className="icon-inner">
                <Columns className="text-white" />
              </div>
              <span>Structure</span>
            </div>

            <div className="floating-icon icon-shield">
              <div className="icon-inner">
                <Shield className="text-white" />
              </div>
              <span>Challenge</span>
            </div>

            <div className="floating-icon icon-chip">
              <div className="icon-inner">
                <Microchip className="text-white" />
              </div>
              <span>Technology</span>
            </div>
          </div>
        </div>
      </div>

      <div className="section-scroll-indicator" onClick={scrollToNextSection}>
        <ChevronDown className="text-white" />
      </div>
    </section>
  );
};

export default About;
