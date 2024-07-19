"use client"
import React, { useEffect, useState } from 'react'
const getWindowSize = () =>{
    const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}


function useWindowSize() {
    const [windowSize, setWindowSize] = useState(getWindowSize());

    function handleResize() {
        setWindowSize(getWindowSize());
      }

    useEffect(()=>{
        
        window.addEventListener("resize",handleResize)

        return ()=>window.removeEventListener("resize",handleResize)

    },[])
  

    return windowSize
}

export default useWindowSize

