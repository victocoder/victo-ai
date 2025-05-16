"use client"
import React, { useState } from 'react'
import Image from 'next/image'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const SideBarContent = () => {
      const [selected, setSelected] = useState("1");

  return (
    <div className='w-full flex place-items-center flex-col gap-4 max-md:p-4'>
      
      <Image src="/logo.png" alt='img' width={110} height={110} />
      <Select onValueChange={setSelected} defaultValue="1" >
         <p>Your Expert Advisors</p>
        <SelectTrigger className=" w-full" value="1" >
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
      <div className='flex gap-2 justify-start items-start flex-col opacity-40'>
        <p>Comming soon</p>
        <ul className=''>
            <li>MR. Lawyer</li>
            <li>MR. Coding Teacher</li>
            <li>MR. Matimtics Teacher</li>
            <li>MR. Physics Teacher</li>
            <li>MR. Romance Councler</li>
            <li>MR. Business Councler</li>
        </ul>
      </div>
    </div>
  )
}

export default SideBarContent
