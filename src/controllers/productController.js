// src/controllers/productController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar um produto (POST)
exports.createProduct = async (req, res) => {
  try {
    const { nome, descricao, preco, estoque } = req.body;
    const product = await prisma.produto.create({
      data: { nome, descricao, preco, estoque },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Não foi possível criar o produto.', details: error.message });
  }
};

// Obter todos os produtos (GET)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.produto.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
};

// Obter um produto por ID (GET)
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.produto.findUnique({ where: { id: parseInt(id) } });
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produto.' });
    }
};


// Atualizar um produto (PUT)
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, estoque } = req.body;
    const product = await prisma.produto.update({
      where: { id: parseInt(id) },
      data: { nome, descricao, preco, estoque },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: 'Produto não encontrado ou dados inválidos.' });
  }
};

// Deletar um produto (DELETE)
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.produto.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(404).json({ error: 'Produto não encontrado.' });
  }
};