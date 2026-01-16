"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useScrollAnimationFramer } from "@/hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send, Coffee } from "lucide-react"

export default function ContactSection() {
  const { ref, isInView } = useScrollAnimationFramer()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  )
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError(null)
    try {
      const res = await fetch('https://formspree.io/f/mwpqkabj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setError('Failed to send message')
        setStatus('error')
      }
    } catch (err) {
      setError('Failed to send message')
      setStatus('error')
    }
  }

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
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
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Ready to start your next project? Let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div variants={cardVariants} className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Message</h3>
            <form 
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  className="mt-2"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="mt-2"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  className="mt-2 min-h-[120px]"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </motion.div>
            </form>
            {status === 'success' && (
              <div className="mt-4 text-green-600 dark:text-green-400 font-medium">Message sent successfully!</div>
            )}
            {status === 'error' && (
              <div className="mt-4 text-red-600 dark:text-red-400 font-medium">Failed to send message</div>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={cardVariants} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Let's Connect</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I'm always interested in hearing about new opportunities and exciting projects. Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>



            <div className="space-y-6">
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Email</h4>
                  <p className="text-gray-600 dark:text-gray-400">ravindupiyumal483@gmail.com</p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-400">+94 74 012 0374</p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Location</h4>
                  <p className="text-gray-600 dark:text-gray-400">No.201/B Millaniya, Horana</p>
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="pt-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Follow Me</h4>
              <div className="flex gap-4 flex-wrap">
                {[
                  { name: "GitHub", href: "https://github.com/RAVINDUTRP", color: "bg-gray-500 hover:bg-gray-700" },
                  { name: "LinkedIn", href: "https://www.linkedin.com/in/ravindu-piyumal-7b0a592a8/", color: "bg-blue-600 hover:bg-blue-700" },
                  { name: "Buy me a coffee", href: "https://buymeacoffee.com/ravindupiyumal", color: "bg-amber-400 hover:bg-amber-300 text-slate-900" },
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${social.color} ${social.name === "Buy me a coffee" ? "" : "text-white"} px-4 py-2 rounded-lg transition-all duration-300 font-medium flex items-center gap-2`}
                  >
                    {social.name === "Buy me a coffee" ? (
                      <>
                        <Coffee className="h-4 w-4" />
                        <span className="font-['Cookie'] text-lg tracking-wide leading-none">Buy me a coffee</span>
                      </>
                    ) : (
                      social.name
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
