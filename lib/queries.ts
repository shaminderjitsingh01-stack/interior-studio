import { client } from './sanity'

export async function getFeaturedProjects(limit = 6) {
  if (!client) return []
  return client.fetch(
    `*[_type == "project"] | order(_createdAt desc) [0...$limit] {
      _id, title, slug, coverImage, location, year, tags
    }`,
    { limit: limit - 1 }
  )
}

export async function getAllProjects() {
  if (!client) return []
  return client.fetch(
    `*[_type == "project"] | order(year desc) {
      _id, title, slug, coverImage, location, year, tags
    }`
  )
}

export async function getAllProjectSlugs() {
  if (!client) return []
  return client.fetch(`*[_type == "project"]{ slug }`)
}

export async function getProjectBySlug(slug: string) {
  if (!client) return null
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id, title, slug, coverImage, gallery, description, location, year, tags
    }`,
    { slug }
  )
}

export async function getTestimonials() {
  if (!client) return []
  return client.fetch(`*[_type == "testimonial"] | order(_createdAt desc) { _id, name, location, quote }`)
}

export async function getAllPosts() {
  if (!client) return []
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, coverImage, excerpt, publishedAt
    }`
  )
}

export async function getAllPostSlugs() {
  if (!client) return []
  return client.fetch(`*[_type == "post"]{ slug }`)
}

export async function getPostBySlug(slug: string) {
  if (!client) return null
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, coverImage, excerpt, body, publishedAt
    }`,
    { slug }
  )
}
