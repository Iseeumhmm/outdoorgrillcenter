import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'textarea',
      admin: {
        description: 'Optional caption for images in post body',
      },
    },
    {
      name: 'blurDataURL',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Auto-generated placeholder for blur-up loading effect',
      },
    },
    {
      name: 'imageColor',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Dominant color extracted from image (hex format)',
      },
    },
  ],
  upload: {
    // These are not supported on Workers yet due to lack of sharp
    crop: false,
    focalPoint: false,
  },
}
