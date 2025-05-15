import React from 'react'

const Navbar = () => {
  return (
    <div className="flex items-center justify-center fixed  w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Navbar</h1>
      <ul className=" flex gap-4">
        <li className="mb-2">Home</li>
        <li className="mb-2">About</li>
        <li className="mb-2">Contact</li>
      </ul>
    </div>
  )
}

export default Navbar
