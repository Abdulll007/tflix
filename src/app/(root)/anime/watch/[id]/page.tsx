
import WatchEpisode from "@/components/animepages/watch/WatchEpisode";

const apiUrl = process.env.NEXT_PUBLIC_SITEURL || 'http://localhost:3000';

async function getWatchEpisodeData(params: string) {
  const [animeInfo, serverData] = await Promise.all([
    await fetch(
      `${apiUrl}/api/anime/info/${params.split("-episode-")[0]}`
    ),
    await fetch(`${apiUrl}/api/anime/watch/${params}`),
  ]);

  const animeSource = await serverData.json();
  const episodesData = await animeInfo.json();

  return { animeSource, episodesData };
}

const Page = async ({ params }: any) => {
  
  const { animeSource, episodesData } = await getWatchEpisodeData(params.id);

  return (
   
      <WatchEpisode
        animeSource={animeSource.data.results}
        params={params}
        episodes={episodesData.data.results}
      />
  
  );
};

export default Page;
