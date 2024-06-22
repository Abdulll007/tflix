"use client"


import DocumentTitle from "@/components/DocumentTitile";
import BannerImg from "@/components/sections/BannerImg";
import MostPopular from "@/components/sections/MostPopular";
import TopRated from "@/components/sections/TopRated";
import Trending from "@/components/sections/Trending";
import Upcoming from "@/components/sections/Upcoming";
import useFetchData from "@/helper/FetchHook";



export default function Home() {

  
  
  const [data, loading, error] = useFetchData("https://api.themoviedb.org/3/trending/all/day")


  
  DocumentTitle("TFLIX")

  return (
    <main 
    className="flex h-full flex-col"
    >

      <BannerImg data={data} loading={loading}/>
    

    <div className="mx-2 sm:mx-20 lg:mx-32 ">

      <Trending data={data} loading={loading}/>
      <Upcoming/>
      <MostPopular/>
      <TopRated/>
      
    </div>
     
    </main>
  );
}
