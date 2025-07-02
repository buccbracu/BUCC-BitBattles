"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Hero.css";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  // Refs for animation
  const buccRef = useRef(null);
  const presentsRef = useRef(null);
  const titleContainerRef = useRef(null);
  const titleIconRef = useRef(null);
  const titleBitRef = useRef(null);
  const titleBattlesRef = useRef(null);
  const subtitleRef = useRef(null);
  const poweredByRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const registerBtnRef = useRef(null);
  const websiteBtnRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Set document title
    document.title =
      "BUCC Bit Battles: Intra BRAC University Programming Contest";

    // Try to play the video directly
    const video = videoRef.current;
    if (video) {
      video.muted = true; // Must be muted for autoplay to work in most browsers
      video.preload = "auto"; // Ensure video preloads

      // Add loading event listener
      video.addEventListener("loadeddata", () => {
        setVideoLoaded(true);
      });

      // Try to play with both methods
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay started successfully
            console.log("Video is playing");
          })
          .catch((error) => {
            // Autoplay was prevented
            console.error("Video play failed:", error);
            // Try to add click event to start video on user interaction
            const playVideo = () => {
              video.play();
              document.body.removeEventListener("click", playVideo);
            };
            document.body.addEventListener("click", playVideo);
          });
      }
    }

    // Create a timeline for animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate BUCC and PRESENTS
    tl.fromTo(
      [buccRef.current, presentsRef.current],
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }
    );

    // Animate title container with reveal
    tl.fromTo(
      titleContainerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2 },
      "-=0.4"
    );

    // Animate icon
    tl.fromTo(
      titleIconRef.current,
      { opacity: 0, scale: 0.8, rotation: -15 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.8 },
      "-=0.9"
    );

    // Animate each title word with stagger
    tl.fromTo(
      [titleBitRef.current, titleBattlesRef.current],
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.2 },
      "-=0.8"
    );

    // Animate subtitle and powered by
    tl.fromTo(
      [subtitleRef.current, poweredByRef.current],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
      "-=0.6"
    );

    // Animate buttons container
    tl.fromTo(
      buttonContainerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4"
    );

    // Animate each button with stagger
    tl.fromTo(
      [registerBtnRef.current, websiteBtnRef.current],
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );

    // Add a subtle scroll down indicator animation
    gsap.to(".scroll-indicator", {
      y: "10px",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Cleanup function
    return () => {
      tl.kill();

      // Clean up event listeners
      if (video) {
        video.removeEventListener("loadeddata", () => {
          setVideoLoaded(true);
        });
      }
    };
  }, []);

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero-container">
      {/* Video background */}
      <div className="video-background opacity-100">
        <video
          width="1920"
          height="1080"
          controls
          preload="none"
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/background.webm"
          className={videoLoaded ? "video-loaded" : ""}
        >
          <source src="/background.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        <div className="video-overlay"></div>
      </div>

      {/* Content overlay */}
      <div className="content-overlay">
        <div className="text-container">
          {/* BUCC and PRESENTS section */}
          <div className="bucc-header">
            <h3 ref={buccRef} className="bucc-title">
              BRAC University Computer Club
            </h3>
            <p ref={presentsRef} className="presents-text">
              PRESENTS
            </p>
          </div>

          {/* Main title with icon */}
          <div className="title-wrapper">
            <div ref={titleIconRef} className="title-icon">
              <Image
                width={1000}
                height={1000}
                className="w-full"
                src={"/icon.png"}
                alt="Bit Battles Icon"
              />
            </div>
            <div ref={titleContainerRef} className="hero-title-container">
              <div ref={titleBitRef} className="hero-title title-bit">
                BIT
              </div>
              <div ref={titleBattlesRef} className="hero-title title-battles">
                BATTLES
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <h2 ref={subtitleRef} className="hero-subtitle">
            Intra BRAC University Programming Contest
          </h2>

          {/* Powered by section */}
          <div ref={poweredByRef} className="powered-by">
            <span className="powered-text">Powered by</span>
            <div className="phaetron-logo">
              <Image
                width={1000}
                height={1000}
                src={"/sponsor logo.png"}
                alt="Phitron"
                className="phaetron-logo-img"
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div ref={buttonContainerRef} className="cta-container">
            <Link
              href="/registe"
              target="_blank"
              rel="noopener noreferrer"
              ref={registerBtnRef}
              className="cta-button register-btn"
            >
              <span className="btn-text">Sign Up & Register</span>
            </Link>
            <Link
              href="https://www.bracucc.org/"
              target="_blank"
              rel="noopener noreferrer"
              ref={websiteBtnRef}
              className="cta-button website-btn"
            >
              <span className="btn-text">BUCC Website</span>
            </Link>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="scroll-indicator" onClick={scrollToNextSection}>
          <ChevronDown className="text-white " />
        </div>
      </div>
    </div>
  );
};

export default Hero;
