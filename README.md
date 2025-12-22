# 🏆 Continental Cup — Sunlive Group

## TL;DR
Projeto web completo (Frontend + Backend) para o **International Continental Cup 2026**.  
🚧 **Projeto em desenvolvimento** — funcional em ambiente de desenvolvimento, a faltar preparação final para produção.

---

## 🌍 Sobre o projeto
O **Continental Cup** é um projeto desenvolvido para a **Sunlive Group**, com o objetivo de divulgar oficialmente o evento e gerir **inscrições internacionais** de ginástica (MAG & WAG).

O sistema foi pensado para:
- Ser claro e intuitivo para atletas, clubes e federações
- Centralizar inscrições de forma segura
- Facilitar manutenção e evolução futura

---

## 🧱 Arquitetura do projeto
O projeto está dividido em **duas partes independentes**:

### 🎨 Frontend
- Website institucional do evento
- Página única com navegação por secções
- Modal de inscrição
- Comunicação direta com a API

### 🧠 Backend
- API REST para submissão de inscrições
- Validação rigorosa dos dados
- Backup local + integração com Google Sheets
- Preparado para produção

---

## ⚙️ Stack Tecnológica
### Frontend
- React
- Vite
- CSS Modules
- JavaScript (ESM)

### Backend
- Node.js
- Express
- Zod (validação)
- Google Sheets API
- Helmet, CORS, Rate Limit

---

## 🗂️ Estrutura do repositório
```
continental-cup/
│
├─ src/                 # Frontend (React + Vite)
│  └─ README.md         # README do Frontend
│
├─ server/              # Backend (Express API)
│  └─ README.md         # README do Backend
│
├─ public/              # PDFs, posters e downloads
│
└─ README.md            # README geral (este ficheiro)
```

---

## 📄 READMEs específicos
- 📘 Frontend → [README.md](./src/README.md)
- 📗 Backend → [README.md](./server/README.md)

---

## ✨ Funcionalidades principais
### Website
- Landing page do evento
- Navegação por secções com scroll suave
- Hero com CTAs (Poster / Registration)
- Modal de inscrição
- Downloads MAG / WAG
- Secções: Venue, Hotel, Sunlive Group, Contacts
- Back-to-top

### API
- `POST /api/registrations`
- Validação completa do formulário
- Backup local em ficheiro JSON
- Integração com Google Sheets
- Health check (`/api/health`)

---

## 🚧 Estado atual do projeto
O projeto encontra-se **em desenvolvimento avançado**.

### Falta concluir antes de produção:
#### 1️⃣ Preparação de ambientes (dev / prod)
- Separar configurações:
  - `server/.env` → desenvolvimento
  - `server/.env.production` (ou env vars no hosting) → produção
- No frontend:
  - `VITE_API_BASE_URL` distinto para dev / prod
    - dev: `http://localhost:4000/api`
    - prod: `https://api.dominio-real.pt/api`
- No CORS:
  - manter `http://localhost:5173` para dev
  - adicionar domínio real quando existir
  - remover `origin: "*"` completamente

#### 2️⃣ Pensar no deploy
Quando os pontos acima estiverem OK:
- Frontend:
  - Vercel / Netlify / outro (build Vite)
- Backend:
  - Render / Railway / outra plataforma free/low cost
  - Colocar `GOOGLE_SHEETS_*` e `GOOGLE_SHEETS_ID` como env vars lá
- Domínio + HTTPS:
  - Ligar domínio do cliente ao frontend
  - Garantir backend com HTTPS e CORS correto

#### 3️⃣ Segurança extra (mais à frente)
Quando já estiver tudo a funcionar em produção:
- Rate-limit mais apertado apenas em `/api/registrations`
- Anti-bot simples:
  - campo escondido (honeypot) no form
  - se o campo vier preenchido, ignorar o pedido
- Pequeno log extra:
  - IP resumido, user-agent, etc., num ficheiro separado (sem dados sensíveis)

---

## 📄 Licença
Projeto interno / privado — Sunlive Group.
