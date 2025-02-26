# DevPeerTech

## Descrição

DevPeerTech é um projeto de chat em tempo real desenvolvido com Next.js, React, Socket.IO e Bootstrap. Este projeto permite que os usuários se comuniquem em tempo real, enviando mensagens de texto e arquivos de mídia.

## Funcionalidades

- **Chat em tempo real**: Envie e receba mensagens instantaneamente.
- **Upload de arquivos**: Suporte para envio de imagens, vídeos e áudios.
- **Notificações**: Receba notificações de erros e eventos importantes através do React Toastify.

## Estrutura do Projeto

- **app/layout.tsx**: Layout principal da aplicação.
- **app/page.tsx**: Página principal do chat.
- **components/chat/Chat.tsx**: Componentes relacionados ao chat, incluindo mensagens e renderização de arquivos.
- **components/chat/Upload.tsx**: Componente de upload de arquivos com barra de progresso.
- **server.ts**: Servidor Node.js configurado com Socket.IO para comunicação em tempo real.
- **style/index.css**: Estilos CSS personalizados para a aplicação.
- **utils/inputs/input.ts**: Utilitário para mapeamento de entradas.
- **utils/socket/message.ts**: Utilitário para manipulação de mensagens via Socket.IO.

## Como Executar

1. **Clone o repositório**:
    ```sh
    git clone https://github.com/erick-gomes/devpeertech.git
    cd devpeertech
    ```

2. **Instale as dependências**:
    ```sh
    npm install
    ```

3. **Inicie o servidor de desenvolvimento**:
    ```sh
    npm run dev
    ```

4. **Acesse a aplicação**:
    Abra o navegador e vá para `http://localhost:3000`.

## Scripts Disponíveis

- `dev`: Inicia o servidor de desenvolvimento.
- `build`: Compila a aplicação para produção.
- `start`: Inicia o servidor em modo de produção.
- `lint`: Executa o linter para verificar problemas de código.

## Dependências

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Next.js**: Framework React para renderização do lado do servidor.
- **Socket.IO**: Biblioteca para comunicação em tempo real.
- **Bootstrap**: Framework CSS para design responsivo.
- **React Toastify**: Biblioteca para notificações.

## Autor

- **Erick Gomes**
