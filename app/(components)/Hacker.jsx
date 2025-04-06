import React from 'react'
import hacker from "@/public/hacker2.png"
import Image from 'next/image'

function Hacker() {
  return (
    <div className='flex items-center justify-center'>
      <Image alt='Hacker' className='h-[20rem] w-auto' src={hacker}/>
    </div>
  )
}

export default Hacker