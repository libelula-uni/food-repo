'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import TopNav from '../_components/TopNav'
import { useStore } from '../_lib/store'

export default function PerfilPage() {
  const { currentUser, updateUser, logout, loading } = useStore()
  const router = useRouter()

  const [senha, setSenha] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [editando, setEditando] = useState(false)
  const [salvo, setSalvo] = useState(false)

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/run/login')
    }
    if (currentUser) {
      setSenha(currentUser.senha)
      setCnpj(currentUser.cnpj)
    }
  }, [loading, currentUser, router])

  if (loading || !currentUser) return null

  function handleSalvar() {
    updateUser({ senha, cnpj })
    setEditando(false)
    setSalvo(true)
    setTimeout(() => setSalvo(false), 2000)
  }

  function handleLogout() {
    logout()
    router.push('/run/login')
  }

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.7rem 1rem',
    marginBottom: '0.8rem',
    border: '1px solid #1B4332',
    borderRadius: 8,
    fontFamily: "'Space Mono', monospace",
    backgroundColor: editando ? '#fff' : '#e9e6dd',
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F0EDE4' }}>
      <TopNav />
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '3rem' }}>
        <div
          style={{
            width: 420,
            border: '1px solid #1B4332',
            borderRadius: 16,
            padding: '2rem',
            backgroundColor: '#fff',
          }}
        >
          <h1 style={{ fontFamily: "'Space Mono', monospace", marginBottom: '1.5rem', color: '#1B4332' }}>
            Meu Perfil
          </h1>

          <label style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', color: '#555' }}>Email</label>
          <input value={currentUser.email} disabled style={{ ...fieldStyle, backgroundColor: '#e9e6dd' }} />

          <label style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', color: '#555' }}>CNPJ</label>
          <input
            value={cnpj}
            disabled={!editando}
            onChange={(e) => setCnpj(e.target.value)}
            style={fieldStyle}
          />

          <label style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', color: '#555' }}>Senha</label>
          <input
            type="password"
            value={senha}
            disabled={!editando}
            onChange={(e) => setSenha(e.target.value)}
            style={fieldStyle}
          />

          {salvo && (
            <p style={{ color: '#1B4332', fontFamily: "'Space Mono', monospace", fontSize: '0.85rem' }}>
              Dados atualizados!
            </p>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            {!editando ? (
              <button onClick={() => setEditando(true)} style={btnPrimario}>
                Editar
              </button>
            ) : (
              <button onClick={handleSalvar} style={btnPrimario}>
                Salvar
              </button>
            )}
            <button onClick={handleLogout} style={btnSecundario}>
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const btnPrimario: React.CSSProperties = {
  flex: 1,
  padding: '0.7rem',
  backgroundColor: '#1B4332',
  color: '#F0EDE4',
  border: 'none',
  borderRadius: 8,
  fontFamily: "'Space Mono', monospace",
  cursor: 'pointer',
}

const btnSecundario: React.CSSProperties = {
  flex: 1,
  padding: '0.7rem',
  backgroundColor: 'transparent',
  color: '#b3261e',
  border: '1px solid #b3261e',
  borderRadius: 8,
  fontFamily: "'Space Mono', monospace",
  cursor: 'pointer',
}