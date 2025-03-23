import { useRef } from "react";
import Cards from "../Cards";

function Trending({ data }: { data: any }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="trending  m-6 mx-5 text-white">
      <h1 className="text-xl font-semibold ">Trending</h1>

      <div className="overflow-y-scroll no-scrollbar flex gap-6 relative  ">
        <button
          onClick={scrollLeft}
          className="sticky left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 h-20"
        >
          &lt;
        </button>
        <div className="overflow-y-scroll no-scrollbar flex gap-6" ref={carouselRef}>
          {data?.map((trending: any) => (
            <Cards
              key={trending.id}
              id={trending.id}
              name={trending.name}
              poster_path={trending.poster_path}
              title={trending.title}
              release_date={trending.release_date}
              first_air_date={trending.first_air_date}
              vote_average={trending.vote_average}
              mediaType={trending.media_type}
            />
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="sticky left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 h-20"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Trending;
