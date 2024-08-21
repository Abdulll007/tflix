"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaClosedCaptioning, FaMicrophone } from "react-icons/fa";

interface ToptenProp {
  id: string;
  rank: number;
  name: string;
  poster: string;
  jname: string;
  episodes: {
    sub: number;
    dub: number | null;
  };
}

function TopTen({
  topten,
}: {
  topten: { today: ToptenProp[]; week: ToptenProp[]; month: ToptenProp[] };
}) {
  const [data, setData] = useState(topten.today);
  const [selected, setSelected] = useState("today");
  const handleChange = (value: string) => {
    if (value === "today") {
      setSelected("today");
      setData(topten.today);
    } else if (value === "week") {
      setSelected("week");
      setData(topten.week);
    } else if (value === "month") {
      setSelected("month");
      setData(topten.month);
    }
  };

  return (
    <div className="text-white w-full my-4">
      <div className="text-2xl flex justify-between mb-2 ">
        <h2>Top 10</h2>

        <div className="text-base flex  rounded-md text-center">
          <button
            onClick={() => handleChange("today")}
            className={`${
              selected === "today" && "bg-[#323232]"
            }  hover:bg-[#323232] p-3 rounded-l-md`}
          >
            Today
          </button>
          <button
            onClick={() => handleChange("week")}
            className={`${
              selected === "week" && "bg-[#323232]"
            } hover:bg-[#323232]   p-3`}
          >
            Week
          </button>
          <button
            onClick={() => handleChange("month")}
            className={`${
              selected === "month" && "bg-[#323232]"
            } hover:bg-[#323232] rounded-r-md  p-3`}
          >
            Month
          </button>
        </div>
      </div>
      <div className="recent flex flex-col overflow-scroll no-scrollbar gap-4">
        {data?.map((data: ToptenProp) => (
          <Link
            href={`/anime/info/${data.id}`}
            className="flex items-center gap-4"
            key={data.id}
          >
            <h2 className="text-xl font-bold text-nowrap">
              {" "}
              # {String(data.rank).padStart(2, "0")}
            </h2>
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
}

export default TopTen;
