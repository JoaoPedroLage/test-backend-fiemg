<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# :package: TEST BACK END
por João Pedro de Oliveira Lage

<p align="center">
   <img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=RED&style=for-the-badge"/>
</p>

### Tópicos

- [Descrição do projeto](#books-descrição-do-projeto)

- [Stacks utilizadas](#books-stacks-utilizadas)

- [Etapa mais desafiadora](#%EF%B8%8F-etapa-mais-desafiadora)

- [Abrir e rodar o projeto](#%EF%B8%8F-abrir-e-rodar-o-projeto)

- [Deploy no RailWay](#deploy)


# :books: Descrição do Projeto

O projeto consiste na criação de uma API REST para gestão das universidades cadastradas.

Para esse projeto foi utilizado:
- [x] Uso do framework Next.js para ter:
   * Agilidade de desenvolvimento através da divisão do código.
   * Suporte completo para TypeScript.
   * Ecossistema rico e extensível.
- [x] Setup do projeto com arquitetura de software.
- [x] Deploy cloud no Railway.


# :books: Stacks utilizadas

### Back-end
- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Node MySQL 2](https://www.npmjs.com/package/mysql2)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)


# Etapa mais desafiadora

- Criar o Script para ler API JSON e popular o banco de dados que cumprisse com todos os requisitos para o mesmo.
- Garantir que todas as funcionalidades do Nest.Js estão se comunicando com coerência e gerando os resultados esperados.
- Fazer o sistema de autenticação da API com as características exclusivas do Nest.Js.
- Correção de bugs ao longo do desenvolvimento através de diversos testes utilizando cada rota da aplicação.

#  <img src="https://railway.app/brand/logo-dark.svg" width='40px'/> &nbsp;Deploy no Railway
* A API foi colocada online Railway com 3 serviços, um banco de dados MySQL, um serviço para ler API JSON e popular o banco de dados e um para a API REST com CRUD das universidades anteriormente cadastradas no banco de dados.
* Endereço online da aplicação: https://test-backend-fiemg-production.up.railway.app/universities
![image](https://github.com/JoaoPedroLage/test-backend-fiemg/assets/87338925/dfb9f0bb-2f1a-4df3-8fb0-9a1aa520f2df)





# 🛠️ Abrir e rodar o projeto

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# build
$ yarn build

# seed database
$ yarn db:seed
$ prisma generate

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
