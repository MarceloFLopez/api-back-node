const express = require("express");
const RevistaController = require("../controllers/RevistaController");

const router = express.Router();

router.post("/revistas", RevistaController.criarRevista);
router.get("/revistas/:id", RevistaController.buscarPorId);
router.get("/revistas/nome/busca", RevistaController.buscarPorNome);
router.get("/revistas", RevistaController.buscarTodasRevistas);
router.put("/revistas/:id", RevistaController.atualizarRevista);
router.delete("/revistas/:id", RevistaController.deletarRevista); 


module.exports = router;
