import React from "react";

interface People {
  profile_path: string;
  name: string;
  characters: string;
  role: [any];
  id: number;
}

function People({ profile_path, name, characters, role, id }: People) {
  return (
    <div
      className="w-40 h-full text-white  flex  flex-col   rounded-md "
      key={id}
    >
      <div className=" relative pb-[150.27%] bg-[#151515]">
        {profile_path ? (
          <img
            className=" w-full h-full absolute top-0 left-0 rounded-md object-fit "
            src={`${process.env.NEXT_PUBLIC_IMAGE_URI + "/" + profile_path}`}
            alt="profile"
          />
        ) : (
          <div className=" absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-20 ">
            <img src="/noposter.svg" alt="" />
          </div>
        )}
      </div>

      <div className=" text-center  pt-2 ">
        <h2 className="font-bold p-2">{name}</h2>
        <div className="overflow-hidden line-clamp-3">
          {characters && <p className="font-thin  ">{characters}</p>}
          {role?.map((roles) => (
            <p className="font-thin  " key={roles?.credit_id}>
              {roles.character}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default People;
