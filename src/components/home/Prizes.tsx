import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Prizes.css';

const Prizes = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const prizesRef = useRef(null);

  const prizesList = [
    {
      place: 'Champion Team',
      icon: 'fas fa-trophy',
      rewards: [
        'Cash Prize: 15,000 BDT',
        'Champion Trophy',
        'Certificate of Excellence',
        'Exclusive Swag Pack',
        'Internship Opportunity'
      ]
    },
    {
      place: 'First Runner Up',
      icon: 'fas fa-medal',
      rewards: [
        'Cash Prize: 12,000 BDT',
        'Runner-up Trophy',
        'Certificate of Merit',
        'Swag Pack',
        'Recognition Award'
      ]
    },
    {
      place: 'Second Runners Up',
      icon: 'fas fa-award',
      rewards: [
        'Cash Prize: 10,000 BDT',
        'Trophy',
        'Certificate',
        'Swag Pack',
        'Recognition'
      ]
    },
    {
      place: 'First Team to Solve',
      icon: 'fas fa-bolt',
      rewards: [
        'Cash Prize: 10 × 1,000 BDT',
        'Achievement Certificate',
        'BUCC Hall of Fame',
        'Special Recognition'
      ]
    },
    {
      place: 'Final Forecast Winner',
      icon: 'fas fa-chart-line',
      rewards: [
        'Cash Prize: 1,000 BDT',
        'Winner Certificate',
        'Special Recognition',
        'Event Priority'
      ]
    },
    {
      place: 'Open Hacking Winner',
      icon: 'fas fa-laptop-code',
      rewards: [
        'Cash Prize: 2,000 BDT',
        'Winner Certificate',
        'Special Recognition',
        'Hackathon Priority'
      ]
    }
  ];

  useEffect(() => {
    // Create animation timeline
    const tl = gsap.timeline();

    // Animate title with fade-in
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 }
    );

    // Animate prize cards with staggered fade-in effect
    tl.fromTo('.prize-card',
      { opacity: 0, y: 30, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.7,
        stagger: 0.2,
        ease: "back.out(1.4)" 
      },
      "-=0.4"
    );

    // Continuous glow pulse for prize icons
    gsap.to('.prize-icon', {
      boxShadow: '0 0 30px rgba(255, 215, 0, 0.7), 0 0 50px rgba(255, 215, 0, 0.5)',
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
    const registrationSection = document.getElementById('registration');
    if (registrationSection) {
      registrationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="prizes" className="section prizes-section" ref={sectionRef}>
      <div className="dark-overlay"></div>
      <div className="container">
        <h2 className="section-title" ref={titleRef}>Prizes & Rewards</h2>
        
        <div className="prizes-container" ref={prizesRef}>
          {prizesList.map((prize, index) => (
            <div className="prize-card" key={index}>
              <div className="prize-icon-container">
                <div className="prize-icon">
                  <i className={prize.icon}></i>
                </div>
              </div>
              
              <h3 className="prize-place">{prize.place}</h3>
              
              <ul className="prize-rewards">
                {prize.rewards.map((reward, rewardIndex) => (
                  <li key={rewardIndex}>{reward}</li>
                ))}
              </ul>
            </div>
          ))}
            </div>
            
        <div className="total-prize-money">
          <h3>Total Prize Money: 50,000 BDT</h3>
        </div>
      </div>
      
      <div className="section-scroll-indicator" onClick={scrollToNextSection}>
        <i className="fas fa-chevron-down"></i>
      </div>
    </section>
  );
};

export default Prizes; 