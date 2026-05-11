'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const links = [
  { label: 'Início',  href: '/'       },
  { label: 'Sobre',   href: '/sobre'  },
  { label: 'Missão',  href: '/missao' },
  { label: 'Contato', href: '/contato'},
]

const Navbar = React.memo(() => {
  const pathname = usePathname()

  return (
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      pointerEvents: 'none',
    }}>
      {/* ── Logo circle (top-left, bleeds off corner) ── */}
      <Link href="/" style={{
        position: 'absolute',
        top: -34,
        left: -34,
        width: 228,
        height: 228,
        borderRadius: '50%',
        backgroundColor: '#1B4332',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto',
        cursor: 'pointer',
        transition: 'opacity 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.9'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
      >
        {/* SVG Logo */}
        <svg width="115" height="115" viewBox="0 0 100 100" fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginTop: 22, marginLeft: 22 }}>
          {/* Plate */}
          <circle cx="50" cy="50" r="33" fill="#D6D3CA" stroke="#BFBDB5" strokeWidth="2.5"/>
          <circle cx="50" cy="50" r="25" fill="#CAC8BF"/>
          {/* Fork */}
          <line x1="44" y1="33" x2="44" y2="67" stroke="#6B6B6B" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="41" y1="33" x2="41" y2="43" stroke="#6B6B6B" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="47" y1="33" x2="47" y2="43" stroke="#6B6B6B" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="41" y1="43" x2="47" y2="43" stroke="#6B6B6B" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Knife */}
          <line x1="56" y1="33" x2="56" y2="67" stroke="#6B6B6B" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M56 33 Q62 40 56 49" stroke="#6B6B6B" strokeWidth="2" fill="none" strokeLinecap="round"/>
          {/* Left wheat */}
          <g transform="translate(50,50) rotate(-30) translate(-50,-50)">
            <line x1="22" y1="72" x2="22" y2="28" stroke="#C8952A" strokeWidth="1.8"/>
            <ellipse cx="19" cy="57" rx="3.5" ry="6.5" fill="#C8952A" transform="rotate(-20 19 57)"/>
            <ellipse cx="25" cy="51" rx="3.5" ry="6.5" fill="#D4A030" transform="rotate(20 25 51)"/>
            <ellipse cx="19" cy="44" rx="3.5" ry="6.5" fill="#C8952A" transform="rotate(-20 19 44)"/>
            <ellipse cx="25" cy="38" rx="3.5" ry="6.5" fill="#D4A030" transform="rotate(20 25 38)"/>
            <ellipse cx="22" cy="28" rx="3" ry="5.5" fill="#C8952A"/>
          </g>
          {/* Right wheat */}
          <g transform="translate(50,50) rotate(30) translate(-50,-50)">
            <line x1="78" y1="72" x2="78" y2="28" stroke="#C8952A" strokeWidth="1.8"/>
            <ellipse cx="75" cy="57" rx="3.5" ry="6.5" fill="#C8952A" transform="rotate(-20 75 57)"/>
            <ellipse cx="81" cy="51" rx="3.5" ry="6.5" fill="#D4A030" transform="rotate(20 81 51)"/>
            <ellipse cx="75" cy="44" rx="3.5" ry="6.5" fill="#C8952A" transform="rotate(-20 75 44)"/>
            <ellipse cx="81" cy="38" rx="3.5" ry="6.5" fill="#D4A030" transform="rotate(20 81 38)"/>
            <ellipse cx="78" cy="28" rx="3" ry="5.5" fill="#C8952A"/>
          </g>
        </svg>
      </Link>

      {/* ── Nav links (top-right, bordered box) ── */}
      <nav style={{
        position: 'absolute',
        top: '1.32rem',
        right: '1.8rem',
        display: 'flex',
        alignItems: 'center',
        gap: '2.64rem',
        padding: '1.08rem 2.4rem',
        border: '1.8px solid #1B4332',
        backgroundColor: '#F0EDE4',
        pointerEvents: 'auto',
      }}>
        {links.map(({ label, href }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '1.2rem',
              fontWeight: active ? 700 : 400,
              color: active ? '#1B4332' : '#111',
              letterSpacing: '0.02em',
              transition: 'color 0.2s',
              position: 'relative',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#1B4332'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = active ? '#1B4332' : '#111'}
            >
              {label}
              {active && (
                <span style={{
                  position: 'absolute',
                  bottom: -4,
                  left: 0, right: 0,
                  height: 2,
                  backgroundColor: '#1B4332',
                  borderRadius: 2,
                }}/>
              )}
            </Link>
          )
        })}
      </nav>
    </header>
  )
})

Navbar.displayName = 'Navbar'
export default Navbar
