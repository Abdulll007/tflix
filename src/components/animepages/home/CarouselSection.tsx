"use client";

import Image from "next/legacy/image";
import Link from "next/link";

import React, { useEffect, useRef } from "react";
import { IoInformationCircle, IoPlayCircleSharp, IoMic } from "react-icons/io5";
import { FaClosedCaptioning } from "react-icons/fa";

function cleanString(input: string) {
  return input?.replace(/<\/?[^>]+(>|$)|\(\s*Source:.*?\)/g, "");
}

interface SpotlightAnimeProp {
  rank: number;
  id: string;
  name: string;
  description: string;
  poster: string;
  jname: string;
  episodes: {
    sub: number;
    dub: number | null;
  };
  otherInfo: string[];
}

const CarouselSection = ({
  spotlightAnime,
}: {
  spotlightAnime: SpotlightAnimeProp[];
}) => {
  const slideIndex = useRef(0);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function showSlides(n: number) {
    if (typeof document !== undefined) {
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

  // if (typeof document !== undefined && anime) {
  // }
  showSlides(slideIndex.current);
  // Ensure only the first slide is shown

  console.log("carousel page");

  return (
    <div>
      {spotlightAnime?.map((data: any, index: number) => (
        <div
          className={`flex flex-col justify-between bg-black relative lg:block text-white carousel ${
            index === 0 ? "flex" : "hidden"
          }`}
          key={data.id}
        >
          <div className="backdropgradientsm pb-[52.25%] md:pb-[45.25%] relative lg:pb-[33.26%] ">
            <div className="w-full h-full md:backdropgradientlg absolute md:w-[70%]   right-0">
              {data.poster && (
                <Image
                  src={data?.poster}
                  alt={data.name}
                  layout="fill"
                  objectFit="cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full absolute "
                  priority
                />
              )}
            </div>
          </div>
          <div className="bg-black md:absolute top-0 left-0 bottom-0 px-4 pb-4 md:py-20 md:px-10 md:w-[60%] lg:w-[50%] flex flex-col justify-center bg-transparent">
            <h1 className="md:text-2xl font-semibold mb-2 lg:mb-3">
              {cleanString(data.name)}
            </h1>
            <div className="md:flex flex-col text-sm text-slate-400 gap-2 hidden">
              <div className="flex gap-4 ">
                {data?.otherInfo.map((item: string) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
              <div className="flex gap-6 ">
                <div className="flex items-center gap-2  p-1">
                  <FaClosedCaptioning size={20} />
                  <p>{data.episodes.sub}</p>
                </div>
                {data.episodes.dub && (
                  <div className="flex items-center gap-2 p-1">
                    <IoMic size={20} />
                    <p>{data.episodes.dub}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden md:inline-block mt-4">
              <p className="overflow-hidden sm:line-clamp-2 lg:line-clamp-3">
                {cleanString(data.description)}
              </p>
            </div>
            <div className="flex items-center gap-4 md:gap-8 mt-4">
              <Link
                href={`/anime/watch/${data.id}`}
                className="bg-gray-700 rounded-md flex items-center px-3 py-1 gap-2 text-nowrap"
              >
                <IoPlayCircleSharp size={20} />
                Watch Now
              </Link>
              <Link
                href={`/anime/info/${data.id}`}
                className="border border-gray-400 rounded-md flex items-center px-3 py-1 gap-2"
              >
                <IoInformationCircle size={20} /> Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarouselSection;
