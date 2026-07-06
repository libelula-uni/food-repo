'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { useStore } from '../_lib/store'

export default function LoginPage() {
  const { login } = useStore()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [bloqueado, setBloqueado] = useState(false)
  const [enviando, setEnviando] = useState(false)

  async function handleLogin() {
    if (enviando) return
    if (!email || !senha) {
      setErro('Preencha email e senha')
      return
    }

    setEnviando(true)
    setErro('')
    const resultado = await login(email, senha)

    if (resultado.valid) {
      router.push('/run')
      return
    }

    setBloqueado(!!resultado.locked)
    setErro(resultado.errors[0] ?? 'Não foi possível entrar')
    setEnviando(false)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          backgroundColor: '#F0EDE4',
          borderRadius: 24,
          padding: '2.5rem 2rem',
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
        }}
      >
        <h1
          style={{
            fontFamily: "'Space Mono', monospace",
            textAlign: 'center',
            fontSize: '2rem',
            color: '#1B4332',
            marginBottom: '0.4rem',
          }}
        >
          FoodCycle
        </h1>
        <p
          style={{
            textAlign: 'center',
            color: '#555',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.85rem',
            marginBottom: '2rem',
          }}
        >
          Entre na sua conta
        </p>

        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <FaEnvelope style={{ position: 'absolute', left: 14, top: 14, color: '#1B4332' }} />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            style={fieldStyle}
          />
        </div>

        <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
          <FaLock style={{ position: 'absolute', left: 14, top: 14, color: '#1B4332' }} />
          <input
            placeholder="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            autoComplete="current-password"
            maxLength={72}
            style={fieldStyle}
          />
        </div>

        {erro && (
          <p
            style={{
              color: bloqueado ? '#8a5a00' : '#b3261e',
              fontSize: '0.85rem',
              fontFamily: "'Space Mono', monospace",
              marginBottom: '0.5rem',
            }}
          >
            {erro}
          </p>
        )}

        <button onClick={handleLogin} disabled={enviando} style={{ ...buttonStyle, opacity: enviando ? 0.7 : 1 }}>
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>

        <p
          style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.85rem',
            color: '#1B4332',
          }}
        >
          <Link href="/run/cadastro" style={{ color: '#1B4332', fontWeight: 700 }}>
            Não tenho conta — Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}

const fieldStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.85rem 1rem 0.85rem 2.6rem',
  borderRadius: 12,
  border: '1px solid #cfc9b8',
  backgroundColor: '#fff',
  fontFamily: "'Space Mono', monospace",
  fontSize: '0.95rem',
  outline: 'none',
}

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.9rem',
  marginTop: '0.5rem',
  backgroundColor: '#1B4332',
  color: '#F0EDE4',
  border: 'none',
  borderRadius: 12,
  fontFamily: "'Space Mono', monospace",
  fontSize: '1rem',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'transform 0.15s ease',
}
