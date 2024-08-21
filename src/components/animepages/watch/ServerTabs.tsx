"use client";

import AnimeEpisode from "@/components/Details/AnimeEpisode";
import VideoPlayer from "@/components/videocomponent/VideoPlayer";
import { useEffect, useState } from "react";
import "plyr-react/plyr.css";
import { FaLightbulb } from "react-icons/fa";

const ServerTabs = ({
  providedServers,
  getEpisodeServerListAndSource,
  episodeSource,
  animeEpisodes,
  getEpisodeSrc,
}: {
  providedServers: any;
  getEpisodeServerListAndSource: any;
  episodeSource: any;
  animeEpisodes: any;
  getEpisodeSrc: any;
}) => {
  const [selectedServer, setSelectedServer] = useState({
    serverType: providedServers?.sub ? "sub" : "dub",
    serverid: providedServers?.sub
      ? providedServers?.sub[0]?.serverId
      : providedServers?.dub[0]?.serverId,
  });
  const [serverData, setServerData] = useState<any>();

  const [playerOptions, setPlayerOptions] = useState({
    light: false,
    autoSkip: false,
  });

  

  const [availableServer, setAvailableServer] = useState<any>();

  useEffect(() => {
    setServerData(episodeSource);
    setAvailableServer(providedServers);
  }, []);

  const fetchServerInfo = async (
    episodeId: string,
    serverId?: string,
    serverType?: string
  ) => {
    if (!serverType) {
      const info = await getEpisodeSrc(
        episodeId,
        selectedServer.serverType,
        serverId
      );
      setServerData(info);
    } else {
      const info = await getEpisodeSrc(episodeId, serverType, serverId);

      setServerData(info);
    }
  };

  const fetchEpisodeAndSource = async (episodeId: string) => {
    const { serverLists, episodeSourceData } =
      await getEpisodeServerListAndSource(episodeId, selectedServer.serverType);

    setServerData(episodeSourceData);
    setAvailableServer(serverLists);
  };

  return (
    <div className="flex flex-1 flex-col-reverse lg:grid grid-cols-12 bg-black ">
      <div className="col-start-1 col-end-4 z-">
        <AnimeEpisode
          episodes={animeEpisodes.episodes}
          getEpisodeServerList={fetchEpisodeAndSource}
        />
      </div>
      <div className=" col-start-4 lg:col-end-13 my-auto">
        <div
          className={`relative pb-[56.25%] col-start-4 lg:col-end-13   overflow-hidden rounded-md  ${
            playerOptions.light ? "z-[12]":""
          }`}
        >
          {serverData?.sources && (
            <VideoPlayer
              source={serverData?.sources[0].url}
              captionSrc={serverData?.tracks}
              introStart={serverData.intro.start}
              introEnd={serverData.intro.end}
              outroStart={serverData.outro.start}
              outroEnd={serverData.outro.end}
              autoSkip={playerOptions.autoSkip}
            />
          )}
        </div>
        <div className="mx-10 my-2 flex space-x-3">
          <div
            className="cursor-pointer text-sm hover:text-white"
            onClick={() =>
              setPlayerOptions((prev) => {
                return { ...prev, light: true };
              })
            }
          >
            <span className="flex items-center gap-2 text-white ">
              <FaLightbulb />
              Light{" "}
              <span className="hover:text-white text-[#686868]">
                {playerOptions.light ? "Off" : "On"}
              </span>
            </span>
          </div>
          <div
            className="cursor-pointer text-sm hover:text-white"
            onClick={() =>
              setPlayerOptions((prev) => {
                return { ...prev, autoSkip: !playerOptions.autoSkip };
              })
            }
          >
            <span className="flex items-center gap-2 text-white ">
              
             Auto Skip
              <span className="hover:text-white text-[#686868]">
                {playerOptions.autoSkip ? "On" : "Off"}
              </span>
            </span>
          </div>
        </div>
        <div className="m-10  ">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="text-sm text-center mb-5 md:mb-0 text-gray-500">
              <p>You are watching </p>
              <p className="text-white text-lg">
                Episode {availableServer?.episodeNo}
              </p>
              <p className="md:max-w-60 text-sm">
                If current server doesn't work please try other servers.
              </p>
            </div>
            <div className="flex-1 flex flex-col gap-5  ">
              {availableServer?.sub.length > 0 && (
                <div className=" flex gap-3 flex-wrap items-center ">
                  SUB:
                  {availableServer?.sub?.map((server: any) => (
                    <button
                      className={`${
                        selectedServer.serverid === server.serverId &&
                        selectedServer.serverType === "sub"
                          ? "bg-[#7d8591]"
                          : "bg-[#212121]"
                      } text-nowrap  rounded-md px-2 py-2`}
                      key={server.id + server.serverName}
                      onClick={() => {
                        setSelectedServer({
                          serverid: server?.serverId,
                          serverType: "sub",
                        });
                        fetchServerInfo(
                          availableServer?.episodeId,
                          server?.serverId,
                          "sub"
                        );
                      }}
                    >
                      {server.serverName}
                    </button>
                  ))}
                </div>
              )}
              {availableServer?.dub.length > 0 && (
                <div className="flex gap-3 flex-wrap items-center">
                  DUB:
                  {availableServer?.dub?.map((server: any) => (
                    <button
                      className={`${
                        selectedServer.serverid === server.serverId &&
                        selectedServer.serverType === "dub"
                          ? "bg-[#7d8591]"
                          : "bg-[#212121]"
                      } text-nowrap  rounded-md px-2 py-2`}
                      key={server.id + server.serverName}
                      onClick={() => {
                        setSelectedServer({
                          serverid: server.serverId,
                          serverType: "dub",
                        });
                        fetchServerInfo(
                          availableServer.episodeId,
                          server.serverId,
                          "dub"
                        );
                      }}
                    >
                      {server.serverName}
                    </button>
                  ))}
                </div>
              )}
              {availableServer?.raw.length > 0 && (
                <div className=" flex gap-3 flex-wrap items-center ">
                  RAW:
                  {availableServer?.raw?.map((server: any) => (
                    <button
                      className={`${
                        selectedServer.serverid === server.serverId &&
                        selectedServer.serverType === "raw"
                          ? "bg-[#7d8591]"
                          : "bg-[#212121]"
                      } text-nowrap  rounded-md px-2 py-2`}
                      key={server.id + server.serverName}
                      onClick={() => {
                        setSelectedServer({
                          serverid: server?.serverId,
                          serverType: "raw",
                        });
                        fetchServerInfo(
                          availableServer?.episodeId,
                          server?.serverId,
                          "raw"
                        );
                      }}
                    >
                      {server.serverName}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          playerOptions.light ? "fixed" : "hidden"
        }  top-0 bottom-0 left-0 right-0 bg-[#000000ed] z-[10] `}
        onClick={() =>
          setPlayerOptions((prev) => {
            return { ...prev, light: false };
          })
        }
      ></div>
    </div>
  );
};

export default ServerTabs;
