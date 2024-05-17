import React from 'react'
import People from '../People'
import Link from 'next/link'
import LoadingSkeleton from '../LoadingSkeleton'

function Cast({loading,casts}:{loading:boolean,casts:any}) {

  return (
    <div className="w-full mt-2">
            <div className="text-white">
              <h2 className='text-xl font-bold mb-2'>
                Full Cast & Crew
              </h2>
            </div>

            <div className="flex overflow-scroll w-full gap-4 h-[24rem] rounded-lg" >
              {loading ? <LoadingSkeleton cards={20} /> :

                casts?.map((cast: any) => (
                  <Link href={""} key={cast.id}>
                    <People
                      profile_path={cast.profile_path}
                      id={cast.id}
                      name={cast.name}
                      characters={cast.character }
                      role = {cast.roles}
                    />
                  </Link>
                ))

              }
            </div>

          </div>
  )
}

export default Cast