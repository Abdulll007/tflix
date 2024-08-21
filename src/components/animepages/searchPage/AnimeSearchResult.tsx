"use client";
import Link from "next/link";
import React, { useState } from "react";
import Cards from "@/components/Cards";

import { IoSearch } from "react-icons/io5";
import AnimeCards from "../animecomponents/AnimeCard";

interface AnimeSearchParamsProp {
  id: string;
  name: string;
  jname: string;
  poster: string;
  duration: string;
  type: string;
  rating: string | null;
  episodes: {
    sub: number;
    dub: number | null;
  };
}

const AnimeSearchResult = ({
  results,
  page,
  searchQuery,
 
  totalPages,
}: {
  totalPages: number;
  results: AnimeSearchParamsProp[];
  page: number;
  searchQuery: string;
 
}) => {
  const [currentPage, setCurrentPage] = useState(page ? page : 1);
  const [searchResult, setSearchResult] = useState("");

  const handleChange = (event: any) => {
    setSearchResult(event?.target?.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && searchResult.length > 0) {
      window.location.href = `/anime/search?search=${searchResult}`;
    }
  };

  const handleClick = () => {
    if (searchResult.length > 0) {
      window.location.href = `/anime/search?search=${searchResult}`;
    }
  };
  return (
    <div className="text-white p-5 flex flex-col min-h-lvh">
      <div className="mb-4">
        <div className=" ">
          <div className=" flex justify-center items-center rounded-md   bg-[#323232] mx-10 ">
            <input
              className="border-none text-black rounded-l-md bg-white sm:static outline-none sm:text-lg p-3 w-full"
              value={searchResult}
              name="search"
              onChange={handleChange}
              onKeyDown={handleKeyDown} // Listen for the Enter key press
              placeholder="Search..."
              type="text"
            />

            {searchResult.length > 0 ? (
              <div className="p-3" onClick={handleClick}>
                {" "}
                {/* Trigger search on click */}
                <IoSearch size={23} color="white" />
              </div>
            ) : (
              <div className="p-3">
                <IoSearch size={23} color="white" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col ">
        {results.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 ">
            {results?.map((anime: AnimeSearchParamsProp) => (
              <AnimeCards
                key={anime.id}
                title={anime?.name}
                mediaType={anime.type}
                animeID={anime.id}
                path="/anime/info"
                poster_path={anime.poster}
                duration={anime.duration}
                episode={anime.episodes}
              />
            ))}
          </div>
        ) : (
          <div className="m-auto">no results</div>
        )}
      </div>
      <div className="flex justify-center items-center mt-5 gap-1 sm:gap-5">
        {currentPage !== 1 && (
          <Link
            href={{
              pathname: `/anime/search`,
              query: `search=${searchQuery}&page=${1}`,
            }}
            className="py-2 px-4 rounded-full text-sm bg-[#212121]"
            onClick={() => setCurrentPage(1)}
          >
            First
          </Link>
        )}
        {currentPage !== 1 && (
          <Link
            href={{
              pathname: `/anime/search`,
              query: `search=${searchQuery}&page=${currentPage - 1}
            `,
            }}
            className="py-2 px-4 rounded-full text-sm bg-[#212121]"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            {"<-"}
          </Link>
        )}

        {currentPage !== 1 && (
          <Link
            href={{
              pathname: `/anime/search`,
              query: `search=${searchQuery}&page=${currentPage - 1}`,
            }}
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
            href={{
              pathname: "/anime/search",
              query: `search=${searchQuery}&page=${currentPage + 1}`,
            }}
            className="py-2 px-3 rounded-full text-center text-sm bg-[#212121]"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {currentPage + 1}
          </Link>
        )}
        {currentPage !== totalPages && (
          <Link
            href={{
              pathname: "/anime/search",
              query: `search=${searchQuery}&page=${currentPage + 1}`,
            }}
            className="py-2 px-3 rounded-full text-center text-sm bg-[#212121]"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {"->"}
          </Link>
        )}
        {currentPage !== totalPages && (
          <Link
            href={{
              pathname: "/anime/search",
              query: `search=${searchQuery}&page=${totalPages}`,
            }}
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

export default AnimeSearchResult;
