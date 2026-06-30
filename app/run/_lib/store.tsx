'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'

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
export type Desejo = { id: string; foodId: string; userEmail: string; criadoEm: string }

type DB = {
  users: User[]
  foods: Food[]
  desejos: Desejo[]
}

const STORAGE_KEY = 'foodcycle-db'

type StoreType = {
  users: User[]
  currentUser: User | null
  foods: Food[]
  desejos: Desejo[]
  register: (u: User) => boolean
  login: (email: string, senha: string) => boolean
  logout: () => void
  addFood: (f: Omit<Food, 'id'>) => void
  addDesejo: (foodId: string) => void
  updateUser: (dados: Partial<Omit<User, 'email'>>) => void
  loading: boolean
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

function loadDB(): DB {
  if (typeof window === 'undefined') {
    return { users: [], foods: seedFoods, desejos: [] }
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const initial: DB = { users: [], foods: seedFoods, desejos: [] }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
      return initial
    }
    return JSON.parse(raw) as DB
  } catch {
    return { users: [], foods: seedFoods, desejos: [] }
  }
}

function saveDB(db: DB) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [foods, setFoods] = useState<Food[]>(seedFoods)
  const [desejos, setDesejos] = useState<Desejo[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const db = loadDB()
    setUsers(db.users)
    setFoods(db.foods)
    setDesejos(db.desejos)

    const savedSession = window.localStorage.getItem('foodcycle-session')
    if (savedSession) {
      const u = db.users.find((x) => x.email === savedSession)
      if (u) setCurrentUser(u)
    }
    setLoading(false)
  }, [])

  function persist(next: Partial<DB>) {
    const db: DB = {
      users: next.users ?? users,
      foods: next.foods ?? foods,
      desejos: next.desejos ?? desejos,
    }
    saveDB(db)
  }

  const register = (u: User) => {
    if (users.some((x) => x.email === u.email)) return false
    const nextUsers = [...users, u]
    setUsers(nextUsers)
    setCurrentUser(u)
    persist({ users: nextUsers })
    window.localStorage.setItem('foodcycle-session', u.email)
    return true
  }

  const login = (email: string, senha: string) => {
    const found = users.find((u) => u.email === email && u.senha === senha)
    if (!found) return false
    setCurrentUser(found)
    window.localStorage.setItem('foodcycle-session', found.email)
    return true
  }

  const logout = () => {
    setCurrentUser(null)
    window.localStorage.removeItem('foodcycle-session')
  }

  const addFood = (f: Omit<Food, 'id'>) => {
    const nextFoods = [...foods, { ...f, id: `food-${Date.now()}` }]
    setFoods(nextFoods)
    persist({ foods: nextFoods })
  }

  const addDesejo = (foodId: string) => {
    const novo: Desejo = {
      id: `desejo-${Date.now()}`,
      foodId,
      userEmail: currentUser?.email ?? 'anonimo',
      criadoEm: new Date().toISOString(),
    }
    const nextDesejos = [...desejos, novo]
    setDesejos(nextDesejos)
    persist({ desejos: nextDesejos })
  }

  const updateUser = (dados: Partial<Omit<User, 'email'>>) => {
    if (!currentUser) return
    const atualizado = { ...currentUser, ...dados }
    const nextUsers = users.map((u) => (u.email === currentUser.email ? atualizado : u))
    setUsers(nextUsers)
    setCurrentUser(atualizado)
    persist({ users: nextUsers })
  }

  return (
    <Store.Provider
      value={{ users, currentUser, foods, desejos, register, login, logout, addFood, addDesejo, updateUser, loading }}
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