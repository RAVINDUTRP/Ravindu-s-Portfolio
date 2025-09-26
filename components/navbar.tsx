"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { animate } from "framer-motion"

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
            className={`relative rounded-full px-6 py-2 transition-all duration-500 overflow-hidden ${
              isScrolled 
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
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="h-8 w-8 rounded-full hover:bg-accent/50"
                  >
                    {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/50 p-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 rounded-lg hover:bg-accent/50"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
