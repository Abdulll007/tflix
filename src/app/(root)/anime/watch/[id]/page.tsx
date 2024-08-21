import WatchEpisode from "@/components/animepages/watch/WatchEpisode";
import Loading from "@/components/Loading";

import { Suspense } from "react";

const apiUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

async function getWatchEpisodeData(params: string) {
  // fetching info and episodes of the anime
  const [animeInfoData, animeEpisodesData] = await Promise.all([
    await fetch(`${apiUrl}/api/anime/info/${params}`),
    await fetch(
      `${process.env.NEXT_PUBLIC_ANIME_API3}/anime/episodes/${params}`
    ),
  ]);
  const animeInforesponse = await animeInfoData.json();
  const animeInfo = animeInforesponse.data;
  const animeEpisodes = await animeEpisodesData.json();

  const firstEpisodeId = animeEpisodes?.episodes[0].episodeId;

  // fetching serverList and episode-source of the anime

  const [serverListData, episodeSourceData] = await Promise.all([
    await fetch(
      `${process.env.NEXT_PUBLIC_ANIME_API3}/anime/servers?episodeId=${firstEpisodeId}`
    ),
    await fetch(
      `${process.env.NEXT_PUBLIC_ANIME_API3}/anime/episode-srcs?id=${firstEpisodeId}&category=sub`
    ),
  ]);

  const providedServers = await serverListData.json();
  const episodeSource = await episodeSourceData.json();

  // const episodeSource = episdesourcetest
  // const animeInfo = animeinfotest
  // const animeEpisodes = episdesourcetest
  // const providedServers =serverlisttest;

  return { animeEpisodes, providedServers, animeInfo, episodeSource };
}

async function getEpisodeServerListAndSource(episodeid: string,serverType?:string) {
  "use server";
  // getting server list and episode source 
  try {
    const [servers, serverSource] = await Promise.all([
      await fetch(
        `${process.env.NEXT_PUBLIC_ANIME_API3}/anime/servers?episodeId=${episodeid}`
      ),
      await getEpisodeSrc(episodeid,serverType),
    ]);

    const serverLists = await servers.json();
    const episodeSourceData = await serverSource;



    return { serverLists, episodeSourceData };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getEpisodeSrc(
  episodeId: string,
  serverType?: string,
  serverId?: string,
) {
  "use server";

  //get episode source
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ANIME_API3}/anime/episode-srcs?id=${episodeId}${
      serverId ? `&serverId=${serverId}` : ""
    }&category=${serverType ? serverType : "sub"}`
  );


  const episodeSourceData = await response.json();

  return episodeSourceData;
}

const Page = async ({ params }: any) => {
  let { episodeSource, animeEpisodes, providedServers, animeInfo } =
    await getWatchEpisodeData(params.id);

  return (
    <Suspense fallback={<Loading />}>
      <WatchEpisode
        episodeSource={episodeSource}
        animeEpisodes={animeEpisodes}
        providedServers={providedServers}
        getEpisodeSrc={getEpisodeSrc}
        animeInfo={animeInfo}
        getEpisodeServerListAndSource={getEpisodeServerListAndSource}
      />
    </Suspense>
  );
};

export default Page;
