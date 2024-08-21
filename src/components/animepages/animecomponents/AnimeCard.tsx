import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";
import { FaClosedCaptioning, FaMicrophone } from "react-icons/fa";

export interface CardData {
  animeID?: string;
  poster_path: string;
  title: string;
  name?: string;

  duration?: string;
  path: string;
  episode?: { sub: number; dub: number | null};
  customeStyle?: string;
  mediaType: string;
}

const AnimeCards = memo(
  ({
    animeID,
    poster_path,
    title,
    name,
    duration,
    path,
    episode,
    customeStyle,
    mediaType,
  }: CardData) => {
    return (
      <Link
        href={{ pathname: `${path}/${animeID}` }}
        scroll={false}
        className={`flex flex-col ${
          customeStyle ? "flex-1 max-w-44" : ""
        } bg-black `}
      >
        <div className="my-2 hover:scale-105 relative text-center w-full ">
          <div
            className={`rounded-md  relative pb-[150.67%] ${
              customeStyle ? customeStyle : "w-36 sm:w-44"
            } bg-[#151515] backdropgradientsm after:rounded-md`}
          >
            {poster_path && (
              <Image
                className={`rounded-md   absolute top-0 left-0 bottom-0 right-0 object-cover`}
                src={poster_path}
                fill
                sizes="(max-width:480px)"
                alt=""
                loading="lazy"
              />
            )}
          </div>
          <div className="px-2 absolute flex w-full justify-between bottom-0 text-white ">
            {episode?.sub && (
              <div className="flex items-center gap-1 ">
                <FaClosedCaptioning className="text-slate-400" />
                <p className="text-sm ">{episode?.sub}</p>
              </div>
            )}

            {episode?.dub && (
              <div className="flex items-center gap-1 ">
                <FaMicrophone className="text-slate-400" />
                <p className="text-sm ">{episode?.dub}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex-1">
          <h2 className="text-wrap text-sms line-clamp-2 w-36">
            {title || name}
          </h2>
        </div>
        <div className="flex justify-between ">
          <p className="font-thin mt-2 line-clamp-1">{mediaType}</p>
          <p className="font-thin mt-2 line-clamp-1">{duration}</p>
        </div>
      </Link>
    );
  }
);

export default AnimeCards;
