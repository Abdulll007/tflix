import Image from "next/image";
import { FaClosedCaptioning, FaMicrophone } from "react-icons/fa";

import dynamic from "next/dynamic";
import Loading from "@/components/Loading";
import { Suspense } from "react";
import AnimeCarousel from "../animecomponents/AnimeCarousel";
import Link from "next/link";

const ServerTabs = dynamic(
  () => import("@/components/animepages/watch/ServerTabs"),
  {
    ssr: false,
  }
);

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
        <section className="flex flex-col xl:flex-row md:p-10  relative">
          <Image
            src={animeInfo?.anime?.info?.poster}
            alt={animeInfo?.anime?.info?.name}
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

          <Suspense fallback={<Loading />}>
            <ServerTabs
              episodeSource={episodeSource}
              providedServers={providedServers}
              getEpisodeServerListAndSource={getEpisodeServerListAndSource}
              animeEpisodes={animeEpisodes}
              getEpisodeSrc={getEpisodeSrc}
              
            />
          </Suspense>

            

          <div className={`w-full xl:max-w-sm p-10 xl:py-0 `}>
            <div className="flex xl:flex-col justify-center gap-5 ">
              <div className="">
                <Image
                  src={animeInfo?.anime?.info?.poster}
                  alt={animeInfo?.anime?.info?.name}
                  width={90}
                  height={136}
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
                <div className="max-w-lg">
                  <p className="text-sm">
                    {animeInfo?.anime?.info?.description?.substring(0, 255)}
                    {animeInfo?.anime?.info?.description.length > 255 && (
                      <button>{" + "} More</button>
                    )}
                  </p>
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
