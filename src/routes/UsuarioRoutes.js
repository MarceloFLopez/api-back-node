const express = require("express");
const UsuarioController = require("../controllers/UsuarioController");
const authMiddleware = require("../middleware/authMiddleware");
const verificarToken = require("../middleware/tokenMiddleware");

const router = express.Router();

router.post("/usuarios", authMiddleware("admin") ,UsuarioController.criarUsuario);
router.get("/usuarios", authMiddleware("admin") ,UsuarioController.listarTodosUsuarios);
router.put("/usuarios/atualizar-senha/:id", authMiddleware("user") ,UsuarioController.atualizarSenhaUsuario);
router.put('/usuarios/atualizar-role-ativo/:id', authMiddleware("admin") ,UsuarioController.atualizarRoleEAtivoUsuario);
router.get('/usuarios/bucar/:id', authMiddleware("admin"), UsuarioController.buscarUsuarioPorId);

router.post("/auth/login", UsuarioController.login); // Login
router.post("/auth/logout", UsuarioController.logout);//logout
module.exports = router;
