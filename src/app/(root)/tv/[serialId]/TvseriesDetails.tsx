"use client";
import React, { Suspense, lazy, useState } from "react";

import DocumentTitle from "@/components/DocumentTitile";



import HeroSection from "@/components/Details/HeroSection";
import TabSection from "@/components/Details/TabSection";
import Player from "@/components/Player";
import Loading from "@/components/Loading";
const Recommendation = lazy(
  () => import("@/components/sections/Recommendation")
);

const TvseriesDetails = ({data,paramsSeriesId}:any) => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const [player, setPlayer] = useState(false);

  type PlayerState = {
    name?: string;
    media_type?: string;
    episode?: number;
    season?: number;
    videokey?: string;
  };

  const [playerValue, setPlayerValue] = useState<PlayerState>({
    name: "",
    media_type: "",
    episode: 0,
    season: 0,
    videokey: "",
  });

  DocumentTitle(
    data.name
      ? ` ${data?.name} (${data?.first_air_date?.substring(0, 4)})`
      : "Loading..."
  );

  if (!data) {
    return <Loading />;
  }

  return (
    <main>
      <HeroSection
        name={data.name}
        seasons={data.number_of_seasons}
        backdrop_path={data.backdrop_path}
        content_ratings={data.content_ratings?.results[9]?.rating || ""}
        overview={data.overview}
        first_air_date={data.first_air_date}
        vote_count={data.vote_count}
        vote_average={data.vote_average}
        setSelectedTab={setSelectedTab}
        mediaType="tv"
      />
      <div className="mx-4 sm:mx-10">
        <TabSection
          data={data}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          mediaType="tv"
          setPlayer={setPlayer}
          player={player}
          setPlayerValue={setPlayerValue}
        />

        <Suspense fallback={<h2>Loading...</h2>}>
          <Recommendation id={paramsSeriesId} mediaType={"tv"} />
        </Suspense>
      </div>

      {player && (
        <Player
          id={data.id}
          handlePlayer={() => setPlayer(!player)}
          mediaType={`${
            playerValue.media_type ? playerValue.media_type : "movie"
          }`}
          name={playerValue.name}
          episode={playerValue.episode}
          season={playerValue.season}
          videokey={playerValue.videokey || ""}
          setPlayerValue={setPlayerValue}
        />
      )}
    </main>
  );
};

export default TvseriesDetails;
