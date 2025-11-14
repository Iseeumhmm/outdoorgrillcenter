import React from 'react'
import { getSettings } from '@/lib/payload/client'
import Footer from '@/components/footer'
import { urlForImage } from '@/lib/payload/image'
import Navbar from '@/components/navbar'
import '@/app/global.css'

async function sharedMetaData(params: any) {
  const settings = await getSettings()

  return {
    // enable this for resolving opengraph image
    // metadataBase: new URL(settings.url),
    title: {
      default: settings?.title || 'Stablo - Blog Template for Next.js & Sanity CMS',
      template: '%s | Stablo',
    },
    description:
      settings?.description || 'Stablo - popular open-source next.js and sanity blog template',
    keywords: ['Next.js', 'Sanity', 'Tailwind CSS'],
    authors: [{ name: 'Surjith' }],
    canonical: settings?.url,
    openGraph: {
      images: [
        {
          url: urlForImage(settings?.openGraphImage)?.src || '/img/opengraph.jpg',
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      title: settings?.title || 'Stablo Template',
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export async function generateMetadata({ params }: { params: any }) {
  return await sharedMetaData(params)
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: any
}) {
  const settings = await getSettings()
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar {...settings} />

      <div className="flex-grow">{children}</div>

      <Footer {...settings} />
    </div>
  )
}
// enable revalidate for all pages in this layout
// export const revalidate = 60;
