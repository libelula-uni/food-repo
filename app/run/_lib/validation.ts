/**
 * Camada de validação e sanitização.
 *
 * Este projeto não possui um banco de dados/servidor real (os dados vivem no
 * localStorage do navegador), então nada aqui substitui validação de um
 * backend de verdade. O objetivo é aplicar, no limite do que é possível no
 * cliente, boas práticas de segurança e integridade de dados:
 *  - nunca confiar em input bruto do usuário
 *  - normalizar e sanitizar strings antes de persistir
 *  - impedir payloads grandes/abusivos (ex.: imagens gigantes em base64)
 *  - dar mensagens de erro claras e específicas
 */

export type ValidationResult = {
  valid: boolean
  errors: string[]
}

function ok(): ValidationResult {
  return { valid: true, errors: [] }
}

function fail(...errors: string[]): ValidationResult {
  return { valid: false, errors }
}

/** Remove tags/handlers e caracteres de controle. Previne XSS armazenado,
 * já que tudo que é salvo aqui pode ser renderizado depois em outra tela. */
export function sanitizeText(input: string, maxLength = 200): string {
  return input
    .replace(/<[^>]*>/g, '') // remove tags html
    .replace(/[<>]/g, '') // remove sobras de < >
    .replace(/[\u0000-\u001F\u007F]/g, '') // caracteres de controle
    .trim()
    .slice(0, maxLength)
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export function validateEmail(rawEmail: string): ValidationResult {
  const email = rawEmail.trim()
  if (!email) return fail('Informe um email')
  if (email.length > 254) return fail('Email muito longo')
  if (!EMAIL_REGEX.test(email)) return fail('Email inválido')
  return ok()
}

/**
 * Senha: mínimo 8 caracteres, ao menos 1 letra e 1 número.
 * Não exigimos símbolo especial para não frustrar o usuário além do razoável,
 * mas bloqueamos senhas triviais/óbvias.
 */
const SENHAS_FRACAS = new Set([
  '12345678', 'senha123', 'password', 'qwerty123', '11111111', 'abc12345',
])

export function validatePassword(senha: string): ValidationResult {
  const errors: string[] = []
  if (!senha) return fail('Informe uma senha')
  if (senha.length < 8) errors.push('A senha deve ter no mínimo 8 caracteres')
  if (senha.length > 72) errors.push('A senha deve ter no máximo 72 caracteres')
  if (!/[a-zA-Z]/.test(senha)) errors.push('A senha deve conter ao menos uma letra')
  if (!/[0-9]/.test(senha)) errors.push('A senha deve conter ao menos um número')
  if (SENHAS_FRACAS.has(senha.toLowerCase())) errors.push('Essa senha é muito comum, escolha outra')
  return errors.length ? fail(...errors) : ok()
}

/** Valida CNPJ com o algoritmo oficial de dígitos verificadores (módulo 11). */
export function validateCNPJ(rawCnpj: string): ValidationResult {
  const cnpj = rawCnpj.replace(/[^\d]/g, '')

  if (!cnpj) return fail('Informe o CNPJ')
  if (cnpj.length !== 14) return fail('CNPJ deve ter 14 dígitos')
  if (/^(\d)\1{13}$/.test(cnpj)) return fail('CNPJ inválido')

  const calcDigito = (base: string, pesos: number[]) => {
    const soma = base
      .split('')
      .reduce((acc, digit, i) => acc + parseInt(digit, 10) * pesos[i], 0)
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }

  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  const digito1 = calcDigito(cnpj.slice(0, 12), pesos1)
  const digito2 = calcDigito(cnpj.slice(0, 12) + digito1, pesos2)

  if (`${digito1}${digito2}` !== cnpj.slice(12)) {
    return fail('CNPJ inválido')
  }

  return ok()
}

export function formatCNPJ(rawCnpj: string): string {
  const cnpj = rawCnpj.replace(/[^\d]/g, '').slice(0, 14)
  return cnpj
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

export function validateFoodName(nome: string): ValidationResult {
  const clean = sanitizeText(nome, 80)
  if (!clean) return fail('Informe o nome do alimento')
  if (clean.length < 2) return fail('Nome muito curto')
  return ok()
}

export function validateQuantidade(quantidade: string): ValidationResult {
  const clean = quantidade.trim()
  if (!clean) return fail('Informe a quantidade')
  // aceita formatos como "10", "10kg", "10 unidades"
  const numero = parseFloat(clean.replace(',', '.'))
  if (Number.isNaN(numero)) return fail('Quantidade deve começar com um número')
  if (numero <= 0) return fail('Quantidade deve ser maior que zero')
  if (numero > 100000) return fail('Quantidade não parece válida')
  return ok()
}

/** Valida uma data de prazo de retirada: precisa ser uma data real e não pode
 * já ter passado (evita cadastrar alimento com prazo vencido por engano). */
export function validatePrazo(dia: string, mes: string, ano: string): ValidationResult {
  if (!dia || !mes || !ano) return fail('Preencha o prazo de retirada completo')

  const d = parseInt(dia, 10)
  const m = parseInt(mes, 10)
  const y = parseInt(ano, 10)

  if (!Number.isInteger(d) || !Number.isInteger(m) || !Number.isInteger(y)) {
    return fail('Prazo de retirada inválido')
  }
  if (m < 1 || m > 12) return fail('Mês inválido')
  if (y < new Date().getFullYear() || y > new Date().getFullYear() + 5) {
    return fail('Ano inválido')
  }

  const data = new Date(y, m - 1, d)
  const dataValida = data.getFullYear() === y && data.getMonth() === m - 1 && data.getDate() === d
  if (!dataValida) return fail('Essa data não existe')

  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  if (data < hoje) return fail('O prazo de retirada não pode estar no passado')

  return ok()
}

const TIPOS_IMAGEM_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const TAMANHO_MAXIMO_IMAGEM = 3 * 1024 * 1024 // 3MB — protege o localStorage (limite ~5-10MB) de estourar

export function validateImageFile(file: File): ValidationResult {
  if (!TIPOS_IMAGEM_PERMITIDOS.includes(file.type)) {
    return fail('Formato de imagem não suportado. Use JPG, PNG, WEBP ou GIF')
  }
  if (file.size > TAMANHO_MAXIMO_IMAGEM) {
    return fail('Imagem muito grande. O tamanho máximo é 3MB')
  }
  return ok()
}

/** Confirma que uma string parece de fato uma imagem em base64 (data URL),
 * evitando que dados corrompidos/adulterados sejam salvos e depois renderizados. */
export function isValidImageDataUrl(value: string | null): boolean {
  if (!value) return true // ausência de imagem é permitida
  return /^data:image\/(jpeg|png|webp|gif);base64,[a-zA-Z0-9+/=]+$/.test(value)
}
