"use client"
import { useRouter } from 'next/navigation'
import React from 'react'


function Click({URL}) {
    const router = useRouter();

  return (
    <p onClick={()=>{
        router.push(URL)
    }} className="text-blue-800 text-[.8rem] cursor-pointer underline">click here to read more</p>
  )
}

export default Click