"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { options } from '@/helper/apiConfig';
import axios from 'axios';
import Player from '../Player';



function Episodes({ seasons, id,player,setPlayer,setPlayerValue }: { seasons: any[], id: number,  player:boolean,setPlayer:(value:boolean)=>void ,setPlayerValue:(value:any)=>void}) {

  const [seasonChange, setSeasonChange] = useState<number>()

  const [tvEpisodes, setTvEpisodes] = useState([])

  



  

  const filterSeason = useMemo(() => {

    return seasons?.filter((season) =>
      season.name !== "Specials"
    )
  }, [seasons])


  useEffect(() => {
    if (isNaN(filterSeason?.length) === false) {
      setSeasonChange(filterSeason?.length)

    }

  }, [filterSeason?.length])



  useEffect(() => {
    async function callEpisodes() {

      if (seasonChange !== undefined) {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_REQUEST_API}/tv/${id}/season/${seasonChange}`, options)
        setTvEpisodes(data?.episodes)
      }
    }
    callEpisodes()
  }, [seasonChange])


  


  const changeSeason = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeasonChange(Number(e.target.value))

  }



  





  return (
    <div className=' w-full  text-white  p-4 rounded-lg ' >


      <div className="p-2 mb-2  text-black flex gap-3">
        <h2 className="sm:text-3xl  p-2 text-white ">
          Episodes
        </h2>

        <select
          name="season"
          id="season"
          className=' outline-none rounded-md sm:text-xl p-0'
          onChange={(e) => { changeSeason(e) }}
        >


          {filterSeason?.map((season) => (

            <option


              className='sm:text-2xl p-0'
              value={season.season_number}
              key={season.season_number}
            >

            Season {season.season_number} {season.name} 

            </option>
          )).reverse()}

        </select>

      </div>

      <div className="flex overflow-scroll">


        {tvEpisodes?.map((episode: any) => (
          <div onClick={() => {

            setPlayerValue((prev:any) => (
              {
                ...prev, episode: episode.episode_number,
                media_type: "tv",
                name: episode.name,
                season: episode.season_number
              }
            ))



            setPlayer(!player)

          }} className='px-2' key={episode?.episode_number}
          >

            <div className="w-48 sm:w-60">

              <div className="h-full w-full ">
                <img
                  className=' h-auto rounded-lg'
                  src={process.env.NEXT_PUBLIC_IMAGE_URI + episode.still_path}
                  alt="" />

              </div>

              <div className="text-white py-2">
                <div className=" text-center ">

                  <h2 className='sm:text-xl'>{`${episode?.episode_number}.  ${episode?.name}`}</h2>
                </div>

                <p className='text-center'>{episode?.runtime}</p>
                <p className="text-sm overflow-hidden line-clamp-3">{episode?.overview}</p>

              </div>
            </div>
          </div>
        ))

        }
      </div>





    </div>
  )

}
export default Episodes