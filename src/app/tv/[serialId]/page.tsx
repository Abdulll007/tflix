"use client"
import Cast from '@/components/Details/Cast'
import Details from '@/components/Details/Details'
import Episodes from '@/components/Details/Episodes'
import Overview from '@/components/Details/Overview'
import Poster from '@/components/Details/Poster'
import Player from '@/components/Player'
import Recommendation from '@/components/sections/Recommendation'
import useFetchData from '@/helper/FetchHook'
import React, { useMemo, useState } from 'react'

function page({ params }: any) {


  

  const [data, loading] = useFetchData(` ${process.env.NEXT_PUBLIC_REQUEST_API}/tv/${params.serialId}?append_to_response=seasons,aggregate_credits,recommendations`)

  const [playerValue, setPlayerValue] = useState({
    name: "",
    media_type: "",
    episode: 0,
    season: 0

  })


  const [player, setPlayer] = useState(false)




  const casts = data?.aggregate_credits?.cast



 
  

  return (
    <main
      className="flex min-h-screen flex-col relative">

      <div className=" flex flex-col relative gap-4 w-full">

        <Poster loading={loading} data={data} />

        <section className='mx-5 sm:mx-24 lg:mx-36 relative   flex flex-col items-center gap-6  '>

          <Details 
          data={data} 
          loading={loading} 
          setPlayer={setPlayer} 
          player={player} 
          mediaType='tv'
          />




          <Overview loading={loading} data={data} />

          <Episodes 
          seasons={data?.seasons} 
          id={data?.id}
          player={player}
          setPlayer={setPlayer}
          setPlayerValue={setPlayerValue}


          />

          <Cast casts={casts} loading={loading} />

          <Recommendation recommendations={data?.recommendations?.results}/>

        </section>

        {player && 
        <Player 
        id={data.id} 
        handlePlayer={() => setPlayer(!player)} 
        media_type={playerValue.media_type} 
        name={playerValue.name || data?.title}
        episode={playerValue.episode}
        season={playerValue.season}
        />
        }
        

      </div>


    </main>
  )
}

export default page