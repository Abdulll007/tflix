"use client";

import Link from "next/link";
import React, { memo, useState } from "react";
import { IoMenu } from "react-icons/io5";

import MobileNavbar from "@/components/MobileNavbar";
import Search from "@/components/Search";

function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <header className=" py-3 sticky top-0 z-10 bg-[#1e1e1e]">
      <nav className="flex justify-between items-center mx-10 gap-4">
        <div className=" flex gap-4 items-center text-white">
          <IoMenu
            fontSize={25}
            className="md:hidden"
            onClick={() => {
              setToggleMenu(!toggleMenu);
            }}
          />
          {toggleMenu ? (
            <MobileNavbar
              setToggleMenu={setToggleMenu}
              toggleMenu={toggleMenu}
            />
          ) : (
            ""
          )}

          <div className="flex flex-row-reverse gap-6 items-center text-lg sm:text-xl ">
            <ul className="hidden md:flex gap-2 text-white ">
              <li>
                <Link href={"/movie"}>Movies</Link>
              </li>
              <li>
                <Link href={"/tv"} className="text-nowrap">
                  Tv Shows
                </Link>
              </li>
              <li>
                <Link href={"/anime"} className="text-nowrap" scroll={false}>
                  Anime
                </Link>
              </li>
            </ul>

            <span className="font-bold text-3xl">
              <Link href={"/"} className="h-10" scroll={false}>
                <img src="/tflix-logo.svg" width={100}  alt="" />
              </Link>
            </span>
          </div>
        </div>

        <Search />
      </nav>
    </header>
  );
}

export default memo(Header);
