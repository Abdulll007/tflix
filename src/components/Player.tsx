import useWindowSize from "@/helper/windowSize";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { IoCloseSharp } from "react-icons/io5";

function Player({
  handlePlayer,
  id,
  season,
  episode,
  mediaType,
  name,
  setPlayerValue,
  videokey,
}: {
  handlePlayer: () => void;
  id: number;
  name?: string;
  season?: number;
  episode?: number;
  mediaType: string;
  videokey: string;
  setPlayerValue: Dispatch<
    SetStateAction<{
      name?: string;
      media_type?: string;
      episode?: number;
      season?: number;
      videokey?: string;
    }>
  >;
}) {
  const [changeServer, setChangeServer] = useState(false);

  const checkMediaType = (mediaType: string, server: boolean) => {
    if (!server) {
      if (mediaType === "video") {
        return `https://www.youtube.com/embed/${videokey}?autoplay=1`;
      }
      if (mediaType === "movie") {
        return `${process.env.NEXT_PUBLIC_MOVIE_URI}${id}`;
        // return`${process.env.NEXT_PUBLIC_MOVIE_URI}/${id}`
      } else {
        return `${process.env.NEXT_PUBLIC_TV_URI}${id}&season=${season}&episode=${episode}`;
        // return `${process.env.NEXT_PUBLIC_TV_URI}/${id}/${season}/${episode}`
      }
    } else {
      if (mediaType === "movie") {
        return `${process.env.NEXT_PUBLIC_MOVIE_URI2}${id}&tmdb=1`;
      } else {
        return `${process.env.NEXT_PUBLIC_TV_URI2}${id}&tmdb=1&season=${season}&episode=${episode}`;
      }
    }
  };

  const videoType = checkMediaType(mediaType, changeServer);

  const size = useWindowSize();
  const [widthHeight, setWidthHeight] = useState(size);

  useEffect(() => {
    const settingDelay = setTimeout(() => {
      setWidthHeight(size);
    }, 600);

    return () => clearTimeout(settingDelay);
  }, [size]);

  const iframeWidth = Math.min(widthHeight.width * 0.8, window.innerWidth); // maximum width of 800px
  const iframeHeight = iframeWidth * (9 / 16);

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-black flex items-center justify-center lg:px-20 xl:px-40 ">
      <div className="relative m-auto w-full">
        <div
          className="relative h-full aspect-video "
          style={{ width: "100%", height: iframeHeight }}
        >
          <iframe
            src={videoType}
            referrerPolicy="origin"
            allowFullScreen
            className="absolute top-0 left-0 p-0 m-0 w-full h-full block "
          ></iframe>
          <h2 className="absolute -top-10 text-center w-full text-white place-self-center">
            {name}
          </h2>

          {mediaType !== "video" && (
            <div className="  w-full flex justify-center bg-white">
              <button
                onClick={() => setChangeServer(!changeServer)}
                className={`absolute -bottom-10  p-2  hover:bg-blue-500 hover:text-white rounded-md text-sm sm:text-md ${
                  changeServer
                    ? "bg-blue-500 hover:bg-blue-700 text-white"
                    : "bg-white text-blue-500"
                }`}
              >
                Server 2
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className="absolute top-4 left-4 text-white cursor-pointer flex w-full "
        onClick={() => {
          document.body.style.overflow = "";
          handlePlayer();
          setPlayerValue((prev) => {
            return {
              ...prev,
              name: "",
              episode: 0,
              season: 0,
              media_type: "",
              videokey: "",
            };
          });
        }}
      >
        <IoCloseSharp size={27} />
      </div>
    </div>
  );
}

export default Player;
