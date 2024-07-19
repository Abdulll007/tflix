import { tv } from "@/helper/test";
import React, { Dispatch, SetStateAction, memo } from "react";
import Skeleton from "react-loading-skeleton";
import Cast from "./Cast";

interface OverviewPrams {
  first_air_date?: string;
  last_air_date?: string;
  releasedate?: string;
  runtime?: number;
  genres: {
    id: number;
    name: string;
  }[];
  budget?: number;
  revenue?: number;
  seasons?: number;
  episodes?: number;
  status: string;
  language: string;
  network?: string;
  posterPath: string;
  productions?: {
    id:number
    name:string
  }[];
  cast: [];
}

const Overview = memo(
  ({
    first_air_date,
    last_air_date,
    releasedate,
    runtime,
    genres,
    budget,
    revenue,
    seasons,
    episodes,
    status,
    language,
    network,
    posterPath,
    cast,
    productions,
  }: OverviewPrams) => {
    const destructGenre = genres?.map((genre) => genre.name);


    const runtimeConverter = (minutes:number) => {
      let finalmin = `${Math.floor(minutes / 60)}h ${minutes % 60}min`;
    
      return finalmin;
    };

    return (
      <div className="flex flex-col gap-10">
        <div className=" text-slate-200 flex ">
          <div className="hidden lg:w- xl:w-[20%]  lg:block pr-9 ">
            <div className="max-w-[400px]">
              <img
                src={process.env.NEXT_PUBLIC_SMALLWIDTH_IMAGE_URI + posterPath}
                alt=""
                className="w-full"
              />
              <div className=""></div>
            </div>
          </div>
          <div className="">
            <div className=" mb-10 max-w-5xl">
              <h2 className="text-lg mb-4">Over View</h2>
              <div className="text-[.85rem] ">{tv.overview}</div>
            </div>
            <div className="">
              <ul className="lg:flex flex-wrap xl:block ">
                {first_air_date && (
                  <li className="flex my-2 gap-6  text-sm lg:text-base lg:w-2/4">
                    <div className=" flex-1">
                      <div className="">First Aired </div>
                    </div>
                    <div className="flex-2 max-h-24 ">{first_air_date}</div>
                  </li>
                )}

                {releasedate && (
                  <li className="flex my-2 gap-6  text-sm lg:text-base lg:w-2/4">
                    <div className=" flex-1">
                      <div className="">Release Date</div>
                    </div>
                    <div className="flex-2 max-h-24 ">{releasedate}</div>
                  </li>
                )}

                {last_air_date && (
                  <li className="flex my-2 gap-6  text-sm lg:text-base lg:w-2/4">
                    <div className=" flex-1">
                      <div className="">Last Aired</div>
                    </div>
                    <div className="flex-2 max-h-24 ">{last_air_date}</div>
                  </li>
                )}

                {runtime && (
                  <li className="flex my-2 gap-6  text-sm lg:text-base lg:w-2/4">
                    <div className=" flex-1">
                      <div className="">Runtime</div>
                    </div>
                    <div className="flex-2 max-h-24 ">{runtimeConverter(runtime)}</div>
                  </li>
                )}

                <li className="flex my-2 gap-6  text-sm lg:text-base lg:w-2/4">
                  <div className=" flex-1">
                    <div className="">Genre</div>
                  </div>
                  <div className=" flex-2 max-h-24 ">
                    {destructGenre?.map((genre) => (
                      <div key={genre} className="">
                        {genre}
                      </div>
                    ))}
                  </div>
                </li>

                {seasons && (
                  <li className="flex my-2 gap-6  text-sm lg:text-base lg:w-2/4">
                    <div className=" flex-1">
                      <div className="">Seasons</div>
                    </div>
                    <div className="flex-2 max-h-24 ">{seasons}</div>
                  </li>
                )}

                {episodes && (
                  <li className="flex my-2 gap-6  text-sm lg:text-base lg:w-2/4">
                    <div className=" flex-1">
                      <div className="">Episodes</div>
                    </div>
                    <div className="flex-2 max-h-24 ">{episodes}</div>
                  </li>
                )}

                <li className="flex my-2 gap-6  text-sm lg:text-base lg:w-2/4">
                  <div className=" flex-1">
                    <div className=""> Status</div>
                  </div>
                  <div className="flex-2 max-h-24 ">{status}</div>
                </li>

                {budget && (
                  <li className="flex my-2 gap-6  text-sm lg:text-base lg:w-2/4">
                    <div className=" flex-1">
                      <div className="">Budget</div>
                    </div>
                    <div className="flex-2 max-h-24 ">${budget}</div>
                  </li>
                )}
                {revenue && (
                  <li className="flex my-2 gap-6  text-sm lg:text-base lg:w-2/4">
                    <div className=" flex-1">
                      <div className="">Revenue</div>
                    </div>
                    <div className="flex-2 max-h-24 ">${revenue}</div>
                  </li>
                )}

                <li className="flex my-2 gap-6  text-sm lg:text-base lg:w-2/4">
                  <div className=" flex-1">
                    <div className="">Language</div>
                  </div>
                  <div className="flex-2 max-h-24 ">{language}</div>
                </li>

                {network && (
                  <li className="flex my-2 gap-6  text-sm lg:text-base lg:w-2/4">
                    <div className=" flex-1">
                      <div className="">Network</div>
                    </div>
                    <div className="flex-2 max-h-24 ">{network}</div>
                  </li>
                )}

                {(budget && productions) && (
                  <li className="flex my-2 gap-6  text-sm lg:text-base lg:w-2/4">
                    <div className=" flex-1">
                      <div className="">Production Companies</div>
                    </div>
                    <div className="flex-2 max-h-24 ">
                    {productions?.map((production) => (
                        <div key={production.id} >

                          {production.name}
                        </div>
                      ))}
                      </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <Cast casts={cast} loading={false} />
      </div>
    );
  }
);

export default Overview;
