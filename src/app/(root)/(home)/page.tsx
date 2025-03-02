<<<<<<< HEAD
"use client";
import React from "react";

import DocumentTitle from "@/components/DocumentTitile";
import Loading from "@/components/Loading";

import BannerImg from "@/components/sections/BannerImg";
import MostPopular from "@/components/sections/MostPopular";
import TopRated from "@/components/sections/TopRated";
import Trending from "@/components/sections/Trending";
import Upcoming from "@/components/sections/Upcoming";
import useFetchData from "@/helper/FetchHook";

const page = () => {
  const [data, loading, error] = useFetchData(
    "https://api.themoviedb.org/3/trending/all/day"
  );

  DocumentTitle("TFLIX");

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex h-full flex-col">
      <BannerImg data={data} loading={loading} />

      <div className="mx-2 sm:mx-20 lg:mx-32 ">
        <Trending data={data} />
        <Upcoming />
        <MostPopular />
        <TopRated />
      </div>
    </div>
  );
=======

import React from "react";

// import DocumentTitle from "@/components/DocumentTitile";
// import Loading from "@/components/Loading";

// import BannerImg from "@/components/sections/BannerImg";
// import MostPopular from "@/components/sections/MostPopular";
// import TopRated from "@/components/sections/TopRated";
// import Trending from "@/components/sections/Trending";
// import Upcoming from "@/components/sections/Upcoming";
// import useFetchData from "@/helper/FetchHook";

import { hometrending, homeupcoming,homemostpopular,hometoprated} from "../../../../constents-apis";
import { options } from "@/helper/apiConfig";
import HomeWrapper from "./HomeWrapper";

const page = async ()  => {
  
// Define the correct API endpoint
  const [trending,upcoming,mostpopular,toprated] = await Promise.all([
    fetch(hometrending,options).then(res => res.json()),
    fetch(homeupcoming,options).then(res => res.json()),
    fetch(homemostpopular,options).then(res => res.json()),
    fetch(hometoprated,options).then(res => res.json()),
    
  ]);

console.log({trending,upcoming,mostpopular,toprated})


  return (
  <HomeWrapper trending={trending?.results} upcoming={upcoming?.results} mostpopular={mostpopular?.results} toprated={toprated?.results}/>

 
  )
>>>>>>> 483482a (fixed api error for while fetching data from api)
};

export default page;
