"use client";
import Player from "@/components/Player";
import useFetchData from "@/helper/FetchHook";
import React, { useState } from "react";

import Recommendation from "@/components/sections/Recommendation";
import DocumentTitle from "@/components/DocumentTitile";
import HeroSection from "@/components/Details/HeroSection";
import TabSection from "@/components/Details/TabSection";

function page({ params }: any) {
  const [player, setPlayer] = useState(false);

  const [data, loading] = useFetchData(
    ` ${process.env.NEXT_PUBLIC_REQUEST_API}/movie/${params.id}?append_to_response=language=en-US,videos,credits,images,external_ids,recommendations,content_ratings&include_image_language=en`
  );

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

  if (loading) {
    return (
      <main className=" relative ">
        <div className="z-10 fixed top-0 left-0 bottom-0 right-0 bg-[#1f1f1f] ease-in-out"></div>
      </main>
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

        <Recommendation recommendations={data?.recommendations?.results} />
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
}

export default page;
