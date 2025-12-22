"use client"

import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useScrollAnimationFramer } from "@/hooks/use-scroll-animation"
import React, { useState, useRef, useEffect } from "react";

export default function ProjectsSection() {
  const { ref, isInView } = useScrollAnimationFramer();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
        staggerChildren: 0.25,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.1,
      },
    },
  }

  // Smoother, more pronounced card entrance motion
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.94, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Ultra-smooth ease-out-expo curve
      },
    },
  };

  const projects = [
    // Web Development
    {
      id: "web-1",
      title: "Coffee Shop",
      description: "A responsive, modern UI built with HTML, CSS & JavaScript. Clean layout, smooth interactions, and mobile-friendly design. Ideal as a stylish frontend or base for e-commerce.",
      image: "/assets/pro-images/coffee.jpg",
      technologies: ["Html", "CSS", "JavaScript"],
      githubLink: "https://github.com/RAVINDUTRP/Coffee-Shop.git",
      liveLink: "#",
      category: "Web Development",
      subCategory: "Frontend Development",
    },
    {
      id: "web-2",
      title: "Diamond Crown",
      description: "A full-stack e-commerce solution with user authentication, product management, and secure payments.",
      image: "/assets/pro-images/diamond-crown.jpg",
      technologies: ["React.js", "MongoDB", "Node.js", "Tailwind CSS", "Express.js"],
      githubLink: "https://github.com/RAVINDUTRP/Diamond-Crown",
      liveLink: "#",
      category: "Web Development",
      subCategory: "Full-Stack Development",
    },
    {
      id: "web-3",
      title: "Portfolio Website",
      description: "A modern, fully responsive personal portfolio website built to showcase projects, skills, and experience. Features smooth navigation, interactive UI components, and a clean design optimized for performance and accessibility.",
      image: "/assets/pro-images/portfolio1.png",
      technologies: ["TypeScript", "JavaScript", "CSS", "Tailwind CSS", "Next.js", "React"],
      githubLink: "https://github.com/RAVINDUTRP/Ravindu-s-Portfolio",
      liveLink: "https://beautiful-hamster-712e1d.netlify.app/",
      category: "Web Development",
      subCategory: "Frontend Development",
    },
    // Mobile Application
    {
      id: "mobile-1",
      title: "Fitness Tracker (Demo)",
      description: "A mobile app to track workouts, nutrition, and progress with real-time sync.",
      image: "/placeholder.svg?height=400&width=600&text=Fitness+App",
      technologies: ["React Native", "Expo", "Firebase"],
      githubLink: "#",
      liveLink: "#",
      category: "Mobile Application",
    },
    {
      id: "mobile-2",
      title: "Task Manager (Demo)",
      description: "A cross-platform mobile app for managing daily tasks and reminders.",
      image: "/placeholder.svg?height=400&width=600&text=Task+Manager",
      technologies: ["Flutter", "Dart"],
      githubLink: "#",
      liveLink: "#",
      category: "Mobile Application",
    },
    {
      id: "mobile-3",
      title: "Recipe App (Demo)",
      description: "A mobile app for discovering and sharing recipes.",
      image: "/placeholder.svg?height=400&width=600&text=Recipe+App",
      technologies: ["Kotlin", "Firebase"],
      githubLink: "#",
      liveLink: "#",
      category: "Mobile Application",
    },
    {
      id: "mobile-4",
      title: "Event Planner (Demo)",
      description: "A mobile app to plan and manage events with friends.",
      image: "/placeholder.svg?height=400&width=600&text=Event+Planner",
      technologies: ["Swift", "iOS"],
      githubLink: "#",
      liveLink: "#",
      category: "Mobile Application",
    },
    {
      id: "mobile-5",
      title: "Expense Tracker (Demo)",
      description: "A mobile app to track expenses and manage budgets.",
      image: "/placeholder.svg?height=400&width=600&text=Expense+Tracker",
      technologies: ["React Native", "Redux"],
      githubLink: "#",
      liveLink: "#",
      category: "Mobile Application",
    },
    {
      id: "mobile-6",
      title: "Language Learning App (Demo)",
      description: "A gamified mobile app for learning new languages.",
      image: "/placeholder.svg?height=400&width=600&text=Language+Learning",
      technologies: ["Flutter", "Firebase"],
      githubLink: "#",
      liveLink: "#",
      category: "Mobile Application",
    },
    // UI/UX Design
    {
      id: "uiux-1",
      title: "Food Ordering App - FoodFusion",
      description: "A modern, clean UI/UX design for a food ordering mobile app.",
      image: "/assets/pro-images/food-app.webp",
      technologies: ["Figma"],
      githubLink: "https://www.figma.com/proto/2riSRu7qxF4Y9doUb9V1lO/MAD-Assignment1?node-id=0-1&t=sq4VA7rNsUir0Fja-1",
      liveLink: "#",
      category: "UI/UX Design",
    },
    {
      id: "uiux-2",
      title: "wasi.lk",
      description: "A UI/UX redesign concept for Wasi.lk, designed in Figma from low-fidelity wireframes to high-fidelity UI with a focus on clarity, usability, and product discovery.",
      image: "/assets/pro-images/wasilk.png",
      technologies: ["Figma"],
      githubLink: "https://www.figma.com/proto/sAgZBPNCu8zC87vYdsUBeS/Wasi.lk?page-id=0%3A1&node-id=3-6&p=f&viewport=273%2C191%2C0.05&t=nAtg7nZeyCeFF2W6-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=3%3A6",
      liveLink: "#",
      category: "UI/UX Design",
    },
  ];

  const categories = [
    "Web Development",
    "Mobile Application",
    "UI/UX Design",
    "Other",
  ];
  const webSubcategories = [
    "All",
    "Frontend Development",
    "Backend Development",
    "Full-Stack Development",
    "DevOps / Deployment",
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedWebSub, setSelectedWebSub] = useState<string>(webSubcategories[0]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [selectedWebSub]);

  return (
    <motion.div 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">My Projects</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
            A collection of my recent work, showcasing my skills and passion for development.
          </p>
          <div className="flex justify-center gap-4 mb-2">
            <div className="flex flex-wrap gap-3 justify-center w-full">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-semibold rounded-full border-2 transition-all duration-200 focus:outline-none whitespace-nowrap
                    ${selectedCategory === category
                      ? 'bg-blue-700 text-white border-blue-700 dark:bg-blue-400 dark:text-gray-900 dark:border-blue-400 shadow-md'
                      : 'bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30'}
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          {selectedCategory === 'Web Development' && (
            <div className="flex justify-center gap-2 mt-4">
              <div className="flex flex-wrap gap-2 justify-center w-full">
                {webSubcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedWebSub(sub)}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none whitespace-nowrap border-b-2
                      ${selectedWebSub === sub
                        ? 'text-gray-900 dark:text-white border-gray-800 dark:border-gray-200'
                        : 'text-gray-600 dark:text-gray-300 border-transparent hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500'}
                    `}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <div className="mb-16">
          <motion.div
            ref={scrollRef}
            variants={containerVariants}
            className="flex gap-4 sm:gap-6 overflow-x-auto hide-scrollbar p-3 sm:p-6 mt-8"
          >
            {[...projects]
              .filter(p => p.category === selectedCategory)
              .filter(p => selectedCategory !== 'Web Development' || selectedWebSub === 'All' || (p as any).subCategory === selectedWebSub)
              .filter(p => selectedCategory !== 'Mobile Application' || !/demo/i.test(p.title + p.description))
              .reverse()
              .map((project, index) => {
              // Determine font size based on description length
              let descFontSize = "text-base";
              if (project.description.length < 80) descFontSize = "text-lg";
              else if (project.description.length > 180) descFontSize = "text-sm";

              return (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.03, // slightly less for subtlety
                    y: -6, // slightly less lift
                    boxShadow: "0 16px 40px 0 rgba(30,64,175,0.14)",
                    zIndex: 30,
                    transition: { 
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      mass: 0.8
                    }
                  }}
                  whileTap={{ 
                    scale: 0.985,
                    transition: { 
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }
                  }}
                  className="relative bg-gradient-to-br from-blue-50/80 via-white/80 to-blue-100/60 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-blue-100 dark:border-gray-700 rounded-3xl shadow-xl overflow-hidden group transition-all duration-500 min-w-[260px] max-w-[90vw] sm:min-w-[320px] sm:max-w-[320px]"
                  style={{ minHeight: 340 }}
                >
                  {/* Image Section */}
                  <div className="relative h-40 sm:h-52 w-full overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                  </div>
                  {/* Card Content */}
                  <div className="relative z-20 p-7 flex flex-col h-[calc(100%-13rem)]">
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight drop-shadow-sm">{project.title}</h3>
                    <p className={`text-gray-600 dark:text-gray-300 mb-4 flex-1 text-sm sm:${descFontSize}`}>{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-full shadow-sm border border-blue-200 dark:border-blue-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-auto items-center justify-center">
                      {project.category === "UI/UX Design" ? (
                        <div className="flex items-center h-full justify-end w-full">
                          <FigmaButton figmaLink={project.githubLink} />
                        </div>
                      ) : (
                        <>
                          {(project.liveLink && project.liveLink !== '#' && project.liveLink !== '##') ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className={`flex-1 border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400 transition-all duration-200 bg-transparent ${
                                project.title === "Portfolio Website"
                                  ? "hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:shadow-[0_0_10px_rgba(59,130,246,0.5),0_0_20px_rgba(59,130,246,0.3),0_0_30px_rgba(59,130,246,0.2)] hover:shadow-blue-500/50"
                                  : "hover:bg-blue-50 dark:hover:bg-blue-900/30"
                              }`}
                              asChild
                            >
                              <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Live Demo
                              </a>
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400 opacity-60 cursor-not-allowed bg-transparent"
                              disabled
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Live Demo
                            </Button>
                          )}
                          {project.githubLink && project.githubLink !== '#' && (
                            <div className="flex items-center h-full">
                              <GithubButton githubLink={project.githubLink} />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
       <style jsx global>{`
         .hide-scrollbar::-webkit-scrollbar {
           display: none;
         }
         .hide-scrollbar {
           -ms-overflow-style: none;
           scrollbar-width: none;
         }
         .scrollbar-hide {
           -ms-overflow-style: none;
           scrollbar-width: none;
         }
         .scrollbar-hide::-webkit-scrollbar {
           display: none;
         }
       `}</style>
      </div>
    </motion.div>
  )
}

function GithubButton({ githubLink }: { githubLink: string }) {
  const [isActive, setIsActive] = useState(false);
  const isDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return (
    <a
      href={githubLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View on GitHub"
      className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 border-none shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 p-0 group
        bg-white focus:ring-[#797979] ${isActive ? '' : 'hover:bg-gray-100'}
        `}
      style={{ WebkitTapHighlightColor: 'transparent' }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
      onClick={e => { setIsActive(false); (e.currentTarget as HTMLAnchorElement).blur(); }}
    >
      <span className={`block w-full h-full rounded-full overflow-hidden flex items-center justify-center transition-all duration-200
        ${isActive ? 'scale-95 shadow-none' : 'group-hover:scale-110 group-hover:shadow-[0_0_0_4px_rgba(36,41,47,0.15)]'}
      `}>
        <Image src="/assets/pro-images/github-light.svg" alt="GitHub" width={32} height={32} className="w-full h-full object-contain" />
      </span>
    </a>
  );
}

function FigmaButton({ figmaLink }: { figmaLink: string }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <a
      href={figmaLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View on Figma"
      className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 border-none shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 p-0 group
        bg-white dark:bg-black focus:ring-[#797979] ${isActive ? '' : 'hover:bg-gray-100'}
        `}
      style={{ WebkitTapHighlightColor: 'transparent' }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
      onClick={e => { setIsActive(false); (e.currentTarget as HTMLAnchorElement).blur(); }}
    >
      <span className={`block w-full h-full rounded-full overflow-hidden flex items-center justify-center transition-all duration-200
        ${isActive ? 'scale-95 shadow-none' : 'group-hover:scale-110 group-hover:shadow-[0_0_0_4px_rgba(36,41,47,0.15)]'}
      `}>
        <Image src="/assets/pro-images/figma.gif" alt="Figma" width={24} height={24} className="w-6 h-6 dark:w-5 dark:h-5 object-contain" />
      </span>
    </a>
  );
}
