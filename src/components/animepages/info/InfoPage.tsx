import AnimeEpisode from "@/components/Details/AnimeEpisode";
import Recommendation from "@/components/sections/Recommendation";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import { IoPlayCircleOutline } from "react-icons/io5";

const InfoPage = ({animeInfo}:{animeInfo:any}) => {
  return (
    <div className="">
      <div
        className={`flex flex-col justify-between bg-black relative lg:block text-white `}
      >
        <div className="backdropgradientsm pb-[46.25%] md:pb-[36.25%] relative lg:pb-[33.26%]">
          <div className="w-full  h-full lg:backdropgradientlg absolute right-0 ">
            {animeInfo && (
              <Image
                src={animeInfo.image || animeInfo.bannerImage}
                alt={animeInfo.name || animeInfo?.title.english}
                className="w-full h-full absolute "
                layout="fill"
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            )}
          </div>
        </div>
        <div className="bg-black lg:absolute top-0 left-0 bottom-0 px-6 pb-6 sm:px-10 sm:pb-10 lg:p-20 lg:w-[50%] flex flex-col justify-center bg-transparent">
          <h1 className="text-3xl mb-2 lg:mb-3">{animeInfo?.name || animeInfo?.title.english}</h1>
          <div className="flex flex-col text-sm text-slate-400 gap-2 ">
            <div className="flex gap-4">
              <h2>{animeInfo.type || animeInfo.format}</h2>
              <p>{animeInfo.status}</p>
            </div>
            <div className="flex gap-4">{animeInfo?.genre?.split(",")}</div>
          </div>

          <div className="mt-4">
            <p className="overflow-hidden line-clamp-3 lg:line-clamp-3">
              {animeInfo.plot_summary || animeInfo.description}
            </p>
          </div>

          <div className="my-2 text-sm flex flex-col gap-2 sm:flex-row items-center sm:justify-between">
            <ul className="self-start md:self-auto">
              <li className="flex gap-2 ">
                <div className="">Released Year: </div>
                <div className=""> {animeInfo.released}</div>
              </li>

              <li className=" gap-2">
                <div className="">OtherNames: </div>
                <div className="text-sm md:line-clamp-3 ">
                  {" "}
                  {animeInfo.other_name?.replaceAll("  ", ", ")}
                </div>
              </li>
            </ul>
            <Link
              href={`/anime/watch/${
                animeInfo.episodes && animeInfo?.episodes[0][1]
              }`}
              className="px-4 py-2 bg-[#313131] text-xl flex items-center gap-2 rounded-md"
              scroll={false}
            >
              <IoPlayCircleOutline size={25} />
              watch
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-5 sm:mx-10">
        <AnimeEpisode episodes={animeInfo.episodes} />

        {animeInfo.id && (
          <Recommendation
            id={animeInfo?.id?.replace("-dub", "")}
            mediaType="anime"
          />
        )}
      </div>
    </div>
  );
};

export default InfoPage;
