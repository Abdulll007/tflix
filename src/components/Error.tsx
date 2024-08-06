import React from 'react'

const Error = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='absolute top-0 left-0 bottom-0 right-0 flex flex-col justify-center items-center text-white '>{children}</div>
  )
}

export default Error