import SearchPage from "./search";

export const metadata = {
  title: "Search",
  description: "Search posts"
};

export default async function SearchRoute({ searchParams }) {
  const query = searchParams.q || "";
  return <SearchPage query={query} />;
}

// export const revalidate = 60;
