# 🚀 My Goals Server - Backend

API RESTful robusta e performática para gerenciamento de metas pessoais com sistema de gamificação, autenticação OAuth e arquitetura moderna.

## 📋 Sobre o Projeto

O **My Goals Server** é a API do sistema de metas pessoais, criada com foco em performance, segurança e escalabilidade. Desenvolvido com Node.js, TypeScript nativo e Fastify, inclui autenticação via GitHub, sistema de níveis, progresso semanal e documentação automática via Swagger.

### 🎯 Objetivos Técnicos do Projeto

- **Demonstrar proficiência em Node.js moderno** com TypeScript nativo e features experimentais
- **Implementar arquitetura API-first** com documentação automática via OpenAPI/Swagger
- **Aplicar padrões de segurança** com JWT e autenticação OAuth GitHub
- **Desenvolver sistema de gamificação** com lógica de níveis e experiência
- **Criar estrutura de dados otimizada com Drizzle** com migrations e seeding automatizados
- **Implementar testes automatizados** com cobertura e ambientes isolados

## 🚀 Desenvolvido durante o NLW - Rocketseat

Este projeto foi desenvolvido(com pequenas mudanças) durante o Next Level Week (NLW) da Rocketseat, um evento intensivo de programação focado em tecnologias modernas. O projeto demonstra a aplicação prática de conceitos avançados de backend, APIs REST e desenvolvimento server-side contemporâneo.

## ✨ Principais Funcionalidades

- **🔐 Autenticação OAuth GitHub** - Sistema de login seguro e seamless
- **✅ Sistema de Completude** - Marcação de metas como concluídas com histórico
- **📊 Métricas de Progresso** - Cálculos de progresso semanal
- **🎮 Sistema de Gamificação** - Níveis e experiência baseadas em metas
- **📚 Documentação Automática** - Swagger UI integrado para exploração da API

## 🚀 Tecnologias Utilizadas

### Core & Runtime

- **Node.js** - Runtime JavaScript com TypeScript
- **TypeScript 5.8** - Tipagem estática avançada sem necessidade de compilação
- **Fastify** - Framework web ultra-performático
- **Zod** - Validação de esquemas TypeScript com inferência de tipos

### Banco de Dados & ORM

- **PostgreSQL** - Banco de dados relacional robusto e escalável
- **Drizzle ORM** - ORM TypeScript para PostgreSQL
- **Drizzle Kit** - Ferramentas de migration
- **Drizzle Seed** - Sistema de seeding para dados de desenvolvimento e teste

### Autenticação & Segurança

- **Fastify JWT** - Implementação JWT otimizada para Fastify
- **JOSE** - Biblioteca para manipulação segura de tokens JWT
- **Fastify CORS** - Configuração flexível de CORS para APIs

### Documentação & Validação

- **Fastify Swagger** - Geração automática de documentação OpenAPI 3.0
- **Fastify Swagger UI** - Interface web para exploração da API

### Desenvolvimento & Testes

- **Vitest** - Framework de testes rápido e moderno
- **Biome** - Linter e formatter performático
- **Faker.js** - Geração de dados fake para testes e desenvolvimento
- **dotenv-cli** - Gerenciamento de variáveis de ambiente para diferentes contextos

## 📁 Estrutura do Projeto

```
src/
├── .github/
│   └── workflows/        # CI/CD pipelines
├── db/
│   ├── migrations/       # Migrations do banco de dados
│   ├── schema/           # Definições de schema Drizzle
│   └── seed.ts          # Scripts de seeding
├── factories/            # Factories para testes
├── http/
│   ├── routes/          # Definições de rotas da API
│   ├── middleware/      # Middlewares customizados
│   └── server.ts        # Configuração do servidor Fastify
├── services/            # Lógica de negócio e casos de uso
├── types/               # Definições de tipos TypeScript
├── use-cases/           # Casos de uso isolados
└── envs/                # Configurações de ambiente
```

## ⚙️ Pré-requisitos

- Node.js 20+ (com suporte a `--experimental-strip-types`)
- PostgreSQL 13+
- pnpm (recomendado)

## 🔧 Instalação e Execução

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
```

2. **Instale as dependências**

```bash
pnpm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
cp .env.test.example .env.test
```

4. **Configure o banco de dados**

```bash
docker-compose up -d
```

5. **Execute as migrations**

```bash
pnpm db:migrate
```

6. **Popule o banco com dados de exemplo**

```bash
pnpm db:seed
```

7. **Execute o servidor em modo desenvolvimento**

```bash
pnpm dev
```

A API estará disponível em `http://localhost:3333`
A documentação Swagger UI estará em `http://localhost:3333/docs`

## 📦 Scripts Disponíveis

### Desenvolvimento

- `pnpm dev` - Inicia o servidor em modo desenvolvimento
- `pnpm db:studio` - Abre interface visual do banco de dados

### Banco de Dados

- `pnpm db:generate` - Gera migrations baseadas no schema
- `pnpm db:migrate` - Executa migrations pendentes
- `pnpm db:seed` - Popula o banco com dados de exemplo

### Testes

- `pnpm test` - Executa todos os testes
- `pnpm test:watch` - Executa testes em modo watch
- `pnpm db:migrate:test` - Executa migrations no ambiente de teste

## 🔗 Links Relacionados

- [Documentação do Fastify](https://fastify.dev/)
- [Documentação do Drizzle ORM](https://orm.drizzle.team/)
- [Documentação do Zod](https://zod.dev/)
- [Documentação do Vitest](https://vitest.dev/)
- [Documentação do PostgreSQL](https://www.postgresql.org/docs/)
- [Documentação do TypeScript](https://www.typescriptlang.org/)

---

**💼 Projeto desenvolvido como showcase de habilidades em desenvolvimento backend moderno**

Demonstra proficiência em: Node.js, TypeScript, Fastify, PostgreSQL, Drizzle ORM, JWT, OAuth, testes automatizados e arquitetura de APIs escaláveis.
