"use client"
import useFetchData from "@/helper/FetchHook";
import Image from "next/legacy/image";
import Link from "next/link";
import React, { memo } from "react";

function Recommendation({
  id,
  mediaType,
}: {
  id: number | string;
  mediaType: string;
}) {
  let recommendationData;

  if (mediaType !== "anime") {
    const [data] = useFetchData(
      ` ${process.env.NEXT_PUBLIC_REQUEST_API}/${mediaType}/${id}/recommendations`
    );
    recommendationData = data;
  } else {
    const [data] = useFetchData(`/api/anime/recommendations/${id}`, true);

    recommendationData = data?.data?.results;
  }

  return (
    <div className="w-full mt-2">
      <div className="text-white">
        <h2 className="text-xl font-bold mb-2">Recommendations</h2>
      </div>

      <div className="flex overflow-y-scroll no-scrollbar gap-4  mb-7 rounded-lg">
        {recommendationData &&
          recommendationData?.map((recommendation: any) => (
            <Link
              href={
                mediaType === "anime"
                  ? {
                      pathname: `/anime/info/${recommendation.title.userPreferred
                        .toLowerCase()
                        .replaceAll(/[()\[\]{}]/g,"")
                        .replaceAll(": "," ")
                        .replaceAll(" ", "-")}`,
                      
                    }
                  : `/${recommendation.media_type}/${recommendation.id}`
              }
              key={recommendation.id}
              className="max-w-72 h-full "
              scroll={false}
            >
              <div className="relative pb-[56.25%] w-60 lg:w-72  bg-[#151515] rounded-md">
                {recommendation.backdrop_path || recommendation.bannerImage ? (
                  <Image
                    src={
                      mediaType === "anime"
                        ? recommendation.bannerImage
                        : `${process.env.NEXT_PUBLIC_IMAGE_URI}/${recommendation.backdrop_path}`
                    }
                    className="absolute top-0 object-cover left-0 w-full h-full rounded-md"
                    alt=""
                    objectFit="cover"
                    layout='fill'
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-20">
                    <img src="/noposter.svg" alt="" />
                  </div>
                )}
              </div>

              <div className="text-white flex justify-between pt-2 px-2 ">
                <h3 className="">
                  {mediaType === "anime"
                    ? recommendation.title.english
                    : recommendation?.title || recommendation?.name}
                </h3>
                <p>
                  {mediaType === "anime"
                    ? Math.ceil((recommendation.meanScore * 100) / 100)
                    : Math.ceil((recommendation.vote_average * 100) / 10)}
                  %
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default memo(Recommendation);
