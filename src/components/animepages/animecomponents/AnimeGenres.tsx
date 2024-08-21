import React from "react";
import { animeGenres } from "../../genres";
import Link from "next/link";

const AnimeGenres = () => {
  return (
    <div className="text-white">
      <div className="text-2xl my-3">
        <h2>Genres</h2>
      </div>
      <div className="bg-[#121212]">
        <div className="">
          {animeGenres.map((genre) => (
            <Link
              href={`/anime/genre/${genre.replaceAll(" ", "-").toLowerCase()}`}
              className="p-2  float-left w-[31.33%] mx-[1%] my-1 overflow-hidden text-nowrap hover:bg-[#323232] text-ellipsis rounded-md"
              key={genre}
            >
              {genre}
            </Link>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default AnimeGenres;
