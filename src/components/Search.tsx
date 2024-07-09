import { options } from "@/helper/apiConfig";
import axios from "axios";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";

const Search = () => {
  const [toggleSearch, setToggleSearch] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<any[]>([]);
  const [searchResult, setSearchResult] = useState("");

  const fetchingData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SEARCH}${searchResult}&include_adult=false&language=en-US`,
        options
      );

      setData(response.data.results);
    } catch (error) {}
  };

  useEffect(() => {
    const searchRequest = setTimeout(() => {
      if (searchResult.length > 0) {
        fetchingData();
      }
    }, 1000);

    return () => clearTimeout(searchRequest);
  }, [searchResult]);

  useEffect(() => {
    if (toggleSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [toggleSearch]);

  const handleChange = (event: any) => {
    setSearchResult(event?.target.value);
  };

  const linkHandler = () => {
    setSearchResult("");
    setData([]);
    setToggleSearch(false);
  };
  return (
    <div className="">
      <div className=" flex justify-center items-center rounded-full w-full sm:w-full bg-[#323232]">
        <input
          className={`border-none outline-none sm:text-lg rounded-l-md px-2 w-full ${
            toggleSearch ? "block" : "hidden"
          } bg-transparent text-white`}
          ref={inputRef}
          value={searchResult}
          onChange={handleChange}
          placeholder="Search..."
          autoFocus={true}
          type="text "
        />

        <div className="p-1 ">
          <IoSearch
            onClick={() => setToggleSearch(!toggleSearch)}
            size={23}
            color="white"
            className=""
          />
        </div>
      </div>

      {searchResult.length > 0 && (
        <div
          className={`absolute top-14 rounded-b-md  left-14 bg-[#1e1e1e]  w-3/4 sm:w-2/3  ${
            toggleSearch ? "block" : "hidden"
          }  lg:w-1/4  sm:left-[25%] lg:left-[65%]  max-h-96 overflow-scroll `}
        >
          <div className="text-white text-center text-xl font-semibold">
            <h1 className="">Search Results</h1>
          </div>

          {data.map((result) => (
            <Link
              onClick={linkHandler}
              key={result.id}
              href={`${
                result.media_type === "person"
                  ? `/profile/${result.id}`
                  : `/${result.media_type}/${result.id}`
              }`}
              className="flex  items-center  text-white my-2 m-2 sm:m-6"
            >
              <div className="">
                <img
                  className="w-32"
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URI}${
                    result.poster_path || result.profile_path
                  }`}
                  alt=""
                />
              </div>

              <div className="text-center w-full">
                <h3 className="text-center font-bold ">
                  {result.title || result.name}
                </h3>
                <p className=" text-center">
                  {result.release_date || result.first_air_date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
