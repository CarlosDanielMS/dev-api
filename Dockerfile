# Dockerfile

# Use uma imagem base leve do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie os arquivos de dependência
COPY package*.json ./

# Instale as dependências
RUN npm install

# !! MUDANÇA PRINCIPAL AQUI !!
# Copie a pasta do Prisma ANTES de gerar o client
COPY ./prisma ./prisma

# Agora o Prisma vai encontrar o schema e gerar o client com sucesso
RUN npx prisma generate

# Copie o resto do código da aplicação
COPY . .

# Exponha a porta que a aplicação vai usar
EXPOSE 3000

# O comando para iniciar a aplicação
CMD ["npm", "run", "dev"]