"use client"

import React from 'react'
import Image from 'next/image';
import uparrow from "@/public/uparrow.png"

function ScrollUp() {
  return (
    <div className='animate-bounce z-10 cursor-pointer p-2 fixed bg-gray-900 rounded-full bottom-4 right-5 flex flex-col items-center'>
    <Image onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} src={uparrow} height={20} width={20} alt="Up arrow"/>
    </div>
  )
}

export default ScrollUp