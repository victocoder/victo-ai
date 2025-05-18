import AiChat from '@/components/custom/AiChat'
import Navbar from '@/components/custom/Navbar'
import SideBar from '@/components/custom/SideBar'
import React from 'react'

const page = () => {
  return (
    <div>
      <SideBar />
      <Navbar />
      <AiChat />
    </div>
  )
}

export default page
