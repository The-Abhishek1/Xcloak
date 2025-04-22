'use client'
import React ,{useEffect, useState} from 'react';
import { useSearchParams  } from 'next/navigation'
import Image from 'next/image';
import Chill from "@/public/chill.png"


function Report() {
  const searchParams = useSearchParams();
  const target = searchParams.get('target');
  console.log(target)
  const [result, setResult] = useState("")
  const [showreport, setShowreport] = useState(false)
  
  const scanTarget = async (target) => {
    console.log("Fetching")
    await fetch(`http://localhost:1210/zapscan?target=${target}`).
    then(response => response.json()).
    then(data => {
      console.log("Scan result:",data.reportPath)
      setResult(data.reportPath)
      setShowreport(true)
    }).catch((e)=> {
      console.log(e)
    })
  }
  useEffect(() => {
    scanTarget(target)
  },[])

  if(showreport){
    return (
  <iframe
  className='w-full h-screen'
        src={`http://localhost:1210/report?fileName=${result}`}
        title="ZAP Report"
      />
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

export default Report;