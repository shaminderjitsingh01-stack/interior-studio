import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'One or two sentences shown on the portfolio grid.',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      placeholder: 'e.g. Orchard, Singapore',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      placeholder: 'e.g. 2024',
    }),
    defineField({
      name: 'tags',
      title: 'Category',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Residential', value: 'Residential' },
          { title: 'Commercial', value: 'Commercial' },
          { title: 'Hospitality', value: 'Hospitality' },
          { title: 'Renovation', value: 'Renovation' },
          { title: 'New Build', value: 'New Build' },
        ],
      },
    }),
    defineField({
      name: 'sections',
      title: 'Project Sections',
      description: 'Add sections like "The Brief", "The Concept", "Living Spaces", etc.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'projectSection',
          title: 'Section',
          fields: [
            {
              name: 'heading',
              title: 'Section Heading',
              type: 'string',
              placeholder: 'e.g. The Brief, The Concept, Materials & Palette',
            },
            {
              name: 'body',
              title: 'Text',
              type: 'array',
              of: [{ type: 'block' }],
            },
            {
              name: 'image',
              title: 'Section Image (optional)',
              type: 'image',
              options: { hotspot: true },
              fields: [{ name: 'caption', type: 'string', title: 'Caption' }],
            },
            {
              name: 'layout',
              title: 'Image Layout',
              type: 'string',
              options: {
                list: [
                  { title: 'Image on Right', value: 'image-right' },
                  { title: 'Image on Left', value: 'image-left' },
                  { title: 'Full Width Image', value: 'image-full' },
                  { title: 'Text Only', value: 'text-only' },
                ],
                layout: 'radio',
              },
              initialValue: 'image-right',
            },
          ],
          preview: {
            select: { title: 'heading', media: 'image' },
            prepare: ({ title, media }: any) => ({
              title: title || 'Untitled Section',
              media,
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Final Gallery',
      description: 'Additional images shown at the bottom of the project page.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
        },
      ],
    }),
    defineField({
      name: 'clientQuote',
      title: 'Client Quote (optional)',
      type: 'object',
      fields: [
        { name: 'quote', title: 'Quote', type: 'text', rows: 3 },
        { name: 'name', title: 'Client Name', type: 'string' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'coverImage', subtitle: 'location' },
  },
  orderings: [
    { title: 'Year (newest)', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
})
