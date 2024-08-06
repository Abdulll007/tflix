
import AnimeEpisode from "@/components/Details/AnimeEpisode";
// import Error from "@/components/Error";
// import Loading from "@/components/Loading";
// import useFetchData from "@/helper/FetchHook";
import Image from "next/legacy/image";
import React, { lazy } from "react";
import Link from "next/link";

// import { useRouter } from "next/navigation";

import { IoPlayCircleOutline } from "react-icons/io5";
import Recommendation from "@/components/sections/Recommendation";
import Error from "@/components/Error";
import InfoPage from "@/components/animepages/info/InfoPage";
import Loading from "@/components/Loading";

async function getAnimeInfo(params: string) {
  const animeInfoData = await fetch(
    `http://localhost:3000/api/anime/info/${params}`
  );
  const animeInfo = await animeInfoData.json();

  return { animeInfo: animeInfo.data.results };
}

const page = async ({ params }: { params: { id: string } }) => {

  const { animeInfo } = await getAnimeInfo(params.id);

  // console.log(animeInfo)
  if (!animeInfo.image ) {
    return (
      <Error>
        <div className="">
          <h2 className="text-center text-2xl">Oops! something went wrong</h2>
          <p className="text-center">
            Sorry, but it seems that something went wrong. Try refreshing the
            page or try again later.
          </p>
          <div className="flex justify-center mt-6">
            <Link href={"/anime"}
              className="text-center px-4 py-2 bg-[#565656]"
              // onClick={() => route.push("/anime")}
            >
              go home
            </Link>
          </div>
        </div>
      </Error>
    );
  }
  

  return (
    
    <InfoPage animeInfo={animeInfo}/>
  );
};

export default page;
