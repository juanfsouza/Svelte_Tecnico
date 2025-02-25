# Desafio de Desenvolvimento Front-End

Este repositório contém a solução para o desafio de desenvolvimento front-end utilizando **SvelteKit**, **TailwindCSS** e **DaisyUI**. O objetivo do desafio foi criar um formulário interativo que conta com um contador regressivo, exibição de mensagens de sucesso ou falha, navegação entre páginas, e funcionalidades de modal.

## Tecnologias Utilizadas

- **SvelteKit**: Framework para a criação de aplicações web com Svelte.
- **TailwindCSS**: Framework CSS utilitário para um design rápido e responsivo.
- **DaisyUI**: Biblioteca de componentes de interface de usuário construída em cima do TailwindCSS.
- **TypeScript**: Superset do JavaScript que traz tipagem estática ao código.

## Funcionalidades

### Página Inicial (Desafio)

- Exibição de um formulário com os campos **Nome**, **Telefone** e **Email**.
- Um botão **"Iniciar Desafio"** que inicia um contador regressivo de **15 segundos**.
- O contador é exibido no formato **mm:ss** e a contagem é salva no `sessionStorage`, permitindo que continue mesmo após navegar entre páginas.
- Após o término do tempo ou envio do formulário, o site exibe um **modal** com a mensagem **"Desafio finalizado com sucesso!"** ou **"Desafio finalizado com falha!"**, dependendo da ação do usuário.

### Página do Candidato

- Após enviar o formulário ou ao clicar no botão de navegação, os dados do candidato (**Nome**, **Telefone** e **Email**) são exibidos na página `/candidate`.
- A página **/candidate** exibe os dados preenchidos e inclui um botão para voltar à página do desafio.

### Funcionalidades de Modal

- O modal exibe a mensagem de **sucesso** ou **falha** com a possibilidade de fechar ao clicar fora dele ou no **X** no canto superior direito.
- A navegação para a página **/candidate** ocorre automaticamente após o envio com sucesso.

### Regras de Navegação

- Ao entrar na página **/candidate**, a contagem do tempo não é interrompida.
- Ao voltar para a página inicial, o tempo de contagem continua de onde parou.

## Como Rodar o Projeto

### Pré-requisitos

- **Node.js** e **pnpm** instalados.

### Passos para Instalar

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/desafio.git
   cd desafio
