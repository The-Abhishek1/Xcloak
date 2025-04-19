'use client'
import { Suspense } from 'react';
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
  
  useEffect(() => {
    const scanTarget = async (target) => {
      console.log("Fetching")
      await fetch(`http://localhost:1210/scan?target=${target}`).
      then(response => response.json()).
      then(data => {
        console.log("Scan result:",data.reportPath)
        setResult(data.reportPath)
        setShowreport(true)
      }).catch((e)=> {
        console.log(e)
      })
    }
    scanTarget(target)
  },[])

  if(showreport){
    return (
      <iframe className="p-5" src={`http://localhost:1210/report?fileName=${result}`} width="100%" height="800px"></iframe>
    );
  }
  else{
    return(
      <div className="flex flex-col p-10 items-center justify-center bg-black text-white">
        <Image src={Chill} height={400} alt="Chilling"/>
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto mb-4" />
        <h2 className="text-xl font-semibold">Scanning in progress...</h2>
        <p className="text-sm text-gray-300 mt-2">Please wait while we analyze the target URL.</p>
      </div>
    </div>
    )
  }
}

export default Report;