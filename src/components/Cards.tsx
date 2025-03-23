import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export interface CardData {
  id?: number | null;
  poster_path: string | null;
  title: string | undefined;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  mediaType: string;
  episode?: string;
}

const Cards = memo(
  ({
    id,
    poster_path,
    title,
    name,
    release_date,
    first_air_date,
    vote_average,
    mediaType,
    episode,
  }: CardData) => {
    const votePercent = Math.ceil(
      ((vote_average ? vote_average : 0) * 100) / 10
    );

    return (

<>

      <Link
        href={`/${mediaType}/${id}`}
        scroll={false}
        className="flex flex-col "
      >

       
        
        <div className="my-2 relative text-center w-full ">
          <div className="rounded-md relative pb-[150.67%] w-36 sm:w-44 bg-[#151515] backdropgradientsm after:rounded-md">
            {poster_path ? (
              <Image
                className={`rounded-md  absolute top-0 left-0 bottom-0 right-0 object-cover`}
                src={`${process.env.NEXT_PUBLIC_IMAGE_URI + poster_path}`}
                fill
                sizes="(max-width:480px)"
                alt=""
                loading="lazy"
              />
            ) : (
              <div className=" absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-20 ">
                <Image src="/noposter.svg" alt="" width={160} height={240} />
              </div>
            )}

            <div className=" absolute bottom-1 flex w-full justify-between z-[2] text-gray-400">
              <div className=" bottom-0 px-1">{""}</div>

              <div className="  bottom-0 right-0 px-1">
                {episode?.replace("Episode", "#")}
              </div>
            </div>
          </div>

          <div
            style={{
              width: 40,
              position: "absolute",
              bottom: -20,
              left: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgressbar
              value={votePercent}
              minValue={0}
              maxValue={100}
              text={`${votePercent > 0 ? votePercent + "%" : "NR"}`}
              background={true}
              styles={buildStyles({
                textSize: "2rem",

                textColor: "white",
                backgroundColor: "#222831",
              })}
            />
          </div>
        </div>

        <div className="mt-6 flex-1">
          <h2 className="text-wrap text-sms line-clamp-2 w-36">
            {title || name}
          </h2>
        </div>

        <p className="font-thin mt-2 ">{release_date || first_air_date}</p>
      </Link>
</>

    );
  }
);

export default Cards;
