import React from 'react'
import Image from 'next/image'
import chill from "@/public/chill.png"

function Chill() {
  return (
    <div className="flex flex-col -z-10 mt-[-3rem] p-10 items-center justify-center">
        <Image src={chill} height={300} alt="Chilling"/>
        <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto mb-4" />
        <h2 className="text-xl font-semibold">Fetching in progress...</h2>
        <p className="text-sm text-gray-800 mt-2">If not loaded, Please specify the topic and click search.</p>
        </div>
    </div>
  )
}

export default Chill