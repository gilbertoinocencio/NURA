---
description: Verificação completa da saúde do projeto
---

# Health Check - Diagnóstico Completo

Workflow para verificar a saúde geral do projeto Nura.

// turbo-all

## 1. Verificar Versões

```bash
node --version
```

```bash
npm --version
```

## 2. Verificar Dependências

```bash
npm ls --depth=0
```

## 3. Verificar TypeScript

```bash
npx tsc --noEmit
```

## 4. Testar Build

```bash
npm run build
```

## 5. Verificar Estrutura de Arquivos

Confirme que estes arquivos existem:
- `index.html` - Entrada HTML
- `index.tsx` - Entrada React
- `App.tsx` - Componente principal
- `types.ts` - Definições de tipos
- `constants.ts` - Constantes do app
- `.env.local` - Variáveis de ambiente (API keys)

## Resultados Esperados

✅ Node.js 18+
✅ Todas as dependências instaladas
✅ Zero erros de TypeScript
✅ Build completa sem erros
✅ Todos os arquivos essenciais presentes
