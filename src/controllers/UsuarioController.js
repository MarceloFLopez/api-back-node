// Atualize seu arquivo UsuarioController.js assim:

const UsuarioService = require("../service/UsuarioService");
const usuarioService = new UsuarioService();

class UsuarioController {
  // Método para criar um novo usuário
  async criarUsuario(req, res) {
    try {
      const novoUsuario = await usuarioService.criarUsuario(req.body);
      return res.status(201).json(novoUsuario);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listarTodosUsuarios(req, res) {
    try {
      const usuarios = await usuarioService.listarTodosUsuarios();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuários." });
    }
  }

  async atualizarSenhaUsuario(req, res) {
    try {
      const { id } = req.params;
      const { novaSenha } = req.body;

      if (!novaSenha) {
        return res.status(400).json({ error: "A nova senha é obrigatória." });
      }

      const resposta = await usuarioService.atualizarSenhaUsuario(id, novaSenha);
      res.status(200).json(resposta);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar senha." });
    }
  }

  async atualizarRoleEAtivoUsuario(req, res) {
    const { id } = req.params;
    const dados = req.body;

    try {
      const resultado = await usuarioService.atualizarRoleEAtivoUsuario(id, dados);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Método para buscar um usuário pelo ID
  async buscarUsuarioPorId(req, res) {
    try {
      const { id } = req.params;

      const usuario = await usuarioService.buscarUsuarioPorId(id);

      res.status(200).json(usuario); // Retorna o usuário encontrado
    } catch (error) {
      res.status(404).json({ error: error.message }); // Retorna erro caso o usuário não seja encontrado
    }
  }
}

// Remova a linha abaixo, pois está sobrescrevendo o `UsuarioService`:
// module.exports = UsuarioService;

module.exports = new UsuarioController();
