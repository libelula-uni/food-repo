'use client'
import Link from 'next/link'
import { FaHome, FaPlus, FaSearch, FaUser } from 'react-icons/fa'

export default function TopNav() {
  return (
    <header className="flex items-center gap-4 sm:gap-8 px-4 sm:px-8 py-3 sm:py-4 bg-[#1B4332]">
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F0EDE4]" />
      <div className="flex gap-5 sm:gap-10 ml-auto text-[#F0EDE4]">
        <Link href="/run"><FaHome size={20} /></Link>
        <Link href="/run/cadastrar"><FaPlus size={20} /></Link>
        <Link href="/run"><FaSearch size={20} /></Link>
        <Link href="/run/perfil"><FaUser size={20} /></Link>
      </div>
    </header>
  )
}