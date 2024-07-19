import Link from "next/link";
import React from "react";

function Recommendation({ recommendations }: any) {
  return (
    <div className="w-full mt-2">
      <div className="text-white">
        <h2 className="text-xl font-bold mb-2">Recommendations</h2>
      </div>

      <div className="flex overflow-y-scroll no-scrollbar  gap-4  mb-7 rounded-lg">
        {recommendations?.map((recommendation: any) => (
          <Link
            href={`/${recommendation.media_type}/${recommendation.id}`}
            key={recommendation.id}
            className="w-full h-full"
          >
            <div className="relative pb-[56.25%] w-72 lg:w-96  bg-[#151515] rounded-md">
              {recommendation.backdrop_path ? (
                <img
                  src={`${`${process.env.NEXT_PUBLIC_IMAGE_URI}/${recommendation.backdrop_path}`}`}
                  className="absolute top-0 left-0 w-full h-full rounded-md"
                  alt=""
                />
              ) : (
                <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-20">
                  <img src="/noposter.svg" alt="" />
                </div>
              )}
            </div>

            <div className="text-white flex justify-between pt-2 px-2 ">
              <h3 className="">
                {recommendation?.title || recommendation?.name}
              </h3>
              <p>{Math.ceil((recommendation.vote_average * 100) / 10)}%</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Recommendation;
