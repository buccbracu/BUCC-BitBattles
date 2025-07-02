"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Sponsors.css";
import Image from "next/image";

const Sponsors = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const sponsorsRef = useRef(null);

  // Updated sponsors and partners data
  const sponsorsData = [
    {
      name: "Phitron",
      category: "Powered by",
      logoUrl: "/sponsor logo.png",
    },
    {
      name: "BRAC University",
      category: "Supported by",
      description: "Department of Computer Science and Engineering",
      logoUrl: "/brac-university-logo.png",
    },
  ];

  useEffect(() => {
    // Create animation timeline
    const tl = gsap.timeline();

    // Animate title with fade-in
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 }
    );

    // Animate sponsors with staggered fade-in effect
    tl.fromTo(
      ".sponsor-card",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.4"
    );

    return () => {
      // Clean up animations
      tl.kill();
    };
  }, []);

  const scrollToNextSection = () => {
    (document.querySelector("footer") as HTMLDivElement).scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="sponsors"
      className="section sponsors-section"
      ref={sectionRef}
    >
      <div className="dark-overlay"></div>
      <div className="container">
        <h2 className="section-title" ref={titleRef}>
          Sponsors & Partners
        </h2>

        <div className="sponsors-container" ref={sponsorsRef}>
          {sponsorsData.map((sponsor, index) => (
            <div className="sponsor-card" key={index}>
              <div className="sponsor-logo-container larger-logo">
                <Image
                  width={1000}
                  height={1000}
                  src={sponsor.logoUrl}
                  alt={`${sponsor.name} logo`}
                  className="sponsor-logo"
                />
              </div>
              <div className="sponsor-info">
                <h3 className="sponsor-name">{sponsor.name}</h3>
                <p className="sponsor-category">{sponsor.category}</p>
                {sponsor.description && (
                  <p className="sponsor-description">{sponsor.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-scroll-indicator" onClick={scrollToNextSection}>
        <i className="fas fa-chevron-down"></i>
      </div>
    </section>
  );
};

export default Sponsors;
