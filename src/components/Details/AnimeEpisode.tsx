"use client";
import Link from "next/link";
import React, { useState, useEffect, memo } from "react";

const AnimeEpisode = ({
  episodes,
  selectedEpisode,
}: {
  episodes: any;
  selectedEpisode?: string;
}) => {
  const [selectedRange, setSelectedRange] = useState("");
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);

  const generateRanges = () => {
    const ranges = [];
    for (let i = 1; i <= episodes?.length; i += 100) {
      let end = i + 99;
      if (end > episodes?.length) {
        end = episodes?.length;
      }
      ranges.push(`${i} - ${end}`);
    }
    return ranges;
  };

  let episodeRange = generateRanges();

  useEffect(() => {
    if (selectedEpisode) {
      const episodenumber = Number(selectedEpisode?.split("-episode-")[1]);
      const selectedepisoderange = episodeRange.filter((range) => {
        const [start, end] = range?.split(" - ")?.map(Number);
        if (start <= episodenumber && end >= episodenumber) {
          return [start, end];
        }
      });

      setSelectedRange(selectedepisoderange[0]);
    } else {
      setSelectedRange(episodeRange[0]);
    }
  }, []);

  useEffect(() => {
    if (selectedRange) {
      const [start, end] = selectedRange?.split(" - ")?.map(Number);

      const filtered = episodes?.slice(start - 1, end);

      setFilteredEpisodes(filtered);
    } else {
      if (!selectedEpisode) {
        setSelectedRange(episodeRange[0]);
      }
    }
  }, [selectedRange, episodes]);

  return (
    <div className="my-4 flex gap-4 p-4 ">
      <div className="w-full">
        <div className=" text-white self-start p-2">
          <h1>List of Episodes</h1>
          <div className="">
            <select
              className="bg-transparent outline-none"
              value={selectedEpisode && selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
            >
              {episodeRange &&
                episodeRange?.map((episode: any) => (
                  <option
                    className="text-center "
                    key={episode}
                    value={episode}
                  >
                    {episode}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="text-white grid grid-cols-4  lg:grid-cols-6 gap-2 justify-center items-center p-2  overflow-y-scroll min-h-10 max-h-[50vh] md:max-h-[70vh] lg:scrollbar">
          {filteredEpisodes?.map((episode: any, index: number) => (
            <Link
              href={`/anime/watch/${episode[1]}`}
              key={episode}
              className={`${
                selectedEpisode === episode[1] ? "bg-[#7d8591]" : "bg-[#313131]"
              } rounded-md py-2 text-center hover:bg-[#7d8591] border border-[#7d8591]`}
              scroll={false}
            >
              {episode[0]}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(AnimeEpisode);
