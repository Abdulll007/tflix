import Link from "next/link";
import React, { useEffect, useState } from "react";

import { IoPlaySharp } from "react-icons/io5";
import { tvGenres, movieGenres } from "../genres";
import Image from "next/legacy/image";

function BannerImg({ data, loading }: { data: any; loading: boolean }) {
  const [bannerData, setBannerData] = useState<any>();

  useEffect(() => {
    const randomnumber = Math.floor(Math.random() * 19);
    setBannerData(data[randomnumber]);
  }, [data]);

  return (
    <div className="banner relative w-full h-screen max-h-[93vh] bannergradientsm">
      <>
        <div className="hidden md:block md:absolute inset-0">
          <Image
            layout="fill"
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover w-full h-full opacity-55"
            src={`https://image.tmdb.org/t/p/original${bannerData?.backdrop_path}`}
            alt={bannerData?.title || bannerData?.name}
          />

          <div className="absolute bottom-20 px-9 w-full h-20 sm:h-32 md:flex flex-col justify-center items-center text-white hidden z-[2]">
            <h1 className="font-[sans-serif] text-2xl sm:text-3xl lg:text-5xl font-bold text-center">
              {bannerData?.title || bannerData?.name}
            </h1>
            <p className="text-center ">{bannerData?.overview}</p>

            <Link
              href={`/${bannerData?.media_type}/${bannerData?.id}`}
              className="flex items-center gap-2 mt-4 border py-4 px-8 rounded-full text-xl hover:bg-blue-600"
            >
              <IoPlaySharp />
              <span>Play</span>
            </Link>
          </div>
        </div>

        <div className="w-full md:hidden">
          <div className="absolute inset-0">
            <img
              className="object-cover w-full h-full opacity-55"
              src={`https://image.tmdb.org/t/p/original${bannerData?.poster_path}`}
              alt="img"
            />
          </div>

          <div className="text-white absolute bottom-20  flex flex-col justify-center items-center w-full gap-4 z-[2]">
            <h1 className="text-3xl font-bold font-sans">
              {bannerData?.name || bannerData?.title}
            </h1>

            <div className="flex gap-3">
              {bannerData?.media_type === "tv" &&
                bannerData?.genre_ids?.map((genres: number) => (
                  <p className="" key={genres}>
                    {tvGenres.map((genre) => {
                      return genres === genre.id && genre.name;
                    })}
                  </p>
                ))}

              {bannerData?.media_type === "movie" &&
                bannerData?.genre_ids?.map((genres: number) => (
                  <p className="font-semibold" key={genres}>
                    {movieGenres.map((genre) => {
                      return genres === genre.id && genre.name;
                    })}
                  </p>
                ))}
            </div>
            <Link
              href={`/${bannerData?.media_type}/${bannerData?.id}`}
              className="flex items-center justify-center text-2xl border w-3/5 py-3 gap-2 hover:bg-blue-600  rounded-xl"
            >
              {" "}
              <IoPlaySharp />
              Watch Now{" "}
            </Link>
          </div>
        </div>
      </>
    </div>
  );
}

export default BannerImg;
