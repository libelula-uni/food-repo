'use client'
import React from 'react'

export default function AuthCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F0EDE4' }}>
      <header style={{ backgroundColor: '#1B4332', padding: '1rem 2rem' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#F0EDE4' }} />
      </header>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
        <div
          style={{
            width: 360,
            border: '1px solid #1B4332',
            borderRadius: 12,
            padding: '2rem',
            backgroundColor: '#F0EDE4',
          }}
        >
          <h1
            style={{
              fontFamily: "'Space Mono', monospace",
              textAlign: 'center',
              fontSize: '1.8rem',
              marginBottom: '1.5rem',
            }}
          >
            {title}
          </h1>
          {children}
        </div>
      </div>
    </div>
  )
}

export const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.7rem 1rem',
  marginBottom: '0.8rem',
  border: '1px solid #1B4332',
  borderRadius: 6,
  backgroundColor: 'transparent',
  fontFamily: "'Space Mono', monospace",
}

export const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.8rem',
  backgroundColor: '#1B4332',
  color: '#F0EDE4',
  border: 'none',
  borderRadius: 6,
  fontFamily: "'Space Mono', monospace",
  fontSize: '1rem',
  cursor: 'pointer',
  marginTop: '0.5rem',
}