const express = require("express");
const AutorController = require("../controllers/AutorController");

const router = express.Router();

//rotas
router.post("/autores", AutorController.criarAutor);
router.get("/autores", AutorController.buscarTodosAutores);
router.get("/autores/:id", AutorController.buscarAutorPorId);
router.get("/autores/nome/busca", AutorController.buscarAutorPorNome);
router.put("/autores/:id", AutorController.atualizarAutor);

module.exports = router;
