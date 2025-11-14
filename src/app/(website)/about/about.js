import Container from '@/components/container'
import { urlForImage } from '@/lib/payload/image'
import Image from 'next/image'
import Link from 'next/link'

export default function About({ authors, settings }) {
  return (
    <Container alt>
      <h1 className="text-[#2D2D2D] mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
        About
      </h1>
      <br />
      <br />
      <div className="text-left">
        <p className="text-lg">
          Outdoor Grill Center's purpose is to help you get the most out of your outdoor cooking
          experience by providing honest, expert reviews and real-world insights.
        </p>
        <br />
        <p className="text-lg">
          We were founded by a father of three and lifetime grilling aficionado with over 30 years
          of expertise behind the flame, so each review we post reflects enthusiasm and direct
          knowledge.
        </p>
        <br />
        <p className="text-lg">
          Whether you're comparing the latest gas barbecues, researching the greatest smokers, or
          seeking for the right accessories to elevate your backyard cookouts, Outdoor Grill Center
          is your go-to source for unbiased opinions, practical advice, and real enthusiasm for the
          art of cooking.
        </p>
      </div>

      {/* <div className="mb-16 mt-6 grid grid-cols-3 gap-5 md:mb-32 md:mt-16 md:gap-16">
        {authors.slice(0, 3).map(author => {
          const imageProps = urlForImage(author?.image) || null;
          return (
            <div
              key={author.id}
              className="relative aspect-square overflow-hidden rounded-md bg-slate-50 odd:translate-y-10 odd:md:translate-y-16">
              <Link href={`/author/${author?.slug}`}>
                {imageProps && (
                  <Image
                    src={imageProps?.src}
                    alt={author?.name || " "}
                    fill
                    sizes="(max-width: 320px) 100vw, 320px"
                    className="object-cover"
                  />
                )}
              </Link>
            </div>
          );
        })}
      </div> */}
      {/* 
      <div className="prose mx-auto mt-14 text-center dark:prose-invert">
        <p>
          We provide real-time connectivity to enable software
          providers and financial institutions to build integrated
          products for their small business customers.
        </p>
        <p>
          Our API infrastructure is leveraged by clients ranging from
          lenders to corporate card providers and business forecasting
          tools, with use cases including automatic reconciliation,
          business dashboarding, and loan decisioning.
        </p>
        <p>
          <Link href="/contact">Get in touch</Link>
        </p>
      </div> */}
    </Container>
  )
}
