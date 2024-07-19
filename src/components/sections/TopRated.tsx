import React from "react";
import Cards from "../Cards";
import Link from "next/link";
import LoadingSkeleton from "../LoadingSkeleton";
import useFetchData from "@/helper/FetchHook";

function TopRated() {
  const [data, loading] = useFetchData(
    "https://api.themoviedb.org/3/movie/top_rated"
  );

  return (
    <div className="trending mt-6 mx-5 text-white">
      <h1 className="text-xl font-semibold my-4">Top Rated</h1>

      <div className=" overflow-y-scroll no-scrollbar flex gap-6">
       

        {data?.map((upcoming: any) => (
          <Link href={`/movie/${upcoming.id}`} key={upcoming.id}>
            <Cards
              id={upcoming.id}
              name={upcoming.name}
              poster_path={upcoming.poster_path}
              title={upcoming.title}
              release_date={upcoming.release_date}
              first_air_date={upcoming.first_air_date}
              vote_average={upcoming.vote_average}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopRated;
