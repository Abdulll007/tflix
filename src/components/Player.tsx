import React, { useEffect, useRef, useState } from 'react'

import { IoCloseSharp} from "react-icons/io5";


function Player({ handlePlayer, id, season, episode, mediaType, name,setTrailer,trailerKey}: { handlePlayer: () => void, id: number, name: string, season?: number, episode?: number , mediaType:string ,setTrailer:(value:boolean)=>void,trailerKey:string}) {

    const [changeServer, setChangeServer] = useState(false)

    useEffect(() => {

        window.scrollTo({ top: -10, behavior: "smooth" })
        document.body.style.overflow = "hidden"

    }, [])


    const checkMediaType = (mediaType: string, server: boolean) => {
        
        if (!server) {
          
            if(mediaType === "trailer"){
                return `https://www.youtube.com/embed/${trailerKey}?autoplay=1`

            }else if (mediaType === "movie") {
                return `${process.env.NEXT_PUBLIC_MOVIE_URI}${id}`
            }
            else {
                return `${process.env.NEXT_PUBLIC_TV_URI}${id}&season=${season}&episode=${episode}`
            }
        }
        else {
            
            if(mediaType === "trailer"){
                return `https://www.youtube.com/embed/${trailerKey}?autoplay=1`

            }else if (mediaType === "movie") {
                
                return `${process.env.NEXT_PUBLIC_MOVIE_URI2}${id}&tmdb=1`

            }
            else {
                return `${process.env.NEXT_PUBLIC_TV_URI2}${id}&tmdb=1&season=${season}&episode=${episode}`
            }
        }


    }

    
   




    const videoType = checkMediaType(mediaType,changeServer)




    return (
        <div
            className='w-full h-full  absolute top-0 flex flex-col items-center  text-white  playerblur p-1  '
        >

            <div className=" w-full  p-4">
                <button onClick={() => {

                    handlePlayer()
                    setChangeServer(false)
                    setTrailer(false)
                    
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

                {mediaType!=="trailer"&&
                
                
                    
                <button onClick={()=>setChangeServer(true)} className={`absolute -bottom-12 w-full sm:w-80  p-2  hover:bg-blue-500 hover:text-white rounded-md text-sm sm:text-md ${changeServer ? "bg-blue-500 hover:bg-none hover:tex-blue":"bg-white text-blue-500"} `}>server 2</button>
          
               
                }

            </div>



        </div>
    )
}

export default Player