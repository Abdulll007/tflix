import React, { useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import formatDuration from 'format-duration';
import Link from 'next/link';
import { IoPlaySharp} from "react-icons/io5";


function Details({ loading, data, setPlayer, player ,mediaType,setTrailer}: { loading: boolean, data: any, setPlayer: (value: boolean) => void, player: boolean, mediaType:string,setTrailer:(value:boolean)=>void}) {


    const runtimeFormat = formatDuration((1000 * 60) * (data.runtime || data?.last_episode_to_air?.runtime|| data?.episode_run_time));

    const votePercent = Math.ceil((data.vote_average * 100) / 10)

    

    
    
    
    
    return (
        <div className="flex flex-col items-center justify-center w-full sm:flex-row gap-4 ">


            <div className=" max-w-56">
                <img
                    className='h-40 sm:h-full max-h-96  rounded-md'
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URI}${data.poster_path} `}
                    alt="" />
            </div>




            <section className=' flex flex-col mt-2 w-full sm:w-3/5'>
                {
                    loading ?
                        (<Skeleton baseColor="#222830"
                            className='h-36 w-full sm:hidden'

                            direction="ltr" duration={1} />
                        ) :

                        <div className="flex flex-col items-center justify-center w-full bg-[#222731] text-white rounded-md h-full gap-2">
                            <div className="flex  items-center justify-around gap-6 m-4">

                                <div className="w-12   sm:w-16  ml-6">
                                    <CircularProgressbar
                                        text={`${votePercent}%`} value={votePercent}
                                        minValue={0}
                                        maxValue={100}
                                        
                                        styles={buildStyles(
                                            {
                                                textColor: "white"
                                            }
                                        )}
                                    />
                                </div>

                                <h2 className='text-2xl sm:text-2xl md:text-3xl font-bold text-center'>
                                    {data.title || data.name}
                                </h2>



                            </div>


                            {mediaType==="tv" && <div className="w-full grid justify-center gap-1 px-3">

                                <div className="grid grid-cols-2 gap-10">
                                    <p className='font-bold'>First Air Date</p>
                                    <p className="">{data.first_air_date}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-10">
                                    <p className='font-bold '>Total Seasons</p>
                                    <p className="">{data.number_of_seasons}</p>

                                </div>
                                <div className="grid grid-cols-2 gap-10">
                                    <p className='font-bold'>Total Episodes</p>
                                    <p className="">{data.number_of_episodes}</p>

                                </div>
                                <div className="grid grid-cols-2 gap-10">
                                    <p className='font-bold'>Air Status</p>
                                    <p className="">{data.status}</p>

                                </div>

                                <div className="grid grid-cols-2 gap-10 text-nowrap">
                                    <p className='font-bold'>Last Air Date</p>
                                    <p className="">{data.last_air_date}</p>

                                </div>

                             


                            </div>}

                            <div className="bg-[#222731]  flex flex-col items-center w-full gap-2  rounded-b-md  mb-2">


                                <div className="flex gap-6">
                                    {mediaType==="movie"&&
                                        <p className="">{data.release_date || data.first_air_date}</p>}
                                    <p className="">{runtimeFormat}</p>

                                    <button className="flex justify-center items-center gap-1 hover:text-slate-300"
                                    onClick={() => { 
                                        setPlayer(!player)      
                                        setTrailer(true)
                                            
                                    }}><IoPlaySharp/>Play Trailer</button>
                                </div>

                                <div className="flex gap-2 w-full justify-center flex-wrap ">

                                    {data?.genres?.map((genre: any) => (

                                        <p className="text-nowrap bg-[#EEEEEE] px-1 rounded-md text-[#222731]" key={genre.id}>{genre.name}</p>

                                    ))}
                                </div>

                            </div>
                        </div>

                }
                <div className="w-full mt-4">

                    {
                        
                            mediaType === "movie" &&
                            <button onClick={() => { setPlayer(!player) }} className='bg-blue-500 w-full p-4 text-center font-bold rounded-md text-white hover:bg-blue-600'>Play Now</button>
                    }
                </div>

            </section>



        </div>
    )
}

export default Details