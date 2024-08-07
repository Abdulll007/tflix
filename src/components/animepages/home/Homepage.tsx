// import Loading from "@/components/Loading";
import dynamic from "next/dynamic";
const CarouselSection = dynamic (()=>import("@/components/animepages/home/CarouselSection"),{ ssr: false });



async function getHomeData() {
  const apiUrl = process.env.NEXT_PUBLIC_VERCEL_URL

  const homeurl = `${apiUrl}/api/anime/home`;
  const recenturl = `${apiUrl}/api/anime/recent`;


  const [homeResponse, recentResponse] = await Promise.all([
    await fetch(homeurl),
    await fetch(recenturl),
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


  // if (typeof document === undefined && anime) {
  //   return <Loading />;
  // }

  return (
    <div className="">
      <CarouselSection anime={anime} />
    </div>
  );
};

export default Homepage;
