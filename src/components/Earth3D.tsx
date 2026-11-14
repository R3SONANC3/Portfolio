'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import { useRef } from 'react'
import type { Group } from 'three'

const land = [
  { position: [-.5, .48, .76] as const, scale: [.43, .62, .12] as const, rotation: [0, -.45, -.35] as const },
  { position: [-.58, -.28, .72] as const, scale: [.28, .5, .1] as const, rotation: [0, -.5, .18] as const },
  { position: [.32, .5, .82] as const, scale: [.7, .34, .1] as const, rotation: [0, .32, .08] as const },
  { position: [.58, .02, .75] as const, scale: [.34, .46, .1] as const, rotation: [0, .58, -.14] as const },
  { position: [.62, -.56, .55] as const, scale: [.22, .16, .08] as const, rotation: [0, .7, .2] as const },
]

function Globe() {
  const globe = useRef<Group>(null)

  useFrame((_, delta) => {
    if (globe.current) globe.current.rotation.y += delta * .16
  })

  return <Float speed={1.6} rotationIntensity={.12} floatIntensity={.22}>
    <group ref={globe} rotation={[.12, -.35, -.12]}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1, 96, 96]} />
        <MeshDistortMaterial color="#087cac" roughness={.38} metalness={.1} distort={.08} speed={1.2} />
      </mesh>
      {land.map((piece, index) => <mesh key={index} position={piece.position} scale={piece.scale} rotation={piece.rotation}>
        <sphereGeometry args={[.72, 18, 18]} />
        <meshStandardMaterial color={index % 2 ? '#29b986' : '#67d49d'} roughness={.72} />
      </mesh>)}
      <mesh scale={1.025}>
        <sphereGeometry args={[1, 40, 40]} />
        <meshBasicMaterial color="#9ff8ff" wireframe transparent opacity={.12} />
      </mesh>
      <mesh scale={1.055}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial color="#66eaff" transparent opacity={.1} roughness={.1} transmission={.35} side={1} />
      </mesh>
    </group>
  </Float>
}

export default function Earth3D() {
  return <Canvas className="earth-canvas" dpr={[1, 1.75]} camera={{ position: [0, 0, 3.35], fov: 42 }} gl={{ alpha: true, antialias: true }}>
    <ambientLight intensity={.65} />
    <directionalLight position={[-3, 4, 5]} intensity={2.6} color="#d8ffff" />
    <pointLight position={[3, -2, 2]} intensity={18} color="#765cff" distance={7} />
    <Globe />
    <Sparkles count={20} scale={3.2} size={1.8} speed={.25} color="#bffcff" opacity={.6} />
  </Canvas>
}
