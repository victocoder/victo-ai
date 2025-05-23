"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false);

  // This effect will set mounted to true after the component has mounted
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted, return null to avoid hydration issues
  if (!mounted) return null;

  return (
    <div>
      {
        theme == "dark" ? <div className="flex gap-4 cursor-pointer" onClick={() => setTheme("light")}>
          <Sun  className="h-6 w-6 cursor-pointer" />
          <span> Dark/Light </span>
        </div> : <div className="flex gap-4  cursor-pointer" onClick={() => setTheme("dark")}>
          <Moon  className="h-6 w-6 cursor-pointer" />
          <span> Dark/Light </span>
        </div>
      }

    </div>

  )
  // <DropdownMenu>
  //   <DropdownMenuTrigger asChild>
  //     <Button variant="outline" size="icon">
  //       <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
  //       <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
  //       <span className="sr-only">Toggle theme</span>
  //     </Button>
  //   </DropdownMenuTrigger>
  //   <DropdownMenuContent align="end">
  //     <DropdownMenuItem onClick={() => setTheme("light")}>
  //       Light
  //     </DropdownMenuItem>
  //     <DropdownMenuItem onClick={() => setTheme("dark")}>
  //       Dark
  //     </DropdownMenuItem>
  //     <DropdownMenuItem onClick={() => setTheme("system")}>
  //       System
  //     </DropdownMenuItem>
  //   </DropdownMenuContent>
  // </DropdownMenu>

}
