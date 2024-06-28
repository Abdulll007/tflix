"use client"
import Cast from '@/components/Details/Cast'
import Details from '@/components/Details/Details'
import Episodes from '@/components/Details/Episodes'
import Overview from '@/components/Details/Overview'
import Poster from '@/components/Details/Poster'
import DocumentTitle from '@/components/DocumentTitile'
import Player from '@/components/Player'
import Recommendation from '@/components/sections/Recommendation'
import useFetchData from '@/helper/FetchHook'
import React, { useMemo, useState } from 'react'

function page({ params }: any) {


  

  const [data, loading] = useFetchData(` ${process.env.NEXT_PUBLIC_REQUEST_API}/tv/${params.serialId}?append_to_response=seasons,aggregate_credits,recommendations,videos`)

  const [playerValue, setPlayerValue] = useState({
    name: "",
    media_type: "",
    episode: 0,
    season: 0

  })

  const [trailer,setTrailer] = useState(false)



  const [player, setPlayer] = useState(false)




  const casts = data?.aggregate_credits?.cast


  const trailers = data?.videos?.results?.filter((trailer:any)=>{
    return trailer?.type === "Trailer"
  })




 DocumentTitle(data.name ? ` ${data?.name} (${data?.first_air_date?.substring(0,4)})`:"Loading...")
  

  return (
    <main
      className="flex min-h-screen flex-col relative">

      <div className=" flex flex-col relative gap-4 w-full">

        <Poster loading={loading} data={data} />

        <section className='mx-5 sm:mx-14 lg:mx-36 relative flex flex-col items-center gap-6  '>

          <Details 
          data={data} 
          loading={loading} 
          setPlayer={setPlayer} 
          player={player} 
          mediaType='tv'
          setTrailer={setTrailer}
          
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

          {data?.recommendations?.results?.length >0 &&<Recommendation recommendations={data?.recommendations?.results}/>
}
        </section>

        {player && 
        <Player 
        id={data.id} 
        handlePlayer={() => setPlayer(!player)} 
        mediaType={trailer? "trailer":playerValue.media_type} 
        name={playerValue.name || data?.title}
        episode={playerValue.episode}
        season={playerValue.season}
        setTrailer={setTrailer}
        trailerKey={trailers[0]?.key}
        />
        }
        

      </div>


    </main>
  )
}

export default page