"use client";
import Cards from "@/components/Cards";
import DocumentTitle from "@/components/DocumentTitile";
import GenreSection from "@/components/GenreSection";
import { movieGenres, tvGenres } from "@/components/genres";
import useFetchData from "@/helper/FetchHook";
import { options } from "@/helper/apiConfig";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Page() {
  const [tvShows, setTvShows] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Initialize to a number

  const [addGenres, setAddGenres] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMoreData = async (pageNumber: number) => {
    const { data } = await axios.get(
      `${
        process.env.NEXT_PUBLIC_REQUEST_API
      }/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc${
        addGenres.length > 0 ? `&with_genres=${addGenres}` : ""
      } &page=${pageNumber}`,
      options
    );
    return data;
  };

  useEffect(() => {
    const firstFetch = async () => {
      const data = await fetchMoreData(1);
      setTvShows(data.results);
    };

    firstFetch();
  }, [addGenres]);

  const loadMoreContent = async () => {
    try {
      setLoading(true);
      const response = await fetchMoreData(currentPage + 1);
      const newTvData = response.results;
      setTvShows((prevTvShows) => [...prevTvShows, ...newTvData]);
      setCurrentPage((prevPage) => prevPage + 1); // Use functional update to ensure the correct state
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  DocumentTitle("TFLIX - Tv Shows");

  return (
    <div className="flex flex-col items-center">
      <div className="flex  flex-col sm:flex-row  text-white gap-5">
        <div className=" flex justify-center flex-wrap gap-4 sm:flex-col sm:self-start mx-8 sm:mx-0 sm:ml-4">
          <GenreSection
            Genres={tvGenres}
            addGenres={addGenres}
            setAddGenres={setAddGenres}
          />
        </div>

        <div className="md:w-[80vw] lg:w-[85vw] xl:w-[85vw] flex flex-wrap  justify-center md:gap-6 gap-4 text-white h-screen overflow-scroll no-scrollbar ">
          {tvShows?.map((shows, index) => (
            <Link href={`/tv/${shows?.id}`} key={`${shows.id}/${index}`}>
              <Cards
                id={shows?.id}
                name={shows?.name}
                poster_path={shows.poster_path}
                vote_average={shows.vote_average}
                title={shows.title}
                key={shows.id}
                release_date={shows.release_date}
              />
            </Link>
          ))}
        </div>
      </div>
      <button
        className="p-3 my-6 border text-white  text-center rounded-lg text-xl text-nowrap"
        onClick={loadMoreContent}
      >
        {loading ? "Loading..." : "More Tv Shows"}
      </button>
    </div>
  );
}

export default Page;
