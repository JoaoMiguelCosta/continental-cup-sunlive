# 🌍 Continental Cup — Frontend

## TL;DR
Frontend em **React + Vite** para o site do **International Continental Cup 2026** (uma página com secções e scroll suave).  
Consome o backend via `POST /api/registrations` (configurável por env).

---

## ✨ O que este frontend faz
- 🧭 **Header fixo** com navegação por secções (scroll suave com offset).
- 🏟️ Secções: **Hero**, **Mensagem (CEO)**, **Competition**, **Venue**, **Hotel/Rest**, **Sunlive**, **Organization/Partners**, **Contacts**, **Footer**.
- 📝 **Modal de Registration Form** com validação + envio para o backend.
- 🖼️ **Poster Modal** para abrir o poster em overlay.
- ⬆️ **Back To Top** aparece após scroll.

---

## 🧱 Stack
- ⚛️ React
- ⚡ Vite
- 🎨 CSS Modules
- 🌐 Fetch API (para chamadas ao backend)
- 🗂️ Conteúdo centralizado em `src/config/content/home.content.js`

---

## ✅ Requisitos
- Node.js **18+** (recomendado)
- npm / pnpm / yarn (qualquer um)

---

## 🚀 Começar
### 1) Instalar dependências
```bash
npm install
```

### 2) Variáveis de ambiente
Cria um ficheiro `.env.local` na raiz do frontend:

```bash
VITE_API_BASE_URL=http://localhost:4000
```

📌 Notas:
- Podes meter **com ou sem** `/api`. O frontend garante que a URL final fica com `/api`.
  - Ex.: `http://localhost:4000` ✅ -> usa `http://localhost:4000/api`
  - Ex.: `http://localhost:4000/api` ✅ -> mantém

### 3) Correr em desenvolvimento
```bash
npm run dev
```

A app abre por defeito em:
- `http://localhost:5173`

---

## 🧪 Scripts úteis
```bash
npm run dev       # dev server
npm run build     # build para produção
npm run preview   # preview do build (local)
```

---

## 🔌 Integração com Backend (registos)
O envio do formulário usa:

- **POST** `{{VITE_API_BASE_URL}}/api/registrations`
- Payload: JSON com os campos do formulário (ex.: `federationClub`, `country`, etc.)
- Resposta esperada:
  - ✅ `{ success: true, id }`
  - ❌ `{ error, details? }`

Código:
- `src/shared/api/registrations.js`

Exemplo (resumo):
```js
await fetch(`${API_ROOT}/registrations`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(values),
});
```

---

## 🗂️ Estrutura (resumo)
```
src/
  assets/
    backgrounds/   # imagens de fundo
    logos/         # logos (Sunlive, Continental Cup, etc.)
    person/        # fotos (ex.: lucas.jpg)
    poster/        # poster.png
  config/
    content/
      home.content.js   # conteúdo central (textos, links, imagens, ids das secções)
  page/
    home/
      components/
        header/
        hero/
        message/
        competition/
        venue/
        hotel/
        sunlive/
        contacts/
        footer/
        backToTop/
        poster/
        registrationForm/
      Home.jsx
      Home.module.css
  shared/
    api/
      registrations.js
  styles/
    design.tokens.css
    global.css
```

---

## 📦 Ficheiros estáticos (downloads / PDF)
Este projeto usa links para ficheiros estáticos servidos pelo Vite em produção.

### ✅ Zips (Competition)
Na `home.content.js`:
- `/downloads/continental-cup-2026-mag.zip`
- `/downloads/continental-cup-2026-wag.zip`

➡️ Coloca estes ficheiros em:
```
public/downloads/
  continental-cup-2026-mag.zip
  continental-cup-2026-wag.zip
```

### ✅ PDF (Sunlive Presentation)
Na `home.content.js`:
- `/books/sunlive_apresentation.pdf`

➡️ Coloca este ficheiro em:
```
public/books/
  sunlive_apresentation.pdf
```

---

## 🧭 Navegação por secções
Os `id` usados no header e em cada secção vêm do conteúdo:

- Header: `homeContent.header.navItems[].targetId`
- Secções (exemplos):
  - `home` (Hero)
  - `cup` (Competition)
  - `venue`
  - `hotel-rest`
  - `sunlive`
  - `contacts`

📌 O header aplica `headerOffset = 80` para compensar a altura do menu fixo.  
Se mudares a altura do header, atualiza esse valor em:
- `src/page/home/components/header/header.jsx`

---

## 🧩 Componentes importantes
- `HomeHeader` → navegação/scroll com offset
- `Hero` → CTAs (Poster/Registration)
- `CompetitionSection` → abre modal de registo + downloads MAG/WAG
- `RegistrationFormModal` → modal com form + sucesso
- `PosterModal` → modal do poster (portal para `document.body`)
- `HomeContactsSection` → contactos + links + mapa (OpenStreetMap embed)
- `BackToTopButton` → botão flutuante após scroll

---

## 🧯 Troubleshooting
- ❌ “Servidor indisponível…”  
  ✅ Backend não está a correr ou `VITE_API_BASE_URL` está errado.

- ❌ 404 em `/downloads/...` ou `/books/...`  
  ✅ Confirma se os ficheiros estão em `public/downloads` e `public/books`.

- ❌ Scroll fica “desalinhado” ao clicar no menu  
  ✅ Ajusta `headerOffset` no `HomeHeader`.

---

## 📌 Deploy (notas rápidas)
- Faz `npm run build`
- Publica o conteúdo da pasta `dist/`
- Garante que o backend está acessível (CORS/URL correta) e define `VITE_API_BASE_URL` no ambiente de build.

---

## 📄 Licença
Projeto interno / privado (ajusta aqui se fores abrir o repositório).
