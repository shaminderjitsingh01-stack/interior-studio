import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'studioName', title: 'Studio Name', type: 'string' }),
    defineField({ name: 'tagline', title: 'Hero Tagline', type: 'string' }),
    defineField({ name: 'email', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'string' }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video',
      type: 'file',
      options: { accept: 'video/*' },
      description: 'Upload the homepage hero video (MP4 recommended, under 20MB).',
    }),
    defineField({
      name: 'heroPoster',
      title: 'Hero Poster Image',
      type: 'image',
      description: 'Shown while video loads.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Social share preview image (1200×630px recommended).',
    }),
  ],
  preview: {
    select: { title: 'studioName' },
  },
})
