import { options } from "@/helper/apiConfig";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React, { useRef, useState, useEffect, memo } from "react";
import { IoSearch } from "react-icons/io5";


import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<any[]>([]);
  const [searchResult, setSearchResult] = useState("");
  const pathname = usePathname();
  const [toggleSearch, setToggleSearch] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);

  const fetchingData = async () => {
    try {
      if (pathname.includes("anime")) {
        const {data} = await axios.get(
          `/api/anime/search/?search=${searchResult}`
        );

        
        setData(data.data.data.animes);
      } else {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SEARCH}${searchResult}&include_adult=false&language=en-US`,
          options
        );
        setData(data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const searchRequest = setTimeout(() => {
      if (searchResult.length > 0) {
        fetchingData();
        inputRef.current?.blur();
        if (!toggleSearch) {
          setToggleSearch(true);
        }
      }
    }, 1000);

    return () => clearTimeout(searchRequest);
  }, [searchResult]);

  const handleChange = (event: any) => {
    setSearchResult(event?.target.value);
    if (data?.length > 0) {
      setShowSearchResult(true);
    }
  };

  const linkHandler = () => {
    setSearchResult("");
    setData([]);
    setToggleSearch(false);
  };

  useEffect(() => {
    setSearchResult("");
    setData([]);

    setToggleSearch(false);
  }, [pathname]);

  return (
    <div className="">
      <div className=" flex justify-center items-center rounded-full w-full sm:w-full bg-[#323232] ">
        <input
          className={`border-none absolute left-0 right-0 -bottom-12 bg-white sm:bg-transparent sm:static outline-none sm:text-lg sm:rounded-l-md p-3  sm:px-2 sm:py-0 w-full ${
            !toggleSearch && "hidden"
          } sm:block sm:{} sm:bg-transparent sm:text-white `}
          ref={inputRef}
          value={searchResult}
          name="search"
          onChange={handleChange}
          // onKeyDown={(e) => e.code === "Enter" && fetchingData()}
          placeholder="Search..."
          type="text "
        />

        <div className="p-1 ">
          <IoSearch
            onClick={() => {
              setToggleSearch(!toggleSearch);
              setData([]);
            }}
            size={23}
            color="white"
            className=""
          />
        </div>
      </div>

      {(showSearchResult || toggleSearch) && (
        <div
          className={`absolute top-[6.5rem] sm:top-[54px] rounded-b-md  bg-[#1e1e1e] w-full sm:max-w-96 ${
            data?.length > 0 ? "block" : "hidden"
          } right-0 text-white z-[2]`}
        >
          <div className="text-center text-xl font-semibold">
            <h1 className="">Search Results</h1>
          </div>

          <div className="w-full h-96 overflow-y-scroll   scrollbar">
            {data ? (
              data?.map((result) => (
                <Link
                  onClick={linkHandler}
                  key={result.id}
                  href={
                    pathname.includes("anime")
                      ? `/anime/info/${result.id}`
                      : `${
                          result.media_type === "person"
                            ? `/profile/${result.id}`
                            : `/${result.media_type}/${result.id}`
                        }`
                  }
                  scroll={false}
                  className="flex  items-center  my-4 m-2 sm:m-6"
                >
                  <div className="">
                    <img
                      className="w-32"
                      src={
                        pathname.includes("anime")
                          ? result?.poster
                          : `${process.env.NEXT_PUBLIC_IMAGE_URI}${
                              result.poster_path || result.profile_path
                            }`
                      }
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
                    {pathname.includes("anime") && (
                      <div className="text-center w-full font-thin flex justify-center gap-3 ">
                        <p className="text-center ">{result.type}</p> .
                        <p className=" text-center">{result.duration}</p>
                      </div>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <div className="absolute bg-[#1e1e1e] flex inset-0 justify-center items-center">
                <div className="animate-spin">
                  <AiOutlineLoading3Quarters size={50} className="" />
                </div>
              </div>
            )}
          </div>
          <Link
            href={{
              pathname: `${pathname.includes("anime")
                ? `/anime/search`
                : "/search"}`,
              query: `search=${searchResult}`,
            }}
            className=" flex justify-center"
          >
            <span className="p-2">More</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default memo(Search);
