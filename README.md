# 💬 Socket.IO Salas Privadas — Frontend

Aplicação de **chat privado em tempo real**, desenvolvida com React e Socket.IO Client, com foco em comunicação instantânea, experiência responsiva e uma interface simples e moderna.

O frontend é responsável pela interface da aplicação, gerenciamento das conversas, usuários, mensagens, estados de entrega e interação em tempo real com o servidor Socket.IO.

---

## 🌐 Acesso ao projeto

> 🚀 **Site:https://socketiosalasprivadas-frontend.vercel.app/**

---

## 📸 Preview

```text
┌─────────────────────────────────────────────────────────┐
│  💬 Chat                         👤 Usuário             │
├──────────────────┬──────────────────────────────────────┤
│ 🔎 Buscar        │                                      │
│                  │   Olá 👋                             │
│ 👤 Usuário 1     │                         Olá!         │
│    Última msg    │                                      │
│                  │   Como estás?                        │
│ 👤 Usuário 2     │                                      │
│    Última msg    │                         Bem! ✓✓      │
│                  │                                      │
├──────────────────┴──────────────────────────────────────┤
│  Escreva sua mensagem...                         ➤     │
└─────────────────────────────────────────────────────────┘
```

---

# 🚀 Sobre o projeto

Este projeto é um sistema de **mensagens privadas em tempo real** desenvolvido para estudar e aplicar conceitos de comunicação bidirecional utilizando **Socket.IO**.

O usuário pode visualizar outros usuários conectados, selecionar uma conversa e trocar mensagens instantaneamente sem precisar atualizar a página.

O frontend mantém o estado das mensagens e conversa com o backend através de eventos Socket.IO.

---

# 🛠️ Tecnologias utilizadas

### Frontend

- ⚛️ React
- ⚡ Vite
- 🔌 Socket.IO Client
- 🧭 React Router DOM
- 🎨 CSS
- 😊 Emoji Picker React
- 🕐 Day.js
- 🔔 React Toastify
- 🧩 Lucide React

---

# ✨ Funcionalidades

### 👥 Usuários

- Listagem de usuários conectados
- Identificação do usuário atual
- Seleção de usuário para iniciar conversa
- Pesquisa de usuários
- Avatar dos usuários
- Indicador de usuário online/offline

### 💬 Chat privado

- Envio de mensagens em tempo real
- Recepção instantânea de mensagens
- Conversas privadas entre usuários
- Histórico das mensagens durante a sessão
- Preview da última mensagem na lista de usuários
- Identificação das mensagens enviadas e recebidas

### 📩 Status das mensagens

O projeto possui diferentes estados para as mensagens:

```text
🕐 enviando
   ↓
✓ enviada
   ↓
✓✓ entregue
   ↓
✓✓ lida
```

Também existe tratamento para falha no envio:

```text
❌ erro
```

### 🔔 Notificações

Quando uma nova mensagem chega enquanto a conversa não está aberta:

- Exibe uma notificação
- Mostra o nome do remetente
- Mostra uma prévia da mensagem
- Atualiza o contador de mensagens não lidas

### 😊 Emojis

O usuário pode abrir um seletor de emojis e adicioná-los diretamente à mensagem.

### ✍️ Indicador de digitação

O frontend também suporta o conceito de:

```text
✍️ Usuário está digitando...
```

Utilizando eventos Socket.IO:

```text
digitando
usuario-digitando

parou-digitando
usuario-parou-digitando
```

### 📱 Responsividade

A interface foi desenvolvida pensando também em dispositivos móveis.

Em telas menores, a navegação entre usuários e conversa é adaptada para facilitar o uso.

---

# 🧠 Arquitetura do Frontend

A aplicação está organizada utilizando componentes, páginas, contexto e gerenciamento de estado.

Uma estrutura aproximada:

```text
src/
│
├── assets/
│
├── components/
│   ├── Users.jsx
│   └── Messages.jsx
│
├── Context/
│   └── UserSelecionadoContext.jsx
│
├── Pages/
│   ├── Home.jsx
│   ├── Chat.jsx
│   └── NotFound.jsx
│
├── styles/
│   ├── Users.css
│   ├── Messages.css
│   └── ...
│
└── App.jsx
```

---

# 🔌 Comunicação com Socket.IO

O frontend utiliza o **Socket.IO Client** para estabelecer uma conexão em tempo real com o backend.

Exemplo:

```javascript
const socket = io("http://localhost:3000");
```

Através dessa conexão são utilizados eventos para comunicação entre cliente e servidor.

### Enviar mensagem

```javascript
socket.emit("mensagem-enviada", mensagem);
```

### Receber mensagem

```javascript
socket.on("mensagem-recebida", (mensagem) => {
  // atualizar mensagens
});
```

### Status da mensagem

```text
mensagem-entregue
mensagem-lida
mensagem-status-atualizada
```

### Presença

```text
online
offline
usuarios-online
```

### Digitação

```text
digitando
parou-digitando
usuario-digitando
usuario-parou-digitando
```

---

# 📦 Instalação

Clone o projeto:

```bash
git clone https://github.com/gilsongillazaro-cyber/Socketiosalasprivadas_FRONTEND.git
```

Entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

O Vite irá disponibilizar a aplicação localmente.

---

# ⚙️ Configuração

Atualmente, o frontend utiliza o endereço local do servidor Socket.IO:

```javascript
const socket = io("http://localhost:3000");
```

Para produção, substitua pelo endereço do backend publicado:

```javascript
const socket = io("https://seu-backend.com");
```

---

# 🔐 Comunicação Frontend ↔ Backend

A arquitetura funciona da seguinte forma:

```text
┌───────────────┐
│    React      │
│   Frontend    │
└───────┬───────┘
        │
        │ Socket.IO
        ▼
┌───────────────┐
│    Node.js    │
│   Backend     │
└───────┬───────┘
        │
        │ Socket.IO
        ▼
┌───────────────┐
│ Outro usuário │
│    React      │
└───────────────┘
```

A comunicação é bidirecional e acontece em tempo real.

---

# 🎯 Objetivo do projeto

Este projeto foi desenvolvido com o objetivo de aprofundar conhecimentos em:

- React
- JavaScript
- Socket.IO
- Comunicação em tempo real
- Gerenciamento de estado
- Context API
- Eventos WebSocket
- Interfaces responsivas
- Status de mensagens
- Presença online/offline
- Experiência de usuário

---

# 🔮 Próximos passos

Algumas funcionalidades que podem ser adicionadas futuramente:

- 🎙️ Mensagens de áudio
- 📷 Envio de imagens
- 📎 Envio de arquivos
- 🟢 Sistema de usuários permanentes
- 💾 Persistência das mensagens
- 🔐 Autenticação
- 🔔 Notificações push
- 🗑️ Exclusão de mensagens
- ✏️ Edição de mensagens
- 👥 Grupos
- 📞 Chamadas de áudio
- 📹 Chamadas de vídeo utilizando WebRTC

---

# 👨‍💻 Desenvolvedor

**Gilson Gil**

Desenvolvedor Full Stack focado em JavaScript, React, Node.js e aplicações em tempo real.

### 🔗 Links

- 💻 GitHub: [gilsongillazaro-cyber](https://github.com/gilsongillazaro-cyber)
- 💼 LinkedIn: [Gilson Gil](https://www.linkedin.com/in/gilson-gil-077b7841b/)

---

## ⭐ Contribuição

Se este projeto foi útil ou interessante para você, considere deixar uma ⭐ no repositório.

---

## 📄 Licença

Este projeto está disponível para fins de estudo e desenvolvimento.
