import Image from 'next/image'
import React from 'react'
import Input from './Input'
import TypingText from './Typing'
import Images from './Images'

function Dashboard() {
  return (
    <div className="flex flex-col from-white via-slate-50 to-indigo-50">
    {/* Hero Section */}
    <div className="py-16 pb-8 px-6 sm:px-10 md:px-20 bg-gradient-to-br text-gray-800 flex flex-col items-center space-y-6 text-center">
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text 
  bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 animate-pulse drop-shadow-xl">
  Xcloak
</h1>
<TypingText/>
<p className="text-sm sm:text-base max-w-2xl leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
  Xcloak is your all-in-one AI-powered tool for real-time scanning, detection, and protection
  against <span className="text-red-500 font-semibold">XSS</span>, <span className="text-orange-500 font-semibold">SQL Injection</span>, 
  and other critical web vulnerabilities.
</p>

    </div>
      <Input />
      <Images />
  </div>
  
  )
}

export default Dashboard