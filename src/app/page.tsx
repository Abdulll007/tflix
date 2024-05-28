"use client"


import BannerImg from "@/components/sections/BannerImg";
import MostPopular from "@/components/sections/MostPopular";
import TopRated from "@/components/sections/TopRated";
import Trending from "@/components/sections/Trending";
import Upcoming from "@/components/sections/Upcoming";
import useFetchData from "@/helper/FetchHook";



export default function Home() {

  
  
  const [data, loading, error] = useFetchData("https://api.themoviedb.org/3/trending/all/day")





  return (
    <main 
    className="flex h-full flex-col"
    >

      <BannerImg data={data} loading={loading}/>
    

    <div className="mx-5 sm:mx-24 lg:mx-36 ">

      <Trending data={data} loading={loading}/>
      <Upcoming/>
      <MostPopular/>
      <TopRated/>
      
    </div>
     
    </main>
  );
}
