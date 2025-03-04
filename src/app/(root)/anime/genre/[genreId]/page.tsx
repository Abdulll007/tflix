import AnimeGenres from "@/components/animepages/animecomponents/AnimeGenres";
import TopAiring from "@/components/animepages/animecomponents/TopAiring";
import GenreInfo from "@/components/animepages/genre/GenreInfo";

import React from "react";

const getAnimeOfThatGenre = async (
  genreId: string,

  pageNumber: string
) => {
  const respons = await fetch(
    `${process.env.NEXT_PUBLIC_ANIME_API3}/hianime/genre/${genreId}${
      pageNumber ? `?page=${pageNumber}` : ""
    }`
  ).then((res) => res.json());
  const genreInfoData = respons.data


  const animeData = genreInfoData?.animes;
  const topAiringAnimeData = genreInfoData?.topAiringAnimes;
  const totalPages = genreInfoData?.totalPages;
  const genreName = genreInfoData?.genreName;

  return { animeData, topAiringAnimeData, totalPages, genreName };
};

const page = async ({
  params,
  searchParams,
}: {
  params: {
    genreId: string;
  };
  searchParams: { page: string };
}) => {
  const genreId = params?.genreId;
  const pageNo = searchParams?.page;

  const { animeData, topAiringAnimeData, totalPages, genreName } =
    await getAnimeOfThatGenre(genreId, pageNo);

  return (
    <div className="lg:flex text-white">
      <GenreInfo
        genreCatalog={animeData}
        genreName={genreName}
        totalPages={totalPages}
        pageNumber={pageNo}
      />
      <div className="lg:max-w-[30%] p-5">
        <TopAiring topAiringAnimes={topAiringAnimeData} />
        <AnimeGenres />
      </div>
    </div>
  );
};

export default page;
