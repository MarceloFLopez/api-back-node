const express = require("express");
const EditoraController = require("../controllers/EditoraController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

//rotas
router.post("/editoras",authMiddleware(['admin', 'user']), EditoraController.criarEditora);
router.get("/editoras",authMiddleware(['admin', 'user']), EditoraController.buscarTodasEditoras);
router.get("/editoras/:id",authMiddleware(['admin', 'user']), EditoraController.buscarEditoraPorId);
router.get("/editoras/nome/busca",authMiddleware(['admin', 'user']), EditoraController.buscarEditoraPorNome)
router.put("/editoras/:id",authMiddleware(['admin', 'user']), EditoraController.atualizarEditora);

module.exports = router;
