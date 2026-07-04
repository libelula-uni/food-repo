'use client'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import TopNav from '../../_components/TopNav'
import { useStore } from '../../_lib/store'

export default function AlimentoDetalhe() {
  const { id } = useParams<{ id: string }>()
  const { foods, addDesejo, currentUser } = useStore()
  const router = useRouter()
  const food = foods.find((f) => f.id === id)
  const [erro, setErro] = useState('')

  if (!food) return <p style={{ padding: '2rem', fontFamily: "'Space Mono', monospace" }}>Alimento não encontrado.</p>

  function handleReserva() {
    if (!currentUser) {
      router.push('/run/login')
      return
    }
    const resultado = addDesejo(food!.id)
    if (resultado.valid) {
      router.push('/run')
    } else {
      setErro(resultado.errors[0] ?? 'Não foi possível reservar')
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F0EDE4' }}>
      <TopNav />
      <div style={{ display: 'flex', gap: '3rem', padding: '2rem', flexWrap: 'wrap' }}>
        <div
          style={{
            width: 280,
            height: 280,
            backgroundColor: '#e3e0d8',
            borderRadius: 12,
            backgroundImage: food.imagem ? `url(${food.imagem})` : undefined,
            backgroundSize: food.imagem?.startsWith('/images/') ? 'contain' : 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div style={{ fontFamily: "'Space Mono', monospace" }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{food.nome}</h1>
          <p>Distribuidora: {food.distribuidora}</p>
          <p>Quantidade: {food.quantidade}</p>
          <p>Prazo de retirada: {food.dia}/{food.mes}/{food.ano}</p>

          {erro && (
            <p style={{ color: '#b3261e', fontSize: '0.85rem', marginTop: '0.8rem' }}>{erro}</p>
          )}

          <button
            onClick={handleReserva}
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
