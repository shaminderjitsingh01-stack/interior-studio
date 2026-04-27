import Link from 'next/link'
import Image from 'next/image'

interface ProjectCardProps {
  project: {
    _id: string
    title: string
    slug: { current: string }
    imageUrl?: string
    location?: string
    year?: string
  }
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <div
      style={{
        opacity: 0,
        transform: 'translateY(28px)',
        animation: `fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s forwards`,
      }}
    >
      <Link href={`/portfolio/${project.slug.current}`} className="group block">
        <div className="relative overflow-hidden aspect-[4/5] mb-5 bg-cream">
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-[1.06]"
              style={{ transition: 'transform 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-cream" />
          )}
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-500" />
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-light group-hover:text-warm-stone transition-colors duration-300">
              {project.title}
            </h3>
            {project.location && (
              <p className="text-xs text-mid-gray uppercase tracking-widest mt-1">{project.location}</p>
            )}
          </div>
          {project.year && (
            <span className="text-xs text-warm-stone shrink-0 mt-1">{project.year}</span>
          )}
        </div>
      </Link>
    </div>
  )
}
