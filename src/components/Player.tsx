import React, { useEffect, useRef, useState } from 'react'

import { IoCloseSharp } from "react-icons/io5";


function Player({ handlePlayer, id,season,episode,media_type,name}:{handlePlayer:()=>void , id:number, media_type:string,name:string,season?:number,episode?:number}) {
  
    
    useEffect(()=>{
        
        window.scrollTo({top:-10, behavior: "smooth" })
        document.body.style.overflow = "hidden"

    },[])


    const checkMediaType = (media_type:string)=>{
        if(media_type === "movie"){
            return `${process.env.NEXT_PUBLIC_MOVIE_URI}${id}`
        }
        else{
            return `${process.env.NEXT_PUBLIC_TV_URI}${id}&season=${season}&episode=${episode}`
        }
        
       
    }

    
    
    
    const videoType = checkMediaType(media_type)
    
    
    

    return (
    <div 
    className='w-full h-full  absolute top-0 flex flex-col items-center  text-white  playerblur p-1  '
    >

        <div className=" w-full  p-4"> 
            <button onClick={()=>{

                    handlePlayer()
                    document.body.style.overflow = ""
                    }
                } 
                > 
                <IoCloseSharp size={30} />
            </button>
        </div>

            <p className="text-bold text-2xl">
                {name} 
            </p>
        <div className=" w-full h-60 sm:h-[40rem] sm:w-4/5 object-cover relative  flex flex-col justify-center items-center "

        
        >


        
        
        <iframe src={videoType} style={{width: "100%", height: "100%" }} referrerPolicy="origin" allowFullScreen className='rounded ' 
        
        >

            
        </iframe>

        <button  className={`absolute -bottom-12 w-full sm:w-80  p-2 bg-slate-100 text-blue-700 hover:bg-blue-700 hover:text-white rounded-md text-sm sm:text-md `}>server 2</button>
        
        </div>

       

    </div>
  )
}

export default Player