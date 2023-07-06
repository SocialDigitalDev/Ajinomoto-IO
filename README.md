# AJINOMOTO - VTEX IO

Repositório de código do cliente Ajinomoto

## Tecnologias usadas:

1. React (para componentes);
2. Typescript (para componentes);
3. SASS (para todo o projeto);
4. JavaScript (para o checkout);
5. Node.js (Mandatório, e uso dos compiladores SASS);
6. Yarn (Mandatório. Não funciona com NPM);
7. GraphQL (Opcional e raro de usar, mas contido no projeto e para componentes react);

## Necessário instalar caso não tenha instalado no pc ainda:

1. Node.js
2. VTEX IO CLI
3. Yarn
4. Concurrently

## Como instalar e rodar o projeto.

1. Troque a accountname em todos os manifest.json e package.json
2. Abra um terminal e rode "vtex login accountname" (onde accountname é a conta da sua loja).
3. Rode "vtex use workspace" (trocando workspace pelo seu workspace "ex: vtex use dev")
4. Rode na raiz do projeto "yarn install" e aguarde a instalação das dependências.
5. Navegue até a pasta "react" e rode "vtex setup" e aguarde a instalação das dependências.
6. Navegue de volta a raiz do projeto e rode "vtex link".
7. Mate o terminal com Ctrl + C. Rode "yarn watch".

OBS: Para rodar SASS nos componentes, rode "yarn react-sass" em um terminal secundário. Isto compila os arquivos SASS em CSS dentro da pasta react.

# Créditos

Social Digital Commerce ® - Todos os direitos reservados.
