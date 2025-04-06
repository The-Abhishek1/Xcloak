'use client'
import React from 'react'
import Loading from './Loading'

function Progress() {
  return (
    <>
    <div className='mt-2'>
    <Loading/>
    </div>
    <button onClick={() => {
      alert(`Website under development, Please visit again later
                               Thank You😉`)
    }} type="button" className="cursor-pointer animate-wiggle animate-infinite flex self-center text-center text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br rounded-lg text-sm px-5 py-2.5">Website Under Development</button>
    <span className='text-center text-[.8rem] text-gray-500'>"🚫 System access denied. Cloaking in progress... 🔐 Stay hidden. 🥷"</span>
   </>
  )
}

export default Progress