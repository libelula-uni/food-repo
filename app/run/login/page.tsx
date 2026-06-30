'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthCard, { inputStyle, buttonStyle } from '../_components/AuthCard'
import { useStore } from '../_lib/store'

export default function LoginPage() {
  const { login } = useStore()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  function handleLogin() {
    if (login(email, senha)) {
      router.push('/run')
    } else {
      setErro('Email ou senha inválidos')
    }
  }

  return (
    <AuthCard title="Login">
      <input style={inputStyle} placeholder="INSIRA SEU EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input style={inputStyle} placeholder="INSIRA SUA SENHA" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      {erro && <p style={{ color: '#a33', fontSize: '0.85rem' }}>{erro}</p>}
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.85rem' }}>
        <Link href="/run/cadastro">Não tenho conta</Link>
        <br />
        Esqueci minha senha
      </p>
      <button style={buttonStyle} onClick={handleLogin}>Login</button>
    </AuthCard>
  )
}