"use client";
import React, { useState } from "react";

import AnimeCards from "../animecomponents/AnimeCard";
import Link from "next/link";

const GenreInfo = ({
  genreCatalog,
  genreName,
  totalPages,
  pageNumber
}: {
  genreCatalog: any;
  genreName: string;
  totalPages: number;
  pageNumber:string
}) => {
  const [currentPage, setCurrentPage] = useState(pageNumber ?Number
    (pageNumber):1
  );


  return (
    <div className="p-5 md:p-10 lg:w-[70%] flex flex-col gap-4">
      <div className=" flex justify-center text-2xl font-bold ">
        {genreName}
      </div>
      <div className="flex flex-wrap justify-center gap-5 ">
        {genreCatalog?.map((anime: any) => (
          <AnimeCards
            path={`/anime/info/`}
            animeID={anime.id}
            title={anime.name}
            poster_path={anime.poster}
            episode={anime.episodes}
            customeStyle=" "
            key={anime.id}
            mediaType={anime.type}
            duration={anime.duration}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-5 gap-1 sm:gap-5">
        {currentPage !== 1 && (
          <Link
            href={{
              pathname: `/anime/genre/${genreName
                ?.replace(" Anime", "")
                .toLowerCase()}`,
              
            }}
            className="py-2 px-4 rounded-full text-sm bg-[#212121]"
            onClick={() => setCurrentPage(1)}
          >
            First
          </Link>
        )}
        {currentPage !== 1 && (
          <Link
            href={{ pathname: `/anime/genre/${genreName
                ?.replace(" Anime", "")
                .toLowerCase()}`, query: `${(currentPage-1 !== 1)? `page=${currentPage - 1}`:""}` }}
            className="py-2 px-4 rounded-full text-sm bg-[#212121]"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            {"<-"}
          </Link>
        )}

        {currentPage !== 1 && (
          <Link
            href={{ pathname: "", query: `page=${currentPage - 1}` }}
            className="py-2 px-3 rounded-full text-center text-sm bg-[#212121]"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            {currentPage - 1}
          </Link>
        )}

        <div className="py-2 px-3 rounded-full text-center text-sm bg-gray-500">
          {currentPage}
        </div>
        {currentPage < totalPages && (
          <Link
            href={{ pathname: "", query: `page=${currentPage + 1}` }}
            className="py-2 px-3 rounded-full text-center text-sm bg-[#212121]"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {currentPage + 1}
          </Link>
        )}
        {currentPage !== totalPages && (
          <Link
            href={{ pathname: "", query: `page=${currentPage + 1}` }}
            className="py-2 px-3 rounded-full text-center text-sm bg-[#212121]"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {"->"}
          </Link>
        )}
        {currentPage !== totalPages && (
          <Link
            href={{ pathname: "", query: `page=${totalPages}` }}
            className="py-2 px-3 rounded-full text-center text-sm bg-[#212121]"
            onClick={() => setCurrentPage(totalPages)}
          >
            Last
          </Link>
        )}
      </div>
    </div>
  );
};

export default GenreInfo;
