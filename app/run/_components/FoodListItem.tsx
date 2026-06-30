'use client'
import Link from 'next/link'
import { Food } from '../_lib/store'

export default function FoodListItem({ food }: { food: Food }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#e3e0d8',
        borderRadius: 10,
        padding: '0.6rem 1rem',
        marginBottom: '0.6rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: 50, height: 50, borderRadius: '50%', backgroundColor: '#fff', overflow: 'hidden' }}>
          {food.imagem && <img src={food.imagem} alt={food.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        </div>
        <div style={{ fontFamily: "'Space Mono', monospace" }}>
          <div>{food.nome}</div>
          <div style={{ fontSize: '0.85rem', color: '#555' }}>{food.distribuidora}</div>
        </div>
      </div>
      <Link href={`/run/lista/${food.id}`} style={{ color: '#1B4332', fontFamily: "'Space Mono', monospace" }}>
        Informações ›
      </Link>
    </div>
  )
}