const express = require("express");
const UsuarioController = require("../controllers/UsuarioController");

const router = express.Router();

// Rota para criar um novo usuário
router.post("/usuarios", UsuarioController.criarUsuario);
router.get("/usuarios", UsuarioController.listarTodosUsuarios);
router.put("/usuarios/atualizar-senha/:id", UsuarioController.atualizarSenhaUsuario);
router.put('/usuarios/atualizar-role-ativo/:id', UsuarioController.atualizarRoleEAtivoUsuario);
router.get('/usuarios/bucar/:id', UsuarioController.buscarUsuarioPorId);

module.exports = router;
