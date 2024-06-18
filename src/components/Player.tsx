import React, { useEffect } from 'react'

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
    className='w-full h-full  absolute top-0 flex flex-col items-center justify-start text-white  playerblur p-1  '
    >

        <div className=" w-full  p-7"> 
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
        <div className=" w-full h-60 sm:h-[40rem] sm:w-4/5 object-cover">

        

        <iframe src={videoType} style={{width: "100%", height: "100%"}} referrerPolicy="origin" allowFullScreen className='rounded'></iframe>
        
        
        </div>

       

    </div>
  )
}

export default Player