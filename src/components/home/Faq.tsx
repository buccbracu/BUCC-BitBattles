import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import gsap from "gsap";
import "./Faq.css";
import Link from "next/link";
import { ChevronDown, Minus, Plus } from "lucide-react";

const Faq = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const faqsRef = useRef(null);
  const rulesButtonRef = useRef(null);

  // State to track which FAQ items are open
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // FAQ data - memoize to prevent unnecessary re-renders
  const faqItems = useMemo(
    () => [
      {
        question: "What is BUCC Bit Battles?",
        answer:
          "BUCC Bit Battles is a multi-tiered intra-university competitive programming contest designed for the students of BRAC University. This event follows a hybrid format, beginning with an online preliminary round and culminating in an onsite final round.",
      },
      {
        question: "Who can participate in the contest?",
        answer:
          "All currently enrolled undergraduate students of BRAC University can participate. Teams must consist of 1 to 3 members, and each student may participate in only one team.",
      },
      {
        question: "When and where will the contest take place?",
        answer:
          "The Preliminary Round will be held online on July 11th, 2025. The Final Round will be held onsite at BRAC University Campus on July 18th, 2025.",
      },
      {
        question: "Is there a registration fee?",
        answer:
          "Yes. The registration fee for the Preliminary Round is BDT 498. For teams that qualify for the Final Round, there is an additional fee of BDT 1000.",
      },
      {
        question: "What programming languages are allowed in the contest?",
        answer:
          "Participants can use C, C++, Java, and Python, subject to platform capabilities. The contest system and environment details will be shared in advance.",
      },
      {
        question: "How many teams will advance to the Final Round?",
        answer:
          "The top 100 teams from the Preliminary Round will be selected to compete in the onsite Final Round.",
      },
      {
        question: "What materials can we bring to the contest?",
        answer:
          "Each team may bring a printed code template of up to 25 pages. Templates may be handwritten or typed. No digital, electronic, or internet-enabled materials are allowed during the contest.",
      },
      {
        question: "What awards will be given to winners?",
        answer:
          "Awards will be given to the Champion Team, 1st Runner-up, 2nd Runner-up, and Honorable Mentions. All participants in the final round will receive digital participation certificates. Special awards may also be introduced at the discretion of the organizing body.",
      },
    ],
    []
  );

  // Toggle FAQ item - memoize with useCallback to prevent recreating on each render
  const toggleFaq = useCallback((index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  useEffect(() => {
    // Create animation timeline
    const tl = gsap.timeline();

    // Animate title with fade-in
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 }
    );

    // Animate FAQ items with staggered fade-in effect
    tl.fromTo(
      ".faq-item",
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

    // Animate rules button
    tl.fromTo(
      rulesButtonRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.2"
    );

    return () => {
      // Clean up animations
      tl.kill();
    };
  }, []);

  const scrollToNextSection = useCallback(() => {
    const organizersSection = document.getElementById("organizers");
    if (organizersSection) {
      organizersSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section id="faq" className="section faq-section" ref={sectionRef}>
      <div className="dark-overlay"></div>
      <div className="container">
        <h2 className="section-title" ref={titleRef}>
          Frequently Asked Questions
        </h2>

        <div className="faq-container" ref={faqsRef}>
          {faqItems.map((item, index) => (
            <div
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              key={index}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <h3>{item.question}</h3>
                <span className="faq-icon">
                  {activeIndex === index ? <Minus /> : <Plus />}
                </span>
              </div>

              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="more-questions">
          <p>
            Have more questions? Feel free to reach out to us at{" "}
            <a href="mailto:bucc@g.bracu.ac.bd">bucc@g.bracu.ac.bd</a>
          </p>
        </div>

        <div className="rules-button-container" ref={rulesButtonRef}>
          <Link href="/rules" className="rules-button">
            View Complete Rule Book
          </Link>
        </div>
      </div>

      <div className="section-scroll-indicator" onClick={scrollToNextSection}>
        <ChevronDown className="text-white" />
      </div>
    </section>
  );
};

export default React.memo(Faq);
