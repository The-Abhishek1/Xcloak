import React, {Suspense} from 'react'
import Header from '../(Components)/(Common)/Header'
import Scanner from '../(Components)/(Scan)/Scanner'
import Footer from '../(Components)/(Common)/Footer'

function page() {
  return (
    <>
    <Header/>
    <Suspense fallback={<div>Loading posts...</div>}>
    <Scanner/>
    </Suspense>
    <Footer/>
    </>
  )
}

export default page