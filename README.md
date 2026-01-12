# 🏆 Continental Cup 2026 — Official Website

Website oficial do **International Continental Cup 2026 (MAG & WAG)**.  
Single-page responsiva, construída em **React + Vite**, com navegação por âncoras, conteúdo centralizado em configuração e **formulário de inscrição via Google Forms** em modal.

🌍 **Produção:**  
👉 https://continentalcup.sunlive.pt/

---

## 📌 Visão Geral

O site apresenta toda a informação do evento:

- Hero com datas, localização e poster
- Mensagem institucional (CEO Sunlive Group)
- Secção **Competition** com:
  - Modal de inscrição (Google Forms)
  - Downloads oficiais **MAG / WAG**
- Venue (Velódromo de Sangalhos)
- Hotel & Restaurant
- Sunlive Group
- Contactos + mapa
- Footer institucional

---

## 🧱 Stack Tecnológica

- ⚛️ React
- ⚡ Vite
- 🎨 CSS Modules
- 🧩 Conteúdo centralizado em config (`home.content.js`)
- 📝 Google Forms integrado via `iframe`

---

## 🚀 Produção

- **Domínio:** https://continentalcup.sunlive.pt/
- **Tipo:** Static SPA (Single Page Application)
- **Build:** `vite build`
- **Output:** `/dist`

---

## 📂 Estrutura do Projeto

```
src/
  page/
    home/
      components/
        backToTop/
        competition/
        contacts/
        footer/
        header/
        hero/
        hotel/
        message/
        poster/
        sunlive/
        venue/
        HomeOrgPartnersSection/
      Home.jsx
      Home.module.css

  config/
    content/
      home.content.js

  assets/
    backgrounds/
    logos/
    person/
    poster/

  styles/
    global.css

App.jsx
main.jsx
index.html
```

---

## 🧠 Gestão de Conteúdo

Todo o conteúdo do site é controlado a partir de:

📄 `src/config/content/home.content.js`

Inclui:

- Menu / navegação
- Hero (títulos, datas, poster)
- Secção Competition (textos, botões, downloads)
- Venue, Hotel, Sunlive
- Contacts + mapa
- Footer

---

## 🏆 Competition — Registration Form

A secção **Competition** inclui um botão de inscrição que abre um **modal** com um **Google Form** embutido.

📍 Componente:
`src/page/home/components/competition/Competition.jsx`

Funcionalidades:

- Modal com `iframe`
- Fecho por:
  - Botão ✕
  - Click fora (overlay)
  - Tecla `ESC`
- Scroll do body bloqueado enquanto o modal está aberto
- Indicador de carregamento do formulário

---

## 📥 Downloads Oficiais (MAG / WAG)

Após submissão do formulário, os ficheiros oficiais podem ser descarregados:

- **MAG:** `/downloads/continental-cup-2026-mag.zip`
- **WAG:** `/downloads/continental-cup-2026-wag.zip`

📌 Localização esperada:

```
public/downloads/
```

---

## 🖼️ Assets

Todos os assets são geridos via Vite:

- Fundos: `assets/backgrounds`
- Logos: `assets/logos`
- Pessoas: `assets/person`
- Poster oficial: `assets/poster`

---

## 🌍 HTML Base

📄 `index.html`

- `lang="en"`
- Favicon configurado:

```
/public/continental-cup-icon.png
```

---

## 📱 Responsividade

- Totalmente responsivo (mobile / tablet / desktop)
- Layout modular por secção
- CSS Modules para isolamento de estilos

---

## 🧭 Navegação

Navegação por âncoras (`id`):

- `home`
- `cup`
- `venue`
- `hotel-rest`
- `sunlive`
- `contacts`

---

## 📧 Contactos Oficiais

**Event Manager:** Francesca Borg  
📞 (+356) 99164245  
✉️ malta@sunlive.pt

---

## © Licença

© 2026 Sunlive Group — All Rights Reserved
