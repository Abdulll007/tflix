import React from "react";
import AnimeCards from "./AnimeCard";

const AnimeCarousel = ({
  carouselTitle,
  animeInfo,
  path
}: {
  carouselTitle: string;
  animeInfo: any;
  path:string
}) => {
  return animeInfo?.length >0 ?(
    <div className="text-white">
      <div className="text-2xl">
        <h2>{carouselTitle}</h2>
      </div>
      <div className="flex overflow-scroll no-scrollbar gap-4 ">
        {animeInfo?.map((data: any, index: number) => (
          <AnimeCards
            animeID={`${data.id}`}
            poster_path={data.poster}
            path={path}
            key={data.id + index}
            title={data.name}
            episode={data?.episodes}
            mediaType={data.type}
            duration={data?.duration}
          />
        ))}
      </div>
    </div>
  ):""
};

export default AnimeCarousel;
