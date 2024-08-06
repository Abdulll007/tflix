import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Loading() {
  
  return (
    <div className="fixed bg-[#1e1e1e] flex inset-0 justify-center items-center" >
      <div className="animate-spin">
        <AiOutlineLoading3Quarters size={50} className="text-white" />
      </div>
    </div>
  );
}

export default Loading;
