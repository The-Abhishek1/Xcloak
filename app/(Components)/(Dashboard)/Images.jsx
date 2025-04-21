'use client'
import React from 'react'
import img1  from "@/public/img1.png"
import img2  from "@/public/img2.png"
import img3  from "@/public/img3.png"
import img4  from "@/public/img4.png"
import worldmap from "@/public/worldmap1.jpg"
import Image from 'next/image'



export default function Images() {

  return (
    <div className="overflow-hidden relative flex flex-col gap-5 items-center justify-center p-5">
    <Image src={worldmap} alt='world map' className='max-h-[33rem]'/>
    <div className='flex flex-row flex-wrap items-center justify-center py-20 h-[40rem]  bg-transparent overflow-hidden rounded-3xl gap-5'>
      <Image className="scroll-up cursor-pointer w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] rounded-lg" src={img1} alt="Image 1"/>
      <Image className="scroll-up cursor-pointer w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] rounded-lg" src={img2} alt="Image 2"/>
      <Image className="scroll-up cursor-pointer w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] rounded-lg" src={img3} alt="Image 3"/>
      <Image className="scroll-up cursor-pointer w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] rounded-lg" src={img1} alt="Image 1"/>
      <Image className="scroll-up cursor-pointer w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] rounded-lg" src={img2} alt="Image 2"/>
      <Image className="scroll-up cursor-pointer w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] rounded-lg" src={img3} alt="Image 3"/>
    </div>
    </div>
  );
}
