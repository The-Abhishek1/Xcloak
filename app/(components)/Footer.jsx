import Image from 'next/image'
import React from 'react'
import logo from "@/public/logo.png"
import whatsapp from "@/public/whatsapp.png"
import instagram from "@/public/instagram.png"

function Footer() {

  return (
    <footer className="w-full flex  lg:border-t border-gray-200 lg:flex-row lg:justify-between p-3  flex-col items-center gap-3">
        <div className='flex items-center flex-col w-full'>
                <Image src={logo} alt='Xcloak' className='rounded-[100%]' width={100}/>
                <span className="animate-shake animate-infinite animate-delay- text-sm  mt-[-.5rem]">Unseen. Unowned.</span>
        </div>
        <div className="flex w-full flex-col items-center gap-3 py-3 lg:border-none border-t border-gray-200">
            <div>
                <span className="text-sm text-gray-500 ">©Xcloak 2025, All rights reserved.</span>
            </div>
            <div className='flex flex-row gap-2 items-center'>
                <Image src={whatsapp} alt="Whatsapp" className='cursor-pointer' width={33} height={33}/>
                <Image src={instagram} alt="Instagram" className='cursor-pointer' width={30} height={30}/>
                <a href="javascript:;"  className="relative w-[25px] h-[25px] rounded-full transition-all duration-500 flex justify-center items-center bg-[#FF0000] hover:bg-red-400">
                    <svg className="w-[1.25rem] h-[0.875rem] text-white" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.9191 1.10651C14.558 1.27906 15.0602 1.78251 15.2299 2.42069C15.5388 3.57887 15.5388 5.99687 15.5388 5.99687C15.5388 5.99687 15.5388 8.41487 15.2299 9.57306C15.0578 10.2136 14.5556 10.7171 13.9191 10.8872C12.7638 11.1969 8.12875 11.1969 8.12875 11.1969C8.12875 11.1969 3.49603 11.1969 2.33844 10.8872C1.69952 10.7147 1.19735 10.2112 1.0276 9.57306C0.71875 8.41487 0.71875 5.99687 0.71875 5.99687C0.71875 5.99687 0.71875 3.57887 1.0276 2.42069C1.1997 1.78015 1.70188 1.27669 2.33844 1.10651C3.49603 0.796875 8.12875 0.796875 8.12875 0.796875C8.12875 0.796875 12.7638 0.796875 13.9191 1.10651ZM10.4981 5.99687L6.6481 8.22578V3.76796L10.4981 5.99687Z" fill="white"/>
                    </svg>
                                  
                 </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer