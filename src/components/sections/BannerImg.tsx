import React, { useEffect, useState } from 'react'
import { results } from '../banners'
import Skeleton from 'react-loading-skeleton'
import useFetchData from '@/helper/FetchHook'





function BannerImg() {

  
  const[bannerImg,setBannerImg] = useState("")

  
  useEffect(()=>{

    const randomnumber = Math.floor(Math.random()*19)

    setBannerImg(results[randomnumber].backdrop_path)

  },[])
  

  return (
    <div className="banner w-full h-80 sm:min-h-96 lg:h-[36rem] bg-black relative">

        
          
          <img
          className=" object-center h-80 sm:h-full w-full opacity-55 "
          src={`https://image.tmdb.org/t/p/original${bannerImg}`} 
          alt="img" 
          />

        <div className=" absolute left-10 top-28 lg:top-60 text-white">
          <h1 className=" text-2xl sm:text-3xl font-bold">Welcome To TFLIX.</h1>
          <p className="text-sm sm:text-xl my-2">Millions of movies and TV shows to explore.</p>
        </div>


      </div>
  )
}

export default BannerImg