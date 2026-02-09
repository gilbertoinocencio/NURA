---
description: Corrigir erros automaticamente e deixar o app rodando liso
---

# Fix Errors - Correção Automática de Erros

Workflow completo para identificar e corrigir erros no projeto.

// turbo-all

## 1. Verificar Erros de TypeScript

```bash
npx tsc --noEmit 2>&1
```

Se houver erros:
- Tipos `any` implícitos: adicione tipagem explícita
- Propriedades inexistentes: atualize interfaces em `types.ts`
- Módulos não encontrados: verifique imports e instale dependências

## 2. Testar Build

```bash
npm run build 2>&1
```

Se falhar:
- Verifique erros de sintaxe JSX
- Confirme que todos os componentes exportam corretamente
- Verifique variáveis de ambiente em `.env.local`

## 3. Verificar Dependências

```bash
npm ls --depth=0
```

Se houver problemas:
```bash
rm -rf node_modules package-lock.json && npm install
```

## 4. Iniciar Servidor de Dev

```bash
npm run dev
```

## Checklist de Correções Comuns

- [ ] Imports quebrados → Verificar caminhos relativos
- [ ] Tipos faltando → Adicionar em `types.ts`
- [ ] Props incorretas → Atualizar interfaces dos componentes
- [ ] Dependências desatualizadas → `npm update`
- [ ] Cache corrompido → Limpar `node_modules` e reinstalar
