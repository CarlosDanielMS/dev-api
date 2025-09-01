API de Produtos e Pedidos
Esta é uma API RESTful para gerenciamento de produtos e pedidos, construída com Node.js, Express e Prisma ORM. O ambiente é totalmente containerizado usando Docker e Docker Compose para facilitar a configuração e a execução.

🛠️ Tecnologias Utilizadas
Backend: Node.js, Express.js

Banco de Dados: PostgreSQL

ORM: Prisma

Containerização: Docker, Docker Compose

🚀 Começando
Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

Pré-requisitos
Antes de começar, garanta que você tenha os seguintes softwares instalados:

Docker

Docker Compose (geralmente já vem com o Docker Desktop)

Um cliente de API como Postman, Insomnia ou cURL

Passo a Passo da Instalação
1. Clone o Repositório

Primeiro, clone este repositório para a sua máquina local.

Bash

git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd SEU_REPOSITORIO
2. Crie o Arquivo de Variáveis de Ambiente (.env)

O projeto precisa de um arquivo .env para configurar a conexão com o banco de dados. Crie um arquivo chamado .env na raiz do projeto e copie o conteúdo abaixo para ele.

Fragmento do código

# .env

# Variáveis para o Docker Compose popular o container do Postgres
POSTGRES_USER=docker
POSTGRES_PASSWORD=docker
POSTGRES_DB=apidb

# URL de conexão para o Prisma
# O HOST 'db' é o nome do serviço do postgres no docker-compose.yml
DATABASE_URL="postgresql://docker:docker@db:5432/apidb?schema=public"

# Porta da Aplicação
PORT=3000
3. Construa e Inicie os Containers

Com o Docker em execução, use o Docker Compose para construir as imagens e iniciar os containers da API e do banco de dados.

Bash

docker-compose up --build -d
--build: Reconstrói a imagem da API se houver alterações no Dockerfile.

-d: Roda os containers em modo "detached" (em segundo plano).

4. Execute as Migrações do Banco de Dados

Após os containers estarem no ar, você precisa criar as tabelas no banco de dados. Execute o seguinte comando para que o Prisma aplique as migrações.

Bash

docker-compose exec api npm run prisma:migrate
O Prisma pode pedir um nome para a migração. Você pode digitar algo como "initial-setup" e pressionar Enter.

Pronto! Sua API está rodando e acessível em http://localhost:3000.

📝 Endpoints da API
Aqui estão alguns exemplos de como usar os endpoints da API.

Produtos (/api/produtos)
Criar um novo produto (POST /)
URL: http://localhost:3000/api/produtos

Body (JSON):

JSON

{
  "nome": "Notebook Gamer",
  "descricao": "Notebook com placa de vídeo dedicada",
  "preco": 8999.90,
  "estoque": 10
}
Listar todos os produtos (GET /)
URL: http://localhost:3000/api/produtos

Obter um produto por ID (GET /:id)
URL: http://localhost:3000/api/produtos/1

Atualizar um produto (PUT /:id)
URL: http://localhost:3000/api/produtos/1

Body (JSON):

JSON

{
  "preco": 8500.00,
  "estoque": 8
}
Deletar um produto (DELETE /:id)
URL: http://localhost:3000/api/produtos/1

Pedidos (/api/pedidos)
Criar um novo pedido (POST /)
URL: http://localhost:3000/api/pedidos

Body (JSON): (Assumindo que um produto com id: 1 já existe)

JSON

{
  "nomeCliente": "Maria Souza",
  "produtos": [
    { "produtoId": 1, "quantidade": 2 }
  ]
}
Listar todos os pedidos (GET /)
URL: http://localhost:3000/api/pedidos

📜 Scripts Disponíveis
Dentro do container api, você pode executar os seguintes scripts definidos no package.json:

npm run dev: Inicia o servidor em modo de desenvolvimento com nodemon.

npm run start: Inicia o servidor em modo de produção.

npm run prisma:migrate: Executa as migrações do banco de dados com o Prisma.
