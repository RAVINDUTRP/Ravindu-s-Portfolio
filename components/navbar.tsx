"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { animate, motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setIsScrolling(true)

      // Clear the previous timeout
      clearTimeout(scrollTimeout)

      // Set a timeout to remove the scrolling state after scrolling stops
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achivements" },
    { name: "Contact", href: "#contact" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const startY = window.scrollY
      const endY = (element as HTMLElement).getBoundingClientRect().top + window.scrollY - 20 // offset for navbar
      animate(startY, endY, {
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1], // custom ease
        onUpdate: (latest) => window.scrollTo(0, latest),
        onComplete: () => {
          // Highlight effect for education section
          if (href === "#education") {
            element.classList.add("ring-4", "ring-blue-400", "ring-offset-2", "transition-all")
            setTimeout(() => {
              element.classList.remove("ring-4", "ring-blue-400", "ring-offset-2", "transition-all")
            }, 1200)
          }
        }
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Beautiful Gradient + Blur Overlay Above Navbar */}
      <div
        className={`fixed top-0 left-0 w-full h-16 z-40 pointer-events-none transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'} dark:hidden`}
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.85) 60%, rgba(255,255,255,0.0) 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      />
      <div
        className={`fixed top-0 left-0 w-full h-16 z-40 pointer-events-none transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'} hidden dark:block`}
        style={{
          background: 'linear-gradient(to bottom, rgba(23,23,35,0.85) 60%, rgba(23,23,35,0.0) 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      />
      <nav className="fixed top-4 left-0 right-0 z-50 px-6">
        <div className="relative max-w-7xl mx-auto">
          {/* Rounded Navigation Container */}
          <div
            className={`relative rounded-full px-6 py-2 transition-all duration-500 overflow-hidden ${isScrolled
                ? "bg-background shadow-xl border border-border/50"
                : "bg-background shadow-md border border-border/30"
              }`}
          >
            <div className="flex items-center justify-between">
              {/* Logo - Left */}
              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                MyPortfolio ✨
              </div>

              {/* Desktop Navigation - Center */}
              <div className="hidden md:flex items-center space-x-6">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="relative px-4 py-2 text-sm font-medium text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 transform rounded-full hover:bg-accent/50 group"
                  >
                    {item.name}
                    <span
                      className="absolute left-1/2 right-1/2 bottom-1 h-0.5 rounded-full transition-all duration-300 ease-out bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 origin-center"
                      style={{
                        boxShadow: '0 0 8px rgba(139, 92, 246, 0.3)'
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* Right Side - Theme Toggle & Mobile Menu */}
              <div className="flex items-center space-x-4">
                {/* Theme Toggle */}
                <div className="hidden md:flex items-center">
                  <ThemeToggle />
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="h-8 w-8 rounded-full hover:bg-accent/50 text-foreground"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Modern Slide-Out Half Sidebar Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] md:hidden"
            />

            {/* Right-Side Slide-Out Half Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-[75vw] max-w-[300px] h-full bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-2xl border-l border-slate-200/50 dark:border-slate-800/60 shadow-2xl p-6 flex flex-col z-[101] md:hidden"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
                <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  MyPortfolio ✨
                </span>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-full hover:bg-slate-100 dark:hover:bg-white/10"
                  >
                    <X className="h-6 w-6 text-gray-800 dark:text-gray-200" />
                  </Button>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-3 mt-8">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(item.href)}
                    className="w-full text-left px-4 py-3 text-base font-semibold text-gray-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-white/5 rounded-xl transition-all duration-200 flex items-center justify-between group"
                  >
                    <span>{item.name}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-blue-500 dark:text-blue-400 font-bold">
                      →
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
