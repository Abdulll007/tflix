import React from 'react'
import Cards from '../Cards'
import useFetchData from '@/helper/FetchHook'
import LoadingSkeleton from '../LoadingSkeleton'
import Link from 'next/link'

function Upcoming() {


  const [data,loading] = useFetchData("https://api.themoviedb.org/3/movie/upcoming")


  
  return (


    <div className="trending mt-6 mx-5 text-white">
    
      
      <h1 className="text-xl font-semibold my-4">Upcoming</h1>

      
      <div className="overflow-y-scroll no-scrollbar flex gap-6">

      {loading && <LoadingSkeleton cards={20}/>}

      { data?.map((upcoming:any)=>(
        <Link href={`/movie/${upcoming.id}`} key={upcoming.id}>
          

         <Cards 
          
          id={upcoming.id} 
          name={upcoming.name}
          poster_path={upcoming.poster_path} 
          title={upcoming.title}
          release_date={upcoming.release_date}
          first_air_date={upcoming.first_air_date}
          vote_average={upcoming.vote_average}
          /> 
        </Link>
      ))}
      
      </div>
      
    </div>
  )
}

export default Upcoming