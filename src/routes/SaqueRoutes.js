const express = require("express");
const SaqueController = require("../controllers/SaqueController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/saques",authMiddleware(['admin', 'user']), SaqueController.criarSaque);
router.get("/saques",authMiddleware(['admin', 'user']), SaqueController.listarTodosSaques);
router.get("/saques/:id", authMiddleware(['admin', 'user']),SaqueController.buscarSaquePorId);
router.get("/saques/plataforma/nome", authMiddleware(['admin', 'user']),SaqueController.buscarSaquePorPlataforma);
router.put("/saques/:id",authMiddleware(['admin', 'user']), SaqueController.editarSaque);
router.delete("/saques/:id",authMiddleware(['admin', 'user']), SaqueController.deletarSaque);

module.exports = router;
