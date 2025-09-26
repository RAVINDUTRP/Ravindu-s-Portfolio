"use client"

import { GraduationCap, Calendar, MapPin, Check } from "lucide-react"
import { motion } from "framer-motion"
import { useScrollAnimationFramer } from "@/hooks/use-scroll-animation"
import { useState, useRef, useEffect } from "react"
import Animated3DBackground from "./animated-3d-background"
import { Badge } from "./ui/badge"
import { useTheme } from 'next-themes';
import { useIsMobile } from "@/components/ui/use-mobile";

export default function EducationSection() {
  const { ref, isInView } = useScrollAnimationFramer()
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const headingRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();


  const educationData = [
    {
      degree: "Bachelor of Science (Hons) in Information Technology",
      institution: "Sri Lanka Institute of Information Technology (SLIIT)",
      location: "Malabe, Sri Lanka",
      period: "2023 – 2027 (Present)",
      keyAreas: [
        "Web Development",
        "Mobile App Development",
        "UI/UX Design",
        "Software Engineering",
        "Artificial Intelligence"
      ],
      color: "from-blue-600 to-blue-400",
      link: "https://www.sliit.lk/",
      logo: "/assets/edu-images/sliit.png"
    },
    {
      degree: "G.C.E. Advanced Level (A/L) & Ordinary Level (O/L) Pass",
      institution: "Mahinda Rajapaksa College",
      location: "Homagama, Sri Lanka",
      period: "A/L: 2022 | O/L: 2019",
      al: {
        period: "2022",
        subjects: ["Engineering Technology", "Science for Technology", "Information and Communication Technology"]
      },
      ol: {
        period: "2019",
        subjects: []
      },
      color: "from-purple-600 to-purple-400",
      link: "https://www.facebook.com/100089047160805/about/?_rdr",
      logo: "/assets/edu-images/mrc.jpeg"
    },
    // Dummy education qualification
    {
      degree: "Primary School",
      institution: "Sripalee College",
      location: "Horana, Sri Lanka",
      period: "2009 - 2013",
      color: "from-gray-600 to-gray-400",
      link: " ",
      logo: "/assets/edu-images/sripalee.jpeg"
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.6
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.0,
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 100
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      scale: 0.9, 
      x: -100,
      rotateY: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 80
      }
    }
  }

  const timelineVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 1.8,
        ease: "easeOut" as const,
        delay: 0.3
      }
    }
  }

  const dotVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -180 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 200
      }
    }
  }

  const iconVariants = {
    hidden: { rotate: -360, scale: 0, y: 20 },
    visible: {
      rotate: 0,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 150
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 30, x: -20 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <div
      id="education"
      ref={sectionRef}
      className="py-20 relative overflow-hidden min-h-[600px] min-w-0"
      data-theme={resolvedTheme}
    >
      {/* Animated Universe Background */}
      <Animated3DBackground />
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.div ref={headingRef} variants={itemVariants} className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Education</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">My academic journey and achievements</p>
        </motion.div>
        <div className="relative">
          {/* Timeline vertical line */}
          {!isMobile && (
            <motion.div 
              variants={timelineVariants}
              className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full h-full origin-top transform -translate-x-1/2" 
              style={{ zIndex: 0 }} 
            />
          )}
          {/* Timeline cards */}
          <div className={isMobile ? "flex flex-col gap-8 items-center w-full" : "space-y-16"}>
            {educationData.map((edu, idx) => (
              <motion.div
                key={idx}
                ref={el => { cardRefs.current[idx] = el; }}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                className={isMobile ? "relative flex flex-col items-center w-full" : `relative flex items-center ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                onClick={() => {
                  const shouldOpen = openIdx !== idx;
                  setOpenIdx(shouldOpen ? idx : null);
                  if (shouldOpen) {
                    setIsScrolling(true);
                    setTimeout(() => {
                      cardRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      setTimeout(() => setIsScrolling(false), 900); // 900ms for slower, smoother scroll
                    }, 400);
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                {/* Timeline dot for desktop, top icon for mobile */}
                {isMobile ? (
                  openIdx === idx ? null : (
                    <div className="flex justify-center -mt-8 mb-2">
                      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg border-4 border-white dark:border-gray-800">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </span>
                    </div>
                  )
                ) : (
                  <motion.span 
                    variants={dotVariants}
                    className="absolute left-1/2 top-1/2 w-8 h-8 flex items-center justify-center p-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-4 border-white dark:border-gray-800 z-10 shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                  >
                    <GraduationCap className="w-5 h-5 text-white m-0 p-0" style={{ display: 'block' }} />
                  </motion.span>
                )}
                {/* Card: show logo box or details box, never both */}
                <div
                  className={isMobile ? "w-full max-w-md mx-auto" : `w-5/12 ${idx % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}
                >
                  {openIdx === idx ? (
                  <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    transition={{ opacity: { duration: 0.4, ease: 'easeInOut' }, height: { duration: 0.5, ease: 'easeInOut' } }}
                  >
                    {/* Custom rendering for A/L & O/L combined card */}
                    {edu.degree.includes('A/L') && edu.al && edu.ol ? (
                        <div className="border-4 border-blue-200 dark:border-blue-600 rounded-2xl shadow-xl shadow-blue-100 dark:shadow-blue-900 p-8 bg-white/90 dark:bg-gray-800">
                        {/* Small logo icon at top center */}
                        <div className="flex justify-center -mt-16 mb-4">
                          <img
                            src={edu.logo}
                            alt="Logo"
                            className="w-16 h-16 object-cover rounded-full shadow-lg border-4 border-white dark:border-gray-800 bg-white"
                            style={{ zIndex: 20, background: 'white', objectFit: 'contain' }}
                          />
                        </div>
                        <div className="space-y-4">
                          {/* A/L Section */}
                          <div className="py-2 space-y-4">
                            <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                              G.C.E. Advanced Level (A/L)
                            </div>
                            <div className="flex justify-start mb-2">
                              <span className="inline-flex items-center bg-green-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                                Pass
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                              <Calendar className="w-4 h-4" />
                              <span>{edu.al.period}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {edu.al.subjects.map((subject: string, i: number) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="rounded-full text-[10px] px-3 py-1 font-medium bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 shadow-sm text-blue-800 dark:text-blue-100"
                                >
                                  {subject}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <hr className="my-3 border-gray-300 dark:border-gray-700" />
                          {/* O/L Section */}
                          <div className="py-2 space-y-4 mt-12">
                            <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                              G.C.E. Ordinary Level (O/L)
                            </div>
                            <div className="flex justify-start mb-2">
                              <span className="inline-flex items-center bg-green-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                                Pass
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                              <Calendar className="w-4 h-4" />
                              <span>{edu.ol.period}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-2 min-h-[24px]">
                              {edu.ol.subjects.length > 0 ? (
                                edu.ol.subjects.map((subject: string, i: number) => (
                                  <Badge
                                    key={i}
                                    variant="secondary"
                                    className="rounded-full text-[10px] px-3 py-1 font-medium bg-purple-100 dark:bg-purple-900 border border-purple-200 dark:border-purple-700 shadow-sm text-purple-800 dark:text-purple-100"
                                  >
                                    {subject}
                                  </Badge>
                                ))
                              ) : (
                                <span className="inline-block" style={{ minWidth: '1em' }}>&nbsp;</span>
                              )}
                            </div>
                          </div>
                          {/* School name and location */}
                          <div className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-2 text-center">
                            {edu.institution.includes('Sripalee') ? (
                              <div 
                                className="text-lg font-semibold" 
                                style={{ color: resolvedTheme === 'dark' ? '#60a5fa' : '#2563eb' }}
                              >
                                {edu.institution}
                              </div>
                            ) : (
                              <a
                                href={edu.link}
                                className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {edu.institution}
                              </a>
                            )}
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                              <MapPin className="w-4 h-4" />
                              <span>{edu.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                        <div className="border-4 border-blue-200 dark:border-blue-600 rounded-2xl shadow-xl shadow-blue-100 dark:shadow-blue-900 p-8 bg-white/90 dark:bg-gray-800">
                        {/* Small logo icon at top center */}
                        <div className="flex justify-center -mt-16 mb-4">
                          <img
                            src={edu.logo}
                            alt="Logo"
                            className={`w-16 h-16 object-cover rounded-full shadow-lg border-4 border-white dark:border-gray-800 bg-white ${edu.institution.includes('SLIIT') ? 'p-1 bg-white' : ''}`}
                            style={edu.institution.includes('SLIIT') ? { zIndex: 20, background: 'white', objectFit: 'contain' } : { zIndex: 20 }}
                          />
                        </div>
                        <div className="space-y-4">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {edu.degree}
                          </div>
                          {edu.institution.includes('Sripalee') ? (
                            <div 
                              className="text-lg font-semibold" 
                              style={{ color: resolvedTheme === 'dark' ? '#60a5fa' : '#2563eb' }}
                            >
                              {edu.institution}
                            </div>
                          ) : (
                            <a href={edu.link} className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline block" target="_blank" rel="noopener noreferrer">
                              {edu.institution}
                            </a>
                          )}
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-5 h-5" />
                              <span>{edu.period}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-5 h-5" />
                              <span>{edu.location}</span>
                            </div>
                          </div>
                          {/* Show keyAreas as badges for SLIIT card only */}
                          {edu.institution.includes('SLIIT') && edu.keyAreas && edu.keyAreas.length > 0 && (
                            <div className="text-gray-700 dark:text-gray-300 pt-2 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2 mt-2">
                              {edu.keyAreas.map((area: string, i: number) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="rounded-full text-[10px] px-3 py-1 font-medium bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 shadow-sm text-blue-800 dark:text-blue-100"
                                >
                                  {area}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ opacity: { duration: 0.4, ease: 'easeInOut' }, height: { duration: 0.5, ease: 'easeInOut' } }}
                    >
                      <div className="flex items-center justify-center border-4 border-blue-200 dark:border-blue-600 rounded-2xl shadow-lg p-1 bg-white/80 dark:bg-white transition-transform duration-300 hover:scale-105 hover:shadow-2xl w-52 h-52 mx-auto">
                        <img
                          src={edu.logo}
                          alt="Logo"
                          className="w-40 h-40 object-cover rounded-xl"
                          onClick={isMobile ? () => setOpenIdx(idx) : undefined}
                          style={isMobile ? { cursor: 'pointer' } : {}}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
