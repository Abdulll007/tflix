import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Poster({loading,data}:{loading:boolean,data:any}) {
  return (
    

    <section className="  w-full h-9 sm:h-36  ">

          {loading ? (<Skeleton baseColor="#222830" height={"15rem"} direction="ltr" duration={1} />) : (<img
            className='opacity-50  sm:h-[33rem]  w-full object-center absolute'
            src={`${process.env.NEXT_PUBLIC_IMAGE_URI}${data?.backdrop_path||data?.poster_path} `}
            alt="" />)}

    
    </section>

    



  )
}

export default Poster