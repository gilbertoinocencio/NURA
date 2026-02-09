---
description: Fazer deploy das alterações no Vercel
---

# Deploy - Atualizar Vercel

Workflow para enviar suas alterações para o GitHub e atualizar o site no Vercel automaticamente.

## Pré-requisitos
- O projeto deve estar conectado ao GitHub (já está).
- O Vercel deve estar conectado ao repositório (você já fez isso).

## Passos

// turbo
1. Verificar status dos arquivos:
```bash
git status
```

// turbo
2. Adicionar todas as mudanças:
```bash
git add .
```

3. Confirmar as mudanças (Commit):
   - Digite uma mensagem simples quando solicitado (ou use o padrão "Update")
```bash
git commit -m "Update via workflow /deploy"
```

// turbo
4. Enviar para o GitHub (Push):
```bash
git push origin master
```

## O que acontece agora?
- O Vercel detecta o novo commit automaticamente.
- Em 1-2 minutos, o site `https://nura-seven.vercel.app` será atualizado.
