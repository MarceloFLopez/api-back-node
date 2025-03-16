const express = require("express");
const BancaController = require("../controllers/BancaController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/bancas",authMiddleware(['admin', 'user']), BancaController.criarBanca);
router.get("/bancas", authMiddleware(['admin', 'user']),BancaController.buscarTodasBancas);
router.get("/bancas/:id", authMiddleware(['admin', 'user']),BancaController.buscarBancaPorId);
router.get("/bancas/buscar",authMiddleware(['admin', 'user']), BancaController.buscarBancaPorNome);
router.put("/bancas/:id",authMiddleware(['admin', 'user']), BancaController.atualizarBanca);
router.delete("/bancas/:id",authMiddleware(['admin', 'user']), BancaController.deletarBanca);


module.exports = router;
