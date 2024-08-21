import AnimeSearchResult from "@/components/animepages/searchPage/AnimeSearchResult";
import axios from "axios";
import React from "react";

const searchResultFunction = async (search: string, page: string) => {
  "use server";

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/anime/search?search=${search}${
      page ? `&page=${page}` : ""
    }`
  );

  return data.data;
};

const page = async ({
  searchParams,
}: {
  searchParams: { search: string; page: string };
}) => {
  const animeSearchResult = await searchResultFunction(
    searchParams.search,
    searchParams.page
  );

  return (
    <AnimeSearchResult
      totalPages={animeSearchResult.totalPages}
      results={animeSearchResult.animes}
      searchQuery={animeSearchResult.searchQuery}
      page={animeSearchResult.currentPage}
    />
  );
};

export default page;
