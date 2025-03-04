
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


  return (
  <HomeWrapper trending={trending?.results} upcoming={upcoming?.results} mostpopular={mostpopular?.results} toprated={toprated?.results}/>

 
  )
};

export default page;
