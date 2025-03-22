const express = require("express");
const EditoraController = require("../controllers/EditoraController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

//rotas
router.post("/editoras",authMiddleware(['manager', 'user']), EditoraController.criarEditora);
router.get("/editoras",authMiddleware(['manager', 'user']), EditoraController.buscarTodasEditoras);
router.get("/editoras/:id",authMiddleware(['manager', 'user']), EditoraController.buscarEditoraPorId);
router.get("/editoras/nome/busca",authMiddleware(['manager', 'user']), EditoraController.buscarEditoraPorNome)
router.put("/editoras/:id",authMiddleware(['manager', 'user']), EditoraController.atualizarEditora);

module.exports = router;
