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
    <main className="flex h-full flex-col">
      <BannerImg data={data} loading={loading} />

      <div className="mx-2 sm:mx-20 lg:mx-32 ">
        <Trending data={data} />
        <Upcoming />
        <MostPopular />
        <TopRated />
      </div>
    </main>
  );
};

export default page;
