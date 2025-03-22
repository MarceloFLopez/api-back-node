const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario"); // Importando o modelo
const db = require("../config/database"); // Importando a conexão com o banco

class UsuarioService {
  // Método para criar um novo usuário
  async criarUsuario(dados) {
    try {
      const { email, senha, role } = dados;

      // Verificar se o email já existe no banco
      const [usuarioExistente] = await db.execute(
        "SELECT * FROM usuarios WHERE email = ?",
        [email]
      );
      if (usuarioExistente.length > 0) {
        throw new Error("Email já está em uso.");
      }

      // Criptografando a senha com bcrypt
      const senhaHash = await bcrypt.hash(senha, 10);
      console.log("Senha criptografada:", senhaHash);

      // Criar objeto de usuário
      const novoUsuario = new Usuario(null, email, senhaHash, false);

      // Inserir no banco de dados
      const [resultado] = await db.execute(
        "INSERT INTO usuarios (email, senha, ativo) VALUES (?, ?, ?)",
        [novoUsuario.email, novoUsuario.senha, novoUsuario.ativo]
      );

      // Retorna o usuário criado (sem incluir a senha)
      return {
        id: resultado.insertId,
        email: novoUsuario.email,
        ativo: novoUsuario.ativo,
      };
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw new Error("Erro ao criar usuário.");
    }
  }

  async listarTodosUsuarios() {
    try {
      // Buscar usuários no banco de dados
      const [usuarios] = await db.execute(
        "SELECT id, email, ativo, role, senha FROM usuarios"
      );

      return usuarios; // Retorna os usuários sem a senha
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw new Error("Erro ao buscar usuários.");
    }
  }

  async atualizarSenhaUsuario(id, novaSenha) {
    try {
      // Criptografar a nova senha
      const senhaHash = await bcrypt.hash(novaSenha, 10);

      // Atualizar a senha no banco de dados
      const [resultado] = await db.execute(
        "UPDATE usuarios SET senha = ? WHERE id = ?",
        [senhaHash, id]
      );

      if (resultado.affectedRows === 0) {
        throw new Error("Usuário não encontrado.");
      }

      return { message: "Senha atualizada com sucesso." };
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      throw new Error("Erro ao atualizar senha.");
    }
  }

  async atualizarRoleEAtivoUsuario(id, dados) {
    try {
      console.log(dados); // Verificando o que está sendo passado como 'dados'

      const { role, ativo } = dados;

      // Verificar se a role é válida
      const rolesPermitidas = ["user", "manager", "admin"];
      if (!rolesPermitidas.includes(role)) {
        throw new Error(
          "Role inválida. As permissões permitidas são: user, manager, admin."
        );
      }

      // Verificar se o valor de 'ativo' é booleano
      if (typeof ativo !== "boolean") {
        throw new Error(
          'O campo "ativo" deve ser um valor booleano (true ou false).'
        );
      }

      // Atualizar os dados do usuário
      const [resultado] = await db.execute(
        "UPDATE usuarios SET role = ?, ativo = ? WHERE id = ?",
        [role, ativo, id]
      );

      if (resultado.affectedRows === 0) {
        throw new Error("Usuário não encontrado.");
      }

      return { message: "Role e status do usuário atualizados com sucesso." };
    } catch (error) {
      console.error("Erro ao atualizar role e ativo do usuário:", error);
      throw new Error(
        error.message || "Erro ao atualizar role e ativo do usuário."
      );
    }
  }

  async buscarUsuarioPorId(id) {
    try {
      const [usuario] = await db.execute(
        "SELECT id, email, ativo, role FROM usuarios WHERE id = ?",
        [id]
      );

      if (usuario.length === 0) {
        throw new Error("Usuário não encontrado");
      }

      return usuario[0]; // Retorna o usuário encontrado
    } catch (error) {
      throw new Error(error.message || "Usuário não encontrado!.");
    }
  }

  async loginUsuario(email, senha) {
    try {
      // Buscar o usuário no banco de dados pelo email
      const [usuarios] = await db.execute(
        "SELECT * FROM usuarios WHERE email = ?",
        [email]
      );

      if (!usuarios || usuarios.length === 0) {
        throw new Error("Usuário não encontrado.");
      }

      const usuarioEncontrado = usuarios[0]; // Pegando o primeiro usuário encontrado

      // Verificar se o usuário está ativo
      if (usuarioEncontrado.ativo === 0) {
        throw new Error("Usuário está inativo.");
      }

      // Verificar se a senha está correta
      const senhaValida = await bcrypt.compare(senha, usuarioEncontrado.senha);

      if (!senhaValida) {
        throw new Error("Senha inválida.");
      }

      // Gerar o token JWT com a expiração configurada corretamente
      const token = jwt.sign(
        {
          id: usuarioEncontrado.id,
          email: usuarioEncontrado.email,
          role: usuarioEncontrado.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      // Salva o token no banco de dados, incluindo a data de login
      const dataLogin = new Date(); // A data e hora do login
      await db.execute(
        "INSERT INTO tokens_ativos (token, email, data_login) VALUES (?, ?, ?)",
        [token, email, dataLogin]
      );
      return {
        token: token,
        role: usuarioEncontrado.role,
      };
    } catch (error) {
      console.error("Erro no login:", error);
      throw new Error("Erro ao realizar login.");
    }
  }

  // Método para verificar se o usuário tem permissão de admin
  async verificarPermissaoAdmin(id) {
    try {
      const [usuario] = await db.execute(
        "SELECT role FROM usuarios WHERE id = ?",
        [id]
      );

      if (usuario.length === 0) {
        throw new Error("Usuário não encontrado.");
      }

      return usuario[0].role === "admin";
    } catch (error) {
      console.error("Erro ao verificar permissão de admin:", error);
      throw new Error("Erro ao verificar permissão.");
    }
  }

  async logout(token) {
    try {
      return { message: "Logout realizado com sucesso." }; // Sucesso no logout
    } catch (error) {
      console.error("Erro ao tentar realizar o logout:", error);
      throw new Error("Erro ao realizar logout.");
    }
  }
}
module.exports = UsuarioService;
