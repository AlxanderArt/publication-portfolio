"use client";

import { useState } from "react";
import SplineGreeting from "@/components/SplineGreeting";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PublicationsGrid from "@/components/PublicationsGrid";
import Contact from "@/components/Contact";

export default function Home() {
  const [greetingDone, setGreetingDone] = useState(false);

  return (
    <>
      <SplineGreeting onComplete={() => setGreetingDone(true)} />
      <div
        className={`transition-opacity duration-700 ${
          greetingDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <Hero />
        <About />
        <PublicationsGrid />
        <Contact />
      </div>
    </>
  );
}
