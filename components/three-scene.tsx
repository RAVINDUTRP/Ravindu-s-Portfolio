"use client"

import { useEffect, useState, useRef } from "react"
import * as THREE from "three"

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create particles
    const particleCount = 2000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      // Blue, purple, pink palette
      const colorChoice = Math.random()
      if (colorChoice < 0.33) {
        // Blue
        colors[i * 3] = 0.32; // r (blue)
        colors[i * 3 + 1] = 0.45; // g
        colors[i * 3 + 2] = 0.98; // b
      } else if (colorChoice < 0.66) {
        // Purple
        colors[i * 3] = 0.62; // r (purple)
        colors[i * 3 + 1] = 0.36; // g
        colors[i * 3 + 2] = 0.98; // b
      } else {
        // Pink
        colors[i * 3] = 0.98; // r (pink)
        colors[i * 3 + 1] = 0.36; // g
        colors[i * 3 + 2] = 0.62; // b
      }
      sizes[i] = Math.random() * 2 + 1
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.5, // softer
      sizeAttenuation: true
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)
    particlesRef.current = particles

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      if (particlesRef.current) {
        // Slow, gentle rotation
        particlesRef.current.rotation.x += mouseRef.current.y * 0.0003
        particlesRef.current.rotation.y += mouseRef.current.x * 0.0003
        // Subtle automatic movement
        particlesRef.current.rotation.x += 0.0002
        particlesRef.current.rotation.y += 0.0003
        particlesRef.current.rotation.z += 0.0001
      }

      // Slow camera movement
      camera.position.x += (mouseRef.current.x * 0.3 - camera.position.x) * 0.02
      camera.position.y += (mouseRef.current.y * 0.3 - camera.position.y) * 0.02
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [mounted])

  if (!mounted) {
    return (
      <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading 3D Scene...</div>
      </div>
    )
  }

  // Render nothing after mounting
  return null;
}
