# 🧠 Continental Cup — Backend (API)

## TL;DR
Backend em **Node.js + Express** com validação (**Zod**), rate-limit, CORS e integração opcional com **Google Sheets**.  
Endpoint principal: `POST /api/registrations` (guarda em ficheiro + tenta enviar para Sheets).

---

## ✨ O que esta API faz
- 📝 Recebe inscrições do formulário do Continental Cup (competition registration)
- ✅ Valida payload com **Zod** (inclui regras condicionais: flight numbers só se `transport=airplane`)
- 💾 Guarda sempre um backup local em `server/data/registrations.json`
- 📊 Tenta enviar para **Google Sheets** (se falhar, não quebra o pedido)
- 🛡️ Segurança básica: **Helmet**, **Rate Limit**, **CORS** configurável
- 🩺 Health check: `GET /api/health`

---

## 🧱 Stack
- Node.js (ESM / `"type": "module"`)
- Express
- Zod (validação)
- googleapis (Sheets)
- cors, helmet, morgan, express-rate-limit
- nodemon (dev)

---

## ✅ Requisitos
- Node.js **18+** (recomendado)
- Conta/credenciais Google (opcional) para Sheets

---

## 🗂️ Estrutura (resumo)
```
server/
  controllers/
    registration.controller.js
  data/
    registrations.json
  middlewares/
    ErrorHandler.js
    notFound.js
    validateRequest.js
  routes/
    index.js
    registration.routes.js
  schemas/
    registrationSchemas.js
  services/
    registration.service.js
    registrationFileRepository.js
    registrationGoogleSheetsRepository.js
  utils/
    httpError.js
  validators/
    registration.validator.js
  app.js
  server.js
.env
package.json
```

---

## 🚀 Começar
### 1) Instalar dependências
```bash
npm install
```

### 2) Variáveis de ambiente
Cria um ficheiro `.env` na raiz do backend (ou dentro de `server/` se preferires, mas o `server.js` carrega `.env` por defeito na raiz onde corres o processo).

Exemplo mínimo:
```bash
PORT=4000
HOST=0.0.0.0
CORS_ORIGIN=http://localhost:5173,http://127.0.0.1:5173
```

### 3) Correr em desenvolvimento
```bash
npm run dev
```

O servidor fica disponível em:
- `http://localhost:4000`  
- API base: `http://localhost:4000/api`

### 4) Produção
```bash
npm start
```

---

## 🧪 Endpoints
### ✅ Health check
**GET** `/api/health`  
Resposta:
```json
{ "status": "ok" }
```

### ✅ Criar registo
**POST** `/api/registrations`  
- Valida o body com Zod (ver schema abaixo)
- Resposta (201):
```json
{ "success": true, "id": "competition-<timestamp>" }
```

Erros:
- 400:
```json
{ "error": "Validation failed", "details": [{ "field": "country", "message": "Required" }] }
```
- 404:
```json
{ "error": "Not found" }
```
- 500:
```json
{ "error": "Internal server error" }
```

📌 Nota: o `ErrorHandler.js` por defeito devolve `{ error: message }`.  
A validação devolve `{ error: "Validation failed", details }` diretamente no middleware.

---

## ✅ Schema de validação (Competition)
Ficheiro: `server/schemas/registrationSchemas.js`

Campos principais:
- `federationClub` (required)
- `country` (required)
- `transport`: `"airplane" | "car"` (required)
- `flightNrArrival` (required **apenas** se `transport=airplane`)
- `flightNrDeparture` (required **apenas** se `transport=airplane`)
- `arrivalTime` / `departureTime`: `HH:MM`
- `dayOfArrival` / `dayOfDeparture`: `YYYY-MM-DD` (ou `DD/MM/YYYY`)
- `contactName` (required)
- `phoneNumber` (mín. 7 dígitos no total; aceita + e espaços)
- `email` (opcional, valida formato)

---

## 💾 Persistência local (backup)
Mesmo com Google Sheets, a API **guarda sempre** em:
- `server/data/registrations.json`

Formato (exemplo):
```json
{
  "id": "competition-1730000000000",
  "submittedAt": "2026-11-27T10:22:00.000Z",
  "form": "competition",
  "data": {
    "federationClub": "XYZ",
    "country": "PT",
    "...": "..."
  }
}
```

⚠️ Em dev, se apagares o ficheiro, ele é recriado automaticamente com `[]`.

---

## 📊 Google Sheets (opcional)
A API tenta enviar cada registo para Sheets (se falhar, apenas faz log).

### Variáveis necessárias
```bash
GOOGLE_SHEETS_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GOOGLE_SHEETS_CLIENT_EMAIL=xxxx@xxxx.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_RANGE=Registrations!A:Z
```

📌 Notas importantes:
- O `PRIVATE_KEY` deve ter `\n` no `.env`. O código faz `replace(/\\n/g, "\n")`.
- Tens de **partilhar a Google Sheet** com o `GOOGLE_SHEETS_CLIENT_EMAIL` (service account), com permissões de Editor.
- `GOOGLE_SHEETS_RANGE` é opcional (default: `Registrations!A:Z`).

### Colunas enviadas
O backend constrói uma row com:
1) `submittedAt` formatado `DD-MM-YYYY HH:mm` (Europe/Lisbon)  
2) `"27th – 29th November"` (fixo)  
3) `federationClub`, `country`, `transport`, `flightNrArrival`, `flightNrDeparture`, `arrivalTime`, `departureTime`, `dayOfArrival`, `dayOfDeparture`, `contactName`, `phoneNumber`, `email`  
+ última coluna: `extras` (JSON dos campos adicionais, se existirem)

---

## 🔐 CORS
Config em `server/app.js` via env `CORS_ORIGIN` (lista separada por vírgulas):

```bash
CORS_ORIGIN=http://localhost:5173,https://continentalcup.sunlive.pt
```

Se não definires, usa defaults:
- `http://localhost:5173`
- `http://127.0.0.1:5173`

---

## 🛡️ Rate limit
Aplicado em `/api`:
- janela: **15 min**
- max: **100 requests** por IP

Config em `server/app.js`.

---

## 🧯 Troubleshooting
- ❌ `CORS blocked: ...`  
  ✅ Origem não está na lista `CORS_ORIGIN`. Adiciona o domínio correto.

- ❌ Sheets não recebe registos  
  ✅ Confirma:
  - Sheet partilhada com a service account
  - `GOOGLE_SHEETS_ID` correto
  - `GOOGLE_SHEETS_PRIVATE_KEY` com `\n`
  - `GOOGLE_SHEETS_RANGE` existe (nome da folha)

- ❌ 400 Validation failed  
  ✅ Verifica os campos obrigatórios (e flight numbers quando `transport=airplane`).

---

## 🧰 Exemplos rápidos (curl)
### Health
```bash
curl http://localhost:4000/api/health
```

### Criar registo
```bash
curl -X POST http://localhost:4000/api/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "federationClub": "Club X",
    "country": "Portugal",
    "transport": "car",
    "arrivalTime": "10:30",
    "departureTime": "18:15",
    "dayOfArrival": "2026-11-27",
    "dayOfDeparture": "2026-11-29",
    "contactName": "João",
    "phoneNumber": "+351 912 345 678",
    "email": "joao@email.com"
  }'
```

---

## 📌 Deploy (notas rápidas)
- Define `PORT`, `HOST` e `CORS_ORIGIN` no ambiente
- Se precisares de Sheets em produção, configura as 3 vars de Sheets e partilha a sheet com a service account
- Garante persistência para `server/data/registrations.json` (ou monta volume/armazenamento se estiver em container)

---

## 📄 Licença
Projeto interno / privado (ajusta se fores abrir o repositório).
