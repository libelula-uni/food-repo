'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaEnvelope, FaLock, FaBuilding } from 'react-icons/fa'
import { useStore } from '../_lib/store'
import { formatCNPJ } from '../_lib/validation'

export default function CadastroPage() {
  const { register } = useStore()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [repetir, setRepetir] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [erros, setErros] = useState<string[]>([])
  const [enviando, setEnviando] = useState(false)

  async function handleCadastro() {
    if (enviando) return
    setEnviando(true)
    setErros([])

    const resultado = await register({ email, senha, repetirSenha: repetir, cnpj })

    if (resultado.valid) {
      router.push('/run')
    } else {
      setErros(resultado.errors)
      setEnviando(false)
    }
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
          Crie sua conta
        </p>

        <Field icon={<FaEnvelope />} placeholder="Email" value={email} onChange={setEmail} />
        <Field icon={<FaLock />} placeholder="Senha" type="password" value={senha} onChange={setSenha} />
        <Field icon={<FaLock />} placeholder="Repita a senha" type="password" value={repetir} onChange={setRepetir} />
        <Field
          icon={<FaBuilding />}
          placeholder="CNPJ"
          value={cnpj}
          onChange={(v) => setCnpj(formatCNPJ(v))}
        />
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.72rem', color: '#777', marginTop: '-0.6rem', marginBottom: '1rem' }}>
          A senha deve ter no mínimo 8 caracteres, com letras e números.
        </p>

        {erros.length > 0 && (
          <div style={{ marginBottom: '0.5rem' }}>
            {erros.map((e, i) => (
              <p key={i} style={{ color: '#b3261e', fontSize: '0.85rem', fontFamily: "'Space Mono', monospace", margin: '0.2rem 0' }}>
                {e}
              </p>
            ))}
          </div>
        )}

        <button onClick={handleCadastro} disabled={enviando} style={{ ...buttonStyle, opacity: enviando ? 0.7 : 1 }}>
          {enviando ? 'Criando conta...' : 'Cadastrar-se'}
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
          <Link href="/run/login" style={{ color: '#1B4332', fontWeight: 700 }}>
            Já tenho conta — Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}

function Field({
  icon,
  placeholder,
  value,
  onChange,
  type = 'text',
}: {
  icon: React.ReactNode
  placeholder: string
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <div style={{ position: 'relative', marginBottom: '1rem' }}>
      <span style={{ position: 'absolute', left: 14, top: 14, color: '#1B4332' }}>{icon}</span>
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={type === 'password' ? 72 : 254}
        autoComplete={type === 'password' ? 'new-password' : 'email'}
        style={{
          width: '100%',
          padding: '0.85rem 1rem 0.85rem 2.6rem',
          borderRadius: 12,
          border: '1px solid #cfc9b8',
          backgroundColor: '#fff',
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.95rem',
          outline: 'none',
        }}
      />
    </div>
  )
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
}
