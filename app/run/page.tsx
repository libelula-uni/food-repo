'use client'
import { useState } from 'react'
import TopNav from './_components/TopNav'
import FoodListItem from './_components/FoodListItem'
import { useStore } from './_lib/store'

export default function AppHome() {
  const { foods } = useStore()
  const [busca, setBusca] = useState('')

  const filtrados = foods.filter((f) =>
    f.nome.toLowerCase().includes(busca.toLowerCase()) ||
    f.distribuidora.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F0EDE4' }}>
      <TopNav />
      <div style={{ padding: '1.5rem 2rem' }}>
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
        {filtrados.map((f) => (
          <FoodListItem key={f.id} food={f} />
        ))}
      </div>
    </div>
  )
}