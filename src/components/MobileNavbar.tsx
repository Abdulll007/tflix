import Link from "next/link";

import { IoCloseSharp } from "react-icons/io5";

function MobileNavbar({
  toggleMenu,
  setToggleMenu,
}: {
  toggleMenu: boolean;
  setToggleMenu: (value: boolean) => void;
}) {
  return (
    <>
      <div className="md:hidden bg-[#1e1e1e] absolute h-screen top-0 left-0 w-48  pt-4 text-xl z-50 ">
        <IoCloseSharp
          className="mx-4 mb-5"
          fontSize={28}
          onClick={() => {
            setToggleMenu(!toggleMenu);
          }}
        />

        <ul className=" text-center ">
          <li className="py-4">
            <Link
              href={"/movie"}
              onClick={() => setToggleMenu(!toggleMenu)}
              scroll={false}
            >
              Movies
            </Link>
          </li>
          <li className="py-4 ">
            <Link
              href={"/tv"}
              onClick={() => setToggleMenu(!toggleMenu)}
              scroll={false}
            >
              Tv Shows
            </Link>
          </li>
          <li className="py-4 ">
            <Link
              href={"/anime"}
              onClick={() => setToggleMenu(!toggleMenu)}
              scroll={false}
            >
              Anime
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default MobileNavbar;
