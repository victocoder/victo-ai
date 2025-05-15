import React from 'react'
import { ModeToggle } from '../ui/theme-togle'
import Image from 'next/image'
const Navbar = () => {
  return (
    <div className="flex items-center ]  justify-between fixed   p-2 z-40  dark:bg-sidebar bg-card top-0 left-[300px] right-[0px]">
      <h1>Mesfin </h1>
      <ModeToggle />
    </div>
  )
}

export default Navbar
