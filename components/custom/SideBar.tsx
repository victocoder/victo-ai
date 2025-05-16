"use client"
import React, { useState } from 'react'
import SideBarContent from './SideBarContent'

const SideBar = () => {
  return (
    <div className="hidden md:flex flex-col items-center  min-h-screen  border-r-2 border-sidebar-border bg-sidebar  w-[300px] fixed top-0 left-0 p-4">
      <SideBarContent />
    
    </div>
  )
}

export default SideBar
