
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

2) - Entre dentro do container React com o comando:
```sh
docker-compose exec nginx-react /bin/sh
```

3) - Dentro do container Docker, rode o comando:
```sh
npm run build
```

4) - Fora do container, dentro da pasta do projeto, precisamos rodar a `migration` e pedir para o Laravel popular o banco com uma `Seeder`, rode o comando:
```sh
php artisan migrate && php artisan db:seed --class=DevelopersSeeder
```

5) - Feito isso, agora precisamos alterar o apontamento para o postgreeSQL no rquivo `.env` dentro da paste do projeto `pontential-crud-laravel`

=> Altere a variavel `DB_HOST=` de `localhost` para `database`

No Linux e macOS, podemos alterar via linha de comando com o vim (opcional)


* Concluído: agora temos o laravel rodando em http://localhost:8080/ e apontando para o container PostgreeSQL que está respondendo na porta `5432`


## License

Project license [MIT license](https://opensource.org/licenses/MIT)
