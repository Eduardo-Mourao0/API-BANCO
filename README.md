# 🏦 API Banco

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

API RESTful para simulação de operações bancárias, desenvolvida com **Node.js**, **TypeScript**, **Express**, **Prisma ORM** e **PostgreSQL**.

> Projeto educacional para praticar conceitos de desenvolvimento backend, criação de APIs REST, uso de ORM e organização de projetos em TypeScript.

---

## 🚀 Tecnologias

| Tecnologia | Descrição |
|---|---|
| [Prisma ORM](https://www.prisma.io/) | ORM moderno para banco de dados |
| [PostgreSQL](https://www.postgresql.org/) | Banco de dados relacional |
| [Docker](https://www.docker.com/) | Containerização do banco de dados |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | Hash de senhas |
| [uuid](https://github.com/uuidjs/uuid) | Geração de IDs únicos |

---

## 📋 Funcionalidades

### 👤 Usuários
- ✅ Criar usuário
- ✅ Deletar usuário

### 💳 Contas
- ✅ Criar conta
- ✅ Consultar conta
- ✅ Deletar conta

### 💸 Transferências
- ✅ Transferir saldo entre contas
- ✅ Validação de saldo disponível
- ✅ Atualização atômica de saldo via transações do Prisma

---

## 🏗️ Arquitetura

O projeto segue uma **arquitetura em camadas** com separação de responsabilidades:

```
src/
├── controllers/    # Recebe requisições e retorna respostas HTTP
├── services/       # Regras de negócio
├── repositories/   # Acesso ao banco de dados via Prisma
├── routes/         # Definição das rotas da API
└── server.ts       # Entrada da aplicação
prisma/
└── schema.prisma   # Esquema do banco de dados
```

---

## 🧠 Conceitos Aplicados

- **Separação de responsabilidades** — controllers, services e repositories bem definidos
- **Arquitetura em camadas** — organização clara do fluxo de dados
- **Transações de banco de dados** — garantia de atomicidade nas transferências via Prisma
- **ORM** — abstração do banco de dados com Prisma Client
- **Hash de senha** — uso de bcrypt para segurança das credenciais
- **UUIDs** — identificadores únicos para entidades
- **Containerização** — banco de dados isolado com Docker

---

## 👨‍💻 Autor

**Eduardo Mourão Aragão**

Estudante de Engenharia de Software, interessado em desenvolvimento Backend e construção de APIs.
