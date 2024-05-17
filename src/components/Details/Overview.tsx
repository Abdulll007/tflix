import React from 'react'
import Skeleton from 'react-loading-skeleton'

function Overview({ loading, data }: { loading: boolean, data: any }) {
  return (
    <div className="my-4 w-full ">

            <div className="px-2 text-white">
            <div className="my-2">
              <h3 className='font-thin'>{data?.tagline}</h3>
            </div>

              <h2
                className="text-xl sm:text-3xl font-semibold mb-2 "
              >Over view</h2>
              {loading ? (<Skeleton baseColor="#222830"
                width={"100%"} height={"15rem"} direction="ltr" duration={1} />) : (<p className=''>{data.overview}</p>)}
            </div>
          </div>
  )
}

export default Overview