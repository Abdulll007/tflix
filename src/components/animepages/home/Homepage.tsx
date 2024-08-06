import Loading from "@/components/Loading";
import CarouselSection from "./CarouselSection";

const apiUrl = process.env.NEXT_PUBLIC_SITEURL || 'http://127.0.0.1:80';

 async function getHomeData() {
  const [homeResponse, recentResponse] = await Promise.all([
    await fetch(`${apiUrl}/api/anime/home`),
    await fetch(`${apiUrl}/api/anime/recent`),
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
