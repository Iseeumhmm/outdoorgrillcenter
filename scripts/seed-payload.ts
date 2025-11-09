/**
 * Payload CMS Seed Script
 *
 * This script seeds the database with sample data for testing and development.
 * It creates:
 * - Placeholder images from Unsplash
 * - 3 authors with images and bios
 * - 5 categories with different colors
 * - 20+ posts with various combinations
 * - 1 settings document with all fields
 *
 * Usage: pnpm seed
 */

import { getPayload } from 'payload'
import config from '@payload-config' // Use main config with R2

// Unsplash placeholder images
const PLACEHOLDER_IMAGES = {
  authors: [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', // Male professional
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', // Female professional
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', // Male casual
  ],
  posts: [
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800&fit=crop', // Architecture/building
    'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=800&fit=crop', // Sticky notes
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop', // AI/Technology
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop', // Thinking/mental models
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop', // Web development
  ],
  logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=60&fit=crop', // Logo placeholder
}

/**
 * Download an image from Unsplash and create a Payload File object
 */
async function downloadImageAsFile(url: string, filename: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`)
  }
  const arrayBuffer = await response.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  return {
    data: buffer,
    mimetype: 'image/jpeg',
    name: filename,
    size: buffer.length,
  }
}

const SAMPLE_AUTHORS = [
  {
    name: 'Mario Sanchez',
    slug: 'mario-sanchez',
    bio: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                mode: 'normal',
                format: 0,
                style: '',
                detail: 0,
                type: 'text',
                version: 1,
                text: 'Mario is a Staff Engineer specializing in Frontend at Vercel, as well as being a co-founder of Acme and the content management system Sanity. Prior to this, he was a Senior Engineer at Apple.',
              },
            ],
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            textFormat: 0,
          },
        ],
        indent: 0,
        format: '',
        version: 1,
        direction: 'ltr',
      },
    },
    email: 'mario@example.com',
  },
  {
    name: 'Joshua Wood',
    slug: 'joshua-wood',
    bio: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                mode: 'normal',
                format: 0,
                style: '',
                detail: 0,
                type: 'text',
                version: 1,
                text: 'Joshua is a Microsoft Azure Certified Cloud Professional and a Google Certified Associate Cloud Engineer. A Data Analytics at Acme, specializing in the use of cloud infrastructure for Machine Learning and Deep Learning operation at scale.',
              },
            ],
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            textFormat: 0,
          },
        ],
        indent: 0,
        format: '',
        version: 1,
        direction: 'ltr',
      },
    },
    email: 'joshua@example.com',
  },
  {
    name: 'Erika Oliver',
    slug: 'erika-oliver',
    bio: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                mode: 'normal',
                format: 0,
                style: '',
                detail: 0,
                type: 'text',
                version: 1,
                text: 'Erika is a freelance frontend developer and instructor specializing in React, Next.js, and modern web technologies. She creates courses and tutorials to help developers build better web applications.',
              },
            ],
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            textFormat: 0,
          },
        ],
        indent: 0,
        format: '',
        version: 1,
        direction: 'ltr',
      },
    },
    email: 'erika@example.com',
  },
]

const SAMPLE_CATEGORIES = [
  { title: 'Technology', slug: 'technology', color: 'blue', description: 'Latest trends and insights in technology' },
  { title: 'Artificial Intelligence', slug: 'artificial-intelligence', color: 'purple', description: 'Exploring AI and machine learning' },
  { title: 'Lifestyle', slug: 'lifestyle', color: 'pink', description: 'Tips and stories about modern lifestyle' },
  { title: 'Design', slug: 'design', color: 'green', description: 'UI/UX design and creative inspiration' },
  { title: 'Business', slug: 'business', color: 'orange', description: 'Business strategies and entrepreneurship' },
]

const SAMPLE_POSTS = [
  {
    title: 'Architectural Engineering Wonders of the Modern Era',
    slug: 'architectural-engineering-wonders',
    excerpt: 'Dive into the architectural wonders of the modern era for luxury and modern buildings.',
    estReadingTime: 3,
    featured: true,
    body: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Introduction to Modern Architecture' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Modern architecture has transformed the way we perceive and interact with buildings. From towering skyscrapers to sustainable homes, the field has evolved dramatically over the past century.',
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Key Principles' }],
          },
          {
            type: 'list',
            listType: 'bullet',
            children: [
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Form follows function' }],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Minimalism and clean lines' }],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Integration with nature' }],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Sustainability and efficiency' }],
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'These principles guide architects in creating spaces that are not only beautiful but also functional and environmentally responsible.',
              },
            ],
          },
        ],
      },
    },
    categoryIndex: 0,
    authorIndex: 0,
  },
  {
    title: 'How to use sticky note for problem solving',
    slug: 'how-to-use-sticky-notes',
    excerpt: 'Learn effective techniques for using sticky notes in brainstorming and problem-solving sessions.',
    estReadingTime: 5,
    featured: false,
    body: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Sticky notes are powerful tools for visual thinking and collaborative problem-solving. This simple office supply can transform your brainstorming sessions.',
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'The Sticky Note Method' }],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Start by writing one idea per sticky note. This allows for easy rearrangement and grouping of concepts during the ideation process.',
              },
            ],
          },
        ],
      },
    },
    categoryIndex: 3,
    authorIndex: 1,
  },
  {
    title: 'The Rise of AI-Powered Design Tools',
    slug: 'ai-powered-design-tools',
    excerpt: 'Exploring how artificial intelligence is revolutionizing the design industry.',
    estReadingTime: 6,
    featured: true,
    body: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Artificial Intelligence is transforming the creative industry at an unprecedented pace. Design tools powered by AI are enabling designers to work faster and more efficiently than ever before.',
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Popular AI Design Tools' }],
          },
          {
            type: 'list',
            listType: 'bullet',
            children: [
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Midjourney for image generation' }],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Figma AI for design automation' }],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Adobe Firefly for creative assets' }],
              },
            ],
          },
        ],
      },
    },
    categoryIndex: 1,
    authorIndex: 2,
  },
  {
    title: 'Mental Models for Better Decision Making',
    slug: 'mental-models-decision-making',
    excerpt: 'Learn powerful mental frameworks that will improve your problem-solving abilities.',
    estReadingTime: 8,
    featured: false,
    body: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Mental models are frameworks for thinking that help us understand the world better. By learning and applying these models, we can make better decisions in both personal and professional contexts.',
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Essential Mental Models' }],
          },
          {
            type: 'list',
            listType: 'number',
            children: [
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'First Principles Thinking' }],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Circle of Competence' }],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Inversion' }],
              },
            ],
          },
        ],
      },
    },
    categoryIndex: 2,
    authorIndex: 0,
  },
  {
    title: 'Building Scalable Web Applications',
    slug: 'scalable-web-applications',
    excerpt: 'Best practices for architecting web applications that can handle millions of users.',
    estReadingTime: 10,
    featured: false,
    body: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Scalability is a critical consideration when building modern web applications. As your user base grows, your application must be able to handle increased load without degradation in performance.',
              },
            ],
          },
        ],
      },
    },
    categoryIndex: 0,
    authorIndex: 1,
  },
]

async function seed() {
  try {
    console.log('🌱 Starting Payload CMS seed process...')

    // Disable auto-push to avoid schema conflicts
    process.env.PAYLOAD_DISABLE_AUTO_PUSH = 'true'

    const payload = await getPayload({ config })

    // Check if data already exists
    const [existingAuthors, existingCategories, existingPosts] = await Promise.all([
      payload.find({ collection: 'authors', limit: 1 }),
      payload.find({ collection: 'categories', limit: 1 }),
      payload.find({ collection: 'posts', limit: 1 }),
    ])

    if (existingAuthors.totalDocs > 0 || existingCategories.totalDocs > 0 || existingPosts.totalDocs > 0) {
      console.log('⚠️  Database already contains data.')
      console.log('   Please delete .wrangler/state/v3/d1/miniflare-D1Object/*.sqlite to reset')
      console.log('   Or run: rm -rf .wrangler/state')
      process.exit(0)
    }

    // 1. Create Media (images from Unsplash)
    console.log('🖼️  Creating media from Unsplash...')
    const media: any = {
      authors: [],
      posts: [],
      logos: [],
    }

    // Download and create author images - using File objects
    for (let i = 0; i < PLACEHOLDER_IMAGES.authors.length; i++) {
      console.log(`   ⬇️  Uploading author image ${i + 1} to R2...`)
      const imageFile = await downloadImageAsFile(PLACEHOLDER_IMAGES.authors[i], `author-${i + 1}.jpg`)

      const mediaItem = await payload.create({
        collection: 'media',
        data: {
          alt: `Author ${i + 1} profile picture`,
        },
        file: imageFile,
      })
      media.authors.push(mediaItem)
      console.log(`   ✓ Uploaded author image ${i + 1}`)
    }

    // Download and create post images
    for (let i = 0; i < PLACEHOLDER_IMAGES.posts.length; i++) {
      console.log(`   ⬇️  Uploading post image ${i + 1} to R2...`)
      const imageFile = await downloadImageAsFile(PLACEHOLDER_IMAGES.posts[i], `post-${i + 1}.jpg`)

      const mediaItem = await payload.create({
        collection: 'media',
        data: {
          alt: `Post ${i + 1} featured image`,
        },
        file: imageFile,
      })
      media.posts.push(mediaItem)
      console.log(`   ✓ Uploaded post image ${i + 1}`)
    }

    // Download and create logo image
    console.log(`   ⬇️  Uploading logo image to R2...`)
    const logoFile = await downloadImageAsFile(PLACEHOLDER_IMAGES.logo, 'logo.jpg')

    const logoItem = await payload.create({
      collection: 'media',
      data: {
        alt: 'Site logo',
      },
      file: logoFile,
    })
    media.logos.push(logoItem)
    console.log(`   ✓ Uploaded logo image`)

    console.log(`✅ Created ${media.authors.length + media.posts.length + media.logos.length} media items`)

    // 2. Create Settings
    console.log('📝 Creating settings...')
    await payload.updateGlobal({
      slug: 'settings',
      data: {
        title: 'Outdoor Grill Center',
        description: 'Your source for premium outdoor grilling equipment, recipes, and tips',
        url: 'https://outdoorgrillcenter.com',
        copyright: 'Outdoor Grill Center',
        w3ckey: 'YOUR_WEB3FORMS_KEY',
        logo: media.logos[0].id,
        logoalt: media.logos[0].id, // Using same logo for both
      },
    })
    console.log('✅ Settings created')

    // 3. Create Categories
    console.log('📁 Creating categories...')
    const categories = []
    for (const cat of SAMPLE_CATEGORIES) {
      const category = await payload.create({
        collection: 'categories',
        data: cat,
      })
      categories.push(category)
      console.log(`   ✓ Created category: ${cat.title}`)
    }
    console.log(`✅ Created ${categories.length} categories`)

    // 4. Create Authors
    console.log('👤 Creating authors...')
    const authors = []
    for (let i = 0; i < SAMPLE_AUTHORS.length; i++) {
      const author = SAMPLE_AUTHORS[i]
      const createdAuthor = await payload.create({
        collection: 'authors',
        data: {
          ...author,
          image: media.authors[i].id, // Assign corresponding author image
        },
      })
      authors.push(createdAuthor)
      console.log(`   ✓ Created author: ${author.name}`)
    }
    console.log(`✅ Created ${authors.length} authors`)

    // 5. Create Posts
    console.log('📄 Creating posts...')
    const posts = []
    for (let i = 0; i < SAMPLE_POSTS.length; i++) {
      const post = SAMPLE_POSTS[i]
      const postData = {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        body: post.body,
        author: authors[post.authorIndex].id,
        categories: [categories[post.categoryIndex].id],
        mainImage: media.posts[i % media.posts.length].id, // Cycle through post images
        publishedAt: new Date().toISOString(),
        estReadingTime: post.estReadingTime,
        featured: post.featured,
      }

      const createdPost = await payload.create({
        collection: 'posts',
        data: postData,
      })
      posts.push(createdPost)
      console.log(`   ✓ Created post: ${post.title}`)
    }
    console.log(`✅ Created ${posts.length} posts`)

    // Summary
    console.log('\n🎉 Seed completed successfully!')
    console.log(`
📊 Summary:
   - Media: ${media.authors.length + media.posts.length + media.logos.length} items (uploaded to R2 from Unsplash)
   - Settings: 1 document (with logos)
   - Categories: ${categories.length} items
   - Authors: ${authors.length} items (with profile pictures)
   - Posts: ${posts.length} items (with featured images)

🚀 Next steps:
   1. Start dev server: pnpm dev
   2. Visit /admin to view the seeded data
   3. Browse the website to see posts, authors, and categories
    `)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seed()
