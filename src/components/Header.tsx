"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { IoSearch, IoMenu, IoCloseSharp } from "react-icons/io5";
import { options } from '@/helper/apiConfig';
import { searchresults } from './banners';

function Header({params}:any) {

  const [toggleSearch, setToggleSearch] = useState(false)
  const [toggleMenu, setToggleMenu] = useState(false)

  const [searchResult,setSearchResult] = useState("")

  const inputRef = useRef<HTMLInputElement>(null)

  const [data,setData] = useState<any[]>([])

  const fetchingData = async()=>{
  
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SEARCH}${searchResult}&include_adult=false&language=en-US`,options)
  
      setData(response.data.results)
    } catch (error) {
      
    }
    
  }

  useEffect(()=>{
    const searchRequest = setTimeout(() => {
      if(searchResult.length>0){
        fetchingData()
      }
        
    }, 1000);

    return ()=>clearTimeout(searchRequest)

  },[searchResult])


  const handleChange = (event:any)=>{

    setSearchResult(event?.target.value)

    
  }


  const linkHandler = ()=>{
    setSearchResult("")
    setToggleSearch(false)
  }



  const inputFocus = inputRef?.current


  return (
    <header className='h-14 w-full bg-[#222831] sm:px- sticky top-0 z-10 flex justify-between items-center p-4 sm:px-24 lg:px-40  '>


      <div className="text-white flex gap-4 items-center ">
        <div className="sm:hidden">
          {toggleMenu ?
            <IoCloseSharp
            size={25}
              onClick={() => setToggleMenu(!toggleMenu)}

            />
            :
            <IoMenu
              size={25}
              onClick={() => setToggleMenu(!toggleMenu)}
            /> 

          }

          { toggleMenu && <div className="absolute  left-0 top-14
          py-4 px-6 w-2/5 bg-[#222831] h-screen ">
            <ul className='flex flex-col gap-4 items-center sm:flex-row  text-xl  '>
              <li><Link href={"/movie"} onClick={() => setToggleMenu(!toggleMenu)} >Movies</Link></li>
              <li><Link href={"/tv"} onClick={() => setToggleMenu(!toggleMenu)}>Tv Shows</Link></li>
            </ul>
          </div>}
        </div>
        <h1 className="text-3xl"><Link href={"/"}>TFLIX
          </Link></h1>

          <ul className='hidden sm:flex flex-col gap-6 items-center sm:flex-row  text-xl  '>
              <li><Link href={"/movie"}>Movies</Link></li>
              <li><Link href={"/tv"}>Tv Shows</Link></li>
          </ul>

        

      </div>


      <div className="">
        <div className=" flex justify-center items-center rounded-md ">

          <input
            className={`border-none outline-none sm:text-lg  w-full rounded-l-md  ${toggleSearch ? "block" : "hidden"} bg-transparent text-white`}
            ref={inputRef}
            value={searchResult}
            onChange={handleChange}
            placeholder='Search Movie, Tv show'
    
            type="text " />


          <div className="  ">

            <IoSearch onClick={() => {
              
              
              setToggleSearch(!toggleSearch)
            }} size={20} color='white' />
          </div>
        </div>

      
        {searchResult.length>0 && 
        <div className={`absolute top-14 rounded-md  left-14 bg-[#222831]  w-3/4 sm:w-2/3  ${toggleSearch ? "block" : "hidden"}  lg:w-1/4  sm:left-[25%] lg:left-[65%] max-h-96 overflow-scroll p-2 sm:p-6`}>
           
           {
            data.map((result)=>(
            
           <Link onClick={linkHandler} key={result.id} href={`${params==="tv" || params==="movie"? result.id : `/${result.media_type}/${result.id}`} `} className="flex  items-center  text-white my-2">
            
            <div className="">
              <img 
              className='w-32'
              src={`${process.env.NEXT_PUBLIC_IMAGE_URI}${result.poster_path}`} alt="" />
            </div>

            <div className="text-center w-full">
            <h3 className='text-center font-bold '>{result.title || result.name}</h3>
            <p className=' text-center'>{result.release_date ||  result.first_air_date}</p>
            </div>

           </Link>

          ))
          }

          
        </div>}
      </div>


    </header>


  )
}

export default Header