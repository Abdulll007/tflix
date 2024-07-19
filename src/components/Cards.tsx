import React, { memo } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Skeleton from "react-loading-skeleton";

type styleProp = {
  cardWidth?: string;
};

export interface CardData {
  id: number;
  poster_path: string;
  title: string;
  name?: string;
  release_date: string;
  first_air_date?: string;
  vote_average: number;
}

const Cards = memo(
  (
    {
      id,
      poster_path,
      title,
      name,
      release_date,
      first_air_date,
      vote_average,
    }: CardData,
    cardWidth: styleProp
  ) => {
    const votePercent = Math.ceil((vote_average * 100) / 10);

    return (
      <div className={``}>
        <div className="my-2 relative text-center ">
          <div className="rounded-md relative pb-[150.67%] bg-[#151515]">
            <img
              className={`rounded-md  absolute top-0 left-0 `}
              width={"100%"}
              height={"100%"}
              src={`${process.env.NEXT_PUBLIC_IMAGE_URI}${poster_path}`}
              alt=""
            />
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
              className=""
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

        <div className="mt-9">
          <h2 className="text-wrap text-sms  w-36">{title || name}</h2>
        </div>

        <p className="font-thin mt-2">{release_date || first_air_date}</p>
      </div>
    );
  }
);

export default Cards;
