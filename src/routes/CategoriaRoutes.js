const express = require("express");
const CategoriaController = require("../controllers/CategoriaController");

const router = express.Router();

router.post("/categorias", CategoriaController.criarCategoria);
router.get("/categorias", CategoriaController.buscarTodasCategorias);
router.get("/categorias/:id", CategoriaController.buscarCategoriaPorId);
router.get("/categorias/nome/busca", CategoriaController.buscarCategoriaPorNome);
router.put("/categorias/:id", CategoriaController.atualizarCategoria);

module.exports = router;
