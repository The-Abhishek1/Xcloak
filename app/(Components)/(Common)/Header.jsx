import Image from 'next/image'
import React from 'react'
import logo from "@/public/logo.png"
import Link from 'next/link'
import Button from './Button'
import ScrollUp from './ScrollUp'

function Header() {
  return (
      <div className='p-3 text-sm text-gray-600 shadow-lg bg-transparent flex flex-row border-b-[1px] border-gray-200 items-center justify-between'>
        <ScrollUp/>
        <div className='flex flex-row items-center gap-10'>
          <Image src={logo} alt='Xcloak'width={60} height={60} className='rounded-[50%]'/>
          <Link className='hover:underline hidden sm:block' href={"/"}>Home</Link>
          <Link className='hover:underline hidden sm:block' href={"/"}>About</Link>
          <Link className='hover:underline hidden sm:block' href={"/"}>Contact</Link>
          <Link className='hover:underline hidden sm:block' href={"/news"}>News</Link>
        </div>
        <div>
          <Button/>
        </div>
      </div>
  )
}

export default Header