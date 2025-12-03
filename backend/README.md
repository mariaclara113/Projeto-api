# API Ponto - Extensionistas (versão simples)

### Tecnologias
- ExpressJS
- TypeScript
- Prisma (Postgres)
- Zod (validação)
- Swagger (swagger-jsdoc + swagger-ui-express)

### Rodando localmente
1. Copie `.env.example` para `.env` e configure `DATABASE_URL`.
2. Instale dependências:
   ```bash
   npm install
   ```
3. Gere o cliente Prisma:
   ```bash
   npx prisma generate
   ```
4. Crie a migration (ou use `prisma db push`):
   ```bash
   npx prisma migrate dev --name init
   ```
5. Rode a aplicação em desenvolvimento:
   ```bash
   npm run dev
   ```
6. Acesse a docs: `http://localhost:3333/api/docs`

