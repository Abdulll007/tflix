import Link from 'next/link'
import React from 'react'
import NoPoster from '../NoPoster'

function Recommendation({ recommendations }: any) {


    

    return (
        <div className="w-full mt-2">
            <div className="text-white">
                <h2 className='text-xl font-bold mb-2'>
                    Recommendations
                </h2>
            </div>

            <div className="flex overflow-y-scroll no-scrollbar w-full gap-4 h-[16rem] rounded-lg" >

                {recommendations?.map((recommendation: any) => (



                    <Link href={`/${recommendation.media_type}/${recommendation.id}`} key={recommendation.id} className="">
                        <img src={`${recommendation.backdrop_path ? `${process.env.NEXT_PUBLIC_IMAGE_URI}/${recommendation.backdrop_path}` : "/poster.png"}`}

                            className='max-w-64 rounded-lg'
                            alt="" />


                        <div className="text-white flex justify-between ">
                            <h3 className=''>{recommendation?.title || recommendation?.name}</h3>
                            <p>{Math.ceil((recommendation.vote_average * 100) / 10)
                            }%</p>
                        </div>
                    </Link>

                ))}

            </div>

        </div>
    )
}

export default Recommendation