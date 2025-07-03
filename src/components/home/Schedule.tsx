import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Schedule.css";
import {
  Award,
  CalendarCheck,
  CalendarHeart,
  ChevronDown,
  ClipboardCheck,
  Edit,
  Laptop,
  ListOrdered,
  Trophy,
} from "lucide-react";

const Schedule = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const timelineRef = useRef(null);

  const timelineEvents = [
    {
      phase: "Registration Begins",
      date: "3rd July, 2025",
      description:
        "Register online through our registration form. Open to all BRAC University students.",
      icon: <Edit className="text-white" />,
    },
    {
      phase: "Registration Ends",
      date: "9th July, 2025",
      description:
        "Last day to submit your registration for the preliminary round.",
      icon: <CalendarHeart className="text-white" />,
    },
    {
      phase: "Online Preliminary",
      date: "11th July, 2025",
      description:
        "Online qualification round. Top performers advance to the finals.",
      icon: <Laptop className="text-white" />,
    },
    {
      phase: "Preliminary Result Declaration",
      date: "12th July, 2025",
      description:
        "Announcement of participants qualifying for the onsite final round.",
      icon: <ListOrdered className="text-white" />,
    },
    {
      phase: "Registration Begins for Onsite",
      date: "12th July, 2025",
      description: "Selected participants can register for the onsite finals.",
      icon: <ClipboardCheck className="text-white" />,
    },
    {
      phase: "Registration Ends for Onsite (Tentative)",
      date: "14th July, 2025",
      description:
        "Last day to confirm your participation in the onsite finals.",
      icon: <CalendarCheck className="text-white" />,
    },
    {
      phase: "Onsite Final Round",
      date: "18th July, 2025",
      description:
        "In-person finals at BRAC University. The ultimate test of programming skills.",
      icon: <Trophy className="text-white" />,
    },
    {
      phase: "Prize Giving and Closing Ceremony",
      date: "18th July, 2025",
      description:
        "Recognition of winners and distribution of prizes and certificates.",
      icon: <Award className="text-white" />,
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

    // Animate timeline events with staggered fade-in effect
    tl.fromTo(
      ".timeline-event",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // Animate timeline line drawing
    tl.fromTo(
      ".timeline-line",
      { height: 0 },
      {
        height: "100%",
        duration: 1.5,
        ease: "power2.inOut",
      },
      "-=1.5"
    );

    return () => {
      // Clean up animations
      tl.kill();
    };
  }, []);

  const scrollToNextSection = () => {
    const prizesSection = document.getElementById("prizes");
    if (prizesSection) {
      prizesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="schedule"
      className="section schedule-section"
      ref={sectionRef}
    >
      <div className="dark-overlay"></div>
      <div className="container">
        <h2 className="section-title" ref={titleRef}>
          Timeline & Schedule
        </h2>

        <div className="timeline-container" ref={timelineRef}>
          <div className="timeline-line"></div>

          {timelineEvents.map((event, index) => (
            <div className="timeline-event" key={index}>
              <div className="timeline-marker">
                <div className="timeline-icon">{event.icon}</div>
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
        <ChevronDown className="text-white" />
      </div>
    </section>
  );
};

export default Schedule;
