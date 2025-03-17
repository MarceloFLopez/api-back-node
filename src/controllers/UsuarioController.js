// Atualize seu arquivo UsuarioController.js assim:
const verificarTokenRevogado = require("../middleware/tokenMiddleware");
const db = require("../config/database");
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

      const resposta = await usuarioService.atualizarSenhaUsuario(
        id,
        novaSenha
      );
      res.status(200).json(resposta);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar senha." });
    }
  }

  async atualizarRoleEAtivoUsuario(req, res) {
    const { id } = req.params;
    const dados = req.body;

    try {
      const resultado = await usuarioService.atualizarRoleEAtivoUsuario(
        id,
        dados
      );
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

  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res
          .status(400)
          .json({ error: "Email e senha são obrigatórios." });
      }

      const loginResponse = await usuarioService.loginUsuario(email, senha);

      return res.status(200).json(loginResponse); // Retorna o usuário com o token
    } catch (error) {
      res.status(401).json({ error: error.message }); // Retorna erro de autenticação
    }
  }

  async atualizarRoleEAtivoUsuario(req, res) {
    try {
      const { id } = req.params;
      const dados = req.body; // Certifique-se de que os dados estão sendo recebidos corretamente
      const resposta = await usuarioService.atualizarRoleEAtivoUsuario(
        id,
        dados
      );
      res.status(200).json(resposta);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async logout(req, res) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1]; // Pega o token da requisição
      
      if (!token) {
        return res.status(400).json({ message: "Token não fornecido." });
      }

      // Registra o token como revogado no banco de dados
      const tokenRevogado = await verificarTokenRevogado(token); // Checa se o token já está revogado
      if (tokenRevogado) {
        return res.status(400).json({ message: "Token já revogado." });
      }

      // Aqui você poderia, por exemplo, inserir o token na tabela de revogados
      await db.execute("INSERT INTO tokens_revogados (token) VALUES (?)", [
        token,
      ]);

      // Resposta de sucesso
      return res.status(200).json({ message: "Logout realizado com sucesso." });
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      return res.status(500).json({ message: "Erro ao realizar logout." });
    }
  }
}

module.exports = new UsuarioController();
