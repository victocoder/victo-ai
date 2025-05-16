import React from 'react'
import { ModeToggle } from '../ui/theme-togle'
import Image from 'next/image'
import { SideBarDrawer } from './SidebarDrawer'
const Navbar = () => {
  return (
    <div className="flex items-center   justify-between fixed   p-2 z-40  dark:bg-sidebar bg-card top-0 max-md:w-full  md:left-[300px] md:right-[0px]">
      <SideBarDrawer />
      <h1>Mesfin </h1>
      <ModeToggle />
    </div>
  )
}

export default Navbar
