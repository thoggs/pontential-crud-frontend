
## Requisitos

- [x] Ter o [Docker instalado](https://www.docker.com/), instalado.
- [x] Acesso ao SHELL com permissão `root` (macOS e Linux; no Windows precisa ser admin).
- [x] Conexão com a internet.
- [x] Ter o GIT instalado

## Clonando e subindo o Docker container na porta 8081
1) - Rode o comando:
```sh
git clone https://github.com/thoggs/pontential-crud-frontend.git && cd pontential-crud-frontend && docker-compose up -d --build  
```

2) - Entre dentro do container Nginx/React com o comando:
```sh
docker-compose exec nginx-react /bin/sh
```

3) - Dentro do container Docker, rode o comando:
```sh
npm install && npm run build
```

* Concluído: agora temos o React rodando em http://localhost:8081/


## License

Project license [MIT license](https://opensource.org/licenses/MIT)
