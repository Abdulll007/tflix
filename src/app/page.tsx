"use client"


import BannerImg from "@/components/sections/BannerImg";
import MostPopular from "@/components/sections/MostPopular";
import Trending from "@/components/sections/Trending";
import Upcoming from "@/components/sections/Upcoming";



export default function Home() {

  
  
  


  return (
    <main 
    className="flex h-full flex-col    "
    >

      <BannerImg />
    

    <div className="mx-5 sm:mx-24 lg:mx-36 ">

      <Trending/>

   
      <MostPopular/>
    
      <Upcoming/>
    </div>
     
    </main>
  );
}
