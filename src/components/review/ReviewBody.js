'use client'

import { RichText } from '@/lib/payload/RichTextRenderer'

/**
 * ReviewBody Component
 * Client-side wrapper for rendering rich text review content
 *
 * @param {Object} review - Review object from Payload
 */
export default function ReviewBody({ review }) {
  if (!review?.body) return null

  return (
    <div className="prose prose-lg mx-auto dark:prose-invert dark:text-white">
      <RichText value={review.body} />
    </div>
  )
}
