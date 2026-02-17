'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Float,
  MeshDistortMaterial,
} from '@react-three/drei'
import { useRef } from 'react'
import type * as THREE from 'three'

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#4f46e5"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
        />
      </mesh>
    </Float>
  )
}

function LaptopPlaceholder() {
  // Placeholder for a laptop - simple box geometry for now
  // In a real scenario, use useGLTF to load a model
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
      <group rotation={[0.5, -0.5, 0]}>
        {/* Base */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[3, 0.2, 2]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0.5, -1]} rotation={[-0.5, 0, 0]}>
          {/* Hinge point approximation */}
          <boxGeometry args={[3, 2, 0.1]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0, 0.5, -0.95]} rotation={[-0.5, 0, 0]}>
          <planeGeometry args={[2.8, 1.8]} />
          <meshStandardMaterial
            color="#000"
            emissive="#4f46e5"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
    </Float>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute top-0 right-0 -z-10 h-[50vh] w-full opacity-50 md:h-screen md:opacity-100">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        <group position={[0, 0, 0]}>
          <LaptopPlaceholder />
        </group>
        <group position={[-2, 1, -2]}>
          <FloatingShape />
        </group>
      </Canvas>
    </div>
  )
}
