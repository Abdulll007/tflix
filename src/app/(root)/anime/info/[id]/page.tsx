import Link from "next/link";
import Error from "@/components/Error";
import InfoPage from "@/components/animepages/info/InfoPage";

const apiUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

async function getAnimeInfo(params: string) {
  const animeInfoData = await fetch(`${apiUrl}/api/anime/info/${params}`).then(
    (res) => res.json()
  );

  const animeData = animeInfoData?.data;

  const animeInfo = animeData?.data?.anime;
  const mostPopularAnimes = animeData?.data?.mostPopularAnimes;
  const relatedAnimes = animeData?.data?.relatedAnimes;
  const recommendedAnimes = animeData?.data?.recommendedAnimes;

  return { animeInfo, relatedAnimes, recommendedAnimes, mostPopularAnimes };
}

const page = async ({ params }: { params: { id: string } }) => {
  const { animeInfo, relatedAnimes, recommendedAnimes, mostPopularAnimes } =
    await getAnimeInfo(params.id);

  if (!animeInfo) {
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
    <InfoPage
      animeInfo={animeInfo}
      recommendedAnimes={recommendedAnimes}
      relatedAnimes={relatedAnimes}
      mostPopularAnimes={mostPopularAnimes}
    />
  );


};

export default page;
