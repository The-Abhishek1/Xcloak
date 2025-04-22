import React from 'react'
import Shodan from '../(Components)/(Shodan)/Shodan'
import Header from '../(Components)/(Common)/Header'
import Footer from '../(Components)/(Common)/Footer'
import { Suspense } from 'react'

function page() {
  return (
  <>
    <Header/>
    <Suspense fallback={<div className="p-10 text-center">Loading scan component...</div>}>
    <Shodan/>
    </Suspense>
    <Footer/>
  </>
  )
}

export default page