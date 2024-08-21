
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaClosedCaptioning, FaMicrophone } from "react-icons/fa";

interface TopAiringAnimeProp {
  id: string;
  name: string;
  jname: string;
  poster: string;
  episodes: {
    sub: number;
    dub: number | null;
  };
  type: string;
}
;

const TopAiring = ({
  topAiringAnimes,
}: {
  topAiringAnimes: TopAiringAnimeProp[];
}) => {
  return (
    <div className="text-white my-4 ">
      <div className="text-2xl flex justify-between mb-2 ">
        <h2>Top Airing</h2>
      </div>
      <div className="recent flex flex-col overflow-scroll no-scrollbar gap-4">
        {topAiringAnimes?.map((data: any) => (
          <Link
            href={`/anime/info/${data.id}`}
            className="flex items-center gap-4"
            key={data.id}
          >
            <div className="">
              <Image
                src={data.poster}
                alt={data.name}
                width={70}
                height={110}
                className="min-w-[70px] min-h-[110px]"
                loading="eager"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <h2 className="text-lg line-clamp-1 ">{data.name}</h2>
              <div className="flex gap-4">
                {data.episodes?.sub && (
                  <div className="flex items-center gap-1 ">
                    <FaClosedCaptioning className="text-slate-400" />
                    <p className="text-sm ">{data.episodes?.sub}</p>
                  </div>
                )}

                {data.episodes?.dub && (
                  <div className="flex items-center gap-1 ">
                    <FaMicrophone className="text-slate-400" />
                    <p className="text-sm ">{data.episodes?.dub}</p>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopAiring;
