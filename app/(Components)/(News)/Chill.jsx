import React from 'react'
import Image from 'next/image'
import chill from "@/public/chill.png"

function Chill() {
  return (
  <div className="flex flex-col items-center justify-center -z-10 mt-[-3rem] p-10 bg-gradient-to-b">
  <Image src={chill} height={250} alt="Chilling" className="mb-6 animate-fade-in" />

  <div className="text-center space-y-4">
    <div className="relative h-16 w-16 mx-auto mb-2">
      <div className="absolute inset-0 rounded-full border-4 border-blue-300 opacity-30 animate-ping" />
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid" />
    </div>

    <h2 className="text-2xl font-bold text-blue-700 animate-pulse">Fetching in progress...</h2>
    <p className="text-sm text-gray-700 max-w-md mx-auto">
      Hang tight! We’re scanning your request. <br />
      <span className="text-blue-500 font-medium">Tip:</span> If nothing loads, please specify the topic and hit <span className="font-semibold">Search</span>.
    </p>
  </div>
</div>
  )
}

export default Chill