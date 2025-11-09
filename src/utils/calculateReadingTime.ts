import type { FieldHook } from 'payload'

// Average reading speed: 200-250 words per minute
const WORDS_PER_MINUTE = 225

export const calculateReadingTime: FieldHook = ({ data, siblingData }) => {
  const body = data?.body || siblingData?.body

  if (!body) {
    return 5 // Default fallback
  }

  // Extract text content from Lexical JSON structure
  const extractText = (node: any): string => {
    if (!node) return ''

    if (typeof node === 'string') return node

    if (node.text) return node.text

    if (node.children && Array.isArray(node.children)) {
      return node.children.map(extractText).join(' ')
    }

    if (node.root && node.root.children) {
      return node.root.children.map(extractText).join(' ')
    }

    return ''
  }

  const textContent = extractText(body)
  const wordCount = textContent.trim().split(/\s+/).length
  const readingTime = Math.ceil(wordCount / WORDS_PER_MINUTE)

  return readingTime > 0 ? readingTime : 1 // Minimum 1 minute
}
