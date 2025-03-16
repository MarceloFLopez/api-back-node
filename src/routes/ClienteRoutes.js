const express = require("express");
const CLienteController = require("../controllers/ClienteController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//rotas
router.post("/clientes", authMiddleware(['admin', 'user']),CLienteController.criarCliente);
router.get("/clientes",authMiddleware(['admin', 'user']), CLienteController.buscarTodosClientes);
router.get("/clientes/:id", authMiddleware(['admin', 'user']),CLienteController.buscarClientePorId);
router.get("/clientes/nome/busca", authMiddleware(['admin', 'user']),CLienteController.buscarClientePorNome);
router.put("/clientes/:id",authMiddleware(['admin', 'user']), CLienteController.atualizarCliente);

module.exports = router;
