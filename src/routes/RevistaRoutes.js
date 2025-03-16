const express = require("express");
const RevistaController = require("../controllers/RevistaController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/revistas",authMiddleware(['admin', 'user']), RevistaController.criarRevista);
router.get("/revistas/:id",authMiddleware(['admin', 'user']), RevistaController.buscarPorId);
router.get("/revistas/nome/busca", authMiddleware(['admin', 'user']),RevistaController.buscarPorNome);
router.get("/revistas", authMiddleware(['admin', 'user']),RevistaController.buscarTodasRevistas);
router.put("/revistas/:id", authMiddleware(['admin', 'user']),RevistaController.atualizarRevista);
router.delete("/revistas/:id",authMiddleware(['admin', 'user']), RevistaController.deletarRevista); 


module.exports = router;
