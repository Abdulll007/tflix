"use client"
import Player from '@/components/Player';
import useFetchData from '@/helper/FetchHook';
import React, { useEffect, useState } from 'react'

import Poster from '@/components/Details/Poster';
import Details from '@/components/Details/Details';
import Overview from '@/components/Details/Overview';
import Cast from '@/components/Details/Cast';
import Recommendation from '@/components/sections/Recommendation';
import DocumentTitle from '@/components/DocumentTitile';



function page({ params }: any) {

  const [player, setPlayer] = useState(false)
  
  const [trailer,setTrailer] = useState(false)
  
  
  const [data, loading] = useFetchData(` ${process.env.NEXT_PUBLIC_REQUEST_API}/movie/${params.id}?append_to_response=credits,recommendations,videos`)
  
  

  const trailers = data?.videos?.results?.filter((trailer:any)=>{
    return trailer?.type === "Trailer"
  })
  
  
  


  const casts = data?.credits?.cast



  DocumentTitle(data.title ? `${data?.title} (${data?.release_date?.substring(0,4)})`:"Loading...")

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
          mediaType={"movie"}
        
          setTrailer={setTrailer}
          />




          <Overview loading={loading} data={data} />

          

          <Cast casts={casts} loading={loading} />


          {data?.recommendations?.results?.length >0 &&<Recommendation recommendations={data?.recommendations?.results}/>}


        </section>



        {player &&
          <Player
            id={data?.id}
            handlePlayer={() => setPlayer(!player)}
            mediaType={trailer?"trailer":"movie"}
            setTrailer={setTrailer}
            trailerKey={trailers[0]?.key}
            name={data?.title || data?.name}
          />}



      </div>

    </main>
  )
}

export default page