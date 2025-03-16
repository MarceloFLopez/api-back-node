const pool = require("../config/database");
const Banca = require("../models/Banca");

class BancaService {
  static async criarBanca(nome, situacao, ativacaotitulo, formatopdf, prazomedio, site, comoacessar, formapagamento, beneficios, mediaassinantes) {
    try {
      const [result] = await pool.execute(
        "INSERT INTO banca (nome, situacao, ativacaotitulo, formatopdf, prazomedio, site, comoacessar, formapagamento, beneficios, mediaassinantes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [nome, situacao, ativacaotitulo, formatopdf, prazomedio, site, comoacessar, formapagamento, beneficios, mediaassinantes]
      );
      return new Banca(result.insertId, nome, situacao, ativacaotitulo, formatopdf, prazomedio, site, comoacessar, formapagamento, beneficios, mediaassinantes);
    } catch (error) {
      console.error("Erro ao criar banca:", error);
      throw error;
    }
  }

  static async buscarTodasBancas() {
    try {
      const [rows] = await pool.execute("SELECT * FROM banca");
      return rows.map(row => new Banca(row.id, row.nome, row.situacao, row.ativacaotitulo, row.formatopdf, row.prazomedio, row.site, row.comoacessar, row.formapagamento, row.beneficios, row.mediaassinantes));
    } catch (error) {
      console.error("Erro ao buscar todas as bancas:", error);
      throw error;
    }
  }

  static async buscarBancaPorId(id) {
    try {
      const [rows] = await pool.execute("SELECT * FROM banca WHERE id = ?", [id]);
      if (rows.length === 0) return null;
      const row = rows[0];
      return new Banca(row.id, row.nome, row.situacao, row.ativacaotitulo, row.formatopdf, row.prazomedio, row.site, row.comoacessar, row.formapagamento, row.beneficios, row.mediaassinantes);
    } catch (error) {
      console.error("Erro ao buscar banca por ID:", error);
      throw error;
    }
  }

  static async buscarBancaPorNome(nome) {
    try {
      const [rows] = await pool.execute("SELECT * FROM banca WHERE nome LIKE ?", [`%${nome}%`]);
      return rows.map(row => new Banca(row.id, row.nome, row.situacao, row.ativacaotitulo, row.formatopdf, row.prazomedio, row.site, row.comoacessar, row.formapagamento, row.beneficios, row.mediaassinantes));
    } catch (error) {
      console.error("Erro ao buscar banca por nome:", error);
      throw error;
    }
}

static async atualizarBanca(id, novosDados) {
  try {
      // Primeiro, buscar os dados existentes da banca
      const [bancaAtual] = await pool.execute("SELECT * FROM banca WHERE id = ?", [id]);

      if (bancaAtual.length === 0) {
          return null; // Retorna null se a banca não existir
      }

      // Pegar os dados atuais da banca
      const dadosAtuais = bancaAtual[0];

      // Mesclar os dados recebidos com os dados existentes (se for undefined, mantém o valor atual)
      const dadosAtualizados = {
          nome: novosDados.nome ?? dadosAtuais.nome,
          situacao: novosDados.situacao ?? dadosAtuais.situacao,
          ativacaotitulo: novosDados.ativacaotitulo ?? dadosAtuais.ativacaotitulo,
          formatopdf: novosDados.formatopdf ?? dadosAtuais.formatopdf,
          prazomedio: novosDados.prazomedio ?? dadosAtuais.prazomedio,
          site: novosDados.site ?? dadosAtuais.site,
          comoacessar: novosDados.comoacessar ?? dadosAtuais.comoacessar,
          formapagamento: novosDados.formapagamento ?? dadosAtuais.formapagamento,
          beneficios: novosDados.beneficios ?? dadosAtuais.beneficios,
          mediaassinantes: novosDados.mediaassinantes ?? dadosAtuais.mediaassinantes
      };

      // Atualizar no banco apenas com os dados mesclados
      const query = `
          UPDATE banca SET 
              nome = ?, situacao = ?, ativacaotitulo = ?, formatopdf = ?, prazomedio = ?, 
              site = ?, comoacessar = ?, formapagamento = ?, beneficios = ?, mediaassinantes = ? 
          WHERE id = ?`;

      const valores = [
          dadosAtualizados.nome, dadosAtualizados.situacao, dadosAtualizados.ativacaotitulo, dadosAtualizados.formatopdf,
          dadosAtualizados.prazomedio, dadosAtualizados.site, dadosAtualizados.comoacessar, dadosAtualizados.formapagamento,
          dadosAtualizados.beneficios, dadosAtualizados.mediaassinantes, id
      ];

      const [result] = await pool.execute(query, valores);

      if (result.affectedRows === 0) return null;

      return { id, ...dadosAtualizados }; // Retorna os dados atualizados
  } catch (error) {
      console.error("Erro ao atualizar banca:", error);
      throw error;
  }
}

  static async deletarBanca(id) {
    try {
      const [result] = await pool.execute("DELETE FROM banca WHERE id = ?", [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Erro ao deletar banca:", error);
      throw error;
    }
  }
}

module.exports = BancaService;
