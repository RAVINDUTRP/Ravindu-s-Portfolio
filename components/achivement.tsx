"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useScrollAnimationFramer } from "@/hooks/use-scroll-animation"

type Achievement = {
  title: string
  issuer: string
  year: string
  type: string
}

// Add your achievements here. Each object will render as a card.
const achievements: Achievement[] = [
  {
    title: "AI/ML Engineer - Stage 1",
    issuer: "Centre for Open and Distance Education - SLIIT",
    year: "2025",
    type: "Certificate",
  },
]

export default function AchivementSection() {
  const { ref, isInView } = useScrollAnimationFramer()

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
      className="py-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-amber-300 to-orange-400 shadow-lg flex items-center justify-center border border-yellow-200 dark:border-yellow-500/60">
              <Image
                src="/assets/images/achievement-medal.png"
                alt="Achievement medal"
                fill
                sizes="64px"
                className="object-contain p-2"
              />
            </div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            My Achivements &amp; Certificates
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A snapshot of the milestones, recognitions, and certifications I&apos;ve earned along my journey as a
            developer and designer.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="flex justify-center"
        >
          {achievements.length === 0 ? (
            // Single centered dummy card when there are no achievements yet
            <motion.div
              variants={itemVariants}
              className="max-w-md w-full relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-gradient-to-br from-white via-slate-50 to-amber-50/40 dark:from-slate-900 dark:via-slate-900/80 dark:to-amber-900/10 p-5 sm:p-6"
            >
              <div className="flex items-start gap-4">
                <div className="relative mt-1 flex-shrink-0">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-yellow-400 via-amber-300 to-orange-400 shadow-md flex items-center justify-center border border-yellow-200/80 dark:border-yellow-500/70">
                    <span className="text-xl">🏅</span>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-base sm:text-lg text-slate-900 dark:text-slate-50 mb-1.5">
                    Your first achievement goes here
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                    Add a new achievement in <code>components/achivement.tsx</code> to replace this dummy card.
                  </p>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200 border border-amber-200/70 dark:border-amber-500/40">
                    Example type
                  </span>
                </div>
              </div>
            </motion.div>
          ) : achievements.length === 1 ? (
            // One real card: center it
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -6,
                scale: 1.02,
                boxShadow: "0 18px 45px rgba(15,23,42,0.18)",
              }}
              className="max-w-md w-full relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-gradient-to-br from-white via-slate-50 to-amber-50/40 dark:from-slate-900 dark:via-slate-900/80 dark:to-amber-900/10 p-5 sm:p-6"
            >
              {(() => {
                const item = achievements[0]
                return (
                  <div className="flex items-start gap-4">
                    <div className="relative mt-1 flex-shrink-0">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-yellow-400 via-amber-300 to-orange-400 shadow-md flex items-center justify-center border border-yellow-200/80 dark:border-yellow-500/70">
                        <span className="text-xl">🏅</span>
                      </div>
                      <span className="absolute -bottom-1 -right-1 text-[11px] px-1.5 py-0.5 rounded-full bg-slate-900 text-amber-300 font-semibold shadow-sm">
                        {item.year}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-base sm:text-lg text-slate-900 dark:text-slate-50 mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                        {item.issuer}
                      </p>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200 border border-amber-200/70 dark:border-amber-500/40">
                        {item.type}
                      </span>
                    </div>
                  </div>
                )
              })()}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-amber-100/30 via-transparent to-transparent dark:from-amber-500/10" />
            </motion.div>
          ) : (
            // Multiple cards: left-aligned grid
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                    boxShadow: "0 18px 45px rgba(15,23,42,0.18)",
                  }}
                  className="relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-gradient-to-br from-white via-slate-50 to-amber-50/40 dark:from-slate-900 dark:via-slate-900/80 dark:to-amber-900/10 p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative mt-1 flex-shrink-0">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-yellow-400 via-amber-300 to-orange-400 shadow-md flex items-center justify-center border border-yellow-200/80 dark:border-yellow-500/70">
                        <span className="text-xl">🏅</span>
                      </div>
                      <span className="absolute -bottom-1 -right-1 text-[11px] px-1.5 py-0.5 rounded-full bg-slate-900 text-amber-300 font-semibold shadow-sm">
                        {item.year}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-base sm:text-lg text-slate-900 dark:text-slate-50 mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                        {item.issuer}
                      </p>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200 border border-amber-200/70 dark:border-amber-500/40">
                        {item.type}
                      </span>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-amber-100/30 via-transparent to-transparent dark:from-amber-500/10" />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}


