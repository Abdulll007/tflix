"use client";

import React, { useState, useEffect, memo } from "react";
import { FaThList } from "react-icons/fa";
import { BsUiChecksGrid } from "react-icons/bs";

const AnimeEpisode = ({
  episodes,
  getEpisodeServerList,
  selectedEpisodeFromServer
}: {
  episodes: any;
  getEpisodeServerList: any;
  selectedEpisodeFromServer:number
}) => {
  const [selectedRange, setSelectedRange] = useState("");
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [selectedView, setSelectedView] = useState<string | null>(null);

  // Fetch the selectedView from localStorage on component mount
  useEffect(()=>{
    if(selectedEpisodeFromServer){
      setSelectedEpisode(selectedEpisodeFromServer)
    }
  },[selectedEpisodeFromServer])

  useEffect(() => {
   
    const storedView = localStorage.getItem("selectedView");
    if (storedView) {
      setSelectedView(storedView);
    } else {
      setSelectedView("list");
    }
  }, []);


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
      const selectedepisoderange = episodeRange.filter((range) => {
        const [start, end] = range?.split(" - ")?.map(Number);
        if (start <= selectedEpisode && end >= selectedEpisode) {
          return [start, end];
        }
      });

      setSelectedRange(selectedepisoderange[0]);
    } else {
      setSelectedRange(episodeRange[0]);
    }
  }, [selectedEpisode]);

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

  const handleViewChange = (view: string) => {
    setSelectedView(view);
    localStorage.setItem("selectedView", view);
  };



  return (
    <div className="my-4 flex gap-4 p-4 w-full">
      <div className="w-full">
        <div className="text-white w-full flex justify-between items-center p-2">
          <div>
            <h1>List of Episodes</h1>
            <div>
              <select
                className="bg-transparent outline-none"
                value={selectedRange}
                onChange={(e) => setSelectedRange(e.target.value)}
              >
                {episodeRange &&
                  episodeRange?.map((episode: any) => (
                    <option
                      className="text-center"
                      key={episode}
                      value={episode}
                    >
                      {episode}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div>
            <button
              className={`switchview ${
                selectedView === "list" ? "" : "active"
              }`}
              onClick={() =>
                handleViewChange(selectedView === "list" ? "grid" : "list")
              }
            >
              {selectedView === "list" ? <BsUiChecksGrid /> : <FaThList />}
            </button>
          </div>
        </div>

        {selectedView === "grid" ? (
          <div
            className={`text-white  grid grid-cols-4 lg:grid-cols-4 gap-2 justify-center items-center p-2 overflow-y-scroll min-h-10 max-h-[60vh] md:scrollbar `}
          >
            {filteredEpisodes?.map((episode: any, index: number) => (
              <button
                key={episode.episodeId}
                className={`${
                  selectedEpisode === episode.number
                    ? "bg-[#7d8591]"
                    : "bg-[#000000]"
                } rounded-md py-2 text-center cursor-pointer hover:bg-[#7d8591] border border-[#7d8591]`}
                onClick={() => {
                  getEpisodeServerList(episode.episodeId);
                  setSelectedEpisode(episode.number);
                }}
              >
                {episode.number}
              </button>
            ))}
          </div>
        ) : (
          <div
            className={`text-white flex flex-col  gap-2 p-2 overflow-y-scroll min-h-10 max-h-[60vh] md:scrollbar`}
          >
            {filteredEpisodes?.map((episode: any, index: number) => (
              <button
                key={episode.episodeId}
                className={`${
                  selectedEpisode === episode.number
                    ? "bg-[#7d8591]"
                    : "bg-[#000000]"
                } rounded-md py-2 text-center cursor-pointer hover:bg-[#7d8591] border border-[#7d8591] flex items-center`}
                onClick={() => {
                  getEpisodeServerList(episode.episodeId);
                  setSelectedEpisode(episode.number);
                }}
              >
                <span className="px-2">{episode.number}</span>
                <span className="flex-1 text-start font-thin text-sm overflow-hidden line-clamp-1">{episode.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(AnimeEpisode);
