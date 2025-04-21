import Image from 'next/image'
import React from 'react'
import logo from "@/public/logo.png"
import Link from 'next/link'
import Button from './Button'
import ScrollUp from './ScrollUp'

function Header() {
  return (
    <>
    <div className="p-3 text-[0.9rem] bg-white/30 backdrop-blur-md shadow-lg border border-gray-200 rounded-2xl mx-4 mt-4 mb-4 flex flex-row items-center justify-between sticky top-4 z-50">
    <div className="flex flex-row items-center gap-8">
      <Image src={logo} alt="Xcloak" width={50} height={50} className="rounded-full shadow-md" />
  
      <Link className="hover:underline hidden sm:block text-gray-800 font-medium transition duration-200 hover:text-blue-600" href={"/"}>
        Home
      </Link>
      <Link className="hover:underline hidden sm:block text-gray-800 font-medium transition duration-200 hover:text-blue-600" href={"/"}>
        About
      </Link>
      <Link className="hover:underline hidden sm:block text-gray-800 font-medium transition duration-200 hover:text-blue-600" href={"/"}>
        Contact
      </Link>
      <Link className="hover:underline hidden sm:block text-gray-800 font-medium transition duration-200 hover:text-blue-600" href={"/news"}>
        News
      </Link>
    </div>
    <div>
      <Button />
    </div>
  </div> 
  <ScrollUp />
</>
  
  )
}

export default Header