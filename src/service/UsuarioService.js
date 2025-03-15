const bcrypt = require("bcrypt");
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

      // Criar objeto de usuário
      const novoUsuario = new Usuario(null, email, senhaHash, false, role);

      // Inserir no banco de dados
      const [resultado] = await db.execute(
        "INSERT INTO usuarios (email, senha, ativo, role) VALUES (?, ?, ?, ?)",
        [
          novoUsuario.email,
          novoUsuario.senha,
          novoUsuario.ativo,
          novoUsuario.role,
        ]
      );

      // Retorna o usuário criado (sem incluir a senha)
      return {
        id: resultado.insertId,
        email: novoUsuario.email,
        role: novoUsuario.role,
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
      const { role, ativo } = dados;

      // Verificar se a role é válida
      const rolesPermitidas = ['user', 'manager', 'admin'];
      if (!rolesPermitidas.includes(role)) {
        throw new Error('Role inválida. As permissões permitidas são: user, manager, admin.');
      }

      // Verificar se o valor de 'ativo' é booleano
      if (typeof ativo !== 'boolean') {
        throw new Error('O campo "ativo" deve ser um valor booleano (true ou false).');
      }

      // Atualizar os dados do usuário
      const [resultado] = await db.execute(
        'UPDATE usuarios SET role = ?, ativo = ? WHERE id = ?',
        [role, ativo, id]
      );

      if (resultado.affectedRows === 0) {
        throw new Error('Usuário não encontrado.');
      }

      return { message: 'Role e status do usuário atualizados com sucesso.' };
    } catch (error) {
      console.error('Erro ao atualizar role e ativo do usuário:', error);
      throw new Error(error.message || 'Erro ao atualizar role e ativo do usuário.');
    }
  }

  async buscarUsuarioPorId(id) {
    try {
      const [usuario] = await db.execute('SELECT id, email, ativo, role FROM usuarios WHERE id = ?', [id]);

      if (usuario.length === 0) {
        throw new Error('Usuário não encontrado');
      }

      return usuario[0]; // Retorna o usuário encontrado
    } catch (error) {
      throw new Error(error.message || 'Usuário não encontrado!.');
    }
  }
  
}
module.exports = UsuarioService;