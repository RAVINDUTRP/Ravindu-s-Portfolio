"use client"

import { useState, useEffect } from "react"
import { Download, Eye, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { useIsMobile } from "@/components/ui/use-mobile"
import { Menu, X } from "lucide-react"
import dynamic from 'next/dynamic';

const PDFDownloadButton = dynamic(() => import('@/components/PDFDownloadButton'), { ssr: false });

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  // Animated subtitle roles
  const roles = [
    "Frontend Developer",
    "UI/UX Designer",
    "Tech Enthusiast",
    "Problem Solver"
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  // Use fade animation instead of typing for all roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000); // Change every 2 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsLoaded(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-[#05071a] dark:via-[#181c2f] dark:to-[#1a1333]">
      {/* Mobile Nav & Theme Toggle */}
      {isMobile && (
        <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-md md:hidden">
          <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">MyPortfolio ✨</span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="ml-2" onClick={() => setMobileMenuOpen((v) => !v)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          {/* Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg flex flex-col items-center py-2 animate-fade-in z-50">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="w-full text-center px-6 py-3 text-base font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 flex justify-center"
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs - Light mode only: subtle, further from center, low opacity */}
        <div className="absolute top-[-10%] left-[-10%] w-56 h-56 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse-slow dark:hidden"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-56 h-56 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse-slow delay-1000 dark:hidden"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-r from-blue-100/20 to-indigo-100/20 rounded-full blur-3xl animate-spin-slower dark:hidden"></div>
        {/* Dark mode orbs remain unchanged */}
        <div className="hidden dark:block absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#0f172a]/80 to-[#3b0764]/80 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="hidden dark:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#3b0764]/80 to-[#4c1d95]/80 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="hidden dark:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#05071a]/60 to-[#18122b]/60 rounded-full blur-3xl animate-spin-slower"></div>

        {/* Interactive Mouse Gradient */}
        <div
          className="absolute inset-0 opacity-30 transition-all duration-300"
          style={{
            background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
          }}
        />

        {/* Enhanced Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  i % 3 === 0 ? "bg-blue-400/40" : i % 3 === 1 ? "bg-purple-400/40" : "bg-cyan-400/40"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
      {/* Down Arrow to About Me */}
      <a href="#about" aria-label="Scroll to About Me"
         className="absolute left-1/2 bottom-8 -translate-x-1/2 flex flex-col items-center z-20 group">
        <svg className="w-7 h-7 text-blue-500 animate-bounce-slow group-hover:text-blue-700 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <span className="sr-only">Scroll to About Me</span>
      </a>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
        .subtitle-modern {
          font-family: 'Poppins', Arial, Helvetica, sans-serif;
          font-size: clamp(1.3rem, 3vw, 2.3rem);
          font-weight: 600;
          background: linear-gradient(90deg, #3ec6ff 0%, #a259ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          padding: 0.3em 0.7em;
          border-radius: 0.5em;
          letter-spacing: 0.01em;
          display: inline-block;
          text-shadow: 0 2px 16px rgba(50,100,200,0.12), 0 1px 2px rgba(0,0,0,0.08);
        }
        .subtitle-caret-modern {
          color: #3ec6ff;
          font-weight: bold;
          font-size: 2.2rem;
          display: inline-block;
          margin-left: 0.1em;
          animation: blink-caret 1s steps(1) infinite;
        }
        @keyframes blink-caret {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(18px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2.2s infinite;
        }
      `}</style>
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-8">
        <div className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`mb-2 leading-tight flex flex-col items-center justify-center gap-1 text-center ${isMobile ? 'mb-4' : ''}`}
          >
            {isMobile ? (
              <>
                <span className="block font-extrabold text-2xl xs:text-3xl mb-1">Hello! I&apos;m</span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.4, 0.8, 0.2, 1] }}
                  className="bg-gradient-to-r from-blue-400 via-blue-500 to-pink-400 bg-clip-text text-transparent whitespace-nowrap font-extrabold text-4xl xs:text-5xl sm:text-6xl"
                >
                  Ravindu Piyumal
                </motion.span>
              </>
            ) : (
              <>
                <span className="block font-extrabold text-3xl xs:text-4xl sm:text-5xl md:text-7xl mb-1">Hello! I&apos;m</span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.4, 0.8, 0.2, 1] }}
                  className="bg-gradient-to-r from-blue-400 via-blue-500 to-pink-400 bg-clip-text text-transparent whitespace-nowrap font-extrabold text-6xl xs:text-6xl sm:text-7xl md:text-8xl"
                >
                  Ravindu Piyumal
                </motion.span>
              </>
            )}
          </motion.h1>
          {/* Subtitle (animated roles) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="subtitle-modern mb-6"
          >
            {roles[roleIndex]}
          </motion.div>
          {/* Download CV Button */}
          {/* Description */}
          <p className={`text-xs xs:text-sm ${isMobile ? 'mb-4 max-w-xs px-1' : 'sm:text-base mb-8 sm:mb-10 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-3xl px-1 xs:px-2 sm:px-0'} text-gray-700 dark:text-gray-300 mx-auto leading-relaxed`} style={{ textShadow: '0 2px 12px rgba(0,0,0,0.10)' }}>
            Passionate about creating beautiful, functional, and user-centered digital experiences. <br /> I bring ideas to life through{' '}
            <span className="font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">code</span>
            {' '}and{' '}
            <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">design</span>.
          </p>
          {/* CTA Buttons */}
          <div className={`flex ${isMobile ? 'flex-col gap-3 mt-4' : 'flex-col sm:flex-row gap-4 mt-8'} justify-center items-center`}>
            <Button
              size={isMobile ? 'sm' : 'lg'}
              className={`flex items-center gap-2 ${isMobile ? 'w-full px-3 py-2 text-sm rounded-lg' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl border-0 text-lg font-semibold'}`}
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Eye className="w-5 h-5" />
              View Projects
            </Button>
            <PDFDownloadButton />
          </div>
        </div>
      </div>
    </section>
  )
}
