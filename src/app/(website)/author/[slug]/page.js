import { getAuthorBySlug } from "@/lib/payload/client";
import AuthorPage from "./author";

export async function generateMetadata({ params }) {
  const author = await getAuthorBySlug(params.slug);
  return {
    title: author?.name || "Author",
    description: `Posts by ${author?.name || "this author"}`
  };
}

export default async function AuthorRoute({ params }) {
  const author = await getAuthorBySlug(params.slug);
  return <AuthorPage author={author} />;
}

// export const revalidate = 60;
