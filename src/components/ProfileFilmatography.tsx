import Image from "next/image";
import React from "react";

function ProfileFilmatography({ media }: { media: any }) {
  const movieDate = media?.release_date && media?.release_date?.substring(0, 4);

  const tvDate = media.first_air_date && media.first_air_date?.substring(0, 4);
  return (
    <div className="flex flex-col justify-center items-center my-8 gap-2 ">
      <div className="">
        <img
          src={
            media.backdrop_path
              ? `${process.env.NEXT_PUBLIC_IMAGE_URI}${media.backdrop_path}`
              : "/poster.png"
          }
          alt=""
          width={500}
          className="rounded-lg"
        />
      </div>

      <div className="">

        <div className="flex flex-col items-center">
          <h3 className="text-xl sm:text-2xl font-semibold">{media?.title || media?.name}</h3>

          <p className="">
            <span className="font-thin px-2">as</span>
            {media.character}
          </p>
        <div className="">
          <p className="">{movieDate || tvDate || "-"}</p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileFilmatography;
