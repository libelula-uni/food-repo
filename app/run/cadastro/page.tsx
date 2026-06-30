'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthCard, { inputStyle, buttonStyle } from '../_components/AuthCard'
import { useStore } from '../_lib/store'

export default function CadastroPage() {
  const { register } = useStore()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [repetir, setRepetir] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [erro, setErro] = useState('')

  function handleCadastro() {
    if (senha !== repetir) return setErro('As senhas não coincidem')
    if (register({ email, senha, cnpj })) {
      router.push('/run')
    } else {
      setErro('Email já cadastrado')
    }
  }

  return (
    <AuthCard title="Cadastro">
      <input style={inputStyle} placeholder="INSIRA SEU EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input style={inputStyle} placeholder="INSIRA SUA SENHA" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      <input style={inputStyle} placeholder="REPITA SUA SENHA" type="password" value={repetir} onChange={(e) => setRepetir(e.target.value)} />
      <input style={inputStyle} placeholder="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
      {erro && <p style={{ color: '#a33', fontSize: '0.85rem' }}>{erro}</p>}
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.85rem' }}>
        <Link href="/run/login">Já tenho conta</Link>
      </p>
      <button style={buttonStyle} onClick={handleCadastro}>Cadastrar-se</button>
    </AuthCard>
  )
}