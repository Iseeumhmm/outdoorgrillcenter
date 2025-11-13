import Container from "@/components/container";
import PostList from "@/components/postlist";
import { urlForImage } from "@/lib/payload/image";
import { RichTextInline } from "@/lib/payload/RichTextRenderer";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/payload/client";

export default async function AuthorPage({ author }) {
  if (!author) {
    notFound();
  }

  const imageProps = author?.image ? urlForImage(author.image) : null;

  // Get all posts by this author
  const allPosts = await getAllPosts();
  const authorPosts = allPosts.filter(
    (post) => post.author?.id === author.id || post.author === author.id
  );

  return (
    <Container>
      <div className="mx-auto max-w-screen-md">
        <div className="flex flex-col items-center gap-5">
          {imageProps && (
            <div className="relative h-32 w-32 overflow-hidden rounded-full">
              <Image
                src={imageProps.src}
                alt={author.name}
                className="object-cover"
                fill
                sizes="128px"
              />
            </div>
          )}
          <h1 className="text-[#2D2D2D] text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
            {author.name}
          </h1>
          {author.bio && (
            <div className="mx-auto max-w-xl text-center text-gray-500 dark:text-gray-400">
              <RichTextInline value={author.bio} />
            </div>
          )}
        </div>

        <div className="mt-10">
          <h2 className="mb-6 text-2xl font-semibold dark:text-white">
            Posts by {author.name}
          </h2>
          {authorPosts.length === 0 ? (
            <div className="flex h-40 items-center justify-center">
              <span className="text-lg text-gray-500">
                No posts found by this author.
              </span>
            </div>
          ) : (
            <div className="grid gap-10 md:grid-cols-2 lg:gap-10">
              {authorPosts.map((post) => (
                <PostList key={post.id} post={post} aspect="square" />
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
