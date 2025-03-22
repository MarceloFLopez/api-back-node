const express = require("express");
const CategoriaController = require("../controllers/CategoriaController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/categorias", authMiddleware(['manager','user']),CategoriaController.criarCategoria);
router.get("/categorias", authMiddleware(['manager','user']),CategoriaController.buscarTodasCategorias);
router.get("/categorias/:id", authMiddleware(['manager','user']),CategoriaController.buscarCategoriaPorId);
router.get("/categorias/nome/busca",authMiddleware(['manager','user']), CategoriaController.buscarCategoriaPorNome);
router.put("/categorias/:id", authMiddleware(['manager','user']), CategoriaController.atualizarCategoria);

module.exports = router;
