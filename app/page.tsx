"use client"
import AiPrompt from "@/components/custom/AiPrompt";
import CodeBlocComp from "@/components/custom/CodeBlocComp";
import Navbar from "@/components/custom/Navbar";
import SideBar from "@/components/custom/SideBar";
import Image from "next/image";
import 'github-markdown-css/github-markdown.css';
import AiChat from "@/components/custom/AiChat";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div className=" flex flex-col justify-center items-center h-screen gap-4 p-4">
      <div className=" max-w-[600px] flex justify-center items-center flex-col gap-4">
        <h1 className="lg:text-8xl text-4xl sm:*:text-6xl font-bold">VICTO AI</h1>
        <p>Your Trusted Companion</p>
        <p className="text-center">Different Ai Experts to help you in any walk of you laife, know </p>
      </div>
      <div>
        <Button className="text-white" onClick={()=>router.push("/login")}  >Get Started</Button>
      </div>
    </div>
  );
}
