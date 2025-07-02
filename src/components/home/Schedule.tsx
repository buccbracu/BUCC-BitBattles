import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Schedule.css';

const Schedule = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const timelineRef = useRef(null);

  const timelineEvents = [
    {
      phase: 'Registration Begins',
      date: '1st July, 2025',
      description: 'Register online through our registration form. Open to all BRAC University students.',
      icon: 'fas fa-edit'
    },
    {
      phase: 'Registration Ends',
      date: '8th July, 2025',
      description: 'Last day to submit your registration for the preliminary round.',
      icon: 'fas fa-calendar-times'
    },
    {
      phase: 'Online Preliminary',
      date: '11th July, 2025',
      description: 'Online qualification round. Top performers advance to the finals.',
      icon: 'fas fa-laptop-code'
    },
    {
      phase: 'Preliminary Result Declaration',
      date: '12th July, 2025',
      description: 'Announcement of participants qualifying for the onsite final round.',
      icon: 'fas fa-list-ol'
    },
    {
      phase: 'Registration Begins for Onsite',
      date: '12th July, 2025',
      description: 'Selected participants can register for the onsite finals.',
      icon: 'fas fa-clipboard-check'
    },
    {
      phase: 'Registration Ends for Onsite',
      date: '16th July, 2025',
      description: 'Last day to confirm your participation in the onsite finals.',
      icon: 'fas fa-calendar-times'
    },
    {
      phase: 'Onsite Final Round',
      date: '18th July, 2025',
      description: 'In-person finals at BRAC University. The ultimate test of programming skills.',
      icon: 'fas fa-trophy'
    },
    {
      phase: 'Prize Giving and Closing Ceremony',
      date: '18th July, 2025',
      description: 'Recognition of winners and distribution of prizes and certificates.',
      icon: 'fas fa-award'
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

    // Animate timeline events with staggered fade-in effect
    tl.fromTo('.timeline-event',
      { opacity: 0, x: -30 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out" 
      },
      "-=0.4"
    );

    // Animate timeline line drawing
    tl.fromTo('.timeline-line',
      { height: 0 },
      { 
        height: '100%', 
        duration: 1.5,
        ease: "power2.inOut" 
      },
      "-=1.5"
    );

    return () => {
      // Clean up animations
      tl.kill();
    };
  }, []);

  const scrollToNextSection = () => {
    const prizesSection = document.getElementById('prizes');
    if (prizesSection) {
      prizesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="schedule" className="section schedule-section" ref={sectionRef}>
      <div className="dark-overlay"></div>
      <div className="container">
        <h2 className="section-title" ref={titleRef}>Timeline & Schedule</h2>
        
        <div className="timeline-container" ref={timelineRef}>
          <div className="timeline-line"></div>
          
          {timelineEvents.map((event, index) => (
            <div className="timeline-event" key={index}>
              <div className="timeline-marker">
                <div className="timeline-icon">
                  <i className={event.icon}></i>
                </div>
              </div>
              
              <div className="timeline-content">
                <h3 className="event-phase">{event.phase}</h3>
                <div className="event-date">{event.date}</div>
                <p className="event-description">{event.description}</p>
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

export default Schedule; 