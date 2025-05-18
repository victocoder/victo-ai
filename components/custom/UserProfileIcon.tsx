"use client"
import { auth } from '@/lib/auth'
import { authClient } from '@/lib/auth-client'
import useAuthStore from '@/store/useAuthStore'
import React, { use } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, PersonStanding, User, User2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ModeToggle } from '../ui/theme-togle'

const UserProfileIcon = () => {
    const [position, setPosition] = React.useState("bottom")
    const router = useRouter()
    const { data: session } = authClient.useSession()
    const handleLogout = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    console.log("signout success")
                    router.push("/login"); // redirect to login page
                },
                onRequest: () => {
                    console.log("signout request")
                },
                onError: () => {
                    console.log("signout error")
                }
            },
        })
    }
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className=' bg-accent rounded-full p-2'>
                        <User2 className='cursor-pointer' />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <div className='flex gap-4 p-2 cursor-pointer'>
                        <User className='cursor-pointer' />
                        <span className='cursor-pointer'>{session?.user.name}</span>
                    </div>


                    <div className='flex gap-4 p-2' >
                        <ModeToggle />
                    </div>
                    <DropdownMenuSeparator />
                    <div className='flex gap-4 p-2 cursor-pointer' onClick={() => handleLogout()} >
                        <LogOut className="cursor-pointer" />  <span> Logout </span>
                    </div>

                    {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup> */}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default UserProfileIcon
