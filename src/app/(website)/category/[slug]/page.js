import { getCategoryBySlug } from "@/lib/payload/client";
import CategoryPage from "./category";

export async function generateMetadata({ params }) {
  const category = await getCategoryBySlug(params.slug);
  return {
    title: category?.title || "Category",
    description: category?.description || `Posts in ${category?.title || "this category"}`
  };
}

export default async function CategoryRoute({ params }) {
  const category = await getCategoryBySlug(params.slug);
  return <CategoryPage category={category} />;
}

// export const revalidate = 60;
