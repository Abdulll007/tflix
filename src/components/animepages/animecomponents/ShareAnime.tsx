
import { FaShareAlt } from "react-icons/fa";

const ShareAnime = () => {
  return (
    <div className="flex flex-col">
      <div>Share Anime</div>
      <span className="flex gap-5 items-center font-thin">
        with friends{" "}
        <FaShareAlt size={40} className=" p-2 bg-gray-600 rounded-md" />
      </span>
    </div>
  );
};

export default ShareAnime;
