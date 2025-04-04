"use client";
import Player from "@/components/Player";

import React, { Suspense, lazy, useMemo, useState } from "react";

const Recommendation = lazy(
  () => import("@/components/sections/Recommendation")
);
import DocumentTitle from "@/components/DocumentTitile";
import HeroSection from "@/components/Details/HeroSection";
import TabSection from "@/components/Details/TabSection";
import Loading from "@/components/Loading";

const MovieDetails = ({data,paramsid}:{data:any,paramsid:any}) => {
  const [player, setPlayer] = useState(false);

  DocumentTitle(
    data.title
      ? `${data?.title} (${data?.release_date?.substring(0, 4)})`
      : "Loading..."
  );

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


   if (!data) {
    return (
      <Loading/>
    );
  }

  return (
    <main className="">
      <HeroSection
        first_air_date={data.release_date}
        backdrop_path={data.backdrop_path}
        name={data.title}
        overview={data.overview}
        vote_average={data.vote_average}
        vote_count={data.vote_count}
        content_ratings={""}
        runtime={data.runtime}
        mediaType="movie"
        player={player}
        setPlayer={setPlayer}
      />

      <div className="mx-4 sm:mx-10">
        <TabSection
          data={data}
          mediaType="movie"
          player={player}
          setPlayer={setPlayer}
          setPlayerValue={setPlayerValue}
        />

        <Suspense fallback={<h2>Loading...</h2>}>
          <Recommendation id={paramsid} mediaType={"movie"} />
        </Suspense>
      </div>

      {player && (
        <Player
          id={data.id}
          handlePlayer={() => setPlayer(!player)}
          mediaType={playerValue.media_type ? playerValue.media_type : "movie"}
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

export default MovieDetails;
