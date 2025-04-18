import React from 'react'
import Hacker from './Hacker'
import Progress from './Progress'
import Dashboard from '../(Dashboard)/Dashboard'



function Content() {
  return (
    <div className='flex flex-col gap-5'>
        {/* <Hacker/>
        <Progress/> */}
        <Dashboard/>
    </div>
  )
}

export default Content