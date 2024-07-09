import useWindowSize from "@/helper/windowSize";
import React, { useEffect, useState } from "react";

interface GenresProp {
  id: number;
  name: string;
}

const GenreSection = ({
  Genres,
  setAddGenres,
  addGenres,
}: {
  Genres: GenresProp[];

  setAddGenres: React.Dispatch<React.SetStateAction<number[]>>;
  addGenres: number[];
}) => {
  const handleClick = (
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    const target = event.target as HTMLParagraphElement;
    target.style.backgroundColor =
      target.style.backgroundColor === "gray" ? "#323232" : "gray";
  };

  const handleStateChange = (id: number) => {
    setAddGenres((prevData: number[]) => {
      if (addGenres.includes(id)) {
        return prevData.filter((showId) => showId !== id);
      }

      return [...prevData, id];
    });
  };

  

  const size = useWindowSize()

  const [toggleFilter,setToggleFilter] = useState(false)

  useEffect(()=>{
    if(size.width>640){
      setToggleFilter(true)

    }
    else{
      setToggleFilter(false)
    }
  },[size])


  return (
    <>
      <div className="w-full bg-[#323232] px-4 py-3 cursor-pointer sm:hidden rounded-md "
      onClick={()=>setToggleFilter(!toggleFilter)}
      >
        <h1 className="">Filters</h1>
      </div>

      {toggleFilter && Genres.map((genres, index) => (
        <p
          key={`${genres.id}${index}`}
          className={`bg-[#323232] py-1 px-2 rounded-md cursor-pointer text-center`}
          onClick={(e) => {
            handleClick(e);
            handleStateChange(genres.id);
          }}
        >
          {genres.name}
        </p>
      ))}
    </>
  );
};

export default GenreSection;
