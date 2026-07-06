'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  ValidationResult,
  normalizeEmail,
  sanitizeText,
  validateCNPJ,
  validateEmail,
  validateFoodName,
  validatePassword,
  validatePrazo,
  validateQuantidade,
  isValidImageDataUrl,
} from './validation'
import {
  clearFailedAttempts,
  clearSession,
  createSession,
  generateSalt,
  getLockoutRemaining,
  hashPassword,
  readSession,
  registerFailedAttempt,
  verifyPassword,
} from './auth'

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

/** A senha NUNCA é guardada em texto puro — apenas hash + salt. */
export type User = { email: string; senhaHash: string; salt: string; cnpj: string }
export type Desejo = { id: string; foodId: string; userEmail: string; criadoEm: string }

type DB = {
  users: User[]
  foods: Food[]
  desejos: Desejo[]
}

const STORAGE_KEY = 'foodcycle-db'

type AuthResult = ValidationResult & { locked?: boolean; lockoutMs?: number }

type StoreType = {
  users: User[]
  currentUser: User | null
  foods: Food[]
  desejos: Desejo[]
  register: (dados: { email: string; senha: string; repetirSenha: string; cnpj: string }) => Promise<AuthResult>
  login: (email: string, senha: string) => Promise<AuthResult>
  logout: () => void
  addFood: (f: { nome: string; quantidade: string; dia: string; mes: string; ano: string; imagem: string | null }) => ValidationResult
  addDesejo: (foodId: string) => ValidationResult
  updateUser: (dados: { senha?: string; repetirSenha?: string; cnpj?: string }) => Promise<ValidationResult>
  loading: boolean
}

const Store = createContext<StoreType | null>(null)

const seedFoods: Food[] = [
  {
    id: 'seed-1',
    nome: 'Cesta de pães artesanais',
    distribuidora: 'Padaria Pão Quente',
    quantidade: '15 unidades',
    dia: '18',
    mes: '07',
    ano: '2026',
    imagem: '/images/foods/paes.svg',
  },
  {
    id: 'seed-2',
    nome: 'Frutas frescas variadas',
    distribuidora: 'Hortifruti Vida Verde',
    quantidade: '20kg',
    dia: '10',
    mes: '07',
    ano: '2026',
    imagem: '/images/foods/frutas.svg',
  },
  {
    id: 'seed-3',
    nome: 'Verduras e legumes do dia',
    distribuidora: 'Feira Comunitária do Bairro',
    quantidade: '30kg',
    dia: '08',
    mes: '07',
    ano: '2026',
    imagem: '/images/foods/verduras.svg',
  },
  {
    id: 'seed-4',
    nome: 'Arroz e feijão a granel',
    distribuidora: 'Mercado Bom Preço',
    quantidade: '25kg',
    dia: '25',
    mes: '07',
    ano: '2026',
    imagem: '/images/foods/arroz-feijao.svg',
  },
  {
    id: 'seed-5',
    nome: 'Marmitas prontas do almoço',
    distribuidora: 'Restaurante Sabor Caseiro',
    quantidade: '40 unidades',
    dia: '05',
    mes: '07',
    ano: '2026',
    imagem: '/images/foods/marmita.svg',
  },
  {
    id: 'seed-6',
    nome: 'Leite e derivados',
    distribuidora: 'Laticínios Serra Verde',
    quantidade: '18 unidades',
    dia: '12',
    mes: '07',
    ano: '2026',
    imagem: '/images/foods/laticinios.svg',
  },
]

/** Confere se o objeto lido do localStorage realmente parece um DB válido.
 * Protege contra dados corrompidos ou adulterados manualmente pelo usuário
 * no DevTools, que poderiam quebrar a aplicação em runtime. */
function isValidDB(value: unknown): value is DB {
  if (!value || typeof value !== 'object') return false
  const v = value as Partial<DB>
  if (!Array.isArray(v.users) || !Array.isArray(v.foods) || !Array.isArray(v.desejos)) return false
  const usersOk = v.users.every(
    (u) => u && typeof u.email === 'string' && typeof u.senhaHash === 'string' && typeof u.salt === 'string'
  )
  const foodsOk = v.foods.every((f) => f && typeof f.id === 'string' && typeof f.nome === 'string')
  return usersOk && foodsOk
}

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
    const parsed = JSON.parse(raw)
    if (!isValidDB(parsed)) {
      console.warn('Dados locais corrompidos ou em formato antigo — reiniciando com dados padrão.')
      const initial: DB = { users: [], foods: seedFoods, desejos: [] }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
      return initial
    }
    return parsed
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

  // Leitura síncrona do localStorage/sessão na montagem: é um caso legítimo
  // de sincronização com um sistema externo (o navegador), não um efeito
  // derivado de outro estado React.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const db = loadDB()
    setUsers(db.users)
    setFoods(db.foods)
    setDesejos(db.desejos)

    const sessionEmail = readSession()
    if (sessionEmail) {
      const u = db.users.find((x) => x.email === sessionEmail)
      if (u) setCurrentUser(u)
      else clearSession()
    }
    setLoading(false)
  }, [])
  /* eslint-enable react-hooks/set-state-in-effect */

  function persist(next: Partial<DB>) {
    const db: DB = {
      users: next.users ?? users,
      foods: next.foods ?? foods,
      desejos: next.desejos ?? desejos,
    }
    saveDB(db)
  }

  const register = async (dados: {
    email: string
    senha: string
    repetirSenha: string
    cnpj: string
  }): Promise<AuthResult> => {
    const email = normalizeEmail(dados.email)
    const errors: string[] = []

    const emailCheck = validateEmail(email)
    if (!emailCheck.valid) errors.push(...emailCheck.errors)

    const senhaCheck = validatePassword(dados.senha)
    if (!senhaCheck.valid) errors.push(...senhaCheck.errors)

    if (dados.senha !== dados.repetirSenha) errors.push('As senhas não coincidem')

    const cnpjCheck = validateCNPJ(dados.cnpj)
    if (!cnpjCheck.valid) errors.push(...cnpjCheck.errors)

    if (errors.length) return { valid: false, errors }

    if (users.some((x) => x.email === email)) {
      return { valid: false, errors: ['Este email já está cadastrado'] }
    }

    const salt = generateSalt()
    const senhaHash = await hashPassword(dados.senha, salt)
    const cnpjLimpo = dados.cnpj.replace(/[^\d]/g, '')

    const novoUsuario: User = { email, senhaHash, salt, cnpj: cnpjLimpo }
    const nextUsers = [...users, novoUsuario]
    setUsers(nextUsers)
    setCurrentUser(novoUsuario)
    persist({ users: nextUsers })
    createSession(email)
    clearFailedAttempts(email)

    return { valid: true, errors: [] }
  }

  const login = async (rawEmail: string, senha: string): Promise<AuthResult> => {
    const email = normalizeEmail(rawEmail)

    const lockoutRemaining = getLockoutRemaining(email)
    if (lockoutRemaining > 0) {
      const segundos = Math.ceil(lockoutRemaining / 1000)
      return {
        valid: false,
        locked: true,
        lockoutMs: lockoutRemaining,
        errors: [`Muitas tentativas. Tente novamente em ${segundos}s`],
      }
    }

    if (!email || !senha) {
      return { valid: false, errors: ['Preencha email e senha'] }
    }

    const found = users.find((u) => u.email === email)
    const senhaCorreta = found ? await verifyPassword(senha, found.salt, found.senhaHash) : false

    if (!found || !senhaCorreta) {
      registerFailedAttempt(email)
      return { valid: false, errors: ['Email ou senha inválidos'] }
    }

    clearFailedAttempts(email)
    setCurrentUser(found)
    createSession(found.email)
    return { valid: true, errors: [] }
  }

  const logout = () => {
    setCurrentUser(null)
    clearSession()
  }

  const addFood = (f: {
    nome: string
    quantidade: string
    dia: string
    mes: string
    ano: string
    imagem: string | null
  }): ValidationResult => {
    if (!currentUser) return { valid: false, errors: ['Você precisa estar logado para cadastrar um alimento'] }

    const errors: string[] = []
    const nomeCheck = validateFoodName(f.nome)
    if (!nomeCheck.valid) errors.push(...nomeCheck.errors)

    const quantidadeCheck = validateQuantidade(f.quantidade)
    if (!quantidadeCheck.valid) errors.push(...quantidadeCheck.errors)

    const prazoCheck = validatePrazo(f.dia, f.mes, f.ano)
    if (!prazoCheck.valid) errors.push(...prazoCheck.errors)

    if (!isValidImageDataUrl(f.imagem)) errors.push('Imagem inválida')

    if (errors.length) return { valid: false, errors }

    const novoAlimento: Food = {
      id: `food-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      nome: sanitizeText(f.nome, 80),
      distribuidora: sanitizeText(currentUser.email.split('@')[0], 60) || 'Estabelecimento',
      quantidade: sanitizeText(f.quantidade, 30),
      dia: f.dia.padStart(2, '0'),
      mes: f.mes.padStart(2, '0'),
      ano: f.ano,
      imagem: f.imagem,
    }

    const nextFoods = [...foods, novoAlimento]
    setFoods(nextFoods)
    persist({ foods: nextFoods })
    return { valid: true, errors: [] }
  }

  const addDesejo = (foodId: string): ValidationResult => {
    if (!currentUser) {
      return { valid: false, errors: ['Você precisa estar logado para solicitar uma reserva'] }
    }
    const alimentoExiste = foods.some((f) => f.id === foodId)
    if (!alimentoExiste) {
      return { valid: false, errors: ['Alimento não encontrado'] }
    }
    const jaSolicitado = desejos.some((d) => d.foodId === foodId && d.userEmail === currentUser.email)
    if (jaSolicitado) {
      return { valid: false, errors: ['Você já solicitou este alimento'] }
    }

    const novo: Desejo = {
      id: `desejo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      foodId,
      userEmail: currentUser.email,
      criadoEm: new Date().toISOString(),
    }
    const nextDesejos = [...desejos, novo]
    setDesejos(nextDesejos)
    persist({ desejos: nextDesejos })
    return { valid: true, errors: [] }
  }

  const updateUser = async (dados: { senha?: string; repetirSenha?: string; cnpj?: string }): Promise<ValidationResult> => {
    if (!currentUser) return { valid: false, errors: ['Sessão expirada, faça login novamente'] }

    const errors: string[] = []
    const atualizado: User = { ...currentUser }

    if (dados.cnpj !== undefined && dados.cnpj !== '') {
      const cnpjCheck = validateCNPJ(dados.cnpj)
      if (!cnpjCheck.valid) errors.push(...cnpjCheck.errors)
      else atualizado.cnpj = dados.cnpj.replace(/[^\d]/g, '')
    }

    if (dados.senha) {
      const senhaCheck = validatePassword(dados.senha)
      if (!senhaCheck.valid) errors.push(...senhaCheck.errors)
      if (dados.senha !== dados.repetirSenha) errors.push('As senhas não coincidem')
      if (senhaCheck.valid && dados.senha === dados.repetirSenha) {
        const salt = generateSalt()
        atualizado.senhaHash = await hashPassword(dados.senha, salt)
        atualizado.salt = salt
      }
    }

    if (errors.length) return { valid: false, errors }

    const nextUsers = users.map((u) => (u.email === currentUser.email ? atualizado : u))
    setUsers(nextUsers)
    setCurrentUser(atualizado)
    persist({ users: nextUsers })
    return { valid: true, errors: [] }
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
