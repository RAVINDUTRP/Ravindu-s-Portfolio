"use client"

import { useState } from "react";
import { Database, Cloud, Server, Code2, Layers, Cpu, Github, Settings, Send, Circle, BarChart2, PenTool, Brain, Smartphone, Terminal, MousePointer, FileCode, Palette, FileCode2, Braces, Coffee, DatabaseZap, Leaf, Route, Atom, Hexagon, Layout, Feather, GitBranch, Monitor, Bot } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import React from "react"; // Added missing import for React
import { motion } from "framer-motion";
import { useScrollAnimationFramer } from "@/hooks/use-scroll-animation";
import { useIsMobile } from "./ui/use-mobile";
import { ChevronDown } from "lucide-react";

const SKILLS = [
  { name: "C", icon: <Code2 className="w-8 h-8 text-white" />, subtitle: "Programming Language", iconBg: "bg-gradient-to-br from-blue-400 to-blue-700", glow: "shadow-[0_4px_32px_0_rgba(59,130,246,0.4)]", border: "border-blue-400", bgHover: "hover:bg-blue-900/40" },
  { name: "C++", icon: <Code2 className="w-8 h-8 text-white" />, subtitle: "Programming Language", iconBg: "bg-gradient-to-br from-blue-500 to-blue-800", glow: "shadow-[0_4px_32px_0_rgba(37,99,235,0.4)]", border: "border-blue-500", bgHover: "hover:bg-blue-900/40" },
  { name: "HTML5", icon: <FileCode className="w-8 h-8 text-white" />, subtitle: "Markup Language", iconBg: "bg-gradient-to-br from-orange-400 to-pink-500", glow: "shadow-[0_4px_32px_0_rgba(251,191,36,0.4)]", border: "border-orange-400", bgHover: "hover:bg-orange-900/40" },
  { name: "CSS", icon: <Palette className="w-8 h-8 text-white" />, subtitle: "Style Sheet Language", iconBg: "bg-gradient-to-br from-blue-400 to-blue-600", glow: "shadow-[0_4px_32px_0_rgba(59,130,246,0.4)]", border: "border-blue-400", bgHover: "hover:bg-blue-900/40" },
  { name: "JavaScript", icon: <FileCode2 className="w-8 h-8 text-white" />, subtitle: "Programming Language", iconBg: "bg-gradient-to-br from-yellow-400 to-yellow-600", glow: "shadow-[0_4px_32px_0_rgba(250,204,21,0.4)]", border: "border-yellow-400", bgHover: "hover:bg-yellow-900/40" },
  { name: "PHP", icon: <Braces className="w-8 h-8 text-white" />, subtitle: "Programming Language", iconBg: "bg-gradient-to-br from-indigo-400 to-indigo-700", glow: "shadow-[0_4px_32px_0_rgba(99,102,241,0.4)]", border: "border-indigo-400", bgHover: "hover:bg-indigo-900/40" },
  { name: "SQL Database", icon: <Database className="w-8 h-8 text-white" />, subtitle: "Database", iconBg: "bg-gradient-to-br from-blue-900 to-blue-400", glow: "shadow-[0_4px_32px_0_rgba(30,64,175,0.4)]", border: "border-blue-900", bgHover: "hover:bg-blue-900/40" },
  { name: "Java", icon: <Coffee className="w-8 h-8 text-white" />, subtitle: "Programming Language", iconBg: "bg-gradient-to-br from-red-400 to-orange-600", glow: "shadow-[0_4px_32px_0_rgba(251,113,133,0.4)]", border: "border-red-400", bgHover: "hover:bg-red-900/40" },
  { name: "MySQL", icon: <DatabaseZap className="w-8 h-8 text-white" />, subtitle: "Database", iconBg: "bg-gradient-to-br from-blue-400 to-blue-700", glow: "shadow-[0_4px_32px_0_rgba(59,130,246,0.4)]", border: "border-blue-400", bgHover: "hover:bg-blue-900/40" },
  { name: "MongoDB", icon: <Leaf className="w-8 h-8 text-white" />, subtitle: "Database", iconBg: "bg-gradient-to-br from-green-500 to-green-700", glow: "shadow-[0_4px_32px_0_rgba(16,185,129,0.4)]", border: "border-green-500", bgHover: "hover:bg-green-900/40" },
  { name: "Express.js", icon: <Route className="w-8 h-8 text-white" />, subtitle: "Framework", iconBg: "bg-gradient-to-br from-gray-700 to-black", glow: "shadow-[0_4px_32px_0_rgba(55,65,81,0.4)]", border: "border-gray-700", bgHover: "hover:bg-gray-900/40" },
  { name: "React", icon: <Atom className="w-8 h-8 text-white" />, subtitle: "Library", iconBg: "bg-gradient-to-br from-sky-400 to-blue-500", glow: "shadow-[0_4px_32px_0_rgba(56,189,248,0.4)]", border: "border-sky-400", bgHover: "hover:bg-sky-900/40" },
  { name: "Node.js", icon: <Hexagon className="w-8 h-8 text-white" />, subtitle: "Runtime", iconBg: "bg-gradient-to-br from-green-400 to-emerald-500", glow: "shadow-[0_4px_32px_0_rgba(34,197,94,0.4)]", border: "border-green-400", bgHover: "hover:bg-green-900/40" },
  { name: "Bootstrap", icon: <Layout className="w-8 h-8 text-white" />, subtitle: "Framework", iconBg: "bg-gradient-to-br from-purple-400 to-purple-600", glow: "shadow-[0_4px_32px_0_rgba(168,85,247,0.4)]", border: "border-purple-400", bgHover: "hover:bg-purple-900/40" },
  { name: "Kotlin", icon: <Feather className="w-8 h-8 text-white" />, subtitle: "Programming Language", iconBg: "bg-gradient-to-br from-purple-400 to-indigo-500", glow: "shadow-[0_4px_32px_0_rgba(139,92,246,0.4)]", border: "border-purple-400", bgHover: "hover:bg-purple-900/40" },
  { name: "Python", icon: <Code2 className="w-8 h-8 text-white" />, subtitle: "Programming Language", iconBg: "bg-gradient-to-br from-yellow-400 to-yellow-600", glow: "shadow-[0_4px_32px_0_rgba(250,204,21,0.4)]", border: "border-yellow-400", bgHover: "hover:bg-yellow-900/40" },
  { name: "Git", icon: <GitBranch className="w-8 h-8 text-white" />, subtitle: "Version Control", iconBg: "bg-gradient-to-br from-orange-400 to-red-500", glow: "shadow-[0_4px_32px_0_rgba(251,191,36,0.4)]", border: "border-orange-400", bgHover: "hover:bg-orange-900/40" },
  { name: "GitHub", icon: <Github className="w-8 h-8 text-white" />, subtitle: "Version Control", iconBg: "bg-gradient-to-br from-gray-400 to-gray-600", glow: "shadow-[0_4px_32px_0_rgba(156,163,175,0.4)]", border: "border-gray-400", bgHover: "hover:bg-gray-900/40" },
  { name: "VS Code", icon: <Monitor className="w-8 h-8 text-white" />, subtitle: "Editor", iconBg: "bg-gradient-to-br from-blue-400 to-blue-700", glow: "shadow-[0_4px_32px_0_rgba(59,130,246,0.4)]", border: "border-blue-400", bgHover: "hover:bg-blue-900/40" },
  { name: "Postman", icon: <Send className="w-8 h-8 text-white" />, subtitle: "API Tool", iconBg: "bg-gradient-to-br from-orange-400 to-yellow-500", glow: "shadow-[0_4px_32px_0_rgba(251,191,36,0.4)]", border: "border-orange-400", bgHover: "hover:bg-orange-900/40" },
  { name: "Eclipse", icon: <Circle className="w-8 h-8 text-white" />, subtitle: "IDE", iconBg: "bg-gradient-to-br from-indigo-400 to-indigo-700", glow: "shadow-[0_4px_32px_0_rgba(99,102,241,0.4)]", border: "border-indigo-400", bgHover: "hover:bg-indigo-900/40" },
  { name: "Android Studio", icon: <Smartphone className="w-8 h-8 text-white" />, subtitle: "IDE", iconBg: "bg-gradient-to-br from-green-400 to-green-700", glow: "shadow-[0_4px_32px_0_rgba(16,185,129,0.4)]", border: "border-green-400", bgHover: "hover:bg-green-900/40" },
  { name: "R Studio", icon: <BarChart2 className="w-8 h-8 text-white" />, subtitle: "IDE", iconBg: "bg-gradient-to-br from-blue-400 to-blue-700", glow: "shadow-[0_4px_32px_0_rgba(59,130,246,0.4)]", border: "border-blue-400", bgHover: "hover:bg-blue-900/40" },
  { name: "Figma", icon: <PenTool className="w-8 h-8 text-white" />, subtitle: "Design Tool", iconBg: "bg-gradient-to-br from-pink-400 to-purple-500", glow: "shadow-[0_4px_32px_0_rgba(232,121,249,0.4)]", border: "border-pink-400", bgHover: "hover:bg-pink-900/40" },
  { name: "IntelliJ IDEA", icon: <Brain className="w-8 h-8 text-white" />, subtitle: "IDE", iconBg: "bg-gradient-to-br from-gray-700 to-black", glow: "shadow-[0_4px_32px_0_rgba(55,65,81,0.4)]", border: "border-gray-700", bgHover: "hover:bg-gray-900/40" },
  { name: "Python IDLE", icon: <Terminal className="w-8 h-8 text-white" />, subtitle: "IDE", iconBg: "bg-gradient-to-br from-yellow-400 to-yellow-600", glow: "shadow-[0_4px_32px_0_rgba(250,204,21,0.4)]", border: "border-yellow-400", bgHover: "hover:bg-yellow-900/40" },
  { name: "Cursor", icon: <Bot className="w-8 h-8 text-white" />, subtitle: "Editor", iconBg: "bg-gradient-to-br from-indigo-400 to-indigo-700", glow: "shadow-[0_4px_32px_0_rgba(99,102,241,0.4)]", border: "border-indigo-400", bgHover: "hover:bg-indigo-900/40" },
];

// Add skill categories and percentages for the progress bar section
const SKILL_CARDS = [
  { name: "C", icon: <Code2 className="w-7 h-7" />, percent: 90, category: "Programming languages", color: "#4B8BBE" },
  { name: "C++", icon: <Code2 className="w-7 h-7" />, percent: 88, category: "Programming languages", color: "#00599C" },
  { name: "HTML5", icon: <FileCode className="w-7 h-7" />, percent: 95, category: "Programming languages", color: "#E34F26" },
  { name: "CSS", icon: <Palette className="w-7 h-7" />, percent: 92, category: "Programming languages", color: "#1572B6" },
  { name: "JavaScript", icon: <FileCode2 className="w-7 h-7" />, percent: 93, category: "Programming languages", color: "#F7DF1E" },
  { name: "PHP", icon: <Braces className="w-7 h-7" />, percent: 80, category: "Programming languages", color: "#777BB4" },
  { name: "SQL Database", icon: <Database className="w-7 h-7" />, percent: 85, category: "Database", color: "#003B57" },
  { name: "Java", icon: <Coffee className="w-7 h-7" />, percent: 87, category: "Programming languages", color: "#007396" },
  { name: "MySQL", icon: <DatabaseZap className="w-7 h-7" />, percent: 84, category: "Database", color: "#4479A1" },
  { name: "MongoDB", icon: <Leaf className="w-7 h-7" />, percent: 82, category: "Database", color: "#47A248" },
  { name: "Express.js", icon: <Route className="w-7 h-7" />, percent: 80, category: "Technologies & Frameworks", color: "#000000" },
  { name: "React", icon: <Atom className="w-7 h-7" />, percent: 95, category: "Technologies & Frameworks", color: "#61DAFB" },
  { name: "Node.js", icon: <Hexagon className="w-7 h-7" />, percent: 90, category: "Technologies & Frameworks", color: "#339933" },
  { name: "Bootstrap", icon: <Layout className="w-7 h-7" />, percent: 85, category: "Technologies & Frameworks", color: "#7952B3" },
  { name: "Kotlin", icon: <Feather className="w-7 h-7" />, percent: 75, category: "Programming languages", color: "#A97BFF" },
  { name: "Python", icon: <Code2 className="w-7 h-7" />, percent: 85, category: "Programming languages", color: "#3776AB" },
  { name: "Git", icon: <GitBranch className="w-7 h-7" />, percent: 90, category: "Tools", color: "#F05032" },
  { name: "GitHub", icon: <Github className="w-7 h-7" />, percent: 90, category: "Tools", color: "#181717" },
  { name: "VS Code", icon: <Monitor className="w-7 h-7" />, percent: 92, category: "Tools", color: "#007ACC" },
  { name: "Postman", icon: <Send className="w-7 h-7" />, percent: 85, category: "Tools", color: "#FF6C37" },
  { name: "Eclipse", icon: <Circle className="w-7 h-7" />, percent: 80, category: "Tools", color: "#2C2255" },
  { name: "Android Studio", icon: <Smartphone className="w-7 h-7" />, percent: 80, category: "Tools", color: "#3DDC84" },
  { name: "R Studio", icon: <BarChart2 className="w-7 h-7" />, percent: 75, category: "Tools", color: "#276DC3" },
  { name: "Figma", icon: <PenTool className="w-7 h-7" />, percent: 78, category: "Tools", color: "#A259FF" },
  { name: "IntelliJ IDEA", icon: <Brain className="w-7 h-7" />, percent: 80, category: "Tools", color: "#000000" },
  { name: "Python IDLE", icon: <Terminal className="w-7 h-7" />, percent: 70, category: "Tools", color: "#FFD43B" },
  { name: "Cursor", icon: <Bot className="w-7 h-7" />, percent: 75, category: "Tools", color: "#5D3FD3" },
];

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Programming languages", value: "Programming languages" },
  { label: "Technologies & Frameworks", value: "Technologies & Frameworks" },
  { label: "Database", value: "Database" },
  { label: "Tools", value: "Tools" },
];

export default function SkillsSection() {
  const { ref, isInView } = useScrollAnimationFramer();
  const isMobile = useIsMobile();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Duplicate skills for seamless infinite scroll
  const marqueeSkills = [...SKILLS, ...SKILLS];
  const [isPaused, setIsPaused] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [tabAnimKey, setTabAnimKey] = useState(0);
  const [showAllSkills, setShowAllSkills] = useState(false);

  function handleTabChange(value: string) {
    setActiveTab(value);
    setTabAnimKey((k) => k + 1); // force re-mount for animation
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.15,
        ease: "easeOut" as const
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  }

  const marqueeVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.1,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 25 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  }

  return (
    <motion.section 
      ref={ref}
      id="skills-section"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full py-20 px-4 bg-background text-foreground flex flex-col items-center"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-2 text-center">Skills & Technologies</h2>
        <p className="text-lg text-muted-foreground mb-8 text-center">Technologies I work with</p>
      </motion.div>

      {/* Marquee Row (unchanged) */}
      <motion.div variants={marqueeVariants} className="w-full max-w-full overflow-hidden">
        <div
          className={`flex gap-8 py-6 w-max animate-marquee${isPaused ? ' paused-marquee' : ''}`}
          style={{ minWidth: "100%" }}
        >
          {marqueeSkills.map((skill, i) => (
            <motion.div
              key={i + skill.name}
              whileHover={{ 
                scale: 1.12, 
                y: -12,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                transition: { 
                  duration: 0.5, 
                  ease: [0.25, 0.46, 0.45, 0.94] 
                }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              className={`flex items-center gap-4 bg-card rounded-2xl px-8 py-6 min-w-[300px] ${i % 2 === 0 ? 'wave-up' : 'wave-down'} ${skill.glow} hover:z-10 border border-border ${skill.bgHover} hover:${skill.border}`}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className={`rounded-xl ${skill.iconBg} p-3 flex items-center justify-center`}>
                {skill.icon}
              </div>
              <div>
                <div className="font-bold text-xl text-foreground">{skill.name}</div>
                <div className="text-sm text-muted-foreground">{skill.subtitle}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Skills Grid - Icon + Name only with See more/less */}
      <motion.div variants={itemVariants} className="w-full max-w-6xl mt-12">
        <Tabs defaultValue="all" onValueChange={handleTabChange}>
          {isMobile ? (
            <div className="w-full flex flex-col items-center mb-8 relative">
              {/* Overlay for blur/focus when dropdown is open */}
              {dropdownOpen && (
                <div
                  className="fixed inset-0 z-20 bg-background/60 backdrop-blur-sm transition-all"
                  onClick={() => setDropdownOpen(false)}
                  aria-label="Close category dropdown"
                />
              )}
              <button
                type="button"
                className="w-full max-w-xs flex items-center justify-between rounded-full px-5 py-2 text-base font-semibold bg-card text-foreground border border-border shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all z-30"
                onClick={() => setDropdownOpen((open) => !open)}
              >
                {CATEGORIES.find(c => c.value === activeTab)?.label || 'Select'}
                <ChevronDown className={`ml-2 h-5 w-5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full mt-2 w-full max-w-xs bg-card border border-border rounded-xl shadow-lg z-30 animate-fade-in">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      className={`w-full text-left px-5 py-2 text-base font-medium rounded-lg transition-colors ${activeTab === cat.value ? 'bg-gradient-to-r from-blue-500 to-sky-400 text-white' : 'hover:bg-muted text-foreground'}`}
                      onClick={() => { handleTabChange(cat.value); setDropdownOpen(false); }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <TabsList className="flex flex-wrap gap-3 justify-center mb-8 bg-transparent p-1">
              {CATEGORIES.map((cat) => (
                <TabsTrigger
                  key={cat.value}
                  value={cat.value}
                  className="rounded-full px-5 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-sky-400 data-[state=active]:shadow-lg data-[state=active]:text-white data-[state=inactive]:bg-card data-[state=inactive]:text-muted-foreground"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          )}
          {CATEGORIES.map((cat) => (
            <TabsContent key={cat.value} value={cat.value} className="w-full">
              <motion.div
                key={tabAnimKey + cat.value}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 transition-all duration-500 animate-fade-in-scale"
              >
                {(showAllSkills
                  ? SKILL_CARDS.filter((s) => cat.value === "all" || s.category === cat.label)
                  : SKILL_CARDS.filter((s) => cat.value === "all" || s.category === cat.label).slice(0, 6)
                ).map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={cardVariants}
                    whileHover={{ 
                      scale: 1.04, 
                      y: -6,
                      transition: { 
                        duration: 0.4, 
                        ease: [0.25, 0.46, 0.45, 0.94] 
                      }
                    }}
                    whileTap={{ 
                      scale: 0.98,
                      transition: { duration: 0.1 }
                    }}
                  >
                    <Card className="bg-card rounded-xl px-5 py-4 shadow-lg hover:shadow-xl transition-shadow border border-border">
                      <div className="flex items-center gap-4">
                        <div
                          className="flex items-center justify-center rounded-xl shadow-sm"
                          style={{ width: 40, height: 40, background: skill.color }}
                        >
                          {skill.icon && (
                            <span className="text-white text-xl">{skill.icon}</span>
                          )}
                        </div>
                        <span className="font-semibold text-base text-foreground">{skill.name}</span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
              {/* See more/less button for all screens */}
              {SKILL_CARDS.filter((s) => cat.value === "all" || s.category === cat.label).length > 6 && (
                <div className="flex justify-center mt-4">
                  {!showAllSkills ? (
                    <button
                      className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-sky-400 text-white font-semibold shadow-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onClick={() => setShowAllSkills(true)}
                    >
                      See more
                    </button>
                  ) : (
                    <button
                      className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-sky-400 text-white font-semibold shadow-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onClick={() => {
                        setShowAllSkills(false);
                        const section = document.getElementById('skills-section');
                        if (section) {
                          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        } else {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                    >
                      See less
                    </button>
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .paused-marquee {
          animation-play-state: paused !important;
        }
        .wave-up {
          transform: translateY(-18px);
        }
        .wave-down {
          transform: translateY(18px);
        }
      `}</style>
      <style jsx global>{`
        @keyframes fade-in-scale {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
      {/* Add fade-in animation for dropdown */}
      <style jsx global>{`
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(-8px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.18s cubic-bezier(0.4,0,0.2,1);
}
`}</style>
    </motion.section>
  );
}
