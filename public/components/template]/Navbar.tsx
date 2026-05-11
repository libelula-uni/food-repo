'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Image from 'next/image'

const links = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Missão', href: '/missao' },
  { label: 'Contato', href: '/contato' },
]

const Navbar = React.memo(() => {
  const pathname = usePathname()

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      {/* Logo somente na home */}
      {pathname === '/' && (
        <Link
          href="/"
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            pointerEvents: 'auto',
          }}
        >
          <Image
            src="/images/logo.png"
            alt="FoodCycle logo"
            width={300}
            height={300}
          />
        </Link>
      )}

      {/* Navbar */}
      <nav
        style={{
          position: 'absolute',
          top: '1.32rem',
          right: '1.8rem',
          display: 'flex',
          alignItems: 'center',
          gap: '2.64rem',
          padding: '1.08rem 2.4rem',
          backgroundColor: '#F0EDE4',
          pointerEvents: 'auto',
        }}
      >
        {links.map(({ label, href }) => {
          const active = pathname === href

          return (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '1.9rem',
                fontWeight: active ? 700 : 400,
                color: active ? '#1B4332' : '#111',
                letterSpacing: '0.02em',
                transition: 'color 0.2s',
                position: 'relative',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  '#1B4332')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  active ? '#1B4332' : '#111')
              }
            >
              {label}

              {active && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: -4,
                    left: 0,
                    right: 0,
                    height: 4,
                    backgroundColor: '#1B4332',
                    borderRadius: 2,
                  }}
                />
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