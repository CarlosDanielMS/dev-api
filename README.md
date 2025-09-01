# 📦 API de Produtos e Pedidos

Esta é uma **API RESTful** para gerenciamento de produtos e pedidos, construída com **Node.js, Express e Prisma ORM**.  
O ambiente é totalmente **containerizado** usando **Docker e Docker Compose**, garantindo fácil configuração e execução.

---

## 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js, Express.js  
- **Banco de Dados:** PostgreSQL  
- **ORM:** Prisma  
- **Containerização:** Docker, Docker Compose  

---

## 🚀 Começando

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### ✅ Pré-requisitos
Antes de começar, certifique-se de ter instalado:
- [Docker](https://docs.docker.com/get-docker/)  
- [Docker Compose](https://docs.docker.com/compose/) *(já incluso no Docker Desktop)*  
- Um cliente de API como [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/) ou `cURL`

---

### 📂 Passo a Passo da Instalação

#### 1️⃣ Clone o Repositório
```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd SEU_REPOSITORIO
2️⃣ Configure o Arquivo .env
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

env
Copiar código
# Configuração do PostgreSQL
POSTGRES_USER=docker
POSTGRES_PASSWORD=docker
POSTGRES_DB=apidb

# URL de conexão para o Prisma
DATABASE_URL="postgresql://docker:docker@db:5432/apidb?schema=public"

# Porta da aplicação
PORT=3000
3️⃣ Construa e Inicie os Containers
bash
Copiar código
docker-compose up --build -d
--build: Reconstrói a imagem da API caso o Dockerfile tenha sido alterado

-d: Executa os containers em segundo plano

4️⃣ Execute as Migrações do Banco de Dados
bash
Copiar código
docker-compose exec api npm run prisma:migrate
Dica: quando solicitado, digite um nome para a migração, como initial-setup.

Agora sua API estará disponível em:
👉 http://localhost:3000

📝 Endpoints da API
🔹 Produtos (/api/produtos)
Criar Produto
POST /api/produtos

json
Copiar código
{
  "nome": "Notebook Gamer",
  "descricao": "Notebook com placa de vídeo dedicada",
  "preco": 8999.90,
  "estoque": 10
}
Listar Produtos
GET /api/produtos

Obter Produto por ID
GET /api/produtos/:id

Atualizar Produto
PUT /api/produtos/:id

json
Copiar código
{
  "preco": 8500.00,
  "estoque": 8
}
Deletar Produto
DELETE /api/produtos/:id

🔹 Pedidos (/api/pedidos)
Criar Pedido
POST /api/pedidos

json
Copiar código
{
  "nomeCliente": "Maria Souza",
  "produtos": [
    { "produtoId": 1, "quantidade": 2 }
  ]
}
Listar Pedidos
GET /api/pedidos

📜 Scripts Disponíveis
No container api, você pode usar:

npm run dev → Inicia o servidor em modo desenvolvimento com nodemon

npm start → Inicia o servidor em modo produção

npm run prisma:migrate → Executa as migrações do banco de dados com Prisma

📌 Observações
O banco de dados é inicializado automaticamente pelo Docker.

O serviço de banco de dados no docker-compose.yml está nomeado como db (importante para a URL do Prisma).

Recomendado usar Postman/Insomnia para testar os endpoints.

📖 Próximos Passos
Implementar autenticação e autorização

Adicionar testes automatizados

Criar documentação de API com Swagger

✍️ Autor: Seu Nome
📅 Projeto criado para estudos de Node.js + Prisma + Docker

bash
Copiar código

Quer que eu deixe esse `README.md` mais **formal (estilo acadêmico/profissional para TCC/portfólio)** 
