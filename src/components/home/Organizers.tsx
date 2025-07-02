import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Organizers.css";
import { ChevronDown } from "lucide-react";

const Organizers = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const logoRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Create animation timeline
    const tl = gsap.timeline();

    // Animate title with fade-in
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 }
    );

    // Animate logo with special fade-in effect
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8, rotation: -10 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.7,
        ease: "back.out(1.7)",
      },
      "-=0.4"
    );

    // Animate content with fade-in
    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.3"
    );

    // Logo subtle floating animation
    gsap.to(logoRef.current, {
      y: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      // Clean up animations
      tl.kill();
    };
  }, []);

  const scrollToNextSection = () => {
    const sponsorsSection = document.getElementById("sponsors");
    if (sponsorsSection) {
      sponsorsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="organizers"
      className="section organizers-section"
      ref={sectionRef}
    >
      <div className="dark-overlay"></div>
      <div className="container">
        <h2 className="section-title" ref={titleRef}>
          Organizers
        </h2>

        <div className="organizers-content">
          <div className="bucc-logo" ref={logoRef}>
            <div className="logo-shield">
              <span className="logo-text">BUCC</span>
            </div>
          </div>

          <div className="organizers-details" ref={contentRef}>
            <h3>BRAC University Computer Club</h3>
            <p>
              The BRAC University Computer Club (BUCC) is one of the oldest and
              most active clubs at BRAC University, dedicated to fostering a
              community of tech enthusiasts and promoting computing knowledge
              and skills among students.
            </p>
            <p>
              BUCC organizes various events, workshops, and competitions
              throughout the year to enhance students' technical and soft
              skills, preparing them for future careers in the technology
              sector.
            </p>
            <p>
              Bit Battles represents our commitment to nurturing algorithmic
              thinking and competitive programming skills among BRAC University
              students.
            </p>
          </div>
        </div>
      </div>

      <div className="section-scroll-indicator" onClick={scrollToNextSection}>
        <ChevronDown className="text-white" />
      </div>
    </section>
  );
};

export default Organizers;
