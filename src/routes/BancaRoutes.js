const express = require("express");
const BancaController = require("../controllers/BancaController");

const router = express.Router();

router.post("/bancas", BancaController.criarBanca);
router.get("/bancas", BancaController.buscarTodasBancas);
router.get("/bancas/:id", BancaController.buscarBancaPorId);
router.get("/bancas/buscar", BancaController.buscarBancaPorNome);
router.put("/bancas/:id", BancaController.atualizarBanca);
router.delete("/bancas/:id", BancaController.deletarBanca);


module.exports = router;
