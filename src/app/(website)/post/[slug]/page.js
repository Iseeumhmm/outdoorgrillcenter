import PostPage from "./default";

import { getAllPostsSlugs, getPostBySlug } from "@/lib/payload/client";

export async function generateStaticParams() {
  try {
    return await getAllPostsSlugs();
  } catch (error) {
    // Return empty array if database doesn't exist yet (first build)
    console.warn('Failed to fetch post slugs for static generation:', error.message);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  return { title: post.title };
}

export default async function PostDefault({ params }) {
  const post = await getPostBySlug(params.slug);
  return <PostPage post={post} />;
}

// export const revalidate = 60;
