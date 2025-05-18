'use client'

import { useEffect, useState } from 'react'
import useAuthStore from '@/store/useAuthStore'
import { RegisterFormData, LoginFormData } from '@/types/auth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/theme-togle'
import { useRouter } from 'next/navigation'
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import { auth } from '@/lib/auth'
import { authClient } from '@/lib/auth-client'
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
};

const LoginForm = () => {
  const router = useRouter()
  const { loginUser, loginWithGoogle, loading, error } = useAuthStore()
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const loginResult = await loginUser(formData);
    if (loginResult === "success") {
      const { data: session } = await authClient.getSession()
      if(session){
      router.push('/dashboard')
      }
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
        variants={container}
      >
        <motion.div className='fixed top-0 right-0 p-8' variants={fadeUp}>
          <ModeToggle />
        </motion.div>

        <motion.h1
          className='text-2xl font-bold mb-4 text-center'
          variants={fadeUp}
        >
          Login
        </motion.h1>

        <motion.p className='mb-4 text-center' variants={fadeUp}>
          Login to your account
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className='w-full space-y-4 rounded-lg'
          variants={container}
        >
          <motion.div variants={fadeUp}>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className='w-full'
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
              className='w-full'
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <Button type="submit" disabled={loading} className='w-full cursor-pointer'>
              {loading ? 'Login...' : 'Login'}
            </Button>
          </motion.div>

          {error && (
            <motion.p variants={fadeUp} style={{ color: 'red' }}>
              {error}
            </motion.p>
          )}
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

export default LoginForm
