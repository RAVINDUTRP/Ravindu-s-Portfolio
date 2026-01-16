"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Award, Trophy, GraduationCap, ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react"

import { useScrollAnimationFramer } from "@/hooks/use-scroll-animation"

import Animated3DBackground from "@/components/animated-3d-background"

type Achievement = {
  title: string
  issuer: string
  year: string
  type: string
  credentialUrl?: string
  icon?: React.ComponentType<{ className?: string }>
  image?: string
}

const achievements: Achievement[] = [
  {
    title: "AI/ML Engineer - Stage 1",
    issuer: "Centre for Open and Distance Education - SLIIT",
    year: "2025",
    type: "Certificate",
    credentialUrl: "https://code.sliit.org/certificates/6watlhu8tn",
    icon: Award,
    image: "/assets/achivements/AI:ML.png"
  },
  {
    title: "AI/ML Engineer - Stage 2",
    issuer: "Centre for Open and Distance Education - SLIIT",
    year: "2026",
    type: "Certificate",
    credentialUrl: "https://code.sliit.org/certificates/7hd3rjbj4x",
    icon: Award,
    image: "/assets/achivements/AI:ML2.png"
  },

]

export default function AchivementSection() {
  const { ref, isInView } = useScrollAnimationFramer()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showFullCertificate, setShowFullCertificate] = useState(false)
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative py-20 overflow-hidden"
    >
      <Animated3DBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 via-amber-300 to-orange-400 shadow-xl flex items-center justify-center border-2 border-yellow-200 dark:border-yellow-500/60"
            >
              <Image
                src="/assets/images/achievement-medal.png"
                alt="Achievement medal"
                fill
                sizes="80px"
                className="object-contain p-3 drop-shadow-md"
              />
            </motion.div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            My Achivements &amp; Certificates
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Highlights of the milestones, recognitions, and certifications that mark my journey of growth and achievement.
          </p>
        </motion.div>

        <div className="relative">
          {achievements.length > 1 && (
            <>
              <button 
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:bg-white/20 hover:scale-110 transition-all duration-300 hidden md:flex items-center justify-center group"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4 text-slate-700 dark:text-white group-hover:-translate-x-0.5 transition-transform" />
              </button>

              <button 
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:bg-white/20 hover:scale-110 transition-all duration-300 hidden md:flex items-center justify-center group"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4 text-slate-700 dark:text-white group-hover:translate-x-0.5 transition-transform" />
              </button>
            </>
          )}

          <motion.div
            ref={scrollContainerRef}
            variants={containerVariants}
            className={`flex overflow-x-auto pb-8 gap-8 px-4 snap-x scrollbar-hide ${achievements.length === 1 ? "justify-center" : ""}`}
          >
          {achievements.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="inter-var snap-center flex-shrink-0">
                <div 
                  onClick={() => setSelectedAchievement(item)}
                  className="bg-gradient-to-br from-white via-slate-50 to-amber-50/40 dark:from-slate-900 dark:via-slate-900/80 dark:to-amber-900/10 relative group/card border-slate-200/80 dark:border-slate-700/80 w-auto sm:w-[24rem] h-auto rounded-xl p-6 border hover:shadow-2xl hover:shadow-amber-500/20 transition-shadow duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-amber-300 to-orange-400 shadow-md flex items-center justify-center border border-yellow-200/80 dark:border-yellow-500/70">
                        {Icon ? (
                          <Icon className="w-6 h-6 text-slate-900" />
                        ) : (
                          <span className="text-2xl">🏅</span>
                        )}
                      </div>
                    </div>
                    <div 
                      className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-700/50 shadow-sm"
                    >
                      {item.year}
                    </div>
                  </div>

                  <div
                    className="text-xl font-bold text-slate-900 dark:text-white mb-2"
                  >
                    {item.title}
                  </div>
                  
                  <p
                    className="text-slate-600 dark:text-slate-300 text-sm mb-4"
                  >
                    {item.issuer}
                  </p>



                  <div className="flex items-center justify-between mt-auto">
                    <div
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {item.type}
                    </div>


                  </div>
                  
                  <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl z-10">
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-3 rounded-full bg-transparent border border-amber-500 text-amber-600 dark:text-amber-500 shadow-lg shadow-amber-500/20">
                        <ExternalLink className="w-6 h-6" />
                      </div>
                      <span className="text-slate-900 dark:text-white font-bold text-sm tracking-wide uppercase">View Certificate</span>
                    </div>
                  </div>
                  
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-amber-100/30 via-transparent to-transparent dark:from-amber-500/10 rounded-b-xl" />
                </div>
              </div>
            )
          })}
        </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedAchievement(null)
              setShowFullCertificate(false)
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
          >
            {showFullCertificate ? (
               <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full h-full max-w-[95vw] max-h-[95vh] flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
               >
                  <button
                    onClick={() => setShowFullCertificate(false)}
                    className="absolute top-4 right-4 z-50 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md border border-white/10 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
                     {selectedAchievement.image && (
                        <Image
                           src={selectedAchievement.image}
                           alt={selectedAchievement.title}
                           fill
                           className="object-contain"
                           quality={100}
                        />
                     )}
                  </div>
                  <p className="mt-4 text-white font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                     {selectedAchievement.title}
                  </p>
               </motion.div>
            ) : (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(245,158,11,0.2)] border border-slate-200/60 dark:border-amber-400/50"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white hover:bg-red-500 hover:text-white hover:rotate-90 transition-all duration-300 border border-slate-200 dark:border-white/5"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row h-full max-h-[85vh] md:h-[600px]">
                {/* View Mode Switcher - Overlaid on Image */}
                <div className="relative w-full md:w-[65%] h-[300px] md:h-full bg-slate-100 dark:bg-[#0B0F19] p-4 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/5 group/image">
                  {selectedAchievement.image ? (
                    <>
                      <div className="relative w-full h-full">
                        <Image
                          src={selectedAchievement.image}
                          alt={selectedAchievement.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <button
                        onClick={() => setShowFullCertificate(true)}
                        className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border border-white/20 flex items-center gap-2 opacity-0 group-hover/image:opacity-100 transition-opacity transform translate-y-2 group-hover/image:translate-y-0"
                      >
                        <span>View Fullscreen</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-600">
                      <Award className="w-20 h-20 mb-3 opacity-50" />
                      <p className="text-sm font-medium">No previews available</p>
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="w-full md:w-[35%] p-6 md:p-8 flex flex-col bg-white dark:bg-[#0F172A] overflow-y-auto">
                  <div className="mb-auto">
                    {/* Year Pill */}
                    <div className="mb-6">
                       <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-700/50">
                          {selectedAchievement.year}
                       </span>
                    </div>

                    {/* Title & Issuer */}
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">
                      {selectedAchievement.title}
                    </h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {selectedAchievement.issuer}
                    </p>
                    
                    {/* Certificate Type Box */}
                    <div className="mt-8 flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                      <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-full text-amber-600 dark:text-amber-500 ring-1 ring-amber-500/20">
                        {selectedAchievement.icon ? <selectedAchievement.icon className="w-6 h-6" /> : <Award className="w-6 h-6" />}
                      </div>
                      <span className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                        {selectedAchievement.type}
                      </span>
                    </div>
                  </div>

                  {selectedAchievement.credentialUrl && selectedAchievement.credentialUrl !== "#" && (
                    <div className="mt-8">
                       <a 
                        href={selectedAchievement.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 font-bold shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <span className="relative z-10">Verify Credential</span>
                        <ExternalLink className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> {/* Hover gradient overlay for dark mode buttons often looks weird, keeping simple implies dark mode specific handling effectively done by bg colors above. For text-white button, simple hover lift is nice. */}
                      </a>
                      <p className="text-xs text-center text-slate-400 mt-3">
                        Verifies authenticity via external provider
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
