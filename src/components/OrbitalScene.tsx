'use client'

import { useEffect, useState } from 'react'
import Earth3D from './Earth3D'

const stars = Array.from({ length: 64 }, (_, index) => ({ id: index, x: `${(index * 31 + 3) % 100}%`, y: `${(index * 57 + 11) % 100}%`, size: 1 + index % 3, delay: `${index % 8 * -.6}s` }))

export default function OrbitalScene() {
  const [tilt, setTilt] = useState({ x: -8, y: 8 })
  useEffect(() => { const move = (event: MouseEvent) => setTilt({ x: -8 - (event.clientY / innerHeight - .5) * 10, y: 8 + (event.clientX / innerWidth - .5) * 12 }); addEventListener('mousemove', move, { passive: true }); return () => removeEventListener('mousemove', move) }, [])
  return <div className="orbit-scene" aria-hidden="true"><div className="scene-stars">{stars.map((star) => <i key={star.id} style={{ left: star.x, top: star.y, width: star.size, height: star.size, animationDelay: star.delay }} />)}</div><div className="scene-system" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}><div className="scene-aura" /><div className="scene-orbit orbit-one"><b>&lt;/&gt;</b></div><div className="scene-orbit orbit-two"><b>TS</b></div><div className="scene-orbit orbit-three"><b>AI</b></div><div className="scene-earth"><Earth3D /></div><div className="scene-base" /><p className="scene-code">EARTH / 001</p><p className="scene-caption">GLOBAL BY DESIGN</p></div></div>
}
