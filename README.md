# Anamnese Neuropsicológica

Formulário digital para anamnese neuropsicológica com rastreio para TDAH e TEA.

**[Acessar aplicação](https://isaquesb.github.io/anamnese-neuro-form/)**

## Funcionalidades

- Formulário multi-etapas com validação (Zod)
- Campos condicionais (exibidos conforme respostas anteriores)
- Cálculo automático de idade a partir da data de nascimento
- Tela de revisão com todas as respostas
- Exportação em PDF com formatação profissional
- Exportação e importação de respostas em JSON
- Persistência automática em sessionStorage (previne perda de dados)
- Modo escuro / claro

## Seções do formulário

1. **Dados do avaliado** — nome, data de nascimento, idade, escolaridade, gênero
2. **Anamnese** — histórico clínico e de desenvolvimento (~50 perguntas)
3. **Rastreio para TDAH** — 14 itens com escala de frequência
4. **Rastreio para TEA** — 12 itens sim/não

## Tecnologias

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Zod (validação de schema)
- jsPDF (geração de PDF)
- Lucide React (ícones)
- Vitest + Testing Library (testes unitários)
- Playwright (testes E2E)

## Desenvolvimento

```bash
npm install
npm run dev
```

## Testes

```bash
# Testes unitários
npm test

# Testes E2E
npx playwright install --with-deps
npm run build && npm run preview &
npx playwright test
```

## Deploy

O deploy é feito automaticamente via GitHub Actions para GitHub Pages ao fazer push na branch `main`.
