import Loading from "@/components/Loading";
import CarouselSection from "./CarouselSection";

 async function getHomeData() {
  const [homeResponse, recentResponse] = await Promise.all([
    await fetch(`http://localhost:3000/api/anime/home`),
    await fetch(`http://localhost:3000/api/anime/recent`),
  ]);
  const homedata = await homeResponse.json();
  const trending = homedata.data.results.anilistTrending;

  const popular = homedata.data.results.gogoPopular;

  const recentdata = await recentResponse.json();
  const recent = recentdata.data.results;

  return { trending, popular, recent };
}


const Homepage = async () => {
  const anime = await getHomeData().then((data) => data);
  if (!anime.trending) {
    return <Loading />;
  }

  return (
    <div className="">
      <CarouselSection anime={anime} />
    </div>
  );
};

export default Homepage;
