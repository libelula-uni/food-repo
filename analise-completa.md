]633;E;echo "# Análise do Projeto food-repo";7d20462b-4ae7-4358-a9dd-9711142e8ff4]633;C# Análise do Projeto food-repo

## Estrutura de arquivos
```
./.gitignore
./README.md
./analise-completa.md
./analise.md
./app/contato/page.tsx
./app/favicon.ico
./app/globals.css
./app/layout.tsx
./app/missao/page.tsx
./app/page.tsx
./app/run/_components/AuthCard.tsx
./app/run/_components/FoodListItem.tsx
./app/run/_components/TopNav.tsx
./app/run/_lib/store.tsx
./app/run/cadastrar/page.tsx
./app/run/cadastro/page.tsx
./app/run/layout.tsx
./app/run/lista/[id]/page.tsx
./app/run/login/page.tsx
./app/run/page.tsx
./app/run/solicitacoes/page.tsx
./app/sobre/page.tsx
./eslint.config.mjs
./next-env.d.ts
./next.config.ts
./package-lock.json
./package.json
./postcss.config.mjs
./public/components/template]/Hero.tsx
./public/components/template]/InnerPage.tsx
./public/components/template]/Navbar.tsx
./public/file.svg
./public/globe.svg
./public/images/comida.png
./public/images/logo.png
./public/next.svg
./public/vercel.svg
./public/window.svg
./tsconfig.json
```

## Conteúdo dos arquivos

### ./README.md
```

```

### ./analise-completa.md
```
```

### ./analise.md
```
# Avaliação por Heurísticas – FoodCycle

## 1. Visibilidade do estado do sistema

**Avaliação:** Média

### Problemas encontrados
- Pouco feedback visual após ações do usuário.
- Botões e interações não possuem confirmações claras.

### Sugestões
- Adicionar mensagens de sucesso/erro.
- Inserir estados de carregamento.

---

## 2. Correspondência entre sistema e mundo real

**Avaliação:** Boa

### Pontos positivos
- Uso de linguagem simples e direta.
- Tema de alimentos e sustentabilidade bem representado visualmente.

---

## 3. Controle e liberdade do usuário

**Avaliação:** Média

### Problemas encontrados
- Poucas opções de navegação alternativa.
- Ausência de botões de “voltar” ou cancelamento em fluxos.

---

## 4. Consistência e padrões

**Avaliação:** Fraca

### Problemas encontrados
- Inconsistência em imports (ex.: caminhos com erros).
- Repetição de layouts sem padronização.
- Uso excessivo de estilos inline.
- Erro no `globals.css` que sobrescreve propriedades.

### Impacto
- Dificulta a manutenção e compreensão do sistema.

---

## 5. Prevenção de erros

**Avaliação:** Fraca

### Problemas encontrados
- Erros de código como:
  - `##1B4332` (hex inválido)
  - Imports com `]` indevido
- Falta de validação de dados (ex.: datas de validade).

---

## 6. Reconhecimento ao invés de memorização

**Avaliação:** Boa

### Pontos positivos
- Menu de navegação claro.
- Ícones ajudam na identificação rápida.

---

## 7. Flexibilidade e eficiência de uso

**Avaliação:** Média

### Problemas encontrados
- Interface não adaptada para usuários avançados.
- Ausência de atalhos ou automações.

---

## 8. Estética e design minimalista

**Avaliação:** Boa

### Pontos positivos
- Interface visualmente agradável.
- Uso consistente das cores verde e bege.
- Layout moderno e limpo.

### Problemas encontrados
- Excesso de espaços grandes em alguns layouts (ex.: `gap: 40rem`).
- Títulos muito grandes em telas pequenas.

---

## 9. Ajuda aos usuários a reconhecer, diagnosticar e corrigir erros

**Avaliação:** Fraca

### Problemas encontrados
- Falta de mensagens de erro amigáveis.
- Erros de código não tratados na interface.

---

## 10. Acessibilidade

**Avaliação:** Fraca

### Problemas encontrados
- Texto pequeno ou grande demais sem adaptação responsiva.
- Falta de atributos `alt` descritivos em imagens.
- Falta de foco visível em elementos interativos.
- Falta de suporte a leitores de tela.

---

#  Problemas gerais encontrados

## Críticos
- Falta de responsividade real (mobile quebrando layouts).
- Erros de código (imports e CSS global).
- Falta de acessibilidade.

## Médios
- Ausência de feedback ao usuário.
- Layout muito dependente de estilos inline.
- Falta de consistência em algumas páginas.

## Leves
- Uso de Lorem Ipsum em conteúdos.
- Excesso de espaçamento em alguns componentes.


---



# Conclusão

A interface do sistema **FoodCycle** apresenta uma proposta visual forte, moderna e coerente com o tema de sustentabilidade e redução do desperdício de alimentos.

No entanto, a avaliação heurística identificou problemas importantes relacionados à:
- Responsividade
- Acessibilidade
- Consistência técnica

Esses fatores impactam diretamente a experiência do usuário.

Apesar disso, a base do projeto é sólida e permite melhorias estruturais que podem elevar significativamente a qualidade da interface em próximas versões.```

### ./app/contato/page.tsx
```
'use client'

import InnerPage from '@/public/components/template]/InnerPage'

import {
  FaInstagram,
  FaFacebook,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa'

export default function Contato() {
  return (
    <InnerPage title="Contato">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginTop: '2rem',
        }}
      >
        {/* Email */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <FaEnvelope size={36} color="#111" />

          <span
            style={{
              fontSize: '2rem',
              color: '#111',
            }}
          >
            abcdefg@email.com
          </span>
        </div>

        {/* Telefone */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <FaPhone size={36} color="#111" />

          <span
            style={{
              fontSize: '2rem',
              color: '#111',
            }}
          >
            (31) 99999-9999
          </span>
        </div>

        {/* Instagram */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <FaInstagram size={36} color="#111" />

          <span
            style={{
              fontSize: '2rem',
              color: '#111',
            }}
          >
            @insta_instagram
          </span>
        </div>

        {/* Facebook */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <FaFacebook size={36} color="#111" />

          <span
            style={{
              fontSize: '2rem',
              color: '#111',
            }}
          >
            face_facebook
          </span>
        </div>
      </div>
    </InnerPage>
  )
}```

### ./app/globals.css
```
*{
    background-color: #F3F0E9;
    background: none;
    margin: 0%;
}
```

### ./app/layout.tsx
```
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

### ./app/missao/page.tsx
```
'use client'

import Navbar from '@/public/components/template]/Navbar'

export default function Missao() {
  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: '100vh',
          backgroundColor: '#F0EDE4',
          paddingTop: '7rem',
          paddingLeft: '3rem',
          paddingRight: '3rem',
          paddingBottom: '3rem',
        }}
      >
        {/* Título */}
        <h1
          style={{
            fontSize: '7rem',
            fontWeight: 400,
            color: '#000',
            marginBottom: '3rem',
            fontFamily: "'Space Mono', monospace",
          }}
        >
          Missão
        </h1>

        {/* Box Verde */}
        <div
          style={{
            width: '90%',
            backgroundColor: '#1B4332',
            borderRadius: '80px',
            padding: '6rem 4rem',

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              color: '#F0EDE4',
              fontSize: '1.2rem',
              lineHeight: 1.0,
              textAlign: 'center',
              maxWidth: '1200px',
              fontFamily: "'Space Mono', monospace",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec semper dignissim eros, ac commodo risus. Sed et
            dignissim tellus, a dictum est. Pellentesque non purus
            finibus, vehicula nisl iaculis, hendrerit eros. Curabitur
            pretium tortor et nisl accumsan, ac egestas neque aliquet.
            Duis eu finibus sapien, quis vehicula neque. Vestibulum
            enim erat, placerat sed ornare non, placerat euismod est.
            Nulla luctus magna quis sodales scelerisque. Proin
            hendrerit, odio eget volutpat laoreet, nibh lectus gravida
            arcu, nec lacinia quam nulla sit amet lectus. Suspendisse
            ex turpis, pretium vitae dictum quis, lobortis ut nulla.
            Aenean ac dolor mi. Maecenas sit amet lacinia ex, ut
            condimentum mi. Maecenas cursus velit ipsum, vitae maximus
            sapien cursus vitae. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas.
            Donec ultricies nunc sit amet sem finibus lobortis.
          </p>
        </div>
      </main>
    </>
  )
}```

### ./app/page.tsx
```
import Hero from '@/public/components/template]/Hero'
import Navbar from '@/public/components/template]/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}
```

### ./app/run/_components/AuthCard.tsx
```
'use client'
import React from 'react'

export default function AuthCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F0EDE4' }}>
      <header style={{ backgroundColor: '#1B4332', padding: '1rem 2rem' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#F0EDE4' }} />
      </header>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
        <div
          style={{
            width: 360,
            border: '1px solid #1B4332',
            borderRadius: 12,
            padding: '2rem',
            backgroundColor: '#F0EDE4',
          }}
        >
          <h1
            style={{
              fontFamily: "'Space Mono', monospace",
              textAlign: 'center',
              fontSize: '1.8rem',
              marginBottom: '1.5rem',
            }}
          >
            {title}
          </h1>
          {children}
        </div>
      </div>
    </div>
  )
}

export const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.7rem 1rem',
  marginBottom: '0.8rem',
  border: '1px solid #1B4332',
  borderRadius: 6,
  backgroundColor: 'transparent',
  fontFamily: "'Space Mono', monospace",
}

export const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.8rem',
  backgroundColor: '#1B4332',
  color: '#F0EDE4',
  border: 'none',
  borderRadius: 6,
  fontFamily: "'Space Mono', monospace",
  fontSize: '1rem',
  cursor: 'pointer',
  marginTop: '0.5rem',
}```

### ./app/run/_components/FoodListItem.tsx
```
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
}```

### ./app/run/_components/TopNav.tsx
```
'use client'
import Link from 'next/link'
import { FaHome, FaPlus, FaSearch, FaBars } from 'react-icons/fa'

export default function TopNav() {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        padding: '1rem 2rem',
        backgroundColor: '#1B4332',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: '#F0EDE4',
        }}
      />
      <div style={{ display: 'flex', gap: '2.5rem', marginLeft: 'auto', color: '#F0EDE4' }}>
        <Link href="/run" style={{ color: 'inherit' }}><FaHome size={22} /></Link>
        <Link href="/run/cadastrar" style={{ color: 'inherit' }}><FaPlus size={22} /></Link>
        <Link href="/run" style={{ color: 'inherit' }}><FaSearch size={22} /></Link>
        <Link href="/run/solicitacoes" style={{ color: 'inherit' }}><FaBars size={22} /></Link>
      </div>
    </header>
  )
}```

### ./app/run/_lib/store.tsx
```
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
}```

### ./app/run/cadastrar/page.tsx
```
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TopNav from '../_components/TopNav'
import { useStore } from '../_lib/store'

export default function CadastrarAlimento() {
  const { addFood } = useStore()
  const router = useRouter()
  const [nome, setNome] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [dia, setDia] = useState('')
  const [mes, setMes] = useState('')
  const [ano, setAno] = useState('')
  const [imagem, setImagem] = useState<string | null>(null)

  function handleImagem(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImagem(reader.result as string)
    reader.readAsDataURL(file)
  }

  function handleCadastrar() {
    addFood({ nome, distribuidora: 'Minha Empresa', quantidade, dia, mes, ano, imagem })
    router.push('/runw')
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.6rem 1rem',
    marginBottom: '0.8rem',
    border: '1px solid #1B4332',
    borderRadius: 6,
    fontFamily: "'Space Mono', monospace",
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F0EDE4' }}>
      <TopNav />
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem' }}>
        <div style={{ border: '1px solid #1B4332', borderRadius: 12, padding: '2rem', width: 600 }}>
          <h1 style={{ fontFamily: "'Space Mono', monospace", marginBottom: '1.5rem' }}>Cadastrar Alimento</h1>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ flex: 1 }}>
              <input style={inputStyle} placeholder="Nome do Alimento" value={nome} onChange={(e) => setNome(e.target.value)} />
              <input style={inputStyle} placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.85rem' }}>Prazo de retirada</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input style={inputStyle} placeholder="Dia" value={dia} onChange={(e) => setDia(e.target.value)} />
                <input style={inputStyle} placeholder="Mês" value={mes} onChange={(e) => setMes(e.target.value)} />
                <input style={inputStyle} placeholder="Ano" value={ano} onChange={(e) => setAno(e.target.value)} />
              </div>
            </div>
            <label
              style={{
                flex: 1,
                border: '1px dashed #999',
                borderRadius: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: imagem ? 'transparent' : '#f3f1ec',
                backgroundImage: imagem ? `url(${imagem})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 160,
              }}
            >
              {!imagem && <span style={{ fontFamily: "'Space Mono', monospace" }}>Inserir imagem</span>}
              <input type="file" accept="image/*" onChange={handleImagem} style={{ display: 'none' }} />
            </label>
          </div>
          <button
            onClick={handleCadastrar}
            style={{
              width: '100%',
              marginTop: '1.5rem',
              padding: '0.8rem',
              backgroundColor: '#1B4332',
              color: '#F0EDE4',
              border: 'none',
              borderRadius: 6,
              fontFamily: "'Space Mono', monospace",
              cursor: 'pointer',
            }}
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  )
}```

### ./app/run/cadastro/page.tsx
```
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthCard, { inputStyle, buttonStyle } from '../_components/AuthCard'
import { useStore } from '../_lib/store'

export default function CadastroPage() {
  const { register } = useStore()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [repetir, setRepetir] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [erro, setErro] = useState('')

  function handleCadastro() {
    if (senha !== repetir) return setErro('As senhas não coincidem')
    if (register({ email, senha, cnpj })) {
      router.push('/run')
    } else {
      setErro('Email já cadastrado')
    }
  }

  return (
    <AuthCard title="Cadastro">
      <input style={inputStyle} placeholder="INSIRA SEU EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input style={inputStyle} placeholder="INSIRA SUA SENHA" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      <input style={inputStyle} placeholder="REPITA SUA SENHA" type="password" value={repetir} onChange={(e) => setRepetir(e.target.value)} />
      <input style={inputStyle} placeholder="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
      {erro && <p style={{ color: '#a33', fontSize: '0.85rem' }}>{erro}</p>}
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.85rem' }}>
        <Link href="/run/login">Já tenho conta</Link>
      </p>
      <button style={buttonStyle} onClick={handleCadastro}>Cadastrar-se</button>
    </AuthCard>
  )
}```

### ./app/run/layout.tsx
```
'use client'
import { StoreProvider } from './_lib/store'

export default function AppRootLayout({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>
}```

### ./app/run/lista/[id]/page.tsx
```
'use client'
import { useParams, useRouter } from 'next/navigation'
import TopNav from '../../_components/TopNav'
import { useStore } from '../../_lib/store'

export default function AlimentoDetalhe() {
  const { id } = useParams<{ id: string }>()
  const { foods, addSolicitacao } = useStore()
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
              addSolicitacao(food.id)
              router.push('/run/solicitacoes')
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
}```

### ./app/run/login/page.tsx
```
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthCard, { inputStyle, buttonStyle } from '../_components/AuthCard'
import { useStore } from '../_lib/store'

export default function LoginPage() {
  const { login } = useStore()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  function handleLogin() {
    if (login(email, senha)) {
      router.push('/run')
    } else {
      setErro('Email ou senha inválidos')
    }
  }

  return (
    <AuthCard title="Login">
      <input style={inputStyle} placeholder="INSIRA SEU EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input style={inputStyle} placeholder="INSIRA SUA SENHA" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      {erro && <p style={{ color: '#a33', fontSize: '0.85rem' }}>{erro}</p>}
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.85rem' }}>
        <Link href="/run/cadastro">Não tenho conta</Link>
        <br />
        Esqueci minha senha
      </p>
      <button style={buttonStyle} onClick={handleLogin}>Login</button>
    </AuthCard>
  )
}```

### ./app/run/page.tsx
```
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
}```

### ./app/run/solicitacoes/page.tsx
```
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
}```

### ./app/sobre/page.tsx
```
'use client'

import Image from 'next/image'
import InnerPage from '@/public/components/template]/InnerPage'

export default function Sobre() {
  return (
    <InnerPage >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '40rem',
          marginTop: '1rem',

        }}
      >
        {/* Texto */}
        <div
          style={{
            flex: 1,
            minWidth: '500px',
            marginBottom: '20rem',
          }}
        >
          <h1
            style={{
              fontSize: '7rem',
              marginBottom: '1rem',
              color: '#000',
              fontWeight: 400,
            }}
          >
            Sobre
          </h1>

          <p
            style={{
              fontSize: '1.3rem',
              lineHeight: 1.3,
              maxWidth: '650px',
              color: '#111',
            }}
          >
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </p>
        </div>

        {/* Card da imagem */}
        <div
          style={{
            backgroundColor: '#1B4332',
            borderRadius: '80px',
            padding: '3rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '500px',
          }}
        >
          <Image
            src="/images/comida.png"
            alt=""
            width={530}
            height={400}
            style={{
              borderRadius: '50px',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </InnerPage>
  )
}```

### ./eslint.config.mjs
```
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

### ./next-env.d.ts
```
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
```

### ./next.config.ts
```
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
};

export default nextConfig;```

### ./package.json
```
{
  "name": "foodcycle",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "next": "16.2.3",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "react-icons": "^5.6.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.3",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### ./postcss.config.mjs
```
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

### ./public/components/template]/Hero.tsx
```
'use client'

import React from 'react'
import Link from 'next/link'

const Hero = React.memo(() => {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 720,
        backgroundColor: '#F0EDE4',
        overflow: 'hidden',
      }}
    >
      {/* Top-left green quarter-circle */}
      <div
        style={{
          position: 'absolute',
          top: -1,
          left: -1,
          width: 500,
          height: 320,
          backgroundColor: '#1B4332',
          borderBottomRightRadius: '9999px',
        }}
      />

      {/* Brand */}
      <div
        style={{
          position: 'absolute',
          top: '38%',
          left: '3rem',
          zIndex: 2,
        }}
      >
        <h1
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(3.36rem, 8.4vw, 6.24rem)',
            fontWeight: 400,
            color: '#0d0d0d',
            lineHeight: 1,
          }}
        >
          FoodCycle
        </h1>

        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(0.9rem, 1.44vw, 1.14rem)',
            color: '#444',
            marginTop: '1.44rem',
            letterSpacing: '0.04em',
          }}
        >
          Reduzindo o desperdício,
          <br />
          alimentando comunidades.
        </p>
      </div>

      {/* BOTÃO/LINK */}
      <Link
        href="/run/login"
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '52%',
          height: '50%',
          backgroundColor: '#1B4332',
          borderTopLeftRadius: '9999px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.44rem',
          cursor: 'pointer',
          textDecoration: 'none',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.backgroundColor =
            '#163d2b')
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.backgroundColor =
            '#1B4332')
        }
      >
        <h2
          style={{
            fontSize: 'clamp(2.16rem, 4.8vw, 3.84rem)',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '0.05em',
            textAlign: 'center',
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          Começa Agora
        </h2>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.48rem',
          }}
        >
          <div
            style={{
              width: 108,
              height: 4,
              backgroundColor: '#F0EDE4',
              borderRadius: 2,
            }}
          />


        </div>
      </Link>
    </section>
  )
})

Hero.displayName = 'Hero'

export default Hero```

### ./public/components/template]/InnerPage.tsx
```
'use client'
import React from 'react'
import Navbar from './Navbar'


const InnerPage = React.memo(({ title, children }: Props) => {
  return (
    <>
      <Navbar />
      <main style={{
        minHeight: '100vh',
        backgroundColor: '#F0EDE4',
        paddingTop: '7.4rem',
        paddingLeft: '3.6rem',
        paddingRight: '3.6rem',
        paddingBottom: '4.8rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Top-left green accent circle */}
        <div style={{
          position: 'absolute',
          top: -1, left: -1,
          width: 408, height: 288,
          backgroundColor: '##1B4332',
          borderBottomRightRadius: '9999px',
          zIndex: 0,
        }}/>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 960 }}>
          <h1 style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
            fontWeight: 700,
            color: '#0d0d0d',
            marginBottom: '2.4rem',
            paddingBottom: '1.2rem',
          }}>
            {title}
          </h1>
          {children}
        </div>


      </main>
    </>
  )
})

InnerPage.displayName = 'InnerPage'
export default InnerPage
```

### ./public/components/template]/Navbar.tsx
```
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Image from 'next/image'

const links = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Missão', href: '/missao' },
  { label: 'Contato', href: '/contato' },
]

const Navbar = React.memo(() => {
  const pathname = usePathname()

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      {/* Logo somente na home */}
      {pathname === '/' && (
        <Link
          href="/"
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            pointerEvents: 'auto',
          }}
        >
          <Image
            src="/images/logo.png"
            alt="FoodCycle logo"
            width={300}
            height={300}
          />
        </Link>
      )}

      {/* Navbar */}
      <nav
        style={{
          position: 'absolute',
          top: '1.32rem',
          right: '1.8rem',
          display: 'flex',
          alignItems: 'center',
          gap: '2.64rem',
          padding: '1.08rem 2.4rem',
          backgroundColor: '#F0EDE4',
          pointerEvents: 'auto',
        }}
      >
        {links.map(({ label, href }) => {
          const active = pathname === href

          return (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '1.9rem',
                fontWeight: active ? 700 : 400,
                color: active ? '#1B4332' : '#111',
                letterSpacing: '0.02em',
                transition: 'color 0.2s',
                position: 'relative',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  '#1B4332')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  active ? '#1B4332' : '#111')
              }
            >
              {label}

              {active && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: -4,
                    left: 0,
                    right: 0,
                    height: 4,
                    backgroundColor: '#1B4332',
                    borderRadius: 2,
                  }}
                />
              )}
            </Link>
          )
        })}
      </nav>
    </header>
  )
})

Navbar.displayName = 'Navbar'

export default Navbar```

### ./tsconfig.json
```
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```

