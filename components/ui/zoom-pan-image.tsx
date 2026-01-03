"use client"

import React, { useRef, useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { ZoomIn, ZoomOut, Move } from "lucide-react"

interface ZoomPanImageProps {
  src: string
  alt: string
}

export default function ZoomPanImage({ src, alt }: ZoomPanImageProps) {
  const [scale, setScale] = useState(1)
  const constraintsRef = useRef<HTMLDivElement>(null)
  
  const zoomIn = (e: React.MouseEvent) => {
    e.stopPropagation()
    setScale(prev => Math.min(prev + 0.5, 4))
  }

  const zoomOut = (e: React.MouseEvent) => {
    e.stopPropagation()
    setScale(prev => Math.max(prev - 0.5, 1))
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-100 dark:bg-black/40 rounded-lg group" ref={constraintsRef}>
      <motion.img
        src={src}
        alt={alt}
        drag={scale > 1}
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        initial={{ scale: 1 }}
        animate={{ scale }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`w-full h-full object-contain cursor-${scale > 1 ? 'grab' : 'zoom-in'} active:cursor-grabbing`}
        style={{ touchAction: "none" }}
      />
      
      {/* Controls Overlay */}
      <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-sm p-1.5 rounded-full border border-white/10">
        <button 
          onClick={zoomOut}
          className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          disabled={scale <= 1}
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-white text-xs font-mono flex items-center px-1 min-w-[3ch]">{Math.round(scale * 100)}%</span>
        <button 
          onClick={zoomIn}
          className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          disabled={scale >= 4}
        >
          <ZoomIn className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
