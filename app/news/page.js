import React from 'react'
import NewsItem from '../(Components)/(News)/NewsItem'
import NewsList from '../(Components)/(News)/NewsList'
import Header from '../(Components)/(Common)/Header'
import Footer from '../(Components)/(Common)/Footer'

function page() {
  return (
    <div>
      <Header/>
       <NewsList/>
       <Footer/>
    </div>
  )
}

export default page