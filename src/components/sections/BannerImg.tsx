import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'






function BannerImg({data,loading}:{data:any,loading:boolean}) {


  
  const[bannerImg,setBannerImg] = useState("")
  const[title,setTitle] = useState("")

  
  useEffect(()=>{

    const randomnumber = Math.floor(Math.random()*19)

    setBannerImg(data[randomnumber]?.backdrop_path)
    setTitle(data[randomnumber]?.title || data[randomnumber]?.name)

  },[data])


  return (

    

    <div className="banner w-full h-80 sm:min-h-96 lg:h-[36rem]  relative">

        
      
         { loading ? <Skeleton width={"100%"} height={"100%"} duration={1} direction='ltr' baseColor="#222830"/>
          : 
          <>
          <img
          className=" object-center h-80 sm:h-full w-full opacity-55 relative"
          src={`https://image.tmdb.org/t/p/original${bannerImg}`} 
          alt="img" 
          />


          <div className="absolute bottom-0  w-full h-20 sm:h-32  flex justify-center items-center">
          <h1 className='  text-2xl sm:text-3xl lg:text-5xl font-bold text-white '>{title}</h1>
          </div>

          </>
          
        }
        

        <div className=" absolute left-10 top-28 lg:top-60 text-white">
          <h1 className=" text-2xl sm:text-3xl font-bold">Welcome To TFLIX.</h1>
          <p className="text-sm sm:text-xl my-2">Millions of movies and TV shows to explore.</p>
        </div>


      </div>
  )
}

export default BannerImg