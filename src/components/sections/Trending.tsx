"use client"

import React, { useEffect, useState } from 'react'
import Cards from '../Cards'
import axios from 'axios'
import Link from 'next/link'
import { results } from '../banners'
import useFetchData from '@/helper/FetchHook'
import LoadingSkeleton from '../LoadingSkeleton'


function Trending() {

  

  
  const [data,loading,error] = useFetchData("https://api.themoviedb.org/3/trending/all/day")


  

  
  return (
    <div className="trending  mt-6 mx-5 text-white">
    
      <h1 
      className="text-xl font-semibold my-4"
      >Trending</h1>
      <div className="overflow-scroll scroll- flex gap-6">

      {loading && <LoadingSkeleton cards={20}/>}

      { data?.map((trending:any)=>(
        <Link href={`/${trending.media_type}/${trending.id}`} key={trending.id}>
          

         <Cards 
          
          id={trending.id} 
          name={trending.name}
          poster_path={trending.poster_path} 
          title={trending.title}
          release_date={trending.release_date}
          first_air_date={trending.first_air_date}
          vote_average={trending.vote_average}
          /> 
        </Link>
      ))}
      
      
      </div>
      
    </div>
  )
}

export default Trending