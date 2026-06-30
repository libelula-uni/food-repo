'use client'
import { useParams, useRouter } from 'next/navigation'
import TopNav from '../../_components/TopNav'
import { useStore } from '../../_lib/store'

export default function AlimentoDetalhe() {
  const { id } = useParams<{ id: string }>()
  const { foods, addDesejo } = useStore()
  const router = useRouter()
  const food = foods.find((f) => f.id === id)

  if (!food) return <p style={{ padding: '2rem' }}>Alimento não encontrado.</p>

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F0EDE4' }}>
      <TopNav />
      <div style={{ display: 'flex', gap: '3rem', padding: '2rem' }}>
        <div
          style={{
            width: 280,
            height: 280,
            backgroundColor: '#ccc',
            borderRadius: 12,
            backgroundImage: food.imagem ? `url(${food.imagem})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div style={{ fontFamily: "'Space Mono', monospace" }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{food.nome}</h1>
          <p>Distribuidora: {food.distribuidora}</p>
          <p>Quantidade: {food.quantidade}</p>
          <p>Prazo de retirada: {food.dia}/{food.mes}/{food.ano}</p>
          <button
            onClick={() => {
              addDesejo(food.id)
              router.push('/run')
            }}
            style={{
              marginTop: '1.5rem',
              padding: '0.8rem 1.5rem',
              backgroundColor: '#1B4332',
              color: '#F0EDE4',
              border: 'none',
              borderRadius: 6,
              fontFamily: "'Space Mono', monospace",
              cursor: 'pointer',
            }}
          >
            Solicitar Reserva
          </button>
        </div>
      </div>
    </div>
  )
}