import type { CollectionConfig } from 'payload'
import { formatSlug } from '../utils/formatSlug'
import { calculateReadingTime } from '../utils/calculateReadingTime'
import { revalidateReviewsAfterChange, revalidateReviewsAfterDelete } from '../hooks/revalidateReviews'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'rating', 'productBrand', 'publishedAt'],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateReviewsAfterChange],
    afterDelete: [revalidateReviewsAfterDelete],
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
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      maxLength: 300,
      admin: {
        description: 'Brief summary for review listings (200-300 characters recommended)',
      },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      admin: {
        position: 'sidebar',
        description: 'Product rating (1-5 scale, 0.5 increments supported)',
        step: 0.5,
      },
    },
    {
      name: 'productName',
      type: 'text',
      required: true,
      admin: {
        description: 'Full product name',
      },
    },
    {
      name: 'productBrand',
      type: 'text',
      required: true,
      admin: {
        description: 'Brand (Weber, Traeger, Pit Boss, etc.)',
      },
    },
    {
      name: 'productModel',
      type: 'text',
      admin: {
        description: 'Model number/identifier',
      },
    },
    {
      name: 'amazonASIN',
      type: 'text',
      admin: {
        description: 'Amazon Standard Identification Number (when available)',
      },
    },
    {
      name: 'productPrice',
      type: 'number',
      admin: {
        description: 'Price at time of review in USD/CAD',
      },
    },
    {
      name: 'productType',
      type: 'select',
      options: [
        { label: 'Pellet Grill', value: 'pellet-grill' },
        { label: 'Gas Grill', value: 'gas-grill' },
        { label: 'Charcoal Grill', value: 'charcoal-grill' },
        { label: 'Kamado', value: 'kamado' },
        { label: 'Electric Smoker', value: 'electric-smoker' },
        { label: 'Portable', value: 'portable' },
      ],
      admin: {
        description: 'Type of grill/smoker',
      },
    },
    {
      name: 'prosAndCons',
      type: 'group',
      fields: [
        {
          name: 'pros',
          type: 'array',
          fields: [
            {
              name: 'item',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'cons',
          type: 'array',
          fields: [
            {
              name: 'item',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          displayFormat: 'MMMM dd, yyyy',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            // If publishedAt is not set, default to current date
            if (!value && siblingData._status === 'published') {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'estReadingTime',
      type: 'number',
      defaultValue: 5,
      admin: {
        position: 'sidebar',
        description: 'Estimated reading time in minutes (auto-calculated from body)',
      },
      hooks: {
        beforeChange: [calculateReadingTime],
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Mark as featured for homepage hero display',
      },
    },
  ],
}
