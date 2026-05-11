'use client'
import React from 'react'
import Navbar from './Navbar'

interface Props {
  title: string
  children: React.ReactNode
}

const InnerPage = React.memo(({ title, children }: Props) => {
  return (
    <>
      <Navbar />
      <main style={{
        minHeight: '100vh',
        backgroundColor: '#F0EDE4',
        paddingTop: '8.4rem',
        paddingLeft: '3.6rem',
        paddingRight: '3.6rem',
        paddingBottom: '4.8rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Top-left green accent circle */}
        <div style={{
          position: 'absolute',
          top: -1, left: -1,
          width: 408, height: 288,
          backgroundColor: '#00834c',
          borderBottomRightRadius: '9999px',
          zIndex: 0,
        }}/>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 960 }}>
          <h1 style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
            fontWeight: 700,
            color: '#0d0d0d',
            marginBottom: '2.4rem',
            borderBottom: '2.4px solid #1B4332',
            paddingBottom: '1.2rem',
          }}>
            {title}
          </h1>
          {children}
        </div>

        {/* Bottom-right accent */}
        <div style={{
          position: 'absolute',
          bottom: 0, right: 0,
          width: 240, height: 240,
          backgroundColor: '#1B4332',
          borderTopLeftRadius: '9999px',
          zIndex: 0,
        }}/>
      </main>
    </>
  )
})

InnerPage.displayName = 'InnerPage'
export default InnerPage
