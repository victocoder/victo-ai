import React from 'react'
import { ModeToggle } from '../ui/theme-togle'
import { SideBarDrawer } from './SidebarDrawer'
import UserProfileIcon from './UserProfileIcon'
const Navbar = () => {
  return (
    <div className="flex items-center   justify-between fixed   p-2 z-40  dark:bg-sidebar bg-card top-0 max-md:w-full  md:left-[300px] md:right-[0px] px-4 pt-4">
      <SideBarDrawer />
      <h1>VICTO AI</h1>
       <UserProfileIcon />
    </div>
  )
}

export default Navbar
