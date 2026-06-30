'use client'
import React from 'react'
import Navbar from './Navbar'

type Props = {
  title: string
  children: React.ReactNode
}

const InnerPage = React.memo(({ title, children }: Props) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F0EDE4] pt-28 sm:pt-32 px-5 sm:px-10 md:px-16 pb-16 sm:pb-20 relative overflow-hidden">
        <div className="absolute -top-1 -left-1 w-40 h-28 sm:w-72 sm:h-48 md:w-[408px] md:h-72 bg-[#1B4332] rounded-br-full z-0" />

        <div className="relative z-10 max-w-5xl mx-auto md:mx-0">
          <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold text-[#0d0d0d] mb-8 sm:mb-10 pb-2">
            {title}
          </h1>
          {children}
        </div>
      </main>
    </>
  )
})

InnerPage.displayName = 'InnerPage'
export default InnerPage