'use client'
import React from 'react'
import Link from 'next/link'

const Hero = React.memo(() => {
  return (
    <section className="relative w-full min-h-screen bg-[#F0EDE4] overflow-hidden">
      <div className="absolute -top-1 -left-1 w-48 h-32 sm:w-80 sm:h-56 md:w-[500px] md:h-80 bg-[#1B4332] rounded-br-full" />

      <div className="absolute top-[32%] sm:top-[38%] left-6 sm:left-12 z-10 max-w-[90%] sm:max-w-[600px]">
        <h1 className="font-mono text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#0d0d0d] leading-none">
          FoodCycle
        </h1>
        <p className="font-mono text-sm sm:text-base md:text-lg text-[#444] mt-6 tracking-wide leading-relaxed">
          Conectamos estabelecimentos com excedente de alimentos a quem
          precisa, antes que vire desperdício.
        </p>
      </div>

      <Link
        href="/run/login"
        className="absolute bottom-0 right-0 w-full sm:w-[60%] md:w-[52%] h-[45%] sm:h-[50%] bg-[#1B4332] hover:bg-[#163d2b] sm:rounded-tl-full flex flex-col items-center justify-center gap-6 cursor-pointer no-underline transition-colors"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-wide text-center leading-tight px-4">
          Começa Agora
        </h2>
        <div className="w-24 sm:w-28 h-1 bg-[#F0EDE4] rounded-full" />
      </Link>
    </section>
  )
})

Hero.displayName = 'Hero'
export default Hero