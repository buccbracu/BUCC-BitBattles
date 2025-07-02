import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Registration.css';

const Registration = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Create animation timeline
    const tl = gsap.timeline();

    // Animate title with fade-in
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 }
    );

    // Animate content with fade-in
    tl.fromTo(contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4"
    );

    // Animate button with special fade-in effect
    tl.fromTo(buttonRef.current,
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.7,
        ease: "back.out(1.7)" 
      },
      "-=0.3"
    );

    // Pulsing glow for the CTA button
    gsap.to(buttonRef.current, {
      boxShadow: '0 0 30px rgba(160, 105, 55, 0.7), 0 0 50px rgba(160, 105, 55, 0.4)',
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut"
    });

    return () => {
      // Clean up animations
      tl.kill();
    };
  }, []);

  const scrollToNextSection = () => {
    const faqSection = document.getElementById('faq');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="registration" className="section registration-section" ref={sectionRef}>
      <div className="dark-overlay"></div>
      <div className="container">
        <h2 className="section-title" ref={titleRef}>Registration</h2>
        
        <div className="registration-content" ref={contentRef}>
          <div className="registration-details">
            <h3>Join the Battle</h3>
            <p>Ready to test your programming skills? Register now for BUCC Bit Battles and compete with the best coders at BRAC University!</p>
            
            <div className="registration-info-container">
              <div className="eligibility-info">
                <h4>Eligibility:</h4>
                <ul>
                  <li>All currently enrolled undergraduate students of BRAC University</li>
                  <li>Teams must consist of 1 to 3 members</li>
                  <li>A student may participate in only one team</li>
                  <li>Team composition must be fixed once the preliminary round begins</li>
                  <li>A designated team leader must act as the official point of contact</li>
                </ul>
              </div>
              
              <div className="important-dates">
                <h4>Important Dates:</h4>
                <ul>
                  <li><span>Registration Deadline:</span> 8th July, 2025</li>
                  <li><span>Online Preliminary:</span> 11th July, 2025</li>
                  <li><span>Onsite Final Round:</span> 18th July, 2025</li>
                </ul>
              </div>
            </div>
            
            <div className="fees-info">
              <h4>Registration Fees:</h4>
              <ul>
                <li><span>Preliminary Round:</span> BDT 498/=</li>
                <li><span>Final Round (for qualified teams):</span> BDT 1000/=</li>
              </ul>
            </div>
            
            <div className="button-container">
              <a 
                href="https://bucc-bitbattle-dev.vercel.app/" 
                className="registration-button" 
                ref={buttonRef}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <span className="button-text">Sign Up & Register</span>
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="section-scroll-indicator" onClick={scrollToNextSection}>
        <i className="fas fa-chevron-down"></i>
      </div>
    </section>
  );
};

export default Registration; 