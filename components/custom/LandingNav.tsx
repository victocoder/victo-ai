import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState, useRef } from 'react'
import { ModeToggle } from '../ui/theme-togle'
import { motion } from 'framer-motion'

const navVariants = {
  hidden: {
    y: -100,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
}

const LandingNav = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const prevScrollY = useRef(0)

  const handleScroll = () => {
    const currentScrollY = window.scrollY

    // Background style toggle
    setIsScrolled(currentScrollY > 50)

    // Show when scrolling up
    if (currentScrollY < prevScrollY.current) {
      setIsVisible(true)
    } else if (currentScrollY > prevScrollY.current + 0) {
      setIsVisible(false)
    }

    prevScrollY.current = currentScrollY
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className='fixed w-full pt-4 z-50'
      variants={navVariants}
      animate={isVisible ? 'visible' : 'hidden'}
      initial='visible'
    >
      <motion.div
        className={`flex gap-4 justify-between items-center w-full max-w-[1200px] m-auto py-2 px-8 transition-all duration-300 ${
          isScrolled ? 'bg-card rounded-full shadow-2xl' : 'bg-transparent'
        }`}
        layout
      >
        <Image src='/logo.png' alt='img' width={70} height={70} />

        <nav>
          <ul className='flex gap-4'>
            {['Home', 'Services', 'About', 'Contact'].map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.2, }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href='/' className='hover:text-primary dark:hover:text-primary  text-black  dark:text-white'>{item}</Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <ModeToggle />
      </motion.div>
    </motion.div>
  )
}

export default LandingNav
