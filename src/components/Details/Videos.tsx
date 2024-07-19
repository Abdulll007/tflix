import React, { Dispatch, SetStateAction } from "react";

const Videos = ({
  videos,
  setPlayer,
  player,
  setPlayerValue,
}: {
  videos: any;
  setPlayer?: Dispatch<SetStateAction<boolean>>;
  player: boolean;
  setPlayerValue?: Dispatch<
    SetStateAction<{
      name?: string;
      media_type?: string;
      episode?: number;
      season?: number;
      videokey?: string;
    }>
  >;
}) => {
  return (
    <div className="flex flex-col  sm:flex-row sm:overflow-scroll sm:no-scrollbar  ">
      <div className="flex flex-col sm:flex-row  gap-4  ">
        {videos.length > 0 &&
          videos?.map((video: any) => (
            <div
              onClick={() => {
                document.body.style.overflow = "hidden";
                setPlayerValue &&
                  setPlayerValue((prev: any) => ({
                    ...prev,

                    media_type: "video",
                    videokey: video.key,
                  }));

                setPlayer && setPlayer(!player);
              }}
              className="w-full my-2"
              key={video?.key}
            >
              <div className="mb-4 sm:w-72 lg:w-96   relative pb-[56.25%]">
                <img
                  className="  w-full rounded-lg absolute top-0 left-0 "
                  src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  alt=""
                />
              </div>

              <h2 className="text-[#80868b] text-sm my-1">{video.type}</h2>
              <h1 className="text-white">{video.name}</h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Videos;
