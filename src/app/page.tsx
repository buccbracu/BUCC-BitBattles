"use client";

import Hero from "@/components/home/Hero";
import { initDeviceDetection } from "@/lib/mobile";
import { useEffect } from "react";
import "./page.css";
import About from "@/components/home/About";
import Schedule from "@/components/home/Schedule";
import Prizes from "@/components/home/Prizes";
import Faq from "@/components/home/Faq";
import Footer from "@/components/home/Footer";
import Organizers from "@/components/home/Organizers";
import Registration from "@/components/home/Registration";
import Sponsors from "@/components/home/Sponsors";

export default function Home() {
  useEffect(() => {
    const cleanup = initDeviceDetection();
    return cleanup;
  }, []);

  return (
    <div className="content-wrapper">
      <Hero />

      <About />
      <Schedule />
      <Prizes />
      <Registration />
      <Faq />
      <Organizers />
      <Sponsors />
      <Footer />
    </div>
  );
}
