import type { CollectionConfig } from 'payload'
import { formatSlug } from '../utils/formatSlug'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('name')],
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      admin: {
        description: 'Author biography displayed on post pages and author archive',
      },
    },
    {
      name: 'email',
      type: 'email',
      admin: {
        description: 'Optional contact email',
      },
    },
  ],
}
