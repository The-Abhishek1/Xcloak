import Image from 'next/image'
import React from 'react'
import Input from './Input'
import TypingText from './Typing'
import Images from './Images'

function Dashboard() {
  return (
    <div className='flex flex-col'>
      <div className='py-10 bg-black text-white flex flex-col items-center px-20' >
      <h1 className="text-[3rem] font-bold text-transparent bg-clip-text 
        bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 
        animate-pulse drop-shadow-xl">
        Xcloak
        </h1>
      <TypingText/>
      <p className='text-center text-[.9rem]'>Xcloak is your all-in-one AI-powered tool for real-time scanning, detection, and protection against XSS, SQL Injection, and other critical web vulnerabilities.</p>
      </div>
      <Input/>
      
      <Images/>
    </div>
  )
}

export default Dashboard