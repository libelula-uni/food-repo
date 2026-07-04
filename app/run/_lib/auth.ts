/**
 * Helpers de "segurança" client-side.
 *
 * Importante deixar claro: como este projeto não tem um servidor/backend
 * real, nada aqui é segurança de verdade no sentido estrito — qualquer pessoa
 * com o DevTools aberto pode ler o localStorage. O que fazemos aqui é adotar
 * as práticas que um backend real também adotaria, para que:
 *  1) a senha nunca fique gravada em texto puro (hash + salt),
 *  2) a sessão expire sozinha e não seja só "o email guardado",
 *  3) tentativas de login sejam limitadas (mitiga força bruta local/scripted).
 */

const SESSION_KEY = 'foodcycle-session'
const SESSION_TTL_MS = 1000 * 60 * 60 * 8 // 8 horas
const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_MS = 60 * 1000 // 1 minuto

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function getSubtle(): SubtleCrypto | null {
  if (typeof window === 'undefined') return null
  return window.crypto?.subtle ?? null
}

export function generateSalt(): string {
  if (typeof window === 'undefined') return Math.random().toString(36).slice(2)
  const bytes = new Uint8Array(16)
  window.crypto.getRandomValues(bytes)
  return bufferToHex(bytes.buffer)
}

/**
 * Deriva um hash SHA-256 de "salt:senha". Não é tão forte quanto bcrypt/argon2
 * (que exigem custo computacional ajustável), mas já é infinitamente melhor
 * do que guardar a senha em texto puro, e é o que dá para fazer com a Web
 * Crypto API nativa do navegador sem dependências extras.
 */
export async function hashPassword(senha: string, salt: string): Promise<string> {
  const subtle = getSubtle()
  if (!subtle) {
    // Fallback extremamente improvável (ambiente sem WebCrypto); nunca deveria
    // rodar em produção, mas evita quebrar a aplicação por completo.
    return `plain:${salt}:${senha}`
  }
  const data = new TextEncoder().encode(`${salt}:${senha}`)
  const digest = await subtle.digest('SHA-256', data)
  return bufferToHex(digest)
}

export async function verifyPassword(senha: string, salt: string, hash: string): Promise<boolean> {
  const computed = await hashPassword(senha, salt)
  return timingSafeEqual(computed, hash)
}

/** Comparação em tempo constante para dificultar timing attacks na checagem do hash. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}

type SessionPayload = {
  email: string
  issuedAt: number
  expiresAt: number
}

function base64UrlEncode(json: string): string {
  if (typeof window === 'undefined') return ''
  return window.btoa(unescape(encodeURIComponent(json)))
}

function base64UrlDecode(value: string): string {
  return decodeURIComponent(escape(window.atob(value)))
}

/** Sessão "assinada" de forma simples (não é um JWT real, não há chave secreta
 * de servidor para assinar de verdade), mas carrega expiração e é validada
 * estruturalmente antes de ser confiada — evita reaproveitar sessão expirada
 * ou um valor qualquer digitado manualmente no localStorage. */
export function createSession(email: string): void {
  const payload: SessionPayload = {
    email,
    issuedAt: Date.now(),
    expiresAt: Date.now() + SESSION_TTL_MS,
  }
  window.localStorage.setItem(SESSION_KEY, base64UrlEncode(JSON.stringify(payload)))
}

export function readSession(): string | null {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    const payload = JSON.parse(base64UrlDecode(raw)) as SessionPayload
    if (
      typeof payload.email !== 'string' ||
      typeof payload.expiresAt !== 'number' ||
      Number.isNaN(payload.expiresAt)
    ) {
      throw new Error('formato de sessão inválido')
    }
    if (Date.now() > payload.expiresAt) {
      window.localStorage.removeItem(SESSION_KEY)
      return null
    }
    return payload.email
  } catch {
    // sessão corrompida/adulterada — descarta com segurança
    window.localStorage.removeItem(SESSION_KEY)
    return null
  }
}

export function clearSession(): void {
  window.localStorage.removeItem(SESSION_KEY)
}

// ---------- Rate limiting de login ----------

const ATTEMPTS_KEY = 'foodcycle-login-attempts'

type AttemptRecord = { count: number; firstAttemptAt: number; lockedUntil: number | null }

function readAttempts(): Record<string, AttemptRecord> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(ATTEMPTS_KEY)
    return raw ? (JSON.parse(raw) as Record<string, AttemptRecord>) : {}
  } catch {
    return {}
  }
}

function saveAttempts(data: Record<string, AttemptRecord>) {
  window.localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(data))
}

/** Retorna quantos ms faltam de bloqueio (0 se não estiver bloqueado). */
export function getLockoutRemaining(email: string): number {
  const attempts = readAttempts()
  const record = attempts[email]
  if (!record?.lockedUntil) return 0
  const remaining = record.lockedUntil - Date.now()
  return remaining > 0 ? remaining : 0
}

export function registerFailedAttempt(email: string): void {
  const attempts = readAttempts()
  const record = attempts[email] ?? { count: 0, firstAttemptAt: Date.now(), lockedUntil: null }
  record.count += 1
  if (record.count >= MAX_LOGIN_ATTEMPTS) {
    record.lockedUntil = Date.now() + LOCKOUT_MS
    record.count = 0
  }
  attempts[email] = record
  saveAttempts(attempts)
}

export function clearFailedAttempts(email: string): void {
  const attempts = readAttempts()
  delete attempts[email]
  saveAttempts(attempts)
}

export const LOGIN_LOCKOUT_CONFIG = { MAX_LOGIN_ATTEMPTS, LOCKOUT_MS }
