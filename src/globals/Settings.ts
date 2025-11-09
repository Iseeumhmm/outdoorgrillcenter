import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Stablo - Blog Template',
              admin: {
                description: 'Site title used in metadata and SEO',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              maxLength: 160,
              admin: {
                description: 'Site description for SEO (160 characters recommended)',
              },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              admin: {
                description: 'Full site URL (e.g., https://example.com)',
              },
            },
          ],
        },
        {
          label: 'Branding',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Logo for light mode',
              },
            },
            {
              name: 'logoalt',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Logo for dark mode',
              },
            },
            {
              name: 'openGraphImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Default image for social media previews',
              },
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'copyright',
              type: 'text',
              required: true,
              defaultValue: 'Stablo',
              admin: {
                description: 'Copyright text displayed in footer',
              },
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'email',
              type: 'email',
              admin: {
                description: 'Contact email address',
              },
            },
            {
              name: 'phone',
              type: 'text',
              admin: {
                description: 'Contact phone number',
              },
            },
            {
              name: 'w3ckey',
              type: 'text',
              required: true,
              admin: {
                description: 'Web3Forms API key for contact form submissions',
              },
            },
          ],
        },
      ],
    },
  ],
}
