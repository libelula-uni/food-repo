'use client'
import React from 'react'

const Hero = React.memo(() => {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      minHeight: 720,
      backgroundColor: '#F0EDE4',
      overflow: 'hidden',
    }}>

      {/* ── Top-left green quarter-circle (behind logo) ── */}
      <div style={{
        position: 'absolute',
        top: -1,
        left: -1,
        width: 408,
        height: 288,
        backgroundColor: '#1B4332',
        borderBottomRightRadius: '9999px',
      }}/>

      {/* ── Brand name ── */}
      <div style={{
        position: 'absolute',
        top: '38%',
        left: '3rem',
      }}>
        <h1 style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 'clamp(3.36rem, 8.4vw, 6.24rem)',
          fontWeight: 400,
          color: '#0d0d0d',
          letterSpacing: '-0.01em',
          lineHeight: 1,
        }}>
          FoodCycle
        </h1>

        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 'clamp(0.9rem, 1.44vw, 1.14rem)',
          color: '#444',
          marginTop: '1.44rem',
          letterSpacing: '0.04em',
        }}>
          Reduzindo o desperdício,<br/>alimentando comunidades.
        </p>
      </div>

      {/* ── Bottom-right dark green blob (top-left rounded) ── */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '52%',
        height: '50%',
        backgroundColor: '#1B4332',
        borderTopLeftRadius: '9999px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.44rem',
        cursor: 'pointer',
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#163d2b'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#1B4332'}
      >
        <h2 style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 'clamp(2.16rem, 4.8vw, 3.84rem)',
          fontWeight: 700,
          color: '#F0EDE4',
          letterSpacing: '0.05em',
          textAlign: 'center',
          lineHeight: 1.1,
        }}>
          Começa Agora
        </h2>

        {/* Arrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.48rem' }}>
          <div style={{
            width: 108,
            height: 4,
            backgroundColor: '#F0EDE4',
            borderRadius: 2,
          }}/>
          <svg width="36" height="36" viewBox="0 0 30 30" fill="none">
            <path d="M5 15H25M25 15L16 6M25 15L16 24"
              stroke="#F0EDE4" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <a href="/sobre" style={{
          position: 'absolute',
          inset: 0,
          borderTopLeftRadius: '9999px',
        }} aria-label="Começa Agora"/>
      </div>
    </section>
  )
})

Hero.displayName = 'Hero'
export default Hero
