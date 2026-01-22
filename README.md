# 📰 Plataforma de Curadoria e Publicação de Notícias da Paraíba

Projeto desenvolvido no contexto do **Bolsa Futuro Digital**, com o objetivo de criar uma plataforma para **coleta automática, curadoria editorial e publicação de notícias**, com foco em conteúdos relacionados aos municípios do estado da Paraíba.

---

## 📌 Problema

Portais de notícias publicam diariamente um grande volume de informações, dificultando:

- A curadoria editorial eficiente  
- A organização das notícias por tema e município  
- O controle do que é publicado ou descartado  
- O acesso do público a notícias confiáveis e filtradas  

Além disso, redações precisam de ferramentas que permitam **diferentes níveis de acesso**, conforme o papel do usuário (editor, jornalista, estagiário ou visitante).

---

## 💡 Solução Proposta

Foi desenvolvida uma **plataforma web de gerenciamento de notícias**, que:

- Coleta automaticamente notícias via **RSS**
- Permite **curadoria editorial** antes da publicação
- Organiza notícias por **tema e município**
- Oferece **controle de permissões por tipo de usuário**
- Disponibiliza uma **área pública** para leitura das notícias aprovadas

A solução automatiza tarefas repetitivas e garante maior controle e qualidade no fluxo editorial.

---

## 🏗️ Arquitetura da Solução

A aplicação segue uma arquitetura **client-server**, separando claramente **back-end** e **front-end**.

### 🔧 Back-end
- **Node.js**
- **Express.js**
- **Banco de Dados SQL** (PostgreSQL)
- API RESTful
- Autenticação baseada em perfil de usuário
- Cron job para coleta automática via RSS

### 🎨 Front-end
- Aplicação web para:
  - Área pública de notícias
  - Painel de curadoria
  - Criação e edição de notícias
  - Favoritos e buscas

---

## 👥 Perfis de Usuário e Permissões

### 👑 Editor
- Visualiza notícias importadas via RSS
- Edita, aprova ou recusa notícias
- Cria notícias manualmente (publicação direta)
- Acessa painel editorial
- Favorita notícias
- Acessa área pública

### ✍️ Jornalista
- Visualiza notícias importadas
- Cria notícias manuais (aguardando aprovação)
- Edita notícias próprias antes da aprovação
- Compartilha notícias para revisão
- Favorita notícias
- Acessa área pública

### 🧑‍💼 Estagiário
- Visualiza notícias importadas
- Consulta detalhes
- Favorita notícias
- Não cria nem edita conteúdo
- Acessa área pública

### 🌍 Visitante
- Acessa apenas a área pública
- Visualiza notícias aprovadas

---

## ⚙️ Funcionalidades Implementadas

### 🔄 Coleta Automática de Notícias (RSS)
- Leitura periódica de feeds RSS de portais da Paraíba
- Extração de:
  - Título
  - Descrição
  - Data de publicação
  - Link da notícia
  - URL da imagem principal
- Evita duplicidade de notícias
- Armazena apenas a URL da imagem (sem download)

### 🏷️ Classificação Automática
- Associação automática de municípios ao salvar notícias
- Busca textual simples no título e descrição
- Caso não identificado, associa “Paraíba (Geral)”

### 📝 Gerenciamento de Notícias
- Criação manual de notícias
- Edição antes da publicação
- Aprovação ou recusa editorial
- Controle de status (rascunho, aguardando revisão, publicado)

### 🔍 Busca e Filtros
- Busca textual por título e conteúdo
- Filtros por:
  - Data
  - Tema
  - Município
- Paginação de resultados

### ⭐ Favoritos
- Usuários autenticados podem favoritar notícias
- Evita duplicidade
- Permite remoção
- Tela dedicada de favoritos

---

## 🌱 Seed de Dados

- O banco de dados já inicia com:
  - **223 municípios do estado da Paraíba**
  - Temas pré-cadastrados
- Garante funcionamento correto dos relacionamentos desde o início

---

## 🚀 Execução do Projeto

### 📦 Pré-requisitos
- Node.js (v18+ recomendado)
- Banco de dados SQL configurado
- Gerenciador de pacotes npm ou yarn

### ▶️ Executar o back-end
```bash
npm install
npm run dev

### ▶️ Executar o front-end
```bash
npm install
npm run dev


