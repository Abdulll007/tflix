import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

import React from 'react'

function LoadingSkeleton({cards}:any) {

  return Array(cards).fill(0).map((card,i)=>(

    <div className="" key={i}>

      <Skeleton baseColor="#222830" width={"9rem"} height={"14rem"} direction="ltr" duration={1} />
      <Skeleton baseColor="#222830" direction="ltr" duration={1} width={"9rem"} className="mt-6" />
      <Skeleton baseColor="#222830" direction="ltr" duration={1} width={"9rem"} className="mt-3" />
    </div>

  ))
}

export default LoadingSkeleton