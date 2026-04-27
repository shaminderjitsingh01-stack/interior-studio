import ProjectCard from './ProjectCard'
import { urlFor } from '@/lib/sanity'

export default function ProjectGrid({ projects }: { projects: any[] }) {
  if (!projects?.length) {
    return (
      <div className="text-center py-32 text-mid-gray">
        <p className="font-display text-3xl italic font-light">Projects coming soon.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
      {projects.map((project, index) => (
        <ProjectCard
          key={project._id}
          index={index}
          project={{
            _id: project._id,
            title: project.title,
            slug: project.slug,
            imageUrl: project.coverImage
              ? urlFor(project.coverImage).width(800).height(1000).url()
              : undefined,
            location: project.location,
            year: project.year,
          }}
        />
      ))}
    </div>
  )
}
