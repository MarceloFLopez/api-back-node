const pool = require("../config/database");
const Categoria = require("../models/Categoria");

class CategoriaService {
  // Criar uma nova categoria
  static async criarCategoria(nome) {
    try {
      const [result] = await pool.execute("INSERT INTO categoria (nome) VALUES (?)", [nome]);
      return new Categoria(result.insertId, nome);
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      throw error;
    }
  }

  // Buscar todas as categorias
  static async buscarTodasCategorias() {
    try {
      const [rows] = await pool.execute("SELECT * FROM categoria");
      return rows.map(row => new Categoria(row.id, row.nome));
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      throw error;
    }
  }

  // Buscar categoria por ID
  static async buscarCategoriaPorId(id) {
    try {
      const [rows] = await pool.execute("SELECT * FROM categoria WHERE id = ?", [id]);
      if (rows.length === 0) return null;
      return new Categoria(rows[0].id, rows[0].nome);
    } catch (error) {
      console.error("Erro ao buscar categoria por ID:", error);
      throw error;
    }
  }

  // Buscar categoria por nome
  static async buscarCategoriaPorNome(nome) {
    try {
        const [rows] = await pool.execute("SELECT * FROM categoria WHERE nome LIKE ? COLLATE utf8_general_ci", [`%${nome}%`]);
        return rows.map(row => new Categoria(row.id, row.nome));
    } catch (error) {
        console.error("❌ Erro ao buscar categoria por nome:", error);
        throw error;
    }
}


  // Atualizar categoria
  static async atualizarCategoria(id, novoNome) {
    try {
      const [result] = await pool.execute("UPDATE categoria SET nome = ? WHERE id = ?", [novoNome, id]);
      if (result.affectedRows === 0) return null;
      return new Categoria(id, novoNome);
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      throw error;
    }
  }
}

module.exports = CategoriaService;
