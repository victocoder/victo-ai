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
  import { motion } from "framer-motion";
export default function Home() {
  const router = useRouter()


const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
  return (
<motion.div
      className="flex flex-col justify-center items-center h-screen gap-4 p-4"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="max-w-[600px] flex justify-center items-center flex-col gap-4"
        variants={container}
      >
        <motion.div variants={fadeUp}>
          <Image src="/logo.png" alt="img" width={310} height={310} />
        </motion.div>

        <motion.h1
          className="lg:text-8xl text-4xl sm:text-6xl font-bold"
          variants={fadeUp}
        >
          VICTO AI
        </motion.h1>

        <motion.p className="text-center" variants={fadeUp}>
          Various AI experts are available to assist you in every aspect of your life.
        </motion.p>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Button
          size="lg"
          className="text-white cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Get Started
        </Button>
      </motion.div>
    </motion.div>

  );
}
