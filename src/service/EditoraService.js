const pool = require("../config/database");
const Editora = require("../models/Editora");

class EditoraService {
  static async criarEditora(nome) {
    try {
      const [result] = await pool.execute("INSERT INTO editora (nome) VALUES (?)", [nome]);
      return new Editora(result.insertId, nome);
    } catch (error) {
      console.error("Erro ao criar Editora:", error);
      throw error;
    }
  }

  static async  buscarTodasEditoras() {
    try {
      const [rows] = await pool.execute("SELECT * FROM editora");
      return rows.map(row => new Editora(row.id, row.nome));
    } catch (error) {
      console.error("Erro ao buscar Editoras:", error);
      throw error;
    }
  }

  static async buscarEditoraPorId(id) {
    try {
      const [rows] = await pool.execute("SELECT * FROM editora WHERE id = ?", [id]);
      if (rows.length === 0) return null;
      return new Editora(rows[0].id, rows[0].nome);
    } catch (error) {
      console.error("Erro ao buscar Editora por ID:", error);
      throw error;
    }
  }

  static async buscarEditoraPorNome(nome) {
    try {
        const [rows] = await pool.execute("SELECT * FROM editora WHERE nome LIKE ? COLLATE utf8_general_ci", [`%${nome}%`]);
        return rows.map(row => new Editora(row.id, row.nome));
    } catch (error) {
        console.error("❌ Erro ao buscar Editora por nome:", error);
        throw error;
    }
}

  // Atualizar Editora
  static async atualizarEditora(id, novoNome) {
    try {
      const [result] = await pool.execute("UPDATE editora SET nome = ? WHERE id = ?", [novoNome, id]);
      if (result.affectedRows === 0) return null;
      return new Editora(id, novoNome);
    } catch (error) {
      console.error("Erro ao atualizar Editora:", error);
      throw error;
    }
  }
}

module.exports = EditoraService;
