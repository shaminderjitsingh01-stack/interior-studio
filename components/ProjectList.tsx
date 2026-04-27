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
  const imgLeft = pos.x + 440 > containerWidth ? pos.x - 420 : pos.x + 40

  return (
    <div ref={containerRef} className="relative" onMouseMove={onMouseMove}>

      {/* Floating image — desktop hover only */}
      <div
        className="absolute pointer-events-none overflow-hidden hidden md:block"
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

      {projects.map((project, i) => {
        const isHovered = hoveredIdx === i
        return (
          <Link
            key={project._id}
            href={`/portfolio/${project.slug.current}`}
            className="group block border-t border-border py-7 md:py-10"
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Mobile: stacked. Desktop: side by side */}
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-6">
              {/* Number */}
              <span
                className="font-display font-light leading-none shrink-0 text-4xl md:text-6xl lg:text-8xl"
                style={{
                  color: isHovered ? '#C9A96E' : '#E8E4DE',
                  transition: 'color 0.4s ease',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Title */}
              <h3
                className="font-display font-light leading-none md:text-right text-3xl md:text-5xl lg:text-7xl"
                style={{
                  color: isHovered ? '#8C7B6B' : '#1C1C1C',
                  transition: 'color 0.5s ease',
                }}
              >
                {project.title}
              </h3>
            </div>

            {/* Divider */}
            <div
              className="my-4 border-t"
              style={{
                borderColor: isHovered ? '#C9A96E' : '#E8E4DE',
                transition: 'border-color 0.4s ease',
              }}
            />

            {/* Meta */}
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.18em] text-mid-gray">
                {[project.tags?.[0], project.location, project.year].filter(Boolean).join('  ·  ')}
              </p>
              <span
                className="text-xs uppercase tracking-widest text-gold hidden md:block"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateX(0)' : 'translateX(-10px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                }}
              >
                View Project →
              </span>
              {/* Mobile: always show arrow */}
              <span className="text-xs text-gold md:hidden">→</span>
            </div>
          </Link>
        )
      })}

      <div className="border-t border-border" />
    </div>
  )
}
