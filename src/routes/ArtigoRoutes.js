const express = require("express");
const ArtigoController = require("../controllers/ArtigoController");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

// Rota para criar um artigo
router.post("/artigos", authMiddleware(['manager', 'user']), ArtigoController.criarArtigo);
router.get("/artigos", authMiddleware(['manager', 'user']),ArtigoController.buscarTodosArtigos);
router.get("/artigos/:id", authMiddleware(['manager', 'user']),ArtigoController.buscarArtigoPorId);
router.put("/artigos/:id", authMiddleware(['manager', 'user']),ArtigoController.atualizarArtigo);
router.delete("/artigos/:id", authMiddleware(['manager', 'user']),ArtigoController.deletarArtigo);

module.exports = router;
