import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

function createStarTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, size, size);
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.3)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function Stars({ count = 400, color = '#b3cfff' }) {
  const mesh = useRef<THREE.Points>(null);
  // Generate random star positions
  const positions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const r = 100 + Math.random() * 200;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      arr.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }
    return new Float32Array(arr);
  }, [count]);

  // Memoize the star texture so it's only created once on the client
  const starTexture = useMemo(() => {
    if (typeof window === 'undefined') return undefined;
    return createStarTexture();
  }, []);

  // Twinkle effect: animate opacity of the stars
  const [twinkle, setTwinkle] = useState(0);
  useFrame((state) => {
    setTwinkle(Math.abs(Math.sin(state.clock.getElapsedTime() * 0.8)) * 0.4 + 0.6);
    if (mesh.current) {
      mesh.current.rotation.y += 0.0008;
      mesh.current.rotation.x += 0.0002;
    }
  });

  // Ensure a valid ReactNode is returned
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={3.5}
        sizeAttenuation
        transparent
        opacity={twinkle}
        map={starTexture}
        alphaTest={0.2}
        depthWrite={false}
      />
    </points>
  );
}

export default function Animated3DBackground() {
  // Animate the gradient shift using CSS animation
  // We'll toggle a class that animates the background gradient
  const [gradientClass, setGradientClass] = useState('bg-gradient-1');
  const { resolvedTheme } = useTheme();

  if (!resolvedTheme) {
    return <div style={{position: 'absolute', inset: 0, width: '100%', height: '100%', background: 'transparent', zIndex: 0}} />;
  }

  useEffect(() => {
    if (resolvedTheme !== 'dark') {
      const interval = setInterval(() => {
        setGradientClass((prev) => (prev === 'bg-gradient-1' ? 'bg-gradient-2' : 'bg-gradient-1'));
      }, 4000); // Change every 4 seconds
      return () => clearInterval(interval);
    } else {
      setGradientClass('bg-gradient-1');
    }
  }, [resolvedTheme]);

  const isDark = resolvedTheme === 'dark';

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden z-0 transition-colors duration-1000 ${gradientClass} ${isDark ? 'dark-bg' : 'light-bg'}`}
      style={isDark ? { backgroundColor: '#000' } : {}}
    >
      {/* Vignette overlay for depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          background: isDark
            ? 'radial-gradient(ellipse at center, rgba(10,10,20,0) 55%, rgba(5,5,15,0.96) 100%)'
            : 'radial-gradient(ellipse at center, rgba(255,255,255,0) 60%, rgba(180,200,255,0.35) 100%)',
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 250], fov: 75 }}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
      >
        <color attach="background" args={[isDark ? "#07071a" : "#eaf3ff"]} />
        <Stars count={600} color={isDark ? '#b3cfff' : '#7bb0ff'} />
      </Canvas>
      <style jsx global>{`
        .dark-bg.bg-gradient-1 {
          background: radial-gradient(ellipse at 60% 40%, #05071a 0%, #05071a 40%, #000 80%, #000 100%);
        }
        .dark-bg.bg-gradient-2 {
          background: radial-gradient(ellipse at 60% 40%, #05071a 0%, #05071a 40%, #000 80%, #000 100%);
        }
        .light-bg.bg-gradient-1 {
          background: radial-gradient(ellipse at 60% 40%, #eaf3ff 0%, #cbe2ff 60%, #f6fbff 100%);
        }
        .light-bg.bg-gradient-2 {
          background: radial-gradient(ellipse at 60% 40%, #f6fbff 0%, #eaf3ff 60%, #cbe2ff 100%);
        }
      `}</style>
    </div>
  );
} 