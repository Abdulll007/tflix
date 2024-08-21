"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoPlay } from "react-icons/io5";

interface ScheduleProps {
  id: string;
  time: string;
  name: string;
  jname: string;
  airingTimestamp: number;
  secondsUntilAiring: number;
  episode: number;
}

const Schedule = () => {
  const date = new Date();

  const formatedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  const [changeDate, setChangeDate] = useState(formatedDate);
  const [selectedDay, setSelectedDay] = useState(
    date.toLocaleDateString("en-US", {
      weekday: "short",
    })
  );
  const [data, setData] = useState([]);

  // Scroll to the selected item when it changes

  function getNext7Days() {
    const days = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(today);
      currentDay.setDate(today.getDate() + i);

      const day = String(currentDay.getDate()).padStart(2, "0");
      const month = String(currentDay.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
      const year = currentDay.getFullYear();

      days.push({
        dayOfWeek: currentDay.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        monthInLetters: currentDay.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        }),
        date: `${year}-${month}-${day}`,
      });
    }
    return days;
  }

  // Example usage:
  const next7Days = getNext7Days();

  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetch("/api/anime/schedule", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state: changeDate }),
      });

      const data = await res.json();
      setData(data.scheduledAnimes);
    };
    fetchdata();
  }, [changeDate]);

  const handleDateChange = (date: { dayOfWeek: string; date: string }) => {
    setChangeDate(date.date);
    setSelectedDay(date.dayOfWeek);
  };

  return (
    <div className="text-white my-10">
      <div className="text-2xl">
        <h2>Estimate Schedule</h2>
      </div>

      <div className="flex  bg-[#121212] rounded-md my-4 gap-1 text-center overflow-x-auto w-full no-scrollbar">
        {next7Days.map((weekday, index) => {
          return (
            <div className=" " key={weekday.dayOfWeek}>
              <button
                // @ts-ignore

                className={`w-40 py-2 hover:bg-[#323232]  rounded-md ${
                  weekday.dayOfWeek === selectedDay ? "bg-[#323232]" : ""
                }`}
                onClick={() => {
                  handleDateChange(weekday);
                }}
              >
                <h2 className="font-bold">{weekday.dayOfWeek}</h2>
                <p className="text-nowrap font-thin">
                  {weekday.monthInLetters}
                </p>
              </button>
            </div>
          );
        })}
      </div>

      <div className="max-h-[370px] overflow-scroll no-scrollbar">
        {data?.map((item: ScheduleProps) => (
          <Link
            href={`/anime/info/${item.id}`}
            className="hover:bg-[#323232] rounded-md flex  my-4 p-4"
            key={item.id}
          >
            <div className="mr-4 font-thin">{item.time}</div>
            <div className="flex-1 font-bold line-clamp-1">{item.name}</div>
            <div className="w-28 text-center text-sm self-end hidden items-center gap-2 sm:flex">
              <IoPlay size={15} /> <span className="">Episode</span>{" "}
              {item.episode}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
