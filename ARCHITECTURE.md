# ITAGAME | Arquitetura Técnica e Design de Dados

Inspirado no conceito da Gamefik, este documento detalha a estrutura da plataforma ITAGAME, focada em gamificação educacional.

## 1. Arquitetura Técnica

A plataforma segue o padrão de arquitetura de **Single Page Application (SPA)** com um Backend apartado.

### Frontend
- **Framework**: React 18+ com TypeScript.
- **Styling**: Tailwind CSS (UI Premium/Dark Theme).
- **Gerenciamento de Estado**: React Context API ou Redux Toolkit.
- **Ícones**: Lucide React + Emojis (Estilo Gamificado).
- **Animações**: Framer Motion.

### Backend (Recomendado)
- **Linguagem**: Node.js (Express ou NestJS).
- **Autenticação**: JWT (JSON Web Tokens) com Refresh Tokens.
- **Real-time**: WebSockets (Socket.io) para notificações e rankings ao vivo.

### Banco de Dados
- **Tipo**: Relacional (PostgreSQL).
- **ORM**: Prisma ou TypeORM.

---

## 2. Estrutura do Banco de Dados (PostgreSQL)

### Tabela: `users`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID (PK) | Identificador único. |
| `name` | VARCHAR | Nome completo. |
| `email` | VARCHAR (Unique) | E-mail de login. |
| `password_hash` | TEXT | Senha criptografada. |
| `role` | ENUM | ADMIN, TEACHER, STUDENT. |
| `avatar` | TEXT | URL da imagem ou emoji. |
| `created_at` | TIMESTAMP | Data de cadastro. |

### Tabela: `student_stats`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID (PK) | FK para `users.id`. |
| `level` | INTEGER | Nível atual do aluno. |
| `xp` | INTEGER | Experiência acumulada. |
| `coins` | INTEGER | Moedas virtuais. |
| `missions_completed` | INTEGER | Contador de missões. |

### Tabela: `missions`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID (PK) | Identificador único. |
| `title` | VARCHAR | Título da missão. |
| `description` | TEXT | Descrição pedagógica. |
| `reward_xp` | INTEGER | XP concedido ao completar. |
| `reward_coins` | INTEGER | Moedas concedidas. |
| `type` | ENUM | QUIZ, SUBMISSION, AUTOMATIC. |
| `status` | ENUM | DRAFT, ACTIVE, ARCHIVED. |

### Tabela: `submissions` (Evidências)
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID (PK) | Identificador único. |
| `student_id` | UUID (FK) | Quem enviou. |
| `mission_id` | UUID (FK) | Qual missão. |
| `content` | TEXT | Link ou texto da evidência. |
| `status` | ENUM | PENDING, APPROVED, REJECTED. |
| `feedback` | TEXT | Comentário do professor. |

---

## 3. Wireframe & Fluxo de Experiência

1. **Dashboard Admin**: Visão macro de engajamento e saúde da plataforma.
2. **Portal Professor**: Gestão de turmas, criação de missões e validação de envios.
3. **App Aluno**: Narrativa gamificada, store, ranking e execução de desafios.

---

## 4. Segurança
- Proteção contra SQL Injection via ORM.
- Senhas protegidas com BCrypt.
- Middleware de autorização baseado em Roles (RBAC).

---

Este projeto visa ser a ferramenta definitiva para engajamento educacional, unindo a psicologia dos jogos com objetivos pedagógicos reais.
