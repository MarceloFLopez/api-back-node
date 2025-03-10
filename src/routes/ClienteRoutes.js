const express = require("express");
const CLienteController = require("../controllers/ClienteController");

const router = express.Router();

//rotas
router.post("/clientes", CLienteController.criarCliente);
router.get("/clientes", CLienteController.buscarTodosClientes);
router.get("/clientes/:id", CLienteController.buscarClientePorId);
router.get("/clientes/nome/busca", CLienteController.buscarClientePorNome);
router.put("/clientes/:id", CLienteController.atualizarCliente);

module.exports = router;
