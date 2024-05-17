"use client"
import Cards from '@/components/Cards'
import useFetchData from '@/helper/FetchHook'
import { options } from '@/helper/apiConfig'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Page() {

  const [tvShows, setTvShows] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(2) // Initialize to a number

  const fetchMoreData = async (pageNumber: number) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_REQUEST_API}/movie/popular?page=${pageNumber}`, options)
    return data
  }

  useEffect(()=>{
    const firstFetch = async()=>{
      const data = await fetchMoreData(1)
      setTvShows(data.results)

    }

    firstFetch()
  },[])

  useEffect(() => {
    const handleScroll = async () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        try {
          const response = await fetchMoreData(currentPage + 1)
          const newTvData = response.results
          setTvShows((prevTvShows) => [...prevTvShows, ...newTvData])
          setCurrentPage((prevPage) => prevPage + 1) // Use functional update to ensure the correct state
        } catch (error) {
          console.log(error)
        }
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]); // No need to depend on currentPage here

  return (
    <div className='min-h-screen flex flex-wrap justify-center gap-4 text-white sm:mx-20 md:mx-28'>
      {tvShows?.map((shows) =>

        <Link href={`/tv/${shows?.id}`} key={shows.id}>
        <Cards 
          id={shows?.id}
          name={shows?.name}
          poster_path={shows.poster_path}
          vote_average={shows.vote_average}
          title={shows.title}
          key={shows.id}
          release_date={shows.release_date}
          />
          </Link>
      )}
    </div>
  )
}

export default Page
