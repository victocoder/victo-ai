'use client'

import { useEffect, useState } from 'react'
import useAuthStore from '@/store/useAuthStore'
import { RegisterFormData } from '@/types/auth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/theme-togle'
import { useRouter } from 'next/navigation'

const RegisterForm = () => {
  const router = useRouter()
  const { registerUser, loading, error } = useAuthStore()
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
  //  if(loginResult === "success"){
  //   router.push('/')
  //  }

  }
 
  return (
    <section className='flex flex-col items-center justify-center min-h-screen'>
      <div className='shadow-lg p-6  rounded-lg'>
        <div className='flex gap-4 justify-between'>
          <h1 className='text-2xl font-bold mb-4'>Register</h1> <ModeToggle />
        </div>
      <p className='mb-4'>Create an account to access exclusive features.</p>
      <form onSubmit={handleSubmit} className='w-full max-w-sm space-y-2  p-4 rounded-lg'>
        <Input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" disabled={loading} className='w-full'>
          {loading ? 'Registering...' : 'Register'}
        </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      </div>
    </section>
  )
}

export default RegisterForm
