import Services from '@/components/custom/Services'
import Head from 'next/head'
import React from 'react'

const page = () => {

  return (
    <>
       <Head>
        <title>Your Business Name | Services</title>
        <meta name="description" content="Explore our wide range of services designed to meet your needs." />
      </Head>
      <main>
        <Services />
      </main>
    </>
  )
}

export default page
