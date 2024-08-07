// @ts-ignore
"use client";
import Cards from "@/components/Cards";
import Loading from "@/components/Loading";

import Image from "next/legacy/image";

import React, { useEffect, useRef } from "react";
import { IoInformationCircle, IoPlayCircleSharp } from "react-icons/io5";

function cleanString(input: string) {
  return input?.replace(/<\/?[^>]+(>|$)|\(\s*Source:.*?\)/g, "");
}

const CarouselSection = ({
  anime,
}: {
  anime: { trending: []; popular: []; recent: [] };
}) => {
  const slideIndex = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function showSlides(n: number) {
    
      const slides = document.getElementsByClassName(
        "carousel"
      ) as HTMLCollectionOf<HTMLElement>;

      if (n >= slides.length) {
        slideIndex.current = 0;
      } else if (n < 0) {
        slideIndex.current = slides.length - 1;
      } else {
        slideIndex.current = n;
      }

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      if (slides[slideIndex.current]) {
        slides[slideIndex.current].style.display = "flex";
    
    }
  }

  function startSlideShow() {
    showSlides(slideIndex.current);
    intervalRef.current = setInterval(() => {
      showSlides(slideIndex.current + 1);
    }, 5000);
  }

  function stopSlideShow() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  useEffect(() => {
    startSlideShow();
    return () => stopSlideShow();
  }, []);
  
 
  showSlides(slideIndex.current); // Ensure only the first slide is shown initially


  return (
    <div>
      {anime?.trending
        ?.filter((data: any) => data.bannerImage !== null)
        ?.map((data: any, index: number) => (
          <div
            className={`flex flex-col justify-between bg-black relative lg:block text-white carousel ${
              index === 0 ? "flex" : "hidden"
            }`}
            key={data.id}
          >
            <div className="backdropgradientsm pb-[52.25%] md:pb-[36.25%] relative lg:pb-[33.26%] ">
              <div className="w-full h-full md:backdropgradientlg absolute right-0">
                {data.bannerImage && (
                  <Image
                    src={data?.bannerImage}
                    alt={data.title.english}
                    layout="fill"
                    objectFit="cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full absolute "
                    priority
                  />
                )}
              </div>
            </div>
            <div className="bg-black md:absolute top-0 left-0 bottom-0 px-6 pb-6 sm:px-10 sm:pb-10 md:p-20 md:w-[50%] flex flex-col justify-center bg-transparent">
              <h1 className="md:text-2xl font-semibold mb-2 lg:mb-3">
                {cleanString(data.title.english)}
              </h1>
              <div className="lg:flex flex-col text-sm text-slate-400 gap-2 hidden">
                <div className="flex gap-4">
                  <h2>{data.format}</h2>
                  <p>{data.status}</p>
                </div>
                <div className="flex gap-4">
                  {data.genres.map((genre: any) => (
                    <p className="rounded-md" key={genre}>
                      {genre}
                    </p>
                  ))}
                </div>
              </div>
              <div className="hidden sm:inline-block mt-4">
                <p className="overflow-hidden sm:line-clamp-2 lg:line-clamp-3">
                  {cleanString(data.description)}
                </p>
              </div>
              <div className="flex items-center gap-4 md:gap-8 mt-4">
                <div className="bg-gray-700 rounded-md flex items-center px-3 py-1 gap-2">
                  <IoPlayCircleSharp size={20} />
                  Watch Now
                </div>
                <div className="border border-gray-400 rounded-md flex items-center px-3 py-1 gap-2">
                  <IoInformationCircle size={20} /> Details
                </div>
              </div>
            </div>
          </div>
        ))}

      <section className="mx-4 md:mx-20 lg:mx-22 flex flex-col gap-8 p-6">
        <div className="text-white">
          <div className="text-2xl">
            <h2>Most Trending</h2>
          </div>
          <div className="recent flex overflow-scroll no-scrollbar gap-4">
            {anime.popular.map((data: any) => (
              <Cards
                animeID={`/info/${data.id}`}
                poster_path={data.image}
                mediaType="anime"
                key={data.id}
                title={data.title}
              />
            ))}
          </div>
        </div>

        <div className="text-white">
          <div className="text-2xl">
            <h2>Added Episodes</h2>
          </div>
          <div className="flex overflow-scroll no-scrollbar gap-4 text-white">
            {anime.recent.map((data: any) => (
              <Cards
                animeID={`/watch/${data.id}`}
                poster_path={data.image}
                mediaType="anime"
                key={data.id}
                title={data.title}
                episode={data.episode}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarouselSection;
