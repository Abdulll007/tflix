import { Tabs, Tab } from "@nextui-org/tabs";
import React, { Dispatch, SetStateAction, lazy, useState } from "react";
const Episodes = lazy(() => import("@/components/Details/Episodes"));

import Overview from "./Overview";
import Videos from "./Videos";
import Posters from "./Posters";

export interface TabProp {
  selectedTab?: string;
  setSelectedTab?: Dispatch<SetStateAction<string>>;
  data: any;
  mediaType: string;
  player: boolean;
  setPlayer?: Dispatch<SetStateAction<boolean>>;
  setPlayerValue?: Dispatch<
    SetStateAction<{
      name?: string;
      media_type?: string;
      episode?: number;
      season?: number;
      videokey?: string;
    }>
  >;
}

const TabSection = ({
  selectedTab,
  setSelectedTab,
  data,
  mediaType,
  player,
  setPlayer,
  setPlayerValue,
}: TabProp) => {
  return (
    <div className="">
      <Tabs
        selectedKey={selectedTab}
        // @ts-ignore
        onSelectionChange={setSelectedTab}
        variant={"underlined"}
        classNames={{
          tabList: " grid grid-cols-2 p-0 gap-1 sm:gap-2 sm:flex  ",
          tabContent:
            "group-data-[selected=true]:text-white   hover:text-white uppercase w-full group-data-[selected=true]:bg-[#1e1e1e] p-3 bg-[#151515] ",
          tab: "p-0",
        }}
        className="z-0 lg:flex lg:justify-center   text-gray-500 p-2"
      >
        <Tab
          key="overview"
          title="Overview"
          className="lg:w-auto 
      "
        >
          <Overview
            first_air_date={data.first_air_date}
            last_air_date={data.last_air_date}
            releasedate={data.release_date}
            episodes={data.number_of_episodes}
            seasons={data.number_of_seasons}
            language="English"
            network={data?.networks && data?.networks[0]?.name}
            revenue={data.revenue}
            budget={data.budget}
            genres={data.genres}
            runtime={data?.runtime}
            status={data.status}
            posterPath={data.poster_path}
            cast={data?.credits?.cast}
            productions={data?.production_companies}
          />
        </Tab>
        {mediaType === "tv" && (
          <Tab key="episode" title="Episode" className="lg:w-auto ">
            <div className="">
              <Episodes
                id={data.id}
                player={player}
                setPlayer={setPlayer}
                seasons={data.seasons}
                setPlayerValue={setPlayerValue}
              />
            </div>
          </Tab>
        )}

        {data?.videos?.results.length > 0 && (
          <Tab key="videos" title="videos" className=" lg:w-auto ">
            <Videos
              videos={data.videos.results}
              player={player}
              setPlayer={setPlayer}
              setPlayerValue={setPlayerValue}
            />
          </Tab>
        )}

        {data?.images?.backdrops?.length > 0 && (
          <Tab key="posters" title="Posters" className="lg:w-auto ">
            <Posters
              backdrops={data?.images?.backdrops}
              posters={data?.images?.posters}
              logos={data?.images?.logos}
            />
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default TabSection;
