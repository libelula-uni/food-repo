'use client'
import Link from 'next/link'
import { Food } from '../_lib/store'

export default function FoodListItem({ food }: { food: Food }) {
  return (
    <div className="flex items-center justify-between bg-[#e3e0d8] rounded-xl px-4 py-3 mb-3 gap-3">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white overflow-hidden flex-shrink-0">
          {food.imagem && (
            <img src={food.imagem} alt={food.nome} className="w-full h-full object-cover" />
          )}
        </div>
        <div className="font-mono min-w-0">
          <div className="truncate text-sm sm:text-base">{food.nome}</div>
          <div className="text-xs sm:text-sm text-[#555] truncate">{food.distribuidora}</div>
        </div>
      </div>
      <Link href={`/run/lista/${food.id}`} className="font-mono text-sm sm:text-base text-[#1B4332] flex-shrink-0">
        Detalhes ›
      </Link>
    </div>
  )
}