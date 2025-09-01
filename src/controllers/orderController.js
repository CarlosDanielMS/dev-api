// src/controllers/orderController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar um pedido (POST)
exports.createOrder = async (req, res) => {
    // Exemplo de body: { "nomeCliente": "Cliente Teste", "produtos": [{ "produtoId": 1, "quantidade": 2 }] }
    const { nomeCliente, produtos } = req.body;

    if (!nomeCliente || !produtos || produtos.length === 0) {
        return res.status(400).json({ error: 'Dados do pedido incompletos.' });
    }

    try {
        // Lógica para calcular o total do pedido
        let totalPedido = 0;
        for (const item of produtos) {
            const produtoDB = await prisma.produto.findUnique({ where: { id: item.produtoId } });
            if (!produtoDB) {
                return res.status(404).json({ error: `Produto com ID ${item.produtoId} não encontrado.` });
            }
            totalPedido += produtoDB.preco * item.quantidade;
        }

        const novoPedido = await prisma.pedido.create({
            data: {
                nomeCliente,
                total: totalPedido,
                produtos: {
                    create: produtos.map(p => ({
                        quantidade: p.quantidade,
                        produto: {
                            connect: { id: p.produtoId },
                        },
                    })),
                },
            },
            include: {
                produtos: { include: { produto: true } }, // Inclui os detalhes dos produtos no retorno
            },
        });

        res.status(201).json(novoPedido);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível criar o pedido.', details: error.message });
    }
};

// Obter todos os pedidos (GET)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await prisma.pedido.findMany({
            include: {
                produtos: { include: { produto: true } }
            }
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar pedidos.' });
    }
};