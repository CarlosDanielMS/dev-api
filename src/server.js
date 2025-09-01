// src/server.js
require('dotenv').config();
const express = require('express');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rotas da API
app.use('/api/produtos', productRoutes);
app.use('/api/pedidos', orderRoutes);

app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});