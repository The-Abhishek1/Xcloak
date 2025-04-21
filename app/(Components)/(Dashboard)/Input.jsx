"use client"
import React, { useState,createContext } from 'react'
import Link from 'next/link'
function Input() {

  const [target,setTarget] = useState("")
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false);

  setTimeout(() =>{
    if(error){
      setError(false)
    }
  },2000)

  if(show){
    return(
      <div className="flex flex-col items-center text-gray-100 bg-gradient-to-br py-10 gap-5 w-full">
      <h1 className="text-xl font-bold tracking-wide text-gray-500">Choose API for Scanning...</h1>
  
      <div className="flex flex-col space-y-4">
        <Link href={{ pathname: '/shodanscan', query: { target } }}>
          <button className="bg-black/80 cursor-pointer backdrop-blur border border-white/10 text-white w-60 sm:w-80 py-2 rounded-xl hover:bg-black/60 transition-all duration-200 shadow-md">
            🔍 Shodan Scan
          </button>
        </Link>
  
        <button
          onClick={() => alert("We're currently working on this feature. Please use ZAP Proxy or Shodan.")}
          className="bg-blue-600 cursor-pointer w-60 sm:w-80 py-2 rounded-xl hover:bg-blue-700 shadow-md transition duration-200"
        >
          🌐 Web-Check Analysis
        </button>
  
        <Link href={{ pathname: '/zapscan', query: { target } }}>
          <button className="bg-green-600 cursor-pointer w-60 sm:w-80 py-2 rounded-xl hover:bg-green-700 shadow-md transition duration-200">
            🛡️ ZAP Proxy Scan
          </button>
        </Link>
      </div>
  
      <button
        onClick={() => {
          setShow(false);
          setTarget("");
        }}
        className="mt-6 w-60 cursor-pointer sm:w-80 py-2 bg-red-600 rounded-xl hover:bg-red-700 transition shadow-md"
      >
        Cancel
      </button>
    </div>
  
    )
  }
  else{
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
          setShow(true);
        }        
      }}
      className="bg-green-600 cursor-pointer hover:bg-green-700 text-white w-60 sm:w-80 py-2 rounded-xl text-sm transition-all shadow-md"
    >
      Start Testing URL
    </button>
  </div>
  )
}
}

export default Input