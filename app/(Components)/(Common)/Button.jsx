'use client'
import React, { useState } from 'react'
import menu from "@/public/menus.png"
import Image from 'next/image'
import Link from 'next/link'

function Button() {

  const [showmenu, setMenu] =  useState(false)
  return (
    <>
      <div className='flex flex-row items-center gap-3'>
        <Link href={"https://forms.gle/5DRTf3K1chAjppDWA"}>
        <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br rounded-lg text-sm px-5 py-1.5 cursor-pointer text-center">Join Us</button>
        </Link>
            <div onClick={() => {
          setMenu(!showmenu)
        }}>
            <Image className='sm:hidden cursor-pointer' src={menu} alt='Menu'width={30} height={30}/>
            </div>
      </div>
      {
      showmenu ? 
      <div className="absolute right-6 top-20 mt-2 w-40 rounded-md shadow-2xl bg-white">
          <div className="py-1 text-sm text-gray-800">
            <Link onClick={() => {
              setMenu(false)
            }} href="/" className="block px-4 py-2 hover:bg-gray-100">Home</Link>
            <Link onClick={() => {
              setMenu(false)
            }} href="/about" className="block px-4 py-2 hover:bg-gray-100">About</Link>
            <Link onClick={() => {
              setMenu(false)
            }} href="/contact" className="block px-4 py-2 hover:bg-gray-100">Contact</Link>
            <Link onClick={() => {
              setMenu(false)
            }} href="/news" className="block px-4 py-2 hover:bg-gray-100">News</Link>
          </div>
        </div>
        :null
      }
    </>
  )
}

export default Button