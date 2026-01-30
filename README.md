# Finance App API 🔧

**Backend em Node.js para gerenciamento de usuários e transações financeiras.** Projeto de estudo do curso FSC — atualmente **estou estudando/implementando autenticação** (em progresso). 💡

---

## ✨ Visão geral

API simples para gerenciar usuários e suas transações (ganhos, despesas e investimentos). Inclui validação de entrada com **Zod**, persistência com **Prisma + PostgreSQL** e testes com **Jest + Supertest**.

## 🚀 Funcionalidades principais

- CRUD de usuários
- CRUD de transações (associadas a usuários)
- Cálculo de saldo por usuário
- Validação de dados com `zod`
- Testes automatizados com `jest` e `supertest`
- Documentação OpenAPI/Swagger disponível em `docs/swagger.json`

## 🧰 Stack

- Node.js (ES Modules)
- Express
- Prisma (Postgres)
- Zod
- Jest, Supertest
- Bcrypt (para hash de senhas)
- Dayjs, UUID, Validator

## Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL (local ou remoto)
- Docker (opcional, usado em CI e para testes locais via `docker compose`)

## ⚙️ Configuração e execução

1. Clone o repositório:

```bash
git clone <repo-url>
cd FINANCE-APP-API
```

2. Instale dependências:

```bash
npm install
```

3. Configure variáveis de ambiente (ex.: `.env`):

- `DATABASE_URL` — string de conexão com o Postgres
- `PORT` (opcional, padrão 3000)

> Há um arquivo `.env.test` para executar os testes em um banco separado (usado pelo CI). 🧪

4. Execute migrations:

```bash
# Usando script do projeto
npm run migration

# Ou com o Prisma diretamente
npx prisma migrate dev
```

5. Inicie a aplicação:

```bash
npm run start       # produção
npm run start:dev   # desenvolvimento (watch)
```

A API escuta por padrão na porta `3000`.

## 🧪 Testes

- Executar todos os testes:

```bash
npm run test
```

- Cobertura de testes:

```bash
npm run test:coverage
```

O pipeline de testes usa `docker compose` para levantar um banco Postgres de teste (veja `jest.global-setup.js`).

## 📚 Documentação

A especificação OpenAPI está em `docs/swagger.json`. A documentação hospedada está disponível em: https://finance-app-api-6z2o.onrender.com/docs/. Você pode usar `swagger-ui-express` (já instalado) para servir a documentação localmente.

## Estrutura do projeto

- `src/` — código-fonte
    - `routes/` — rotas (users, transactions)
    - `controllers/`, `use-cases/`, `repositories/` — camadas do app
- `prisma/` — schema e migrations
- `tests/` — testes

## 🔒 Autenticação

**Status:** Em estudo/implementação.\*\*

O projeto já armazena senhas e usa `bcrypt` para hashing; o próximo passo é criar o fluxo de autenticação (login/jwt/session) e proteger endpoints sensíveis.

## 🤝 Contribuindo

Contribuições são bem-vindas — abra issues ou PRs com melhorias, correções de bugs e testes.

## 📄 Licença

MIT

---

Se quiser, posso adicionar um exemplo de `.env.example`, exemplos de requisições com `curl`/`httpie` ou um badge de cobertura. ✅
