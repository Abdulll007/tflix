import React from "react";

const Posters = ({
  backdrops,
  posters,
  logos,
}: {
  backdrops: [];
  posters: [];
  logos: [];
}) => {
  return (
    <div className="">
      <div className="">
        <h2 className="text-white text-xl mb-4"> Backdrops</h2>
        <div className="flex flex-col  sm:flex-row sm:overflow-scroll sm:no-scrollbar  gap-5">
          {backdrops.length > 0 &&
            backdrops?.map((backdrops: any) => (
              <div
                //   onClick={() => {
                //     document.body.style.overflow = "hidden"
                //     setPlayerValue((prev: any) => ({
                //       ...prev,
                //       backdrops: backdrops.backdrops_number,
                //       media_type: "tv",
                //       name: backdrops.name,
                //       season: backdrops.season_number,
                //     }));

                //     setPlayer(!player);
                //   }}
                className=" my-2"
                key={backdrops?.file_path}
              >
                <div className="mb-4 sm:w-72 lg:w-96   relative pb-[56.25%]">
                  <img
                    className="h-full  w-full rounded-lg absolute top-0 left-0 "
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URI}${backdrops.file_path}`}
                    alt=""
                  />
                </div>

                <h2 className="text-[#80868b] text-sm my-1">
                  {backdrops.type}
                </h2>
                <h1 className="text-white">{backdrops.name}</h1>
              </div>
            ))}
        </div>
      </div>

      <div className="">
        <h2 className="text-white text-xl mb-4"> Posters</h2>
        <div className="flex flex-col  sm:flex-row sm:overflow-scroll sm:no-scrollbar  gap-5">
          {posters.length > 0 &&
            posters?.map((posters: any) => (
              <div
                //   onClick={() => {
                //     document.body.style.overflow = "hidden"
                //     setPlayerValue((prev: any) => ({
                //       ...prev,
                //       backdrops: backdrops.backdrops_number,
                //       media_type: "tv",
                //       name: backdrops.name,
                //       season: backdrops.season_number,
                //     }));

                //     setPlayer(!player);
                //   }}
                className=" my-2"
                key={posters?.file_path}
              >
                <div className="mb-4 sm:w-72 lg:w-96   relative pb-[150.27%]">
                  <img
                    className=" h-full w-full rounded-lg absolute top-0 left-0 "
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URI}${posters.file_path}`}
                    alt=""
                  />
                </div>

                <h2 className="text-[#80868b] text-sm my-1">{posters.type}</h2>
                <h1 className="text-white">{posters.name}</h1>
              </div>
            ))}
        </div>
      </div>

      {logos.length > 0 && (
        <div className="">
          <h2 className="text-white text-xl mb-4"> Logos</h2>
          <div className="flex flex-col sm:flex-row sm:overflow-scroll sm:no-scrollbar  gap-5 ">
            {logos.length > 0 &&
              logos?.map((logos: any) => (
                <div
                  //   onClick={() => {
                  //     document.body.style.overflow = "hidden"
                  //     setPlayerValue((prev: any) => ({
                  //       ...prev,
                  //       backdrops: backdrops.backdrops_number,
                  //       media_type: "tv",
                  //       name: backdrops.name,
                  //       season: backdrops.season_number,
                  //     }));

                  //     setPlayer(!player);
                  //   }}
                  className="  "
                  key={logos?.file_path}
                >
                  <div className="mb-4 sm:w-72 lg:w-96   relative pb-[56.25%] ">
                    <img
                      className="  w-full h-full rounded-lg absolute top-0 left-0 "
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URI}${logos.file_path}`}
                      alt=""
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Posters;
