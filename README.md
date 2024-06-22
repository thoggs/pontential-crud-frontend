# Pontential

<p align="center" width="100%">
    <img width="25%" src="https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.svg" alt="Node.js Logo">
    <img width="15%" src="https://www.svgrepo.com/show/354112/nextjs.svg" alt="Express.js Logo">
</p>

## Descrição

Este é um projeto de frontend utilizando React e NextJS. Ele inclui a configuração inicial do projeto, componentes
básicos e rotas para manipulação de dados em um backend.

## Estrutura do Projeto

```
project-root/
├── src/
│   ├── app/
│   │   ├── (pages)/
│   │   │   └── developers/
│   │   ├── hooks/
│   │   ├── providers/
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   ├── constants/
│   │   │   └── types/
│   │   ├── store/
│   │   │   ├── reducers/
│   │   │   └── slices/
│   │   ├── favicon.ico
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── config/
│   │   └── mantine/
├── Dockerfile
├── docker-compose.yml
└── ...
```

## Pré-requisitos

- Ter o [Docker](https://www.docker.com/) instalado
- Ter o [GIT](https://git-scm.com/downloads) instalado

## Inicialização Rápida

Rode o comando em um terminal Linux/macOS ou Prompt de comando do Windows:

```bash
git clone https://github.com/thoggs/pontential-crud-frontend.git && cd pontential-crud-frontend && docker-compose up -d 
```

> O projeto estará disponível em http://localhost:8081

## License

Project license [Apache-2.0](https://opensource.org/license/apache-2-0)
