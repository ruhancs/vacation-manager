## Description

Guia para inicializar a aplicacao. O projeto foi construido com postgres, nestjs, typescript, prisma, next.js e docker

## Inicializaçao do docker

```bash
$ dentro da pasta "vacation-manager" abra o terminal e digite o comando: [chmod +x .docker/entrypoint.sh]

$ dentro da mesma pasta "vacation-manager" digite o comando: [docker-compose up]

$ espera a aplicaçao criar o DB, instalar os pacotes e inicializar, isso pode demorar alguns minutos

$ quando a aplicaçao estiver pronta a seguinte linha aparecera no terminal: Nest application successfully started

$ em http://localhost:8000 estara a documentaçao com as rotas da API com suas funcionalidades

$ em http://localhost:3000/users estara o front end para realizar registros de usuario, listagem dos usuarios e link para inserir ferias aos usuarios

$ # OBS: Se o ambiente de execuçao for com sistema windows, talvez seja necessario poucas alteraçoes no arquivo docker-compose.yaml. Caso a execuçao for com sistema windows fico a disposiçao para enviar um novo arquivo com atualizaçao do docker compose 
```

## Informaçoes sobre a utilizaçao da aplicaçao

```bash
# Cadastro de usuarios
$ em http://localhost:3000/users, podera ser registrados usuarios no formulario com nome, cargo e data de contrataçao, a data deve ser no formato mes/dia/ano apos preencher os campos do formulario basta clicar em registrar que o usuario sera criado, e aparecera na tabela abaixo do formulario

$ abaixo do formulario para registrar os usuarios em http://localhost:3000/users, estara a tabela com todos usuarios registrados

$ no ultimo campo da tabela, contem um link com nome de registrar ferias, ao clicar no link a pagina sera redirecionada para a area de registrar ferias do respectivo usuario

$ na area de registrar ferias em http://localhost:3000/users/register-vacation/"id do usuario", estara o formulario com os campos inicio das ferias e termino das ferias o formato das datas deve ser mes/dia/ano

```
- Author - [Ruhan Correa Soares]()