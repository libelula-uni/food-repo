'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TopNav from '../_components/TopNav'
import { useStore } from '../_lib/store'
import { validateImageFile } from '../_lib/validation'

export default function CadastrarAlimento() {
  const { addFood } = useStore()
  const router = useRouter()
  const [nome, setNome] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [dia, setDia] = useState('')
  const [mes, setMes] = useState('')
  const [ano, setAno] = useState('')
  const [imagem, setImagem] = useState<string | null>(null)
  const [erros, setErros] = useState<string[]>([])
  const [enviando, setEnviando] = useState(false)

  function handleImagem(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const check = validateImageFile(file)
    if (!check.valid) {
      setErros(check.errors)
      e.target.value = ''
      return
    }

    setErros([])
    const reader = new FileReader()
    reader.onload = () => setImagem(reader.result as string)
    reader.onerror = () => setErros(['Não foi possível ler a imagem selecionada'])
    reader.readAsDataURL(file)
  }

  function handleCadastrar() {
    if (enviando) return
    setEnviando(true)
    const resultado = addFood({ nome, quantidade, dia, mes, ano, imagem })

    if (resultado.valid) {
      router.push('/run')
    } else {
      setErros(resultado.errors)
      setEnviando(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.6rem 1rem',
    marginBottom: '0.8rem',
    border: '1px solid #1B4332',
    borderRadius: 6,
    fontFamily: "'Space Mono', monospace",
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F0EDE4' }}>
      <TopNav />
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem' }}>
        <div style={{ border: '1px solid #1B4332', borderRadius: 12, padding: '2rem', width: 600 }}>
          <h1 style={{ fontFamily: "'Space Mono', monospace", marginBottom: '1.5rem' }}>Cadastrar Alimento</h1>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ flex: 1 }}>
              <input
                style={inputStyle}
                placeholder="Nome do Alimento"
                value={nome}
                maxLength={80}
                onChange={(e) => setNome(e.target.value)}
              />
              <input
                style={inputStyle}
                placeholder="Quantidade (ex: 10kg, 15 unidades)"
                value={quantidade}
                maxLength={30}
                onChange={(e) => setQuantidade(e.target.value)}
              />
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.85rem' }}>Prazo de retirada</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  style={inputStyle}
                  placeholder="Dia"
                  value={dia}
                  maxLength={2}
                  inputMode="numeric"
                  onChange={(e) => setDia(e.target.value.replace(/\D/g, ''))}
                />
                <input
                  style={inputStyle}
                  placeholder="Mês"
                  value={mes}
                  maxLength={2}
                  inputMode="numeric"
                  onChange={(e) => setMes(e.target.value.replace(/\D/g, ''))}
                />
                <input
                  style={inputStyle}
                  placeholder="Ano"
                  value={ano}
                  maxLength={4}
                  inputMode="numeric"
                  onChange={(e) => setAno(e.target.value.replace(/\D/g, ''))}
                />
              </div>
            </div>
            <label
              style={{
                flex: 1,
                border: '1px dashed #999',
                borderRadius: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: imagem ? 'transparent' : '#f3f1ec',
                backgroundImage: imagem ? `url(${imagem})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 160,
              }}
            >
              {!imagem && (
                <span style={{ fontFamily: "'Space Mono', monospace", textAlign: 'center', padding: '0 1rem', fontSize: '0.85rem' }}>
                  Inserir imagem
                  <br />
                  <span style={{ fontSize: '0.7rem', color: '#777' }}>JPG, PNG, WEBP ou GIF — até 3MB</span>
                </span>
              )}
              <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleImagem} style={{ display: 'none' }} />
            </label>
          </div>

          {erros.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              {erros.map((e, i) => (
                <p key={i} style={{ color: '#b3261e', fontSize: '0.85rem', fontFamily: "'Space Mono', monospace", margin: '0.2rem 0' }}>
                  {e}
                </p>
              ))}
            </div>
          )}

          <button
            onClick={handleCadastrar}
            disabled={enviando}
            style={{
              width: '100%',
              marginTop: '1.5rem',
              padding: '0.8rem',
              backgroundColor: '#1B4332',
              color: '#F0EDE4',
              border: 'none',
              borderRadius: 6,
              fontFamily: "'Space Mono', monospace",
              cursor: 'pointer',
              opacity: enviando ? 0.7 : 1,
            }}
          >
            {enviando ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </div>
      </div>
    </div>
  )
}
