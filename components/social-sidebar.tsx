"use client"

import { Github, Linkedin, Twitter, Instagram, Mail, Facebook, ChevronRight, Plus, X } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useIsMobile } from "@/components/ui/use-mobile"

export default function SocialSidebar() {
  const [isVisible, setIsVisible] = useState(true)
  const [showArrow, setShowArrow] = useState(false)
  const [showSocialIcons, setShowSocialIcons] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [showToggle, setShowToggle] = useState(false)
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [isMobileFabSmall, setIsMobileFabSmall] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  // Shrink/move FAB on scroll
  useEffect(() => {
    if (!isMobile) return;
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsMobileFabSmall(true);
      } else {
        setIsMobileFabSmall(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollY
      
      // Clear previous timeout
      clearTimeout(scrollTimeout)
      
      // Always show at the top of the page
      if (currentScrollY < 100) {
        setIsVisible(true)
        setShowArrow(false)
        setShowSocialIcons(false)
        setShowToggle(false)
        setIsScrollingDown(false)
        setLastScrollY(currentScrollY)
        return
      }
      
      // Determine scroll direction with a small threshold
      if (Math.abs(scrollDelta) > 5) {
        if (scrollDelta > 0) {
          // Scrolling down
          setIsScrollingDown(true)
          setIsVisible(false)
          setShowArrow(false)
          setShowSocialIcons(false)
          setShowToggle(true)
        } else {
          // Scrolling up
          setIsScrollingDown(false)
          setShowArrow(true)
          setIsVisible(false)
          setShowToggle(true)
        }
      }
      
      setLastScrollY(currentScrollY)
      
      // Set a timeout to smooth out the transitions
      scrollTimeout = setTimeout(() => {
        if (isScrollingDown) {
          setShowToggle(true)
        }
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [lastScrollY, isScrollingDown])

  const toggleSocialIcons = () => {
    setShowSocialIcons(!showSocialIcons)
    setShowArrow(false)
  }

  const socialLinks = [
    { 
      icon: Github, 
      href: "https://github.com/RAVINDUTRP", 
      label: "GitHub", 
      hoverColor: "group-hover:bg-gray-900",
      bgColor: "bg-transparent",
      borderColor: "border-gray-400/50 dark:border-gray-400/30",
      iconColor: "text-gray-700 dark:text-gray-300 group-hover:text-white"
    },
    { 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/ravindu-piyumal-7b0a592a8/", 
      label: "LinkedIn", 
      hoverColor: "group-hover:bg-blue-600",
      bgColor: "bg-transparent",
      borderColor: "border-gray-400/50 dark:border-gray-400/30",
      iconColor: "text-gray-700 dark:text-gray-300 group-hover:text-white"
    },
    { 
      icon: Twitter, 
      href: "https://x.com/ravindupt?s=21", 
      label: "X (Twitter)", 
      hoverColor: "group-hover:bg-black",
      bgColor: "bg-transparent",
      borderColor: "border-gray-400/50 dark:border-gray-400/30",
      iconColor: "text-gray-700 dark:text-gray-300 group-hover:text-white"
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/ravindu.piyumal.0301/", // Replace with your real Facebook URL
      label: "Facebook",
      hoverColor: "group-hover:bg-blue-700",
      bgColor: "bg-transparent",
      borderColor: "border-gray-400/50 dark:border-gray-400/30",
      iconColor: "text-gray-700 dark:text-gray-300 group-hover:text-white"
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/_ravindu_piyumal_/", // Replace with your real Instagram URL
      label: "Instagram",
      hoverColor: "group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500",
      bgColor: "bg-transparent",
      borderColor: "border-gray-400/50 dark:border-gray-400/30",
      iconColor: "text-gray-700 dark:text-gray-300 group-hover:text-white"
    },
    { 
      icon: Mail, 
      href: "ravindupiyumal483@gmail.com", 
      label: "Email", 
      hoverColor: "group-hover:bg-red-500",
      bgColor: "bg-transparent",
      borderColor: "border-gray-400/50 dark:border-gray-400/30",
      iconColor: "text-gray-700 dark:text-gray-300 group-hover:text-white"
    },
  ]

  const scrollToContact = (href: string) => {
    if (href === "#contact") {
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      {/* Hide left sidebar icon on mobile */}
      {(!isMobile && !showSocialIcons) && (
        <div
          className={`fixed left-0 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-500 ease-out
            ${showToggle ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
        >
          <button
            onClick={toggleSocialIcons}
            className="w-5 h-7 bg-[#6c63ff] rounded-r-full focus:outline-none hover:bg-[#5a52d4] transition-colors duration-200"
            aria-label="Show social links"
          >
            {/* No icon or content, just a left half-circle */}
          </button>
        </div>
      )}

      {/* Fixed Social Icons - shown when arrow is clicked */}
      <div 
        className={`fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block transition-all duration-500 ease-out ${
          showSocialIcons ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
      >
        {/* Border Box Container */}
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-xl">
          <div className="flex flex-col space-y-4">
            {socialLinks.map((social, index) => (
              <div key={index} className="relative group">
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (social.label === "Email") {
                      // For email, use mailto
                      window.location.href = `mailto:${social.href}`;
                      e.preventDefault();
                    } else if (social.href === "#contact") {
                      e.preventDefault();
                      scrollToContact(social.href);
                    } else if (social.href === "#") {
                      e.preventDefault(); // Prevent scroll to top/hero section
                    }
                    // Hide sidebar after click, except on hero section
                    if (window.scrollY >= 100) {
                      setIsVisible(false);
                      setShowSocialIcons(false);
                      setShowArrow(false);
                      setShowToggle(true);
                    }
                  }}
                  onMouseEnter={() => setHoveredIcon(social.label)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className={`w-12 h-12 ${social.bgColor} ${social.hoverColor} rounded-full shadow-lg flex items-center justify-center transition-all duration-500 border-2 ${social.borderColor} hover:scale-110 hover:translate-x-2 hover:shadow-xl group ${social.iconColor}`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 relative z-10 transition-all duration-500" />
                </a>

                {/* Animated Tooltip next to the icon */}
                <div 
                  className={`absolute left-16 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-gray-800 dark:text-gray-200 text-sm font-medium rounded-lg whitespace-nowrap pointer-events-none shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ${
                    hoveredIcon === social.label 
                      ? 'opacity-100 translate-x-0 scale-100' 
                      : 'opacity-0 translate-x-4 scale-95'
                  }`}
                >
                  {social.label}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-white/95 dark:bg-gray-900/95 rotate-45 border-l border-b border-gray-200 dark:border-gray-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Original Social Icons - shown at top of page */}
      <div 
        className={`fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block transition-all duration-500 ease-out ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
      >
        <div className="flex flex-col space-y-4">
          {socialLinks.map((social, index) => (
            <div key={index} className="relative group">
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (social.label === "Email") {
                    window.location.href = `mailto:${social.href}`;
                    e.preventDefault();
                  } else if (social.href === "#contact") {
                    e.preventDefault();
                    scrollToContact(social.href);
                  } else if (social.href === "#") {
                    e.preventDefault();
                  }
                  if (window.scrollY >= 100) {
                    setIsVisible(false);
                    setShowSocialIcons(false);
                    setShowArrow(false);
                    setShowToggle(true);
                  }
                }}
                onMouseEnter={() => setHoveredIcon(social.label)}
                onMouseLeave={() => setHoveredIcon(null)}
                className={`w-12 h-12 ${social.bgColor} ${social.hoverColor} rounded-full shadow-lg flex items-center justify-center transition-all duration-500 border-2 ${social.borderColor} hover:scale-110 hover:translate-x-2 hover:shadow-xl group ${social.iconColor}`}
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5 relative z-10 transition-all duration-500" />
              </a>

              {/* Animated Tooltip next to the icon */}
              <div 
                className={`absolute left-16 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-gray-900/95 backdrop-blur-sm text-white text-sm font-medium rounded-lg whitespace-nowrap pointer-events-none shadow-xl border border-gray-700 transition-all duration-300 ${
                  hoveredIcon === social.label 
                    ? 'opacity-100 translate-x-0 scale-100' 
                    : 'opacity-0 translate-x-4 scale-95'
                }`}
              >
                {social.label}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900/95 rotate-45 border-l border-b border-gray-700" />
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Line */}
        <div className="w-px bg-gradient-to-b from-blue-500 to-purple-500 mx-auto mt-6 h-16" />
      </div>

      {/* Modern Mobile Floating Button & Modal */}
      {isMobile && (
        <>
          {/* Floating Action Button */}
          <button
            className={`fixed z-50 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-2xl flex items-center justify-center text-white focus:outline-none active:scale-95 transition-all duration-200
              hover:scale-110 hover:shadow-[0_12px_36px_0_rgba(80,80,200,0.35)]
              ${isMobileFabSmall ? 'w-10 h-10 bottom-3 right-3 text-2xl' : 'w-12 h-12 bottom-6 right-6 text-3xl'}`}
            onClick={() => setShowMobileModal(true)}
            aria-label="Open social links"
            style={{ boxShadow: '0 8px 32px 0 rgba(80, 80, 200, 0.25)' }}
          >
            <Plus className={isMobileFabSmall ? 'w-6 h-6' : 'w-7 h-7'} />
          </button>
          {/* Modal Overlay */}
          {showMobileModal && (
            <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/40 backdrop-blur-sm transition-all" onClick={() => setShowMobileModal(false)}>
              {/* Modal Card */}
              <div
                className="relative w-full max-w-xs mx-auto mb-8 sm:mb-0 bg-white/90 dark:bg-gray-900/95 rounded-3xl shadow-2xl p-6 flex flex-col items-center animate-fade-in-up"
                style={{ pointerEvents: 'auto' }}
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all text-xl"
                  onClick={() => setShowMobileModal(false)}
                  aria-label="Close social links"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="grid grid-cols-3 gap-5 mt-4 mb-2">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (social.label === "Email") {
                          window.location.href = `mailto:${social.href}`;
                          e.preventDefault();
                        } else if (social.href === "#contact") {
                          e.preventDefault();
                          scrollToContact(social.href);
                        } else if (social.href === "#") {
                          e.preventDefault();
                        }
                        setShowMobileModal(false);
                      }}
                      className={`w-12 h-12 ${social.bgColor} ${social.hoverColor} rounded-full shadow-xl flex items-center justify-center transition-all duration-500 border-2 ${social.borderColor} hover:scale-110 hover:shadow-2xl group ${social.iconColor}`}
                      aria-label={social.label}
                    >
                      <social.icon className="h-6 w-6 relative z-10 transition-all duration-500" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
