import Container from "@/components/container";
import PostList from "@/components/postlist";
import Label from "@/components/ui/label";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/payload/client";

export default async function CategoryPage({ category }) {
  if (!category) {
    notFound();
  }

  // Get all posts in this category
  const allPosts = await getAllPosts();
  const categoryPosts = allPosts.filter((post) => {
    if (!post.categories || !Array.isArray(post.categories)) {
      return false;
    }
    return post.categories.some(
      (cat) => cat?.id === category.id || cat === category.id
    );
  });

  return (
    <Container>
      <div className="mx-auto max-w-screen-md">
        <div className="flex flex-col items-center gap-5">
          <Label color={category.color}>{category.title}</Label>
          <h1 className="text-[#2D2D2D] text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
            {category.title}
          </h1>
          {category.description && (
            <p className="mx-auto max-w-xl text-center text-lg text-gray-500 dark:text-gray-400">
              {category.description}
            </p>
          )}
        </div>

        <div className="mt-10">
          <h2 className="mb-6 text-2xl font-semibold dark:text-white">
            Posts in {category.title}
          </h2>
          {categoryPosts.length === 0 ? (
            <div className="flex h-40 items-center justify-center">
              <span className="text-lg text-gray-500">
                No posts found in this category.
              </span>
            </div>
          ) : (
            <div className="grid gap-10 md:grid-cols-2 lg:gap-10">
              {categoryPosts.map((post) => (
                <PostList key={post.id} post={post} aspect="square" />
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
