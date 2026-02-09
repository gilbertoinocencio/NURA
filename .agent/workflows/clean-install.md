---
description: Reinstalar dependências do zero para resolver problemas
---

# Clean Install - Instalação Limpa

Workflow para resolver problemas de dependências corrompidas.

// turbo-all

## 1. Remover node_modules e lock file

```bash
rm -rf node_modules
```

```bash
rm -f package-lock.json
```

## 2. Limpar cache do npm

```bash
npm cache clean --force
```

## 3. Reinstalar dependências

```bash
npm install
```

## 4. Verificar instalação

```bash
npm ls --depth=0
```

## 5. Testar build

```bash
npm run build
```

## Quando usar este workflow

- Erros estranhos de módulos não encontrados
- Versões conflitantes de pacotes
- Após atualizar Node.js
- Build falhando sem razão aparente
