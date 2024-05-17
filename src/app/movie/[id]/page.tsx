"use client"
import Player from '@/components/Player';
import useFetchData from '@/helper/FetchHook';
import React, { useState } from 'react'

import Poster from '@/components/Details/Poster';
import Details from '@/components/Details/Details';
import Overview from '@/components/Details/Overview';
import Cast from '@/components/Details/Cast';
import Recommendation from '@/components/sections/Recommendation';



function page({ params }: any) {

  const [player, setPlayer] = useState(false)





  const [data, loading] = useFetchData(` ${process.env.NEXT_PUBLIC_REQUEST_API}/movie/${params.id}?append_to_response=credits,recommendations`)

  

  


  const casts = data?.credits?.cast




  return (
    <main
      className="flex min-h-screen flex-col relative">

      <div className="flex flex-col relative gap-4 w-full " >

        <Poster loading={loading} data={data} />




        <section className="mx-5 sm:mx-24 lg:mx-36 relative   flex flex-col items-center  gap-6 ">



          <Details 
          data={data} 
          loading={loading} 
          setPlayer={setPlayer} 
          player={player} 
          mediaType='movie'
          />




          <Overview loading={loading} data={data} />

          

          <Cast casts={casts} loading={loading} />


          <Recommendation recommendations={data?.recommendations?.results}/>


        </section>



        {player &&
          <Player
            id={data?.id}
            handlePlayer={() => setPlayer(!player)}
            media_type="movie"
            name={data?.title || data?.name}
          />}



      </div>

    </main>
  )
}

export default page