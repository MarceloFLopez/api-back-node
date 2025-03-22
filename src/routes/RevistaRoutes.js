const express = require("express");
const RevistaController = require("../controllers/RevistaController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/revistas",authMiddleware(['manager', 'user']), RevistaController.criarRevista);
router.get("/revistas/:id",authMiddleware(['manager', 'user']), RevistaController.buscarPorId);
router.get("/revistas/nome/busca", authMiddleware(['manager', 'user']),RevistaController.buscarPorNome);
router.get("/revistas", authMiddleware(['manager', 'user']),RevistaController.buscarTodasRevistas);
router.put("/revistas/:id", authMiddleware(['manager', 'user']),RevistaController.atualizarRevista);
router.delete("/revistas/:id",authMiddleware(['manager', 'user']), RevistaController.deletarRevista); 


module.exports = router;
