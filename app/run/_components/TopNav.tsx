'use client'
import Link from 'next/link'
import { FaHome, FaPlus, FaSearch, FaBars } from 'react-icons/fa'

export default function TopNav() {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        padding: '1rem 2rem',
        backgroundColor: '#1B4332',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: '#F0EDE4',
        }}
      />
      <div style={{ display: 'flex', gap: '2.5rem', marginLeft: 'auto', color: '#F0EDE4' }}>
        <Link href="/run" style={{ color: 'inherit' }}><FaHome size={22} /></Link>
        <Link href="/run/cadastrar" style={{ color: 'inherit' }}><FaPlus size={22} /></Link>
        <Link href="/run" style={{ color: 'inherit' }}><FaSearch size={22} /></Link>
        <Link href="/run/solicitacoes" style={{ color: 'inherit' }}><FaBars size={22} /></Link>
      </div>
    </header>
  )
}