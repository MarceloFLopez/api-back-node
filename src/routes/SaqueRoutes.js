const express = require("express");
const SaqueController = require("../controllers/SaqueController");

const router = express.Router();

router.post("/saques", SaqueController.criarSaque);
router.get("/saques", SaqueController.listarTodosSaques);
router.get("/saques/:id", SaqueController.buscarSaquePorId);
router.get("/saques/plataforma/nome", SaqueController.buscarSaquePorPlataforma);
router.put("/saques/:id", SaqueController.editarSaque);
router.delete("/saques/:id", SaqueController.deletarSaque);

module.exports = router;
