"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

export function useScrollAnimation() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return { scrollToSection };
}

// Custom hook for Framer Motion scroll animations
export function useScrollAnimationFramer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return { ref, isInView };
}
