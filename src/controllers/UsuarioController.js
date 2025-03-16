// Atualize seu arquivo UsuarioController.js assim:
const authMiddleware = require("../middleware/authMiddleware");
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

  // async login(req, res) {
  //   try {
  //     const { email, senha } = req.body;

  //     if (!email || !senha) {
  //       return res.status(400).json({ error: "Email e senha são obrigatórios." });
  //     }

  //     const loginResponse = await usuarioService.loginUsuario(email, senha);
      
  //     return res.status(200).json(loginResponse); // Retorna o usuário com o token
  //   } catch (error) {
  //     res.status(401).json({ error: error.message }); // Retorna erro de autenticação
  //   }
  // }

// async loginUsuario(email, senha) {
//   try {
//     // Buscar o usuário no banco de dados pelo email
//     const [usuarios] = await db.execute("SELECT * FROM usuarios WHERE email = ?", [email]);

//     if (!usuarios || usuarios.length === 0) {
//       throw new Error("Usuário não encontrado.");
//     }

//     const usuarioEncontrado = usuarios[0]; // Pegando o primeiro usuário encontrado

//     // Verificar se o usuário está ativo
//     if (usuarioEncontrado.ativo === 0) {
//       throw new Error("Usuário está inativo.");
//     }

//     // Verificar se a senha está correta
//     const senhaValida = await bcrypt.compare(senha, usuarioEncontrado.senha);

//     if (!senhaValida) {
//       throw new Error("Senha inválida.");
//     }

//     // Gerar o token JWT com a expiração configurada corretamente
//     const token = jwt.sign(
//       {
//         id: usuarioEncontrado.id,
//         email: usuarioEncontrado.email,
//         role: usuarioEncontrado.role,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_EXPIRES_IN }
//     );

//     return {
//       id: usuarioEncontrado.id,
//       email: usuarioEncontrado.email,
//       role: usuarioEncontrado.role,
//       token: token,
//     };
//   } catch (error) {
//     console.error("Erro no login:", error);
//     throw new Error("Erro ao realizar login.");
//   }
// }

async login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
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
      const resposta = await usuarioService.atualizarRoleEAtivoUsuario(id, dados);
      res.status(200).json(resposta);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

}

module.exports = new UsuarioController();
