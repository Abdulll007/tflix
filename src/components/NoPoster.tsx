import Image from 'next/image'
import React from 'react'

function NoPoster({userWidth,userHeight}:{userWidth:number,userHeight:number}) {
  return (
    <img src="/no_poster.jpg" alt='img' width={userWidth} height={userHeight}/>
  )
}

export default NoPoster