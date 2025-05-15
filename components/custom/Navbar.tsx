import React from 'react'
import { ModeToggle } from '../ui/theme-togle'

const Navbar = () => {
  return (
    <div className="flex items-center  justify-between fixed  w-full p-4 z-40 ">
      <h1 className="text-2xl font-bold mb-4">VICTO AI</h1>
      <h1>Mesfin </h1>
      <ModeToggle />
    </div>
  )
}

export default Navbar
