"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

interface Node {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
}

function createCircleTexture() {
  if (typeof window === 'undefined') return undefined
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.clearRect(0, 0, size, size)
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    )
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.5, 'rgba(255,255,255,1)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.fill()
  }
  const texture = new THREE.Texture(canvas)
  texture.needsUpdate = true
  return texture
}

function ConstellationNetwork({ count = 90 }) {
  const groupRef = useRef<THREE.Group>(null)
  const pointsGeomRef = useRef<THREE.BufferGeometry>(null)
  const { viewport } = useThree()

  // Generate circular texture map for points
  const circleTexture = useMemo(() => createCircleTexture(), [])

  // Pre-allocate node coordinates and colors
  const positions = useMemo(() => new Float32Array(count * 3), [count])
  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const choice = Math.random()
      let cColor = new THREE.Color("#06b6d4") // Cyan
      if (choice > 0.66) {
        cColor = new THREE.Color("#d946ef") // Magenta/Purple
      } else if (choice > 0.33) {
        cColor = new THREE.Color("#60a5fa") // Light Blue
      }
      arr[i * 3] = cColor.r
      arr[i * 3 + 1] = cColor.g
      arr[i * 3 + 2] = cColor.b
    }
    return arr
  }, [count])

  // Initialize nodes with random positions and slow velocities
  const nodes = useMemo(() => {
    const list: Node[] = []
    const rangeX = 5.5
    const rangeY = 3.5
    const rangeZ = 3.5
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * rangeX * 2
      const y = (Math.random() - 0.5) * rangeY * 2
      const z = (Math.random() - 0.5) * rangeZ * 2
      
      list.push({
        x, y, z,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        vz: (Math.random() - 0.5) * 0.15
      })
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    }
    return list
  }, [count, positions])

  useFrame((state, delta) => {
    if (!groupRef.current || !pointsGeomRef.current) return
    const time = state.clock.getElapsedTime()
    const cappedDelta = Math.min(delta, 0.1)

    // Map pointer coordinates to scene dimensions
    const px = state.pointer.x * (viewport.width / 1.6)
    const py = state.pointer.y * (viewport.height / 1.6)

    // Update node positions and apply cursor repulsion
    for (let i = 0; i < count; i++) {
      const node = nodes[i]

      node.x += node.vx * cappedDelta
      node.y += node.vy * cappedDelta
      node.z += node.vz * cappedDelta

      // Soft boundary checks - wrap around or smooth bounce
      const boundX = viewport.width / 2.0 + 1
      const boundY = viewport.height / 2.0 + 1
      const boundZ = 3.0

      if (Math.abs(node.x) > boundX) { node.vx *= -1; node.x = Math.sign(node.x) * boundX; }
      if (Math.abs(node.y) > boundY) { node.vy *= -1; node.y = Math.sign(node.y) * boundY; }
      if (Math.abs(node.z) > boundZ) { node.vz *= -1; node.z = Math.sign(node.z) * boundZ; }

      // Cursor Repulsion: push nodes away smoothly if they get too close to the pointer
      const dx = node.x - px
      const dy = node.y - py
      const dist = Math.sqrt(dx * dx + dy * dy)
      const forceRadius = 1.8
      if (dist < forceRadius) {
        const force = (forceRadius - dist) * 0.4
        // Push node direction
        node.x += (dx / (dist || 0.001)) * force * cappedDelta * 4
        node.y += (dy / (dist || 0.001)) * force * cappedDelta * 4
      }

      positions[i * 3] = node.x
      positions[i * 3 + 1] = node.y
      positions[i * 3 + 2] = node.z
    }
    pointsGeomRef.current.attributes.position.needsUpdate = true

    // Gentle global rotation and camera-follow tilt
    groupRef.current.rotation.y = time * 0.02
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -state.pointer.y * 0.12, 0.05)
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, state.pointer.x * 0.08, 0.05)
  })

  return (
    <group ref={groupRef}>
      {/* Nodes (Points) */}
      <points>
        <bufferGeometry ref={pointsGeomRef}>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
          map={circleTexture}
          alphaTest={0.01}
        />
      </points>
    </group>
  )
}

export default function Hero3D() {
  return (
    <div className="w-full h-full min-h-[100vh] flex items-center justify-center relative select-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1} />
        
        <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.1}>
          {/* 3D Tech Constellation Network */}
          <ConstellationNetwork count={95} />
        </Float>
      </Canvas>
      {/* Soft overlay glow */}
      <div className="absolute inset-0 pointer-events-none rounded-full bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5 blur-3xl" />
    </div>
  )
}
