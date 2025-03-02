<<<<<<< HEAD
"use client";
=======

>>>>>>> 483482a (fixed api error for while fetching data from api)

import Cards from "../Cards";


<<<<<<< HEAD
import useFetchData from "@/helper/FetchHook";

function MostPopular() {
  const [data, loading, error] = useFetchData(
    "https://api.themoviedb.org/3/movie/popular"
  );

  return (
    <div className="popular mt-6 mx-5 text-white ">
=======
// import useFetchData from "@/helper/FetchHook";

function MostPopular({data}:{data:any}) {
  // const [data, loading, error] = useFetchData(
  //   "https://api.themoviedb.org/3/movie/popular"
  // );

  return (
    <div className="popular m-6 mx-5 text-white ">
>>>>>>> 483482a (fixed api error for while fetching data from api)
      <h1 className="text-xl font-semibold my-4">Most Popular</h1>
      <div className="overflow-y-scroll no-scrollbar flex gap-6 ">
    

        {data?.map((popular: any) => (
       
            <Cards
              key={popular.id}
              id={popular.id}
              name={popular.name}
              poster_path={popular.poster_path}
              title={popular.title}
              release_date={popular.release_date}
              first_air_date={popular.first_air_date}
              vote_average={popular.vote_average}
              mediaType="movie"
            />

        ))}
      </div>
    </div>
  );
}

export default MostPopular;
