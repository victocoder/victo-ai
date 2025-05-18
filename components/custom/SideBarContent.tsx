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
import useExpertStore from '@/store/useExpertStore'
const SideBarContent = () => {
  const { expert, expertList, setExpert } = useExpertStore()
  return (
    <div className='w-full flex place-items-center flex-col gap-4 max-md:p-4'>

      <Image src="/logo.png" alt='img' width={110} height={110} />
      <Select onValueChange={(val) => {
        const selectedExpert = expertList.find((exp) => String(exp.id) === val);
        if (selectedExpert) setExpert(selectedExpert);
      }} defaultValue={`${expert.id}`} >
        <p>Your Expert Advisors</p>
        <SelectTrigger className=" w-full" value="1" >
          <SelectValue placeholder="Select Your Expert" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup >
            <SelectLabel>Select Your Expert</SelectLabel>
            {
              expertList?.map((expert) => (
                <SelectItem value={`${expert.id}`} key={expert.name}>{expert.name}</SelectItem>
              ))
            }    
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className='flex gap-2 justify-start items-start flex-col opacity-40'>
        <p>Coming soon</p>
        <p>Persisting chat history on a reliable server</p>
      </div>
    </div>
  )
}

export default SideBarContent
