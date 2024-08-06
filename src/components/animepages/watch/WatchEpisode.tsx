"use client";
import React, { useEffect, useState } from "react";
import AnimeEpisode from "@/components/Details/AnimeEpisode";
import Error from "@/components/Error";
import ReactPlayer from "react-player";
import Link from "next/link";
import Image from "next/image";


const WatchEpisode = ({
  animeSource,
  params,
  episodes,
}: {
  animeSource: any;
  params: { id: string };
  episodes: any;
}) => {
  interface Servers {
    vidcdn: string;
    streamwish: string;
    doodstream: string;
    vidhide: string;
  }

  const [serverUrl, setServerUrl] = useState({
    url: "",
    type: "",
    servername: "",
  });
  const [isMounted, setIsMounted] = useState(false); // Add state to check if component is mounted

  useEffect(() => {
    setIsMounted(true); // Set isMounted to true when the component mounts
  }, []);

  useEffect(() => {
    setServerUrl({
      url: animeSource?.stream?.Referer,
      type: "mp4",
      servername: "",
    });
  }, [animeSource]);

  const handleChange = (key: string) => {
    setServerUrl({
      url: animeSource?.servers[key as keyof Servers],
      type: "mp4",
      servername: key,
    });
  };

  if (animeSource?.stream === null) {
    return (
      <Error>
        <div className="">
          <h2 className="text-center text-2xl">Oops! something went wrong</h2>
          <p className="text-center">
            Sorry, but it seems that something went wrong. Try refreshing the
            page or try again later.
          </p>
          <div className="flex justify-center mt-6">
            <Link
              href={"/anime"}
              className="text-center px-4 py-2 bg-[#565656]"
            >
              go home
            </Link>
          </div>
        </div>
      </Error>
    );
  }

  return (
    <div className="py-4 mx-4 sm:mx-10 xl:mx-20 lg:flex  lg:gap-3 h-full justify-between ">
      <div className="flex flex-col  max-w-screen-xl flex-1 bg-[#313131] rounded-md">
        <div className="bg-[#313131] mb-4 flex gap-4 items-center rounded-t-md">
          <div className="relative ">
            <Image
              src={episodes.image}
              width={80}
              height={80}
              alt=""
              className="rounded-tl-md "
            />
          </div>
          <div className="text-white">
            <Link
              href={`/anime/info/${params.id.split("-episode-")[0]}`}
              className=""
            >
              <h2 className="text-nowrap font-bold hover:text-gray-400 text-xl">
                {episodes.name}
              </h2>
            </Link>
            <p className="text-nowrap font-bold ">
              Episode :{" "}
              <span className="font-light hidden sm:inline-block">
                {animeSource.name}
              </span>
              <span className="font-light inline-block sm:hidden">
                {animeSource.name.split("Episode")[1]}
              </span>
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div 
          className="relative pb-[56.25%] w-full overflow-hidden rounded-md min-h-[260px] bg-black"
          >
            {serverUrl.type === "mp4" ? (
              <iframe
                className="w-full h-full absolute top-0 left-0 bottom-0 right-0 border-0 "
                src={serverUrl.url}
                allowFullScreen
                scrolling="no"
              ></iframe>
            ) : (
              isMounted && ( // Render ReactPlayer only if the component is mounted
                <ReactPlayer
                  width={"100%"}
                  height={"100%"}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                  }}
                  url={serverUrl.url}
                  controls={true}
                  playing={true}
                  config={{}}
                  
                />
              )
            )}

            {/* <VideoPlayer source={serverUrl.url} type={serverUrl.type}/> */}
          </div>
        </div>

        <div className="text-white my-2 p-2 rounded-md">
          {/* <div className="text-center text-xl ">{animeSource?.name}</div> */}

          <p className="text-center my-2 text-gray-500">
            Try different servers if current server is not working.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <h2>Servers</h2>
            <div className="flex gap-4 justify-center  flex-wrap capitalize ">
              <button
                className={`${
                  serverUrl.servername === "sources"
                    ? `bg-[#242424]`
                    : `bg-[#7d8591]`
                } px-3 py-2   rounded-md `}
                onClick={() =>
                  setServerUrl({
                    url: animeSource?.stream.sources[0].file,
                    type: animeSource?.stream.sources[0].type,
                    servername: "sources",
                  })
                }
              >
                server 1
              </button>
              <button
                className={`${
                  serverUrl.servername === "sources_bk"
                    ? `bg-[#242424]`
                    : `bg-[#7d8591]`
                } px-3 py-2   rounded-md `}
                onClick={() =>
                  setServerUrl({
                    url: animeSource?.stream.sources_bk[0].file,
                    type: animeSource?.stream.sources_bk[0].type,
                    servername: "sources_bk",
                  })
                }
              >
                server 2
              </button>

              {animeSource !== undefined &&
                Object?.keys(animeSource?.servers)?.map((key: string) => (
                  <button
                    className={`${
                      serverUrl.servername === key
                        ? `bg-[#242424]`
                        : `bg-[#7d8591]`
                    } px-3 py-2   rounded-md capitalize`}
                    key={key}
                    onClick={() => {
                      handleChange(key);
                    }}
                  >
                    {key}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-[#313131] rounded-md w-full lg:w-[30%]">
        <AnimeEpisode
          episodes={episodes.episodes}
          selectedEpisode={params.id}
        />
      </div>
    </div>
  );
};

export default WatchEpisode;
