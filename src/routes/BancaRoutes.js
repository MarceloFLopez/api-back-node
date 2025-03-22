const express = require("express");
const BancaController = require("../controllers/BancaController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/bancas",authMiddleware(['manager', 'user']), BancaController.criarBanca);
router.get("/bancas", authMiddleware(['manager', 'user']),BancaController.buscarTodasBancas);
router.get("/bancas/:id", authMiddleware(['manager', 'user']),BancaController.buscarBancaPorId);
router.get("/bancas/buscar",authMiddleware(['manager', 'user']), BancaController.buscarBancaPorNome);
router.put("/bancas/:id",authMiddleware(['manager', 'user']), BancaController.atualizarBanca);
router.delete("/bancas/:id",authMiddleware(['manager', 'user']), BancaController.deletarBanca);


module.exports = router;
