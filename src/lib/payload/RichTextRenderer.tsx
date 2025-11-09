'use client'

import React from 'react'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'

/**
 * RichText component that renders Lexical JSON content
 * Replaces Sanity's PortableText component
 *
 * @param value - Lexical JSON structure from Payload
 * @param className - Optional CSS classes
 */
export function RichText({
  value,
  className = '',
}: {
  value: any
  className?: string
}) {
  if (!value) {
    return null
  }

  return (
    <div
      className={`prose prose-lg mx-auto mt-8 max-w-none dark:prose-invert ${className}`}
      style={{
        // Custom prose styling to match existing design
        '--tw-prose-body': 'rgb(55 65 81)',
        '--tw-prose-headings': 'rgb(17 24 39)',
        '--tw-prose-lead': 'rgb(75 85 99)',
        '--tw-prose-links': 'rgb(59 130 246)',
        '--tw-prose-bold': 'rgb(17 24 39)',
        '--tw-prose-counters': 'rgb(107 114 128)',
        '--tw-prose-bullets': 'rgb(209 213 219)',
        '--tw-prose-hr': 'rgb(229 231 235)',
        '--tw-prose-quotes': 'rgb(17 24 39)',
        '--tw-prose-quote-borders': 'rgb(229 231 235)',
        '--tw-prose-captions': 'rgb(107 114 128)',
        '--tw-prose-code': 'rgb(17 24 39)',
        '--tw-prose-pre-code': 'rgb(229 231 235)',
        '--tw-prose-pre-bg': 'rgb(31 41 55)',
        '--tw-prose-th-borders': 'rgb(209 213 219)',
        '--tw-prose-td-borders': 'rgb(229 231 235)',
        '--tw-prose-invert-body': 'rgb(209 213 219)',
        '--tw-prose-invert-headings': 'rgb(255 255 255)',
        '--tw-prose-invert-lead': 'rgb(156 163 175)',
        '--tw-prose-invert-links': 'rgb(96 165 250)',
        '--tw-prose-invert-bold': 'rgb(255 255 255)',
        '--tw-prose-invert-counters': 'rgb(156 163 175)',
        '--tw-prose-invert-bullets': 'rgb(75 85 99)',
        '--tw-prose-invert-hr': 'rgb(55 65 81)',
        '--tw-prose-invert-quotes': 'rgb(243 244 246)',
        '--tw-prose-invert-quote-borders': 'rgb(55 65 81)',
        '--tw-prose-invert-captions': 'rgb(156 163 175)',
        '--tw-prose-invert-code': 'rgb(255 255 255)',
        '--tw-prose-invert-pre-code': 'rgb(209 213 219)',
        '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
        '--tw-prose-invert-th-borders': 'rgb(75 85 99)',
        '--tw-prose-invert-td-borders': 'rgb(55 65 81)',
      } as React.CSSProperties}
    >
      <PayloadRichText data={value} />
    </div>
  )
}

/**
 * Simplified RichText component without prose wrapper
 * Useful for smaller content like author bios
 */
export function RichTextInline({
  value,
  className = '',
}: {
  value: any
  className?: string
}) {
  if (!value) {
    return null
  }

  return (
    <div className={className}>
      <PayloadRichText data={value} />
    </div>
  )
}
