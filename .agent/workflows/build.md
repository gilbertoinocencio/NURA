---
description: Build de produção do app Nura
---

# Build - Gerar Bundle de Produção

Workflow para criar o build otimizado para deploy.

## Passos

// turbo
1. Limpe a pasta de build anterior:
```bash
rm -rf dist
```

// turbo
2. Execute o build de produção:
```bash
npm run build
```

3. Se houver erros de build:
   - Execute `/type-check` para verificar erros de TypeScript
   - Verifique imports circulares
   - Confirme que todas as dependências estão instaladas

// turbo
4. Verifique o tamanho do bundle:
```bash
dir dist\assets
```

5. Para testar o build localmente:
```bash
npm run preview
```
