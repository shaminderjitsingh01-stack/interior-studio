'use client'
import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  imageUrl?: string
  location?: string
  year?: string
  tags?: string[]
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  const hoveredProject = hoveredIdx !== null ? projects[hoveredIdx] : null
  const containerWidth = containerRef.current?.offsetWidth ?? 9999
  // Flip image to left side when near right edge
  const imgLeft = pos.x + 440 > containerWidth ? pos.x - 420 : pos.x + 40

  return (
    <div ref={containerRef} className="relative" onMouseMove={onMouseMove}>

      {/* Floating image — follows cursor */}
      <div
        className="absolute pointer-events-none overflow-hidden"
        style={{
          width: 380,
          height: 260,
          left: imgLeft,
          top: Math.max(0, pos.y - 130),
          opacity: hoveredProject?.imageUrl ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.22,1,0.36,1)',
          zIndex: 20,
        }}
      >
        {hoveredProject?.imageUrl && (
          <Image
            src={hoveredProject.imageUrl}
            alt={hoveredProject.title}
            fill
            className="object-cover"
            sizes="380px"
          />
        )}
      </div>

      {/* Rows */}
      {projects.map((project, i) => {
        const isHovered = hoveredIdx === i
        return (
          <Link
            key={project._id}
            href={`/portfolio/${project.slug.current}`}
            className="group block border-t border-border py-8 md:py-10"
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Number + Title */}
            <div className="flex items-baseline justify-between gap-6">
              <span
                className="font-display font-light leading-none shrink-0"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                  color: isHovered ? '#C9A96E' : '#E8E4DE',
                  transition: 'color 0.4s ease',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3
                className="font-display font-light text-right leading-none"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 5.5rem)',
                  color: isHovered ? '#8C7B6B' : '#1C1C1C',
                  transition: 'color 0.5s ease',
                }}
              >
                {project.title}
              </h3>
            </div>

            {/* Divider */}
            <div
              className="my-5 border-t"
              style={{
                borderColor: isHovered ? '#C9A96E' : '#E8E4DE',
                transition: 'border-color 0.4s ease',
              }}
            />

            {/* Meta */}
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.22em] text-mid-gray">
                {[project.tags?.[0], project.location, project.year].filter(Boolean).join('  ·  ')}
              </p>
              <span
                className="text-xs uppercase tracking-widest text-gold"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateX(0)' : 'translateX(-10px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                }}
              >
                View Project →
              </span>
            </div>
          </Link>
        )
      })}

      <div className="border-t border-border" />
    </div>
  )
}
