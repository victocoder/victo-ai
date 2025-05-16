import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Image from "next/image"
import SideBarContent from "./SideBarContent"

export function SideBarDrawer() {
  return (
    <Sheet >
      <SheetTrigger asChild className="" >
        <Menu className="flex md:hidden" />
        {/* <Button className="flex md:hidden" variant="outline">Open</Button> */}
      </SheetTrigger>
      <SheetContent side="left">
          <SheetTitle className="sr-only">menu</SheetTitle>

        {/* <SheetHeader>
                <Image src="/logo.png" alt='img' width={110} height={110} />
          
          <SheetTitle>Victo AI</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader> */}
        <SideBarContent />
       
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  )
}
