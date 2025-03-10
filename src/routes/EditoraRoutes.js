const express = require("express");
const EditoraController = require("../controllers/EditoraController");

const router = express.Router();

//rotas
router.post("/editoras", EditoraController.criarEditora);
router.get("/editoras", EditoraController.buscarTodasEditoras);
router.get("/editoras/:id", EditoraController.buscarEditoraPorId);
router.get("/editoras/nome/busca", EditoraController.buscarEditoraPorNome)
router.put("/editoras/:id", EditoraController.atualizarEditora);

module.exports = router;
