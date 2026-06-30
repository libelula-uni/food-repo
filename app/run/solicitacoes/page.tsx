'use client'
import TopNav from '../_components/TopNav'
import FoodListItem from '../_components/FoodListItem'
import { useStore } from '../_lib/store'

export default function SolicitacoesPage() {
  const { solicitacoes, foods } = useStore()
  const itens = solicitacoes
    .map((s) => foods.find((f) => f.id === s.foodId))
    .filter(Boolean)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F0EDE4' }}>
      <TopNav />
      <div style={{ padding: '1.5rem 2rem' }}>
        <h1 style={{ fontFamily: "'Space Mono', monospace", marginBottom: '1rem' }}>Solicitações</h1>
        {itens.length === 0 && <p style={{ fontFamily: "'Space Mono', monospace" }}>Nenhuma solicitação ainda.</p>}
        {itens.map((f) => f && <FoodListItem key={f.id} food={f} />)}
      </div>
    </div>
  )
}