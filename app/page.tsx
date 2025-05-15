import AiPrompt from "@/components/custom/AiPrompt";
import CodeBlocComp from "@/components/custom/CodeBlocComp";
import Navbar from "@/components/custom/Navbar";
import SideBar from "@/components/custom/SideBar";
import Image from "next/image";
import 'github-markdown-css/github-markdown.css';
import AiChat from "@/components/custom/AiChat";

export default function Home() {
  console.log("Home",process.env.GEMINI_API_KEY);
  return (
    <div>
      <SideBar />
      <Navbar />
   
        {/* <CodeBlocComp /> */}
        {/* <AiPrompt /> */}
        <AiChat />
    </div>
  );
}
