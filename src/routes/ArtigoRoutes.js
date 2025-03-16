const express = require("express");
const ArtigoController = require("../controllers/ArtigoController");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

// Rota para criar um artigo
router.post("/artigos", authMiddleware(['admin', 'user']), ArtigoController.criarArtigo);
router.get("/artigos", authMiddleware(['admin', 'user']),ArtigoController.buscarTodosArtigos);
router.get("/artigos/:id", authMiddleware(['admin', 'user']),ArtigoController.buscarArtigoPorId);
router.put("/artigos/:id", authMiddleware(['admin', 'user']),ArtigoController.atualizarArtigo);
router.delete("/artigos/:id", authMiddleware(['admin', 'user']),ArtigoController.deletarArtigo);

module.exports = router;
