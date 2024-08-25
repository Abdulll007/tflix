import Image from "next/image";
import { FaClosedCaptioning, FaMicrophone } from "react-icons/fa";

import dynamic from "next/dynamic";
import Loading from "@/components/Loading";
import { Suspense } from "react";
import AnimeCarousel from "../animecomponents/AnimeCarousel";
import Link from "next/link";

import ServerTabs from "@/components/animepages/watch/ServerTabs"
import Description from "../shared/Description";
 

const WatchEpisode = ({
  episodeSource,
  animeEpisodes,
  providedServers,
  getEpisodeSrc,
  animeInfo,
  getEpisodeServerListAndSource,
}: {
  episodeSource: any;
  animeEpisodes: any;
  providedServers: any;
  getEpisodeSrc?: any;
  animeInfo: any;
  getEpisodeServerListAndSource: any;
}) => {


  return (
    <div className="">
      <div className="text-white">
        <section className="flex flex-col  md:p-10  relative">
          <Image
            src={animeInfo?.anime?.info?.poster}
            alt={animeInfo?.anime?.info?.name}
            
            className="absolute top-0 bottom-0 left-0 right-0 bg-cover bg-center -z-10 object-cover bg-blur w-full h-full"
            width={300}
            height={393}
          />

          <div
            className="absolute top-0 bottom-0 left-0 right-0 bg-cover bg-center -z-10"
            style={{
              backdropFilter: "blur(20px) contrast(60%) brightness(40%)",
              WebkitBackdropFilter: "blur(20px) contrast(60%) brightness(40%)",
            }}
          ></div>

          
            <ServerTabs
              episodeSource={episodeSource}
              providedServers={providedServers}
              getEpisodeServerListAndSource={getEpisodeServerListAndSource}
              animeEpisodes={animeEpisodes}
              getEpisodeSrc={getEpisodeSrc}
              
            />
          

            

          <div className={`w-full  p-10  `}>
            <div className="flex flex-col md:flex-row items-center  gap-5 ">
              <div className="justify-start">
                <Image
                  src={animeInfo?.anime?.info?.poster}
                  alt={animeInfo?.anime?.info?.name}
                  width={120}
                  height={80}
                  className="h-auto max-w-none "
                />
              </div>
              <div className=" text-white  flex flex-col gap-3 ">
                <Link
                  href={`/anime/info/${animeInfo?.anime?.info.id}`}
                  className=""
                >
                  <h1 className="text-3xl font-semibold">
                    {animeInfo?.anime?.info?.name}
                  </h1>
                </Link>
                <ul className="text-sm flex gap-3 items-center flex-wrap">
                  <li className="flex  border px-1 rounded-sm items-center ">
                    <FaClosedCaptioning className="mr-2" />{" "}
                    {animeInfo?.anime?.info?.stats?.episodes?.sub}
                  </li>
                  {animeInfo?.anime?.info?.stats?.episodes?.dub && (
                    <li className="flex border px-1 rounded-sm items-center ">
                      <FaMicrophone className="mr-2" />
                      {animeInfo?.anime?.info?.stats?.episodes?.dub}
                    </li>
                  )}
                  <li>{animeInfo?.anime?.info?.stats?.quality}</li>
                  <li>{animeInfo?.anime?.info?.stats?.type}</li>
                  <li>{animeInfo?.anime?.info?.stats?.rating}</li>
                  <li>{animeInfo?.anime?.info?.stats?.duration}</li>
                </ul>
                <div className="">
                  <Description animeDescription={animeInfo?.anime?.info?.description} className={"text-sm max-w-5xl"}/>
                </div>

                <div className="text-nowrap">
                <span>Japanese Name: </span>
                <span className="font-thin ">
                  {animeInfo.anime.moreInfo.japanese}{" "}
                </span>
              </div>
              <div className="">
                <span>Synonyms: </span>
                <span className="font-thin">
                  {animeInfo.anime.moreInfo.synonyms}{" "}
                </span>
              </div>
              <div className="">
                <span>Premiered: </span>
                <span className="font-thin">
                  {animeInfo.anime.moreInfo.premiered}{" "}
                </span>
              </div>
              <div className="">
                <span>Aired: </span>
                <span className="font-thin">{animeInfo.anime.moreInfo.aired} </span>
              </div>
              <div className="">
                <span>Duration: </span>
                <span className="font-thin">
                  {animeInfo.anime.moreInfo.duration}{" "}
                </span>
              </div>
              <div className="">
                <span>Status: </span>
                <span className="font-thin">{animeInfo.anime.moreInfo.status} </span>
              </div>
                
              <div className="flex gap-2 items-center flex-wrap">
                <span>Genres: </span>
                {animeInfo.anime.moreInfo.genres.map((genre: string) => (
                  <Link
                    href={`/anime/genre/${genre?.toLocaleLowerCase()}`}
                    className="font-thin  border border-gray-600 py-1 px-2 rounded-md text-center hover:font-extralight"
                    key={genre}
                  >
                    {genre}
                  </Link>
                ))}
              </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="p-10 text-white flex flex-col gap-5">
        {animeInfo?.recommendedAnimes && (
          <AnimeCarousel
            carouselTitle="Recommended Animes"
            animeInfo={animeInfo?.recommendedAnimes}
            path="/anime/watch"
          />
        )}
        {animeInfo?.relatedAnimes && (
          <AnimeCarousel
            carouselTitle="Related Animes"
            animeInfo={animeInfo?.relatedAnimes}
            path="/anime/watch"
          />
        )}

        {animeInfo?.mostPopularAnimes && (
          <AnimeCarousel
            carouselTitle="Most Popular Animes"
            animeInfo={animeInfo?.mostPopularAnimes}
            path="/anime/watch"
          />
        )}
      </div>
    </div>
  );
};

export default WatchEpisode;
