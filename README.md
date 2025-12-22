# 🏆 Continental Cup — Sunlive Group

## TL;DR

Projeto web completo (Frontend + Backend) para o **International Continental Cup 2026**.  
🚧 **Em desenvolvimento** — funcional em dev, a faltar preparação final para produção.

---

## 🌍 Sobre o projeto

O **Continental Cup** é um projeto desenvolvido para a **Sunlive Group**, com o objetivo de divulgar oficialmente o evento e gerir **inscrições internacionais** de ginástica (MAG & WAG).

A aplicação foi pensada para:

- Ser clara e intuitiva para atletas, clubes e federações
- Centralizar inscrições de forma segura
- Permitir fácil evolução e manutenção

---

## 🧱 Arquitetura

O projeto está dividido em **duas partes independentes**:

### 🎨 Frontend

- Website institucional do evento
- Página única com secções
- Formulário de inscrição em modal
- Comunicação direta com a API

### 🧠 Backend

- API REST para inscrições
- Validação rigorosa dos dados
- Persistência local + Google Sheets
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
├─ src/                        # Frontend (React + Vite)
├─ server/                     # Backend (Express API)
├─ public/                     # PDFs, posters e downloads
│
├─ README.md                   # README geral (este ficheiro)
├─ README-frontend-continental-cup.md
└─ README-backend-continental-cup.md
```

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
- Backup local (`registrations.json`)
- Integração com Google Sheets
- Health check (`/api/health`)

---

## 🚧 Estado do projeto

O projeto encontra-se **em desenvolvimento avançado**.

### Falta concluir antes de produção:

#### 1️⃣ Preparação de ambientes (dev / prod)

- Separar configurações:
  - `server/.env` → desenvolvimento
  - `server/.env.production` ou env vars no hosting → produção
- No frontend:
  - `VITE_API_BASE_URL` distinto para dev / prod
- No CORS:
  - manter `http://localhost:5173` em dev
  - adicionar domínio real em produção
  - remover `origin: "*"`

#### 2️⃣ Deploy

- Frontend:
  - Vercel / Netlify / similar
- Backend:
  - Render / Railway / similar
  - Definir vars:
    - `GOOGLE_SHEETS_CLIENT_EMAIL`
    - `GOOGLE_SHEETS_PRIVATE_KEY`
    - `GOOGLE_SHEETS_ID`
- Domínio + HTTPS:
  - Ligar domínio ao frontend
  - Garantir backend com HTTPS e CORS correto

#### 3️⃣ Segurança extra (fase seguinte)

- Rate-limit mais apertado apenas em `/api/registrations`
- Anti-bot simples:
  - Honeypot no formulário
- Logging leve adicional:
  - IP resumido
  - user-agent
  - sem dados sensíveis

---

## 📄 READMEs específicos

- 📘 Frontend → `README.md`
- 📗 Backend → `README.md`

---

## 📌 Nota final

Este projeto segue a mesma filosofia do **WAG Training Camp**:

- Código organizado
- Separação clara de responsabilidades
- Preparado para escalar e ir para produção

🚀 Próximo passo: **finalizar ambientes e fazer deploy**.

---

## 📄 Licença

Projeto interno / privado — Sunlive Group.
