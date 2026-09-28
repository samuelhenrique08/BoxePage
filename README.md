
# AccessHub — Sistema de Login e Cadastro

Sistema web de autenticação desenvolvido como projeto acadêmico para a disciplina de **Banco de Dados** do curso técnico em Informática.

O projeto permite que usuários criem uma conta, façam login com suas credenciais e acessem uma landing page de demonstração. Os dados complementares dos usuários são armazenados em um banco de dados PostgreSQL através do Supabase.

## 🚀 Funcionalidades

- Cadastro de usuários com nome, e-mail e senha.
- Autenticação utilizando Supabase Auth.
- Login com e-mail e senha.
- Armazenamento de perfis no banco de dados PostgreSQL.
- Exibição do nome do usuário autenticado.
- Verificação de sessão ao abrir a aplicação.
- Logout para encerrar a sessão.
- Validação dos campos dos formulários.
- Mensagens de sucesso e erro.
- Interface responsiva para diferentes tamanhos de tela.

## 🛠️ Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| HTML5 | Estrutura das páginas |
| CSS3 | Estilização e responsividade |
| JavaScript | Lógica e integração com o banco |
| Supabase Auth | Cadastro e autenticação |
| PostgreSQL | Armazenamento dos dados |
| Row Level Security (RLS) | Controle de acesso aos registros |
| SQL | Criação das tabelas, políticas e triggers |

## 📁 Estrutura do projeto

```text
projeto-login-supabase/
├── index.html
├── style.css
├── script.js
└── README.md
```

## ⚙️ Como executar o projeto

### 1. Pré-requisitos

- Visual Studio Code.
- Navegador atualizado.
- Conta no Supabase.
- Extensão Live Server para o VS Code.

### 2. Criar o projeto no Supabase

1. Acesse [supabase.com](https://supabase.com/).
2. Crie uma conta ou entre na sua conta existente.
3. Crie um novo projeto.
4. Abra o SQL Editor.
5. Execute o script SQL responsável pela criação da tabela `profiles`, das políticas de segurança e do trigger de cadastro automático.

### 3. Configurar as credenciais

No painel do Supabase, localize a URL do projeto e a chave pública de API.

Abra o arquivo `script.js` e configure as variáveis:

```javascript
const SUPABASE_URL = "SUA_URL_DO_SUPABASE";
const SUPABASE_KEY = "SUA_CHAVE_PUBLICA";
```

Substitua os valores pelos dados do seu projeto.

**Importante:** utilize somente a chave pública apropriada para aplicações no navegador. Nunca exponha chaves secretas ou `service_role` no código do front-end.

### 4. Executar localmente

1. Abra a pasta do projeto no Visual Studio Code.
2. Clique com o botão direito no arquivo `index.html`.
3. Selecione **Open with Live Server**.
4. A aplicação será aberta no navegador.

### 5. Testar a aplicação

1. Acesse a opção de cadastro.
2. Informe nome, e-mail e senha.
3. Crie sua conta.
4. Caso seja solicitada confirmação de e-mail, confirme o endereço.
5. Faça login com as credenciais cadastradas.
6. Verifique se a landing page exibe seu nome.
7. Clique em "Sair" para encerrar a sessão.

## 🗄️ Estrutura do banco de dados

O projeto utiliza duas estruturas principais no Supabase.

### Supabase Auth — `auth.users`

Gerenciada pelo sistema de autenticação do Supabase.

Armazena informações da conta, como:

- ID do usuário (UUID).
- E-mail.
- Informações de autenticação.

As senhas são gerenciadas pelo Supabase Auth e não são armazenadas diretamente na tabela pública `profiles`.

### Tabela `profiles`

Armazena informações complementares dos usuários.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | UUID | Identificador do usuário e chave primária |
| `full_name` | TEXT | Nome completo do usuário |
| `created_at` | TIMESTAMPTZ | Data e hora de criação do perfil |

O campo `id` também funciona como chave estrangeira, relacionando cada perfil à conta correspondente em `auth.users`.

### Relacionamento

```text
auth.users
    |
    | id
    |
    v
profiles
    ├── id
    ├── full_name
    └── created_at
```

Um trigger do PostgreSQL cria automaticamente um perfil quando uma nova conta é registrada.

## 🔐 Segurança

O projeto utiliza mecanismos de segurança disponibilizados pelo Supabase:

- Autenticação de usuários pelo Supabase Auth.
- Row Level Security (RLS) na tabela `profiles`.
- Políticas de acesso para restringir a leitura e a criação de perfis ao próprio usuário.
- Chave pública de API para a integração no navegador.
- Senhas gerenciadas pelo sistema de autenticação.

A interface é uma demonstração acadêmica. A proteção dos dados é aplicada no banco de dados, mas páginas e operações sensíveis de sistemas reais também precisam de autorização adequada no servidor.

## 🎯 Objetivo acadêmico

Este projeto tem como objetivo aplicar, na prática, conceitos estudados na disciplina de Banco de Dados, incluindo:

- Modelagem e criação de tabelas.
- Tipos de dados SQL.
- Chaves primárias e estrangeiras.
- Relacionamentos entre dados.
- Triggers e funções no PostgreSQL.
- Operações de inserção e consulta.
- Autenticação de usuários.
- Controle de acesso com RLS.

## 👨‍💻 Autor

**Samuel Henrique**

Estudante do curso técnico em Informática, com interesse em desenvolvimento de software, bancos de dados e tecnologias web.

---

Desenvolvido para fins educacionais.
