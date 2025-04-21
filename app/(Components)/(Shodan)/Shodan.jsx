'use client'
import React ,{useEffect, useState} from 'react';
import { useSearchParams  } from 'next/navigation'
import Image from 'next/image';
import Chill from "@/public/chill.png"


function Shodan() {
  const searchParams = useSearchParams();
  const target = searchParams.get('target');
  const [result, setResult] = useState(null)
  const [showResult, setshowResult] = useState(false)
  
  useEffect(() => {
    const scanTarget = async (target) => {
      await fetch(`http://localhost:1210/shodanscan?target=${target}`).
      then(response => response.json()).
      then(data => {
        console.log("Scan result:",data)
        setResult(data)
        setshowResult(true)
      }).catch((e)=> {
        console.log(e)
      })
    }
    scanTarget(target)
  },[])

  if(showResult){
    return (
<div className="p-6 min-h-screen bg-gradient-to-br">
  <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 animate-pulse drop-shadow">
    🛰️ Shodan Scan Result
  </h1>

  <p className="mb-6 text-lg font-semibold text-center text-gray-800">
    Total Results: <span className="text-red-600 font-bold">{result.totalResults}</span>
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {result.results.map((item, index) => (
      <div
        key={index}
        className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-gray-300 transition-all duration-300 hover:shadow-xl"
      >
        <h2 className="text-xl font-bold text-red-600 mb-3 truncate">{item.title || 'Untitled'}</h2>

        <div className="text-sm text-gray-700 space-y-2 break-words">
          <p><span className="font-semibold text-gray-900">Query:</span> {item.query}</p>
          <p><span className="font-semibold text-gray-900">Description:</span> {item.description || 'N/A'}</p>
          <p><span className="font-semibold text-gray-900">Votes:</span> {item.votes}</p>
          <p><span className="font-semibold text-gray-900">Tags:</span> {item.tags?.join(', ') || 'None'}</p>
          <p><span className="font-semibold text-gray-900">Timestamp:</span> 
            {item.timestamp && !isNaN(Date.parse(item.timestamp)) 
              ? new Date(item.timestamp).toLocaleString() 
              : 'Invalid Date'}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

    );
  }
  else{
    return(
     <div className="flex flex-col items-center justify-center -z-10 mt-[-3rem] p-10 bg-gradient-to-b">
             <Image src={Chill} height={250} alt="Chilling" className="mb-6 animate-fade-in" />
           
             <div className="text-center space-y-4">
               <div className="relative h-16 w-16 mx-auto mb-2">
                 <div className="absolute inset-0 rounded-full border-4 border-blue-300 opacity-30 animate-ping" />
                 <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid" />
               </div>
           
               <h2 className="text-2xl font-bold text-blue-700 animate-pulse">Fetching in progress...</h2>
               <p className="text-sm text-gray-700 max-w-md mx-auto">
                 Hang tight! We’re scanning your request.
               </p>
             </div>
           </div>
    )
  }
}

export default Shodan;