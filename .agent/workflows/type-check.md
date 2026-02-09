---
description: Verificar erros de TypeScript no projeto
---

# Type Check - Verificação de Tipos

Workflow para identificar e corrigir erros de TypeScript.

## Passos

// turbo
1. Execute a verificação de tipos:
```bash
npx tsc --noEmit
```

2. Analise os erros reportados e corrija:
   - Tipos faltando: adicione interfaces em `types.ts`
   - Props incorretas: verifique a tipagem dos componentes
   - Imports quebrados: atualize os caminhos

3. Re-execute para confirmar correções:
```bash
npx tsc --noEmit
```
