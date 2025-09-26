"use client"

import { Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="w-full bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3">
        <div className="flex flex-col items-center space-y-2">
          <p className="text-muted-foreground text-xs flex items-center justify-center text-center">
            © {currentYear} All rights reserved. Made with{' '}
            <Heart className="h-3 w-3 text-red-500 mx-1" />
            by{' '}
            <span className="text-theme-primary font-medium ml-1">ravindu piyumal</span>
          </p>
          <div className="flex justify-center space-x-4 text-xs">
            <a href="#" className="text-muted-foreground hover:text-theme-primary transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-theme-primary transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 