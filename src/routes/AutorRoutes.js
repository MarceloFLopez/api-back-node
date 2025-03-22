const express = require("express");
const AutorController = require("../controllers/AutorController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//rotas
router.post("/autores",authMiddleware(['manager', 'user']), AutorController.criarAutor);
router.get("/autores", authMiddleware(['manager', 'user']),AutorController.buscarTodosAutores);
router.get("/autores/:id", authMiddleware(['manager', 'user']),AutorController.buscarAutorPorId);
router.get("/autores/nome/busca", authMiddleware(['manager', 'user']),AutorController.buscarAutorPorNome);
router.put("/autores/:id", authMiddleware(['manager', 'user']),AutorController.atualizarAutor);

module.exports = router;
