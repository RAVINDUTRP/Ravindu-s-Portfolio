"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import EducationSection from "@/components/education-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import AchivementSection from "@/components/achivement"
import ContactSection from "@/components/contact-section"
import SocialSidebar from "@/components/social-sidebar"
import Footer from "@/components/footer"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function Portfolio() {
  const { currentSection, scrollToSection } = useScrollAnimation()

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <SocialSidebar />

      <main className="scroll-snap-container">
        <section id="home" className="section-blue scroll-snap-item">
          <HeroSection />
        </section>

        <section id="about" className="section-blue scroll-snap-item">
          <AboutSection />
        </section>

        <section id="education" className="section-blue scroll-snap-item">
          <EducationSection />
        </section>

        <section id="skills" className="section-purple scroll-snap-item">
          <SkillsSection />
        </section>

        <section id="projects" className="section-blue scroll-snap-item">
          <ProjectsSection />
        </section>

        <section id="achivements" className="section-purple scroll-snap-item">
          <AchivementSection />
        </section>

        <section id="contact" className="section-purple scroll-snap-item">
          <ContactSection />
        </section>
      </main>

      <Footer />
    </div>
  )
}
