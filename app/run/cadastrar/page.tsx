'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TopNav from '../_components/TopNav'
import { useStore } from '../_lib/store'

export default function CadastrarAlimento() {
  const { addFood } = useStore()
  const router = useRouter()
  const [nome, setNome] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [dia, setDia] = useState('')
  const [mes, setMes] = useState('')
  const [ano, setAno] = useState('')
  const [imagem, setImagem] = useState<string | null>(null)

  function handleImagem(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImagem(reader.result as string)
    reader.readAsDataURL(file)
  }

  function handleCadastrar() {
    addFood({ nome, distribuidora: 'Minha Empresa', quantidade, dia, mes, ano, imagem })
    router.push('/runw')
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
              <input style={inputStyle} placeholder="Nome do Alimento" value={nome} onChange={(e) => setNome(e.target.value)} />
              <input style={inputStyle} placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.85rem' }}>Prazo de retirada</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input style={inputStyle} placeholder="Dia" value={dia} onChange={(e) => setDia(e.target.value)} />
                <input style={inputStyle} placeholder="Mês" value={mes} onChange={(e) => setMes(e.target.value)} />
                <input style={inputStyle} placeholder="Ano" value={ano} onChange={(e) => setAno(e.target.value)} />
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
              {!imagem && <span style={{ fontFamily: "'Space Mono', monospace" }}>Inserir imagem</span>}
              <input type="file" accept="image/*" onChange={handleImagem} style={{ display: 'none' }} />
            </label>
          </div>
          <button
            onClick={handleCadastrar}
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
            }}
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  )
}