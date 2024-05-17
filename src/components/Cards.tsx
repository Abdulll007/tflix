"use client"
import React, { FC } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Skeleton from 'react-loading-skeleton';

type styleProp = {
    cardWidth?: string
}


export interface CardData {
    id: number,
    poster_path: string,
    title: string,
    name?:string,
    release_date: string,
    first_air_date?:string,
    vote_average: number,
}





function Cards({ id, poster_path, title, name, release_date,first_air_date, vote_average }: CardData, cardWidth: styleProp) {



    const votePercent= Math.ceil((vote_average*100)/10)


    return (
        <div className="my-2  text-center ">
            <div className={`relative w-36 `}>
                <img
                    className={`rounded-md  `}

                    src={`${process.env.NEXT_PUBLIC_IMAGE_URI}${poster_path}` } alt="" />

                <div 
                
                style={{ width: 40, position: "absolute", bottom: -20, left: 10, display:"flex",justifyContent:"center",alignItems:"center"}}>

                    <CircularProgressbar 
                        className=''
                        value={votePercent} 
                        minValue={0} 
                        maxValue={100} 
                        text={`${votePercent>0? votePercent+"%" :"NR"}`} 
                        background={true} 
                        styles={
                            buildStyles(
                                {
                                    textSize:"2rem" ,
                                    
                                    textColor: "white", 
                                    backgroundColor:  '#222831',
                                    
                                    
                                }
                            )
                            
                        }
                    />
                </div>
            </div>

            <div className="mt-9">
                <h2 className='text-wrap text-sms  w-36'>
                    {title || name}
                </h2>
            </div>

            <p className="font-thin mt-2">{release_date||first_air_date}</p>
        </div>
    )
}

export default Cards