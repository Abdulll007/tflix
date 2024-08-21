import dynamic from "next/dynamic";
import TopTen from "@/components/animepages/home/TopTen";
const Schedule = dynamic(
  () => import("@/components/animepages/home/Schedule"),
  { ssr: false }
);

import AnimeGenres from "@/components/animepages/animecomponents/AnimeGenres";
import AnimeCarousel from "../animecomponents/AnimeCarousel";

const CarouselSection = dynamic(
  () => import("@/components/animepages/home/CarouselSection"),
  { ssr: false }
);

const getHomeData = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
  const homeurl = `${apiUrl}/api/anime/home`;

  const response = await fetch(homeurl);

  const homedata = await response.json();
  const spotlightAnime = homedata.data.spotlightAnimes;
  const trendingAnime = homedata.data.trendingAnimes;
  const topTen = homedata.data.top10Animes;
  const latestEpisodes = homedata.data.latestEpisodeAnimes;
  const mostPopular = homedata.mostPopularAnimes;
  const topAiring = homedata.data.topAiringAnimes;
  const topUpcommig = homedata.data.topUpcomingAnimes;

  return {
    spotlightAnime,
    trendingAnime,
    topTen,
    latestEpisodes,
    mostPopular,
    topAiring,
    topUpcommig,
  };
};

const Homepage = async () => {
  const {
    spotlightAnime,
    trendingAnime,
    topTen,
    latestEpisodes,
    mostPopular,
    topAiring,
    topUpcommig,
  } = await getHomeData();

  return (
    <>
      <CarouselSection spotlightAnime={spotlightAnime} />

      <section className="mx-4 md:mx-10 ">
        <div className="xl:flex  gap-8 ">
          <div className="xl:w-[70%]">
            <AnimeCarousel
              carouselTitle="Most Trending"
              animeInfo={trendingAnime}
              path="/anime/info"
            />

            <AnimeCarousel
              carouselTitle="Added Episodes"
              animeInfo={latestEpisodes}
              path="/anime/watch"
            />

            <AnimeCarousel
              carouselTitle="Top Airing"
              animeInfo={topAiring}
              path="/anime/watch"
            />

            <AnimeCarousel
              carouselTitle="Top Upcoming"
              animeInfo={topUpcommig}
              path="/anime/watch"
            />

            <Schedule />
          </div>
          <section className="flex flex-col text-white">
            <TopTen topten={topTen} />
            <AnimeGenres />
          </section>
        </div>
      </section>
    </>
  );
};

export default Homepage;
