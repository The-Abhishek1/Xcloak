'use client'
import React from 'react'
import menu from "@/public/menus.png"
import Image from 'next/image'
import Link from 'next/link'

function Button() {
  return (
    <div className='flex items-center flex-row gap-3'>
      <Link href={"https://forms.gle/5DRTf3K1chAjppDWA"}>
      <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br rounded-lg text-sm px-5 py-1.5 cursor-pointer text-center me-2 mb-2">Join Us</button>
      </Link>
           <div onClick={()=>{
            alert("Website under development!! Please check later")
           }}>
            <Image className='sm:hidden cursor-pointer' src={menu} alt='Menu'width={30} height={30}/>
           </div>
        </div>
  )
}

export default Button