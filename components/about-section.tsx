"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useScrollAnimationFramer } from "@/hooks/use-scroll-animation"
import { useIsMobile } from "@/hooks/use-mobile"

export default function AboutSection() {
  const [selectedImage, setSelectedImage] = useState(0)
  const { ref, isInView } = useScrollAnimationFramer()
  const isMobile = useIsMobile();

  const images = [
    "/assets/images/propic1.jpeg",
    "/assets/images/propic2.JPG",
    "/assets/images/propic3.JPG",
    "/assets/images/propic4.jpg",
    "/assets/images/propic5.jpeg",
  ]

  const imageLabels = ["pic1", "pic2", "pic3", "pic4", "pic5"]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <motion.div 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="py-20 bg-gray-50 dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover my journey, passion, and the experiences that shape my work
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Gallery */}
          <motion.div variants={imageVariants} className="flex gap-4 items-center">
            {/* Main Image */}
            <div className="flex-1">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500">
                <Image
                  key={selectedImage}
                  src={images[selectedImage] || "/placeholder.svg"}
                  alt={imageLabels[selectedImage] || "About section image"}
                  fill
                  quality={100}
                  className={`object-cover ${selectedImage === 1 ? 'object-bottom' : ''} ${selectedImage === 3 ? 'object-cover-bottom scale-80' : ''} ${selectedImage === 4 ? 'object-cover-bottom scale-80' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

            {/* Thumbnail Column */}
            <div className="flex flex-col gap-6">
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative h-20 w-20 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 ${
                    selectedImage === index ? "ring-4 ring-blue-500 shadow-lg" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={image || "/placeholder.svg"} alt={imageLabels[index] || "About section image"} fill quality={100} className="object-cover" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-6 text-center lg:text-left">
            {/* Heading: Show desktop heading on both mobile and desktop */}
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white"> Hi! I’m Ravindu Piyumal Thilakarathna</h3>

            <motion.p 
              variants={itemVariants}
              className="text-sm xs:text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed text-center lg:text-left"
            >
            An undergraduate student at <b>SLIIT</b>, currently in my third year of studying for a Bachelor of Science <b>(BSc) Honours Degree in Information Technology</b>. I’m passionate about learning how technology works and enjoy building digital solutions that are both creative and practical. My interest in IT started with a curiosity for problem-solving and has grown into a strong desire to create user-friendly applications and systems.            </motion.p>

            <motion.p 
              variants={itemVariants}
              className="text-sm xs:text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed text-center lg:text-left"
            >
              I'm always eager to learn and grow through academic and personal projects. I enjoy working with modern technologies in web development, mobile apps, UI/UX design, and exploring the potential of AI. Discovering new tools and building creative solutions is something I truly enjoy.
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 pt-6 text-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">3rd Year</div>
                <div className="text-gray-600 dark:text-gray-400">Undergraduate at SLIIT</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">7+</div>
                <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
