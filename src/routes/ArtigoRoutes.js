const express = require("express");
const ArtigoController = require("../controllers/ArtigoController");

const router = express.Router();

// Rota para criar um artigo
router.post("/artigos", ArtigoController.criarArtigo);
router.get("/artigos", ArtigoController.buscarTodosArtigos);
router.get("/artigos/:id", ArtigoController.buscarArtigoPorId);
router.put("/artigos/:id", ArtigoController.atualizarArtigo);
router.delete("/artigos/:id", ArtigoController.deletarArtigo);

module.exports = router;
