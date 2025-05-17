'use client'

import { useEffect, useState } from 'react'
import useAuthStore from '@/store/useAuthStore'
import { RegisterFormData, LoginFormData } from '@/types/auth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/theme-togle'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const router = useRouter()
  const { loginUser, user, loading, error } = useAuthStore()
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
    console.log("loginresult", loginResult)
    if (loginResult === "success") {
      router.push('/')
    }

  }

  return (
    <section className='flex flex-col items-center justify-center min-h-screen gap-4'>
      <div className='shadow-lg p-6  rounded-lg w-full max-w-lg m-auto'>
        <div className='fixed top-0 right-0 p-8'>
          <ModeToggle />
        </div>
                  <h1 className='text-2xl font-bold mb-4 text-center'>Login</h1> 

        <p className='mb-4 text-center'>Login to your account</p>
        <form onSubmit={handleSubmit} className='w-full  space-y-4  p-4 rounded-lg '>

          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className='w-full'
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" disabled={loading} className='w-full cursor-pointer'>
            {loading ? 'Login...' : 'Login'}
          </Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </section>
  )
}

export default LoginForm
