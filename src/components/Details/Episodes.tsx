"use client";
import React, {
  Dispatch,
  SetStateAction,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { options } from "@/helper/apiConfig";
import axios from "axios";

const Episodes = ({
  seasons,
  id,
  player,
  setPlayer,
  setPlayerValue,
}: {
  seasons: any[];
  id: number;
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
}) => {
  const [seasonChange, setSeasonChange] = useState<number>();

  const [tvEpisodes, setTvEpisodes] = useState([]);
  const episodesContainerRef = useRef<HTMLDivElement>(null);

  const filterSeason = useMemo(() => {
    return seasons?.filter((season) => season.name !== "Specials");
  }, [seasons]);

  useEffect(() => {
    if (isNaN(filterSeason?.length) === false) {
      setSeasonChange(filterSeason?.length);
    }
  }, [filterSeason?.length]);

  useEffect(() => {
    async function callEpisodes() {
      if (seasonChange !== undefined) {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_REQUEST_API}/tv/${id}/season/${seasonChange}`,
          options
        );
        setTvEpisodes(data?.episodes);

        if (episodesContainerRef.current) {
          episodesContainerRef.current.scrollLeft = 0;
        }
      }
    }
    callEpisodes();
  }, [seasonChange]);

  const changeSeason = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeasonChange(Number(e.target.value));
  };

  return (
    <div className=" w-full  text-white  rounded-lg my-10">
      <div className="p-2 mb-2   flex gap-3">
        <select
          name="season"
          id="season"
          className=" outline-none bg-transparent rounded-md sm:text-lg "
          onChange={(e) => {
            changeSeason(e);
          }}
        >
          {filterSeason
            ?.map((season) => (
              <option
                className="sm:text-2xl "
                value={season.season_number}
                key={season.season_number}
              >
                {!season.name.includes(`Season ${season.season_number}`) &&
                  `Season ${season.season_number}`}{" "}
                {season.name}
              </option>
            ))
            .reverse()}
        </select>

        <div className="text-slate-300  text-sm ">
          {tvEpisodes.length} Episodes
        </div>
      </div>

      <div
        className="flex flex-col  sm:flex-row sm:overflow-scroll sm:no-scrollbar "
        ref={episodesContainerRef}
      >
        {tvEpisodes.length > 0 ? (
          tvEpisodes?.map((episode: any) => (
            <div
              onClick={() => {
                document.body.style.overflow = "hidden";

                setPlayerValue &&
                  setPlayerValue((prev: any) => ({
                    ...prev,
                    episode: episode.episode_number,
                    media_type: "tv",
                    name: episode.name,
                    season: episode.season_number,
                  }));

                setPlayer && setPlayer(!player);
              }}
              className="px-2 flex flex-col mb-5 sm:mb-0"
              key={episode?.episode_number}
            >
              <div className=" relative pb-[56.25%] mb-8 sm:w-60 lg:w-96 bg-[#151515] rounded-lg ">
                {episode.still_path ? (
                  <img
                    className=" h-full w-full absolute top-0 left-0 rounded-lg"
                    src={`${
                      episode.still_path
                        ? process.env.NEXT_PUBLIC_IMAGE_URI + episode.still_path
                        : ""
                    }`}
                    alt=""
                  />
                ) : (
                  <div className="w-20 absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4">
                    <img src="/noposter.svg" alt="" />
                  </div>
                )}
              </div>

              <h2 className="text-xl">{`${episode?.episode_number}.  ${episode?.name}`}</h2>
              <div className=" my-3 flex-1 ">
                <p className="text-sm overflow-hidden line-clamp-4  ">
                  {episode?.overview}
                </p>
              </div>
              <div className="text-slate-400">{episode?.air_date}</div>
            </div>
          ))
        ) : (
          <div className=" w-full h-60 flex justify-center items-center">
            Episodes Not Available Yet Please Try Later
          </div>
        )}
      </div>
    </div>
  );
};
export default Episodes;
