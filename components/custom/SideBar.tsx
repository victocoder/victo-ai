import React from 'react'

const SideBar = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 w-[300px] fixed top-0 left-0 p-4">
      <h1 className="text-2xl font-bold mb-4">SideBar</h1>
      <ul className="list-disc">
        <li className="mb-2">Item 1</li>
        <li className="mb-2">Item 2</li>
        <li className="mb-2">Item 3</li>
      </ul>
    </div>
  )
}

export default SideBar
