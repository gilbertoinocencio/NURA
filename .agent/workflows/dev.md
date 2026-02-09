---
description: Iniciar servidor de desenvolvimento
---

# Dev - Servidor de Desenvolvimento

Workflow para iniciar o ambiente de desenvolvimento.

## Passos

// turbo
1. Verifique se as dependências estão instaladas:
```bash
npm ls --depth=0
```

Se faltarem dependências:
```bash
npm install
```

// turbo
2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse http://localhost:3000 no navegador

## Troubleshooting

- **Porta em uso**: Mate processos na porta 3000
  ```bash
  npx kill-port 3000
  ```
  
- **Hot reload não funciona**: Reinicie o servidor

- **Erro de módulo**: Execute `/fix-errors`
