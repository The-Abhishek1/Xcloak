import React from 'react'
import { Suspense } from 'react';
import Header from '../(Components)/(Common)/Header'
import Footer from '../(Components)/(Common)/Footer'
import Report from '../(Components)/(ZAPScan)/Report'

function page() {
  return (
    <div>
        <Header/>
        <Suspense fallback={<div className="p-10 text-center">Loading scan component...</div>}>
          <Report/>
        </Suspense>
        <Footer/>
    </div>
  )
}

export default page