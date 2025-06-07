import React, {Suspense} from 'react'
import Header from '../(Components)/(Common)/Header'
import Footer from '../(Components)/(Common)/Footer'
import Report from '../(Components)/(ZAPScan)/Report'

function page() {
  return (
    <>
    <Header/>
    <Suspense fallback={<div className='text-center py-10 text-[20px]'>Loading Report...</div>}>
    <Report/>
    </Suspense>
    <Footer/>
    </>
  )
}

export default page