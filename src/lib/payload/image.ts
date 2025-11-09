import type { Media } from '@/payload-types'

/**
 * Image data structure compatible with Next.js Image component
 */
export interface ImageData {
  src: string
  width?: number
  height?: number
  alt?: string
  blurDataURL?: string
}

/**
 * Convert Payload upload field to image URL and metadata
 * Replaces Sanity's urlForImage() function
 *
 * @param upload - Media object or null
 * @returns ImageData object with src, dimensions, and alt text
 */
export function urlForImage(upload: Media | string | number | null | undefined): ImageData | null {
  if (!upload) {
    return null
  }

  // If upload is just an ID (string or number), we can't get full details
  // This shouldn't happen if queries use proper depth, but handle gracefully
  if (typeof upload === 'string' || typeof upload === 'number') {
    console.warn('Image upload is not populated. Ensure query depth >= 1')
    return {
      src: '',
      alt: '',
    }
  }

  // Upload is a populated Media object
  return {
    src: upload.url || '',
    width: upload.width || undefined,
    height: upload.height || undefined,
    alt: upload.alt || '',
    blurDataURL: upload.blurDataURL || undefined,
  }
}

/**
 * Get image dimensions from Payload upload
 *
 * @param upload - Media object
 * @returns Object with width and height, or undefined if not available
 */
export function getImageDimensions(
  upload: Media | string | number | null | undefined,
): { width: number; height: number } | undefined {
  if (!upload || typeof upload === 'string' || typeof upload === 'number') {
    return undefined
  }

  if (upload.width && upload.height) {
    return {
      width: upload.width,
      height: upload.height,
    }
  }

  return undefined
}

/**
 * Get image URL directly from upload field
 *
 * @param upload - Media object or ID string
 * @returns Image URL string or empty string if not available
 */
export function getImageUrl(upload: Media | string | number | null | undefined): string {
  if (!upload) {
    return ''
  }

  if (typeof upload === 'string' || typeof upload === 'number') {
    console.warn('Image upload is not populated. Ensure query depth >= 1')
    return ''
  }

  return upload.url || ''
}

/**
 * Get dominant image color for background effects
 *
 * @param upload - Media object
 * @returns Hex color string or undefined
 */
export function getImageColor(upload: Media | string | number | null | undefined): string | undefined {
  if (!upload || typeof upload === 'string' || typeof upload === 'number') {
    return undefined
  }

  return upload.imageColor || undefined
}
