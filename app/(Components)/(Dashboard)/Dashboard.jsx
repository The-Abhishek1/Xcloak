import Image from 'next/image'
import React from 'react'
import worldmap from "@/public/worldmap1.jpg"
import Input from './Input'

function Dashboard() {
  return (
    <div className='flex flex-col'>
      <div className='py-20 bg-black text-white flex flex-col items-center px-20' >
        <h1 className='text-[3rem] font-bold'>Xcloak</h1>
        <p className='text-center text-[.9rem]'>Xcloak is your all-in-one AI-powered tool for real-time scanning, detection, and protection against XSS, SQL Injection, and other critical web vulnerabilities.</p>
      </div>
        <Input/>
      <Image src={worldmap} alt='world map' className='max-h-[33rem]'/>
    </div>
  )
}

export default Dashboard