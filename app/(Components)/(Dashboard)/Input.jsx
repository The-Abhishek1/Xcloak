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
      <div className='flex text-[.9rem] pb-10 flex-col text-white bg-black items-center gap-5'>
      <h1 className='font-bold text-[1.5rem]'>Choose API for Scanning...</h1>     
      <div className="flex flex-col space-y-3">
        <button onClick={() => {
          alert("we are currently working on this feature please use ZAP Proxy")
        }} className="bg-gray-900 w-[14rem] sm:w-[20rem] cursor-pointer py-2 rounded hover:bg-gray-800">
          🔍 Shodan Scan
        </button>
        <button onClick={() => {
          alert("we are currently working on this feature please use ZAP Proxy")
        }} className="bg-blue-600 w-[14rem] sm:w-[20rem] cursor-pointer py-2 rounded hover:bg-blue-700">
          🌐 Web-Check Analysis
        </button>
        <Link  href={{
            pathname: '/scan',
            query:{
            target: target
            }
          }} >
          <button className="bg-green-600 w-[14rem] sm:w-[20rem] cursor-pointer py-2 rounded hover:bg-green-700">
            🛡️ ZAP Proxy Scan
          </button>
        </Link>
      </div>
      <button onClick={()=>{
        setShow(false)
        setTarget("")
      }} className = "mt-5 w-[14rem] sm:w-[20rem] py-2 bg-red-600 cursor-pointer hover:bg-red-700 block mx-auto">
        Cancel
      </button>
  </div>
    )
  }
  else{
  return (
    <div className='px-20 pb-10 text-gray-50 bg-black flex flex-col items-center gap-5'>
        <input value={target} onChange={(e)=>{
          setTarget(e.target.value)
        }} className=' border-[2.6px] p-2 w-[14rem] sm:w-[20rem] text-center text-[.8rem] outline-none' type='text' placeholder='Enter the URL to Scan'/>
        {
          error ? 
          <p className='text-[.8rem] text-red-700'>Please enter the valid URL.</p>
          :null
        }
        <button onClick={()=>{
          if (!/^https?:\/\/.*\.(com|in|org|edu)/.test(target)) {
            setError(true)
            setTarget("")
          }
          else{
            setShow(true)
          }
        }} className='bg-[#478c0a] w-[14rem] sm:w-[20rem] py-2 text-[.9rem] cursor-pointer'>Start Testing URL</button>
        
    </div>
  )
}
}

export default Input