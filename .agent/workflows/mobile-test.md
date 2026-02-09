---
description: Testar o app no celular via rede local
---

# Mobile Test - Teste em Dispositivo Móvel

Workflow para rodar o app no seu celular (iPhone/Android) via Wi-Fi.

## Pré-requisitos
1. Seu celular e este computador devem estar na **mesma rede Wi-Fi**.

## Passos

// turbo
1. Inicie o servidor com host exposto:
```bash
npm run dev -- --host
```

2. Olhe no terminal, você verá algo como:
   ```
   Network:  http://192.168.x.x:3000/
   ```

3. No seu iPhone:
   - Abra o Safari/Chrome
   - Digite exatamente esse endereço (http://192.168...:3000)
   - O app deve carregar!

## Dica
Se não conectar:
- Verifique se o firewall do Windows não está bloqueando o Node.js
- Garanta que estão na mesma rede (não use 4G no celular)
