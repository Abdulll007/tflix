"use client"
import useFetchData from '@/helper/FetchHook'
import Link from 'next/link'
import React, { useState } from 'react'

function Profile({ params }: any) {

    const [data] = useFetchData(`https://api.themoviedb.org/3/person/${params.id}?append_to_response=movie_credits,tv_credits`)


    const moviecast = data?.movie_credits?.cast
    const tvcast = data?.tv_credits?.cast



    const [showMore, setShowMore] = useState(false)
    const [category, setCategory] = useState("movie")


    const gender = () => {
        if (data.gender === 1) {
            return "Female"
        }
        else if (data.gender === 2) {
            return "Male"
        }
    }


    let text = data.biography



    return (
        <div className="min-h-screen m-6  grid sm:grid-flow-col text-white sm:mx-32 gap-6">
            <div className=" sm:col-span-1">
                <div className="flex flex-col items-center sm:flex-row  ">

                    <div className=" mb-4 ">
                        <img className='h-40 w-40 sm:h-full sm:w-72 rounded-lg' src={data?.profile_path ? `${process.env.NEXT_PUBLIC_IMAGE_URI + data?.profile_path}` : "/noprofile.svg"} alt="" />
                    </div>
                    <h2 className="text-4xl sm:hidden
                    ">{data.name}</h2>

                </div>

                <div className="my-6">
                    <h3 className='text-2xl font-semibold'>Personal Info</h3>

                    <div className="grid grid-cols-2 sm:block">

                        <div className="mt-4">
                            <h5 className=''>Known For</h5>
                            <p className='font-thin'>{data.known_for_department}</p>
                        </div>
                        <div className="mt-4">
                            <h5 className=''>Gender</h5>
                            <p className='font-thin'>{gender()}</p>
                        </div>
                        <div className="mt-4">
                            <h5 className=''>Birthdate</h5>
                            <p className='font-thin'>{data.birthday}</p>
                        </div>
                        <div className="mt-4">
                            <h5 className=''>Place of Birth</h5>
                            <p className='font-thin'>{data.place_of_birth}</p>
                        </div>
                    </div>

                </div>

            </div>
            <div className=" sm:col-span-5">

                <h2 className="text-4xl hidden sm:block mb-8
                    ">{data.name}</h2>
                <div className="mb-6">
                    <h2 className="text-2xl mb-4 font-semibold">Biography</h2>

                    <div className="relative">
                        <p onClick={() => setShowMore(true)} className={`font-light ${!showMore?"overflow-hidden line-clamp-5":"" } `}>{showMore ? text : text?.substring(0, )}

                            
                        </p>
                    </div>
                </div>
                <div className=" flex gap-6 mb-4">

                    <h2 className="text-2xl font-semibold">
                        Acting
                    </h2>

                    <select
                        className=' px-2 rounded-md bg-transparent text-white outline-none' name="category"
                        id="category"
                        onChange={(e) => setCategory(e.target.value)}>
                        <option value="movie" >Movies</option>
                        <option value="tv" >Tv show</option>
                    </select>
                </div>

                <div className="">
                    {
                        category === "movie" ? (
                            moviecast?.map((movie: any) => (
                                <Link href={`/movie/${movie.id}`} className=" text-center my-4" key={movie.id}>

                                    <div className="">
                                        <p className="">{movie.release_date ? movie.release_date?.substring(0, 4) : "-"}</p>
                                    </div>

                                    <div className="flex flex-col items-center">

                                        <h3 className="">{movie?.title}</h3>

                                        <p className=""><span className='font-thin px-2'>as</span>{movie.character}</p>

                                    </div>

                                    <hr className='my-4' />

                                </Link>
                            ))
                        ) :
                            tvcast?.map((tv: any) => (
                                <Link href={`/tv/${tv.id}`} className=" text-center my-4" key={tv.credit_id}>

                                    <div className="">
                                        <p className="">{tv.first_air_date
                                            ? tv.first_air_date
                                                ?.substring(0, 4) : "-"}</p>
                                    </div>

                                    <div className="flex flex-col items-center">

                                        <h3 className="">{tv?.name}</h3>

                                        <p className=""><span className='font-thin px-2'>as</span>{tv.character}</p>

                                    </div>

                                    <hr className='my-4' />

                                </Link>
                            ))




                    }
                </div>
            </div>
        </div>
    )
}

export default Profile