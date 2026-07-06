'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import TopNav from '../_components/TopNav'
import { useStore } from '../_lib/store'
import { formatCNPJ } from '../_lib/validation'

export default function PerfilPage() {
  const { currentUser, updateUser, logout, loading } = useStore()
  const router = useRouter()

  const [novaSenha, setNovaSenha] = useState('')
  const [repetirSenha, setRepetirSenha] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [editando, setEditando] = useState(false)
  const [salvo, setSalvo] = useState(false)
  const [erros, setErros] = useState<string[]>([])
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/run/login')
    }
    if (currentUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCnpj(formatCNPJ(currentUser.cnpj))
    }
  }, [loading, currentUser, router])

  if (loading || !currentUser) return null

  async function handleSalvar() {
    if (salvando) return
    setSalvando(true)
    setErros([])

    const resultado = await updateUser({
      cnpj,
      senha: novaSenha || undefined,
      repetirSenha: novaSenha ? repetirSenha : undefined,
    })

    if (resultado.valid) {
      setEditando(false)
      setSalvo(true)
      setNovaSenha('')
      setRepetirSenha('')
      setTimeout(() => setSalvo(false), 2000)
    } else {
      setErros(resultado.errors)
    }
    setSalvando(false)
  }

  function handleCancelar() {
    setEditando(false)
    setErros([])
    setNovaSenha('')
    setRepetirSenha('')
    if (currentUser) setCnpj(formatCNPJ(currentUser.cnpj))
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
            onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
            style={fieldStyle}
          />

          {editando && (
            <>
              <label style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', color: '#555' }}>
                Nova senha <span style={{ color: '#999' }}>(deixe em branco para manter a atual)</span>
              </label>
              <input
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                autoComplete="new-password"
                maxLength={72}
                style={fieldStyle}
              />
              {novaSenha && (
                <>
                  <label style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', color: '#555' }}>
                    Repita a nova senha
                  </label>
                  <input
                    type="password"
                    value={repetirSenha}
                    onChange={(e) => setRepetirSenha(e.target.value)}
                    autoComplete="new-password"
                    maxLength={72}
                    style={fieldStyle}
                  />
                </>
              )}
            </>
          )}

          {!editando && (
            <>
              <label style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', color: '#555' }}>Senha</label>
              <input value="••••••••" disabled style={{ ...fieldStyle, backgroundColor: '#e9e6dd' }} />
            </>
          )}

          {erros.length > 0 && (
            <div style={{ marginBottom: '0.5rem' }}>
              {erros.map((e, i) => (
                <p key={i} style={{ color: '#b3261e', fontFamily: "'Space Mono', monospace", fontSize: '0.85rem', margin: '0.2rem 0' }}>
                  {e}
                </p>
              ))}
            </div>
          )}

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
              <>
                <button onClick={handleSalvar} disabled={salvando} style={{ ...btnPrimario, opacity: salvando ? 0.7 : 1 }}>
                  {salvando ? 'Salvando...' : 'Salvar'}
                </button>
                <button onClick={handleCancelar} style={btnSecundario}>
                  Cancelar
                </button>
              </>
            )}
            {!editando && (
              <button onClick={handleLogout} style={btnSecundario}>
                Sair
              </button>
            )}
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
