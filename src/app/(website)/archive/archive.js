import PostList from "@/components/postlist";
import Pagination from "@/components/blog/pagination";

import { getPaginatedPosts } from "@/lib/payload/client";

export default async function Post({ searchParams }) {
  // Fetch the current page from the query parameters, defaulting to 1 if it doesn't exist
  const page = searchParams.page;
  const pageIndex = parseInt(page, 10) || 1;

  // Set the number of posts to be displayed per page
  const POSTS_PER_PAGE = 6;

  // Fetch paginated posts - pageIndex is 0-based in our function
  const result = await getPaginatedPosts({
    pageIndex: pageIndex - 1,
    limit: POSTS_PER_PAGE
  });

  // Check if the current page is the first or the last
  const isFirstPage = pageIndex < 2;
  const isLastPage = !result.hasNextPage;

  return (
    <>
      {result.posts && result.posts?.length === 0 && (
        <div className="flex h-40 items-center justify-center">
          <span className="text-lg text-gray-500">
            End of the result!
          </span>
        </div>
      )}
      <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {result.posts.map(post => (
          <PostList key={post.id} post={post} aspect="square" />
        ))}
      </div>

      <Pagination
        pageIndex={pageIndex}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  );
}
