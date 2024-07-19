"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { IoSearch, IoMenu, IoCloseSharp } from "react-icons/io5";
import { options } from "@/helper/apiConfig";
import MobileNavbar from "./MobileNavbar";
import Search from "./Search";

function Header({ params }: any) {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <header className=" py-3 sticky top-0 z-10 bg-[#1e1e1e]">
      <nav className="flex justify-between items-center mx-4 sm:mx-32 lg:mx-48 gap-4">
        <div className=" flex gap-4 items-center text-white">
          <IoMenu
            fontSize={25}
            className="sm:hidden"
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
            <ul className="hidden sm:flex gap-2 text-white ">
              <li>
                <Link href={"/movie"}>Movies</Link>
              </li>
              <li>
                <Link href={"/tv"} className="text-nowrap">
                  Tv Shows
                </Link>
              </li>
            </ul>

            <span className="font-bold text-3xl">
              <Link href={"/"} className="">
                TFLIX
              </Link>
            </span>
          </div>
        </div>

        <Search />
      </nav>
    </header>
  );
}

export default Header;
