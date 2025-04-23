"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';


function Input() {

  const [target,setTarget] = useState("")
  const [error, setError] = useState(false);
  const router = useRouter()

  setTimeout(() =>{
    if(error){
      setError(false)
    }
  },2000)
  return (
    <div className="flex flex-col items-center gap-5 pb-7 bg-gradient-to-r">
    <input
      value={target}
      onChange={(e) => setTarget(e.target.value)}
      className="border-[2px] border-gray-300 text-gray-700 bg-white p-2 w-60 sm:w-80 rounded-md text-center text-sm outline-none focus:ring-2 focus:ring-indigo-300 shadow"
      type="text"
      placeholder="Enter the URL to Scan"
    />
    {error && <p className="text-sm text-red-600">Please enter a valid URL.</p>}
    <button
      onClick={() => {
        if (!/^https?:\/\/[^\s/$.?#].[^\s]*\.[a-z]{2,}$/i.test(target)) {
          setError(true);
          setTarget("");
        } else {
          router.push(`/scan?target=${target}`)
        }        
      }}
      className="bg-green-600 cursor-pointer hover:bg-green-700 text-white w-60 sm:w-80 py-2 rounded-xl text-sm transition-all shadow-md"
    >
      Start Testing URL
    </button>
  </div>
  )
}

export default Input