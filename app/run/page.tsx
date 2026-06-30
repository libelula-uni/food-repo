'use client'
import { useState } from 'react'
import TopNav from './_components/TopNav'
import FoodListItem from './_components/FoodListItem'
import { useStore } from './_lib/store'

export default function AppHome() {
  const { foods, desejos, currentUser, loading } = useStore()
  const [busca, setBusca] = useState('')
  const [aba, setAba] = useState<'alimentos' | 'desejos'>('alimentos')

  if (loading) return null

  const filtrados = foods.filter(
    (f) =>
      f.nome.toLowerCase().includes(busca.toLowerCase()) ||
      f.distribuidora.toLowerCase().includes(busca.toLowerCase())
  )

  const meusDesejos = desejos
    .filter((d) => d.userEmail === currentUser?.email)
    .map((d) => foods.find((f) => f.id === d.foodId))
    .filter(Boolean)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F0EDE4' }}>
      <TopNav />
      <div style={{ padding: '1.5rem 2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <TabButton label="Alimentos" active={aba === 'alimentos'} onClick={() => setAba('alimentos')} />
          <TabButton label={`Desejos (${meusDesejos.length})`} active={aba === 'desejos'} onClick={() => setAba('desejos')} />
        </div>

        {aba === 'alimentos' && (
          <>
            <input
              placeholder="Buscar Alimento"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem 1.2rem',
                borderRadius: 30,
                border: '1px solid #1B4332',
                marginBottom: '1.5rem',
                fontFamily: "'Space Mono', monospace",
              }}
            />
            {filtrados.length === 0 && (
              <p style={{ fontFamily: "'Space Mono', monospace" }}>Nenhum alimento encontrado.</p>
            )}
            {filtrados.map((f) => (
              <FoodListItem key={f.id} food={f} />
            ))}
          </>
        )}

        {aba === 'desejos' && (
          <>
            {meusDesejos.length === 0 && (
              <p style={{ fontFamily: "'Space Mono', monospace" }}>Você ainda não solicitou nenhum alimento.</p>
            )}
            {meusDesejos.map((f) => f && <FoodListItem key={f.id} food={f} />)}
          </>
        )}
      </div>
    </div>
  )
}

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.6rem 1.4rem',
        borderRadius: 20,
        border: '1px solid #1B4332',
        backgroundColor: active ? '#1B4332' : 'transparent',
        color: active ? '#F0EDE4' : '#1B4332',
        fontFamily: "'Space Mono', monospace",
        fontWeight: active ? 700 : 400,
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  )
}