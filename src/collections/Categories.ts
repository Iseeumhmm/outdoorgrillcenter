import type { CollectionConfig } from 'payload'
import { formatSlug } from '../utils/formatSlug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
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
        beforeValidate: [formatSlug('title')],
      },
    },
    {
      name: 'color',
      type: 'select',
      required: true,
      defaultValue: 'blue',
      options: [
        {
          label: 'Green',
          value: 'green',
        },
        {
          label: 'Blue',
          value: 'blue',
        },
        {
          label: 'Orange',
          value: 'orange',
        },
        {
          label: 'Purple',
          value: 'purple',
        },
        {
          label: 'Pink',
          value: 'pink',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional description for category archive pages',
      },
    },
  ],
}
