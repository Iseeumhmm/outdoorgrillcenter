import Container from "@/components/container";
import PostList from "@/components/postlist";
import SearchInput from "@/components/ui/search";
import { getAllPosts } from "@/lib/payload/client";

export default async function SearchPage({ query }) {
  // Get all posts and filter client-side
  // Note: For better performance with large datasets, this should be done server-side
  const allPosts = await getAllPosts();

  const searchResults = query
    ? allPosts.filter((post) => {
        const searchString = query.toLowerCase();
        const titleMatch = post.title?.toLowerCase().includes(searchString);
        const excerptMatch = post.excerpt?.toLowerCase().includes(searchString);
        const authorMatch = post.author?.name?.toLowerCase().includes(searchString);

        return titleMatch || excerptMatch || authorMatch;
      })
    : [];

  return (
    <Container>
      <div className="mx-auto max-w-screen-md">
        <h1 className="text-brand-primary mb-5 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
          Search
        </h1>
        <form action="/search" method="GET" className="mx-auto max-w-lg">
          <SearchInput placeholder="Search posts..." defaultValue={query} />
        </form>

        {query && (
          <div className="mt-10">
            <h2 className="mb-6 text-xl font-semibold dark:text-white">
              Search results for &quot;{query}&quot;
            </h2>
            {searchResults.length === 0 ? (
              <div className="flex h-40 items-center justify-center">
                <span className="text-lg text-gray-500">
                  No posts found matching your search.
                </span>
              </div>
            ) : (
              <>
                <p className="mb-6 text-gray-500 dark:text-gray-400">
                  Found {searchResults.length} {searchResults.length === 1 ? "post" : "posts"}
                </p>
                <div className="grid gap-10 md:grid-cols-2 lg:gap-10">
                  {searchResults.map((post) => (
                    <PostList key={post.id} post={post} aspect="square" />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {!query && (
          <div className="mt-10 flex h-40 items-center justify-center">
            <span className="text-lg text-gray-500">
              Enter a search term to find posts.
            </span>
          </div>
        )}
      </div>
    </Container>
  );
}
