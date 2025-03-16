const express = require("express");
const AutorController = require("../controllers/AutorController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//rotas
router.post("/autores",authMiddleware(['admin', 'user']), AutorController.criarAutor);
router.get("/autores", authMiddleware(['admin', 'user']),AutorController.buscarTodosAutores);
router.get("/autores/:id",authMiddleware(['admin', 'user']), AutorController.buscarAutorPorId);
router.get("/autores/nome/busca",authMiddleware(['admin', 'user']), AutorController.buscarAutorPorNome);
router.put("/autores/:id",authMiddleware(['admin', 'user']), AutorController.atualizarAutor);

module.exports = router;
