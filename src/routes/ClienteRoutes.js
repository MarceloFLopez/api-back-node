const express = require("express");
const CLienteController = require("../controllers/ClienteController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//rotas
router.post("/clientes", authMiddleware(['manager', 'user']),CLienteController.criarCliente);
router.get("/clientes",authMiddleware(['manager', 'user']), CLienteController.buscarTodosClientes);
router.get("/clientes/:id", authMiddleware(['manager', 'user']),CLienteController.buscarClientePorId);
router.get("/clientes/nome/busca", authMiddleware(['manager', 'user']),CLienteController.buscarClientePorNome);
router.put("/clientes/:id",authMiddleware(['manager', 'user']), CLienteController.atualizarCliente);

module.exports = router;
