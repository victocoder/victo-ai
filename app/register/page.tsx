'use client'
import { motion } from "framer-motion";

import { useEffect, useState } from 'react'
import useAuthStore from '@/store/useAuthStore'
import { RegisterFormData } from '@/types/auth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/theme-togle'
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}
const RegisterForm = () => {
  const router = useRouter()
  const { registerUser, loading, error, loginWithGoogle } = useAuthStore()
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    name: '',
  })

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const loginResult = await registerUser(formData);
    if (loginResult) {
      // router.push('/login')
      toast.success("Registration successful", {
        description: `You can login with ${formData.email}`,

        action: {
          label: "Login",
          onClick: () => router.push("/login"),
        },
      })
    } else {
      toast.error("Registration failed")

    }

  }

  return (
    <motion.section
      className='flex flex-col items-center justify-center min-h-screen gap-4'
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className='p-6 rounded-lg w-full max-w-lg m-auto'
        variants={container}>
        <motion.div className='fixed top-0 right-0 p-8' variants={fadeUp}>
          <ModeToggle />
        </motion.div>

        <motion.h1
          className='text-2xl font-bold mb-4 text-center'
          variants={fadeUp}
        >
          Register
        </motion.h1>
        <motion.p className='mb-4 text-center' variants={fadeUp}>
          Create an account to access exclusive features.                </motion.p>
        <motion.form
          onSubmit={handleSubmit}
          className='w-full space-y-4 rounded-lg'
          variants={container}>
          <motion.div variants={fadeUp}>
            <Input
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </motion.div>
          <motion.div variants={fadeUp} className='flex gap-4 justify-center items-center pt-2'>
            <span>Already have an account?</span>
            <Link className='ml-2 text-primary cursor-pointer underline' href="/login">Login</Link>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Button type="submit" disabled={loading} className='w-full'>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </motion.div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </motion.form>
        <motion.div variants={fadeUp}>
          <Button
            onClick={() => loginWithGoogle()}
            variant="outline"
            className='w-full mt-4 cursor-pointer'
          >
            <FaGoogle className="mr-2" />
            Continue with Google
          </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default RegisterForm
