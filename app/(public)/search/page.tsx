import { Metadata } from "next";
import SearchClient from "./SearchClient";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    tags?: string;
    page?: string;
  }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q;
  
  return {
    title: query ? `Search: "${query}" | UsITech` : "Search Workflows | UsITech",
    description: query 
      ? `Search results for "${query}" - Find automation workflows on UsITech`
      : "Search and discover powerful automation workflows to streamline your business processes.",
    keywords: "workflow search, automation, business process, n8n workflows, UsITech",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAF2FF] via-[#F8FAFC] to-white">
      <SearchClient 
        initialQuery={params.q || ""}
        initialTags={params.tags ? params.tags.split(",") : []}
        initialPage={params.page ? parseInt(params.page) : 1}
      />
    </div>
  );
}