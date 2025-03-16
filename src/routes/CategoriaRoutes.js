const express = require("express");
const CategoriaController = require("../controllers/CategoriaController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/categorias", authMiddleware(['admin', 'user']),CategoriaController.criarCategoria);
router.get("/categorias", authMiddleware(['admin', 'user']),CategoriaController.buscarTodasCategorias);
router.get("/categorias/:id", authMiddleware(['admin', 'user']),CategoriaController.buscarCategoriaPorId);
router.get("/categorias/nome/busca",authMiddleware(['admin', 'user']), CategoriaController.buscarCategoriaPorNome);
router.put("/categorias/:id",authMiddleware(['admin', 'user']), CategoriaController.atualizarCategoria);

module.exports = router;
