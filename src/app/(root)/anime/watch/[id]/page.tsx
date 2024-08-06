
import WatchEpisode from "@/components/animepages/watch/WatchEpisode";


async function getWatchEpisodeData(params: string) {
  const [animeInfo, serverData] = await Promise.all([
    await fetch(
      `http://localhost:3000/api/anime/info/${params.split("-episode-")[0]}`
    ),
    await fetch(`http://localhost:3000/api/anime/watch/${params}`),
  ]);

  const animeSource = await serverData.json();
  const episodesData = await animeInfo.json();

  return { animeSource, episodesData };
}

const Page = async ({ params }: any) => {
  // const [animeSource, setAnimeSource] = useState<any>({});
  // const [serverUrl, setServerUrl] = useState({
  //   url: "",
  //   type: "",
  //   servername: "",
  // });
  // const [episodesData, setEpisodesData] = useState<any>([]);
  // const [data, loading] = useFetchData(`/api/anime/watch/${params.id}`, true);

  // useEffect(() => {
  //   setAnimeSource(data.data);
  //   setServerUrl({
  //     url: animeSource?.results?.stream?.sources[0].file,
  //     type: animeSource?.results?.stream?.sources[0].type,
  //     servername: "sources",
  //   });

  //   fetchEpisodes();
  // }, [data]);

  // const fetchEpisodes = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `/api/anime/info/${params.id.split("-episode-")[0]}`
  //     );
  //     setEpisodesData(data.data.results);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleChange = (key: string) => {
  //   setServerUrl({
  //     url: animeSource?.results?.servers[key as keyof Servers],
  //     type: "mp4",
  //     servername: key,
  //   });
  // };

  // if (loading) {
  //   return <Loading />;
  // }
  // console.log(data, serverUrl);

  // if (animeSource?.results?.stream === null && !loading) {
  //   return (
  //     <Error>
  //       <div className="">
  //         <h2 className="text-center text-2xl">Oops! something went wrong</h2>
  //         <p className="text-center">
  //           Sorry, but it seems that something went wrong. Try refreshing the
  //           page or try again later.
  //         </p>
  //         <div className="flex justify-center mt-6">
  //           <button
  //             className="text-center px-4 py-2 bg-[#565656]"
  //             onClick={() => route.push("/anime")}
  //           >
  //             go home
  //           </button>
  //         </div>
  //       </div>
  //     </Error>
  //   );
  // }

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
