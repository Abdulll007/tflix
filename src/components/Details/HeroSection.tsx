import React, { SetStateAction } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoPlayCircleSharp, IoPlayCircleOutline } from "react-icons/io5";

interface HeroSectionProps {
  backdrop_path: string;
  name: string;
  seasons?: number;
  first_air_date: string;
  content_ratings: string;
  overview: string;
  vote_count: number;
  vote_average: number;
  runtime?: number;
  mediaType: string;
  player?: boolean;
  setPlayer?: React.Dispatch<SetStateAction<boolean>>;
  setSelectedTab?: React.Dispatch<SetStateAction<string>>;
}

const runtimeConverter = (minutes: number) => {
  let finalmin = `${Math.floor(minutes / 60)}h ${minutes % 60}min`;

  return finalmin;
};

const HeroSection = (data: HeroSectionProps) => {
  const votePercent = Math.ceil((data.vote_average * 100) / 10);
  return (
    <div className="">
      <div className="flex flex-col justify-between bg-black relative lg:block text-white lg:p-[20%] h-[22rem] sm:h-[35rem] lg:h-0">
        <div className=" backgroundadjust lg:w-[71%] lg:absolute lg:right-0 lg:top-0 backdropgradientsm lg:backdropgradientlg  ">
          <div className="w-full">
            <img
              src={`${process.env.NEXT_PUBLIC_BACKDROP_IMAGE_URI}${data.backdrop_path}`}
              alt={data.name}
              className=" w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="bg-black lg:absolute top-0 left-0 bottom-0 px-6 pb-6 sm:px-10 sm:pb-10 lg:p-20 lg:w-[50%] flex flex-col justify-center bg-transparent ">
          <h1 className="text-3xl mb-2 lg:mb-3">{data.name}</h1>
          <div className="flex flex-col md:flex-row text-sm text-slate-400 gap-2  md:items-center">
            <div className="flex items-center ">
              <div className="w-8 mr-4  sm:w-12  sm:mr-6">
                <CircularProgressbar
                  text={`${votePercent}%`}
                  value={votePercent}
                  minValue={0}
                  maxValue={100}
                  styles={buildStyles({
                    textColor: "white",
                    textSize: "1.8rem",
                  })}
                />
              </div>
              <div className="">
                {data.vote_count} <span>Reviews</span>
              </div>
            </div>
            <div className="flex gap-3 text-sm text-slate-400">
              <span className="">
                {data.runtime ? (
                  <span>{runtimeConverter(data.runtime)}</span>
                ) : (
                  <span>Season {data.seasons}</span>
                )}
              </span>
              <span className="">{data.first_air_date?.substring(0, 4)}</span>
              {data.content_ratings && (
                <span>
                  Cert.{" "}
                  <span className="border border-slate-400 p-1">
                    {data.content_ratings}
                  </span>
                </span>
              )}
            </div>
          </div>
          <div className="hidden sm:inline-block mt-6 ">
            <p className="overflow-hidden sm:line-clamp-2 lg:line-clamp-3">
              {data.overview}
            </p>
          </div>
          {data.mediaType === "tv" && (
            <button
              onClick={() =>
                data.setSelectedTab && data?.setSelectedTab("episode")
              }
              className="hidden lg:block self-start mt-5 p-3 bg-gray-700 rounded-md"
            >
              Go to Episode
            </button>
          )}

          {data.mediaType === "movie" && (
            <button
              onClick={() => data.setPlayer && data.setPlayer(!data.player)}
              className="hidden lg:block self-start mt-5 p-3 bg-gray-700 rounded-md"
            >
              Play Movie
            </button>
          )}
        </div>

        {data.mediaType === "movie" && (
          <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center lg:hidden">
            <IoPlayCircleSharp
              size={50}
              className="cursor-pointer"
              onClick={() => data.setPlayer && data.setPlayer(!data.player)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
