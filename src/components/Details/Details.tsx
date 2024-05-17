import React, { useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import formatDuration from 'format-duration';


function Details({ loading, data, setPlayer, player ,mediaType }: { loading: boolean, data: any, setPlayer: (value: boolean) => void, player: boolean, mediaType:string}) {


    const runtimeFormat = formatDuration((1000 * 60) * (data.runtime || data?.last_episode_to_air?.runtime));

    const votePercent = Math.ceil((data.vote_average * 100) / 10)

    
    
    return (
        <div className="flex flex-col items-center justify-center w-full sm:flex-row gap-4 ">


            <div className=" max-w-56">
                <img
                    className='h-40 sm:h-full  rounded-md'
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
                            <div className="flex  items-center justify-around gap-8 m-2">

                                <div className="w-10 sm:w-14 ">
                                    <CircularProgressbar
                                        text={`${votePercent}%`} value={70}
                                        minValue={0}
                                        maxValue={100}
                                        styles={buildStyles(
                                            {
                                                textColor: "white"
                                            }
                                        )}
                                    />
                                </div>

                                <h2>
                                    {data.title || data.name}
                                </h2>



                            </div>


                            {mediaType==="tv" && <div className="w-full flex flex-col gap-1">

                                <div className="flex  justify-around ">
                                    <p className='font-bold text-start'>First Air Date</p>
                                    <p className="">{data.first_air_date}</p>
                                </div>

                                <div className="flex     justify-around">
                                    <p className='font-bold'>Air Status</p>
                                    <p className="">{data.status}</p>

                                </div>

                                <div className="flex     justify-around">
                                    <p className='font-bold'>Last Air Date</p>
                                    <p className="">{data.last_air_date}</p>

                                </div>

                             


                            </div>}

                            <div className="bg-[#222731]  flex flex-col items-center w-full gap-2  rounded-b-md  mb-2">


                                <div className="flex gap-6">
                                    {mediaType==="movie"&&
                                        <p className="">{data.release_date || data.first_air_date}</p>}
                                    <p className="">{runtimeFormat}</p>
                                    <a href="" className="">Play Trailer</a>
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
                            <button onClick={() => { setPlayer(!player) }} className='bg-[#76ABAE] w-full p-4 text-center font-bold rounded-md text-[#222731]'>Play Now</button>
                    }
                </div>

            </section>



        </div>
    )
}

export default Details