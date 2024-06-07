import React from 'react'

interface People {
  profile_path: string,
  name: string,
  characters: string,
  role: [any],
  id: number
}


function People({
  profile_path,
  name,
  characters,
  role,
  id
}: People) {







  return (
    <div className='w-40 h-full text-white  flex  flex-col   rounded-md ' key={id}>
      <div className=" w-full">

        <img
          src={`${profile_path ? process.env.NEXT_PUBLIC_IMAGE_URI + "/" + profile_path : "/noprofile.svg"}`} alt="/noprofile.svg" className='max-w-full h-auto rounded-md object-fit ' />
      </div>

      <div className=" text-center  pt-2 ">
        <h2 className="font-bold p-2">{name}</h2>
        <div className="overflow-hidden line-clamp-3">
          {characters && <p className='font-thin  '>{characters}</p>}
          {role?.map((roles) =>
            <p className='font-thin  ' key={roles?.credit_id}>{roles.character}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default People