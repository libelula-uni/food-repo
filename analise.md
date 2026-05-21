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

Apesar disso, a base do projeto é sólida e permite melhorias estruturais que podem elevar significativamente a qualidade da interface em próximas versões.