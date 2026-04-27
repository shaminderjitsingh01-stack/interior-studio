import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const isConfigured = /^[a-z0-9-]+$/.test(projectId ?? '')

export const client = isConfigured
  ? createClient({
      projectId: projectId!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
      apiVersion: '2025-01-01',
      useCdn: process.env.NODE_ENV === 'production',
    })
  : null

const builder = isConfigured ? imageUrlBuilder(client!) : null

const noop: any = new Proxy(
  { url: () => '' },
  { get: (t, p) => (p === 'url' ? () => '' : () => noop) }
)

export const urlFor = (source: SanityImageSource) =>
  builder ? builder.image(source) : noop
