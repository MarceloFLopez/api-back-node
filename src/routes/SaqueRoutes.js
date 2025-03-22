const express = require("express");
const SaqueController = require("../controllers/SaqueController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/saques",authMiddleware(['manager']), SaqueController.criarSaque);
router.get("/saques",authMiddleware(['manager']), SaqueController.listarTodosSaques);
router.get("/saques/:id", authMiddleware(['manager']),SaqueController.buscarSaquePorId);
router.get("/saques/plataforma/nome", authMiddleware(['manager']),SaqueController.buscarSaquePorPlataforma);
router.put("/saques/:id",authMiddleware(['manager']), SaqueController.editarSaque);
router.delete("/saques/:id",authMiddleware(['manager']), SaqueController.deletarSaque);

module.exports = router;
