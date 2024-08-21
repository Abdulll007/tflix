import { AnimeInfoProp } from "@/lib/types/AnimeTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaClosedCaptioning, FaMicrophone, FaPlay } from "react-icons/fa";
import AnimeCarousel from "../animecomponents/AnimeCarousel";
import ShareAnime from "../animecomponents/ShareAnime";

const InfoPage = ({
  animeInfo,
  relatedAnimes,
  recommendedAnimes,
  mostPopularAnimes,
}: AnimeInfoProp) => {
  return (
    <div className="">
      <div className=" text-white  relative  ">
        <Image
          src={animeInfo.info.poster}
          alt={animeInfo.info.name}
          fill
          className="absolute top-0 bottom-0 left-0 right-0 bg-cover bg-center -z-10 object-cover bg-blur"
        />

        <div
          className="absolute top-0 bottom-0 left-0 right-0 bg-cover bg-center -z-10"
          style={{
            backdropFilter: "blur(20px) contrast(60%) brightness(40%)",
            WebkitBackdropFilter: "blur(20px) contrast(60%) brightness(40%)",
          }}
        ></div>

        <div className="flex flex-col xl:flex-row justify-between gap-10 lg:gap-0 ">
          <div className="flex flex-col sm:flex-row justify-center p-10 md:m-auto max-w-screen-lg">
            <div className=" m-auto sm:m-0 ">
              <div className="relative w-[140px] md:w-[180px]  block pb-[150%] overflow-hidden rounded-md">
                <Image
                  src={animeInfo.info.poster}
                  alt={animeInfo.info.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full top-0 left-0  object-cover rounded-md"
                />
              </div>
            </div>
            <div className=" sm:mx-10 mt-10 sm:mt-0">
              <div className="flex items-center sm:items-start flex-col gap-6">
                <h1 className="text-3xl font-semibold">
                  {animeInfo.info.name}
                </h1>
                <ul className="text-white text-sm flex gap-3 items-center flex-wrap">
                  <li className="flex text-white border px-1 rounded-sm items-center ">
                    <FaClosedCaptioning className="mr-2" />{" "}
                    {animeInfo.info.stats.episodes.sub}
                  </li>
                  {animeInfo.info.stats.episodes.dub && (
                    <li className="flex text-white border px-1 rounded-sm items-center ">
                      <FaMicrophone className="mr-2" />
                      {animeInfo.info.stats.episodes.dub}
                    </li>
                  )}
                  <li>{animeInfo.info.stats.quality}</li>
                  <li>{animeInfo.info.stats.type}</li>
                  <li>{animeInfo.info.stats.rating}</li>
                  <li>{animeInfo.info.stats.duration}</li>
                </ul>

                <Link
                  href={`/anime/watch/${animeInfo.info.id}`}
                  className="bg-[#515151] hover:bg-[#323232] px-6 py-3 rounded-md flex items-center gap-2"
                >
                  <FaPlay size={10} /> Watch Now
                </Link>

                <div className="">
                  <p className="hidden sm:block">
                    {animeInfo.info.description.substring(0, 255) + "- "}
                    <button>More</button>
                  </p>
                </div>
                <ShareAnime />
              </div>
            </div>
          </div>
          <div
            className=" flex-1 p-10  xl:max-w-md justify-items-end"
            style={{ backgroundColor: "rgb(2 3 4 / 35%)" }}
          >
            <div className="text-sm flex flex-col gap-2 lg:gap-5">
              <div className="sm:hidden">
                <span>Overview</span>
                <div className="font-thin">
                  {animeInfo.info.description.substring(0, 255)}
                  <button className="font-normal">- More</button>
                </div>
              </div>
              <div className="text-nowrap">
                <span>Japanese Name: </span>
                <span className="font-thin ">
                  {animeInfo.moreInfo.japanese}{" "}
                </span>
              </div>
              <div className="">
                <span>Synonyms: </span>
                <span className="font-thin">
                  {animeInfo.moreInfo.synonyms}{" "}
                </span>
              </div>
              <div className="">
                <span>Premiered: </span>
                <span className="font-thin">
                  {animeInfo.moreInfo.premiered}{" "}
                </span>
              </div>
              <div className="">
                <span>Aired: </span>
                <span className="font-thin">{animeInfo.moreInfo.aired} </span>
              </div>
              <div className="">
                <span>Duration: </span>
                <span className="font-thin">
                  {animeInfo.moreInfo.duration}{" "}
                </span>
              </div>
              <div className="">
                <span>Status: </span>
                <span className="font-thin">{animeInfo.moreInfo.status} </span>
              </div>

              <div className="flex gap-2 items-center flex-wrap">
                <span>Genres: </span>
                {animeInfo.moreInfo.genres.map((genre: string) => (
                  <Link
                    href={`/anime/genre/${genre?.toLocaleLowerCase()}`}
                    className="font-thin  border border-gray-600 py-1 px-2 rounded-md text-center hover:font-extralight"
                    key={genre}
                  >
                    {genre}
                  </Link>
                ))}
              </div>

              <div className="">
                <span>Studio: </span>
                <span className="font-thin">{animeInfo.moreInfo.studios} </span>
              </div>
              <div className="">
                <span>Producers: </span>
                <span className="font-thin">
                  {animeInfo.moreInfo.producers}{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-10">
        <div
          className={`text-white flex flex-col ${
            mostPopularAnimes?.length &&
            mostPopularAnimes?.length > 0 &&
            "lg:flex-row"
          } lg:gap-10`}
        >
          <div
            className={`${
              mostPopularAnimes?.length &&
              mostPopularAnimes?.length > 0 &&
              "lg:w-[70%]"
            }   flex flex-col gap-6`}
          >
            {recommendedAnimes && (
              <AnimeCarousel
                carouselTitle="Recommendations for You"
                animeInfo={recommendedAnimes}
                path="/anime/watch"
              />
            )}

            {relatedAnimes && (
              <AnimeCarousel
                carouselTitle="Related Animes"
                animeInfo={relatedAnimes}
                path="/anime/watch"
              />
            )}

            <div className="lg:hidden">
              {mostPopularAnimes && (
                <AnimeCarousel
                  carouselTitle="Most Popular Animes"
                  animeInfo={mostPopularAnimes}
                  path="/anime/watch"
                />
              )}
            </div>
          </div>
          <div className="">
            <div
              className={` hidden ${
                mostPopularAnimes?.length &&
                mostPopularAnimes?.length > 0 &&
                "lg:flex"
              }  flex-col overflow-scroll no-scrollbar gap-4 text-white`}
            >
              <div className="text-2xl">
                <h2>Most Popular Animes</h2>
              </div>
              {mostPopularAnimes?.map((data) => (
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
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
