import Image from 'next/image'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const SideBar = () => {
  return (
    <div className="flex flex-col items-center  min-h-screen  border-r-2 border-sidebar-border bg-sidebar  w-[300px] fixed top-0 left-0 p-4">
      <Image src="/logo.png" alt='img' width={110} height={110} />
      <Select value='1' >
        <SelectTrigger className=" w-full" value="1">
          <SelectValue placeholder="Select Your Expert"  />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup >
            <SelectLabel>Select Your Expert</SelectLabel>
            <SelectItem value="1">MR. Doctor</SelectItem>
            <SelectItem value="2">MR. Lawyer</SelectItem>
            <SelectItem value="3">MR. Coding Teacher</SelectItem>
            <SelectItem value="4">MR. Matimtics Teacher</SelectItem>
            <SelectItem value="5">MR. Physics Teacher</SelectItem>
            <SelectItem value="6">MR. Romance Councler</SelectItem>
            <SelectItem value="7">MR. Business Councler</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <section>
        <div>
          <p>How to become an expert</p>
        </div>
      </section>
    
    </div>
  )
}

export default SideBar
