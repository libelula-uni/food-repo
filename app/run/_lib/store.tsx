'use client'
import React, { createContext, useContext, useState } from 'react'

export type Food = {
  id: string
  nome: string
  distribuidora: string
  quantidade: string
  dia: string
  mes: string
  ano: string
  imagem: string | null
}

export type User = { email: string; senha: string; cnpj: string }
export type Solicitacao = { id: string; foodId: string }

type StoreType = {
  users: User[]
  currentUser: User | null
  foods: Food[]
  solicitacoes: Solicitacao[]
  register: (u: User) => boolean
  login: (email: string, senha: string) => boolean
  logout: () => void
  addFood: (f: Omit<Food, 'id'>) => void
  addSolicitacao: (foodId: string) => void
}

const Store = createContext<StoreType | null>(null)

const seedFoods: Food[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `seed-${i}`,
  nome: `Alimento ${(i % 3) + 1}`,
  distribuidora: `Estabelecimento ${(i % 3) + 1}`,
  quantidade: 'xx',
  dia: 'DD',
  mes: 'MM',
  ano: 'AAAA',
  imagem: null,
}))

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [foods, setFoods] = useState<Food[]>(seedFoods)
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([])

  const register = (u: User) => {
    if (users.some((x) => x.email === u.email)) return false
    setUsers((prev) => [...prev, u])
    setCurrentUser(u)
    return true
  }

  const login = (email: string, senha: string) => {
    const found = users.find((u) => u.email === email && u.senha === senha)
    if (!found) return false
    setCurrentUser(found)
    return true
  }

  const logout = () => setCurrentUser(null)

  const addFood = (f: Omit<Food, 'id'>) => {
    setFoods((prev) => [...prev, { ...f, id: `food-${Date.now()}` }])
  }

  const addSolicitacao = (foodId: string) => {
    setSolicitacoes((prev) => [...prev, { id: `sol-${Date.now()}`, foodId }])
  }

  return (
    <Store.Provider
      value={{ users, currentUser, foods, solicitacoes, register, login, logout, addFood, addSolicitacao }}
    >
      {children}
    </Store.Provider>
  )
}

export function useStore() {
  const ctx = useContext(Store)
  if (!ctx) throw new Error('useStore deve ser usado dentro de StoreProvider')
  return ctx
}