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
        <Image src="/logo.png" alt='img' width={310} height={310} />
        <h1 className="lg:text-8xl text-4xl sm:*:text-6xl font-bold">VICTO AI</h1>
        <p className="text-center">Various AI experts are available to assist you in every aspect of your life.</p>
      </div>
      <div>
        <Button size="lg" className="text-white cursor-pointer" onClick={()=>router.push("/login")}  >Get Started</Button>
      </div>
    </div>
  );
}
