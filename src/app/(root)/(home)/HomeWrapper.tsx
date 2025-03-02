"use client";
import MostPopular from "@/components/sections/MostPopular";
import BannerImg from "@/components/sections/BannerImg";
import Upcoming from "@/components/sections/Upcoming";
import Trending from "@/components/sections/Trending";
import TopRated from "@/components/sections/TopRated";
import React from "react";

const HomeWrapper = ({ trending, upcoming, mostpopular, toprated }: any) => {
  return (
    <div>
      <BannerImg data={trending} />

      <div className="md:px-10 lg:px-16">
        <Trending data={trending} />
        <Upcoming data={upcoming} />
        <TopRated data={toprated} />
        <MostPopular data={mostpopular} />
      </div>
    </div>
  );
};

export default HomeWrapper;
