'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

const links = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Missão', href: '/missao' },
  { label: 'Contato', href: '/contato' },
]

const Navbar = React.memo(() => {
  const pathname = usePathname()
  const [aberto, setAberto] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {pathname === '/' && (
        <Link href="/" className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
          <Image
            src="/images/logo.png"
            alt="Logo FoodCycle"
            width={120}
            height={120}
            className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain"
          />
        </Link>
      )}

      {/* Botão mobile */}
      <button
        onClick={() => setAberto(!aberto)}
        className="md:hidden absolute top-4 right-4 z-20 bg-[#F0EDE4] rounded-full p-3 shadow-md"
        aria-label="Abrir menu"
      >
        {aberto ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Menu desktop */}
      <nav className="hidden md:flex absolute top-5 right-6 items-center gap-8 px-8 py-4 bg-[#F0EDE4] rounded-full shadow-sm">
        {links.map(({ label, href }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`font-mono text-lg transition-colors relative ${
                active ? 'text-[#1B4332] font-bold' : 'text-[#111] hover:text-[#1B4332]'
              }`}
            >
              {label}
              {active && (
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#1B4332] rounded" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Menu mobile (overlay) */}
      {aberto && (
        <nav className="md:hidden fixed inset-0 bg-[#F0EDE4] flex flex-col items-center justify-center gap-8 z-10">
          {links.map(({ label, href }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setAberto(false)}
                className={`font-mono text-3xl ${active ? 'text-[#1B4332] font-bold' : 'text-[#111]'}`}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
})

Navbar.displayName = 'Navbar'
export default Navbar