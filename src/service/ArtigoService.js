const db = require("../config/database"); // Supondo que você tenha um arquivo de configuração de conexão com o banco
const Artigo = require("../models/Artigo");

class ArtigoService {
  static async criarArtigo(dados) {
    try {
      const {
        dataenvio,
        datapublicacao,
        revista_id,
      } = dados;

      const query = `
        INSERT INTO artigo (dataenvio, datapublicacao, revista_id) 
        VALUES (?, ?, ?)
      `;

      const valores = [
        dataenvio || null,
        datapublicacao || null,
        revista_id || null,
      ];

      const [resultado] = await db.execute(query, valores);
      const artigoId = resultado.insertId;

      // Retorna o novo artigo criado
      return new Artigo(
        artigoId,
        dataenvio,
        datapublicacao,
        revista_id
      );
    } catch (error) {
      throw new Error("Erro ao criar artigo: " + error.message);
    }
  }

  // static async buscarTodosArtigos() {
  //   try {
  //     const query = `
  //       SELECT
  //           artigo.id,
  //           artigo.dataenvio,
  //           artigo.datapublicacao,
  //           revista.id AS revista_id,
  //           revista.titulo AS revista_titulo
  //       FROM artigo
  //       FULL OUTER JOIN revista ON artigo.revista_id = revista.id
  //     `;

  //     const [resultados] = await db.execute(query);

  //     return resultados;
  //   } catch (error) {
  //     throw new Error("Erro ao buscar artigos: " + error.message);
  //   }
  // }

  static async buscarTodosArtigos() {
    try {
      const query = `
        SELECT 
            artigo.id AS artigo_id, 
            artigo.dataenvio, 
            artigo.datapublicacao, 
            revista.id AS revista_id, 
            revista.titulo AS revista_titulo
        FROM artigo
        LEFT JOIN revista ON artigo.revista_id = revista.id

        UNION 

        SELECT 
            artigo.id AS artigo_id, 
            artigo.dataenvio, 
            artigo.datapublicacao, 
            revista.id AS revista_id, 
            revista.titulo AS revista_titulo
        FROM artigo
        RIGHT JOIN revista ON artigo.revista_id = revista.id
      `;

      const [resultados] = await db.execute(query);

      return resultados;
    } catch (error) {
      throw new Error("Erro ao buscar artigos: " + error.message);
    }
  }

  static async buscarArtigoPorId(artigoId) {
    try {
      const query = `
          SELECT 
              artigo.id AS artigo_id, 
              artigo.dataenvio, 
              artigo.datapublicacao, 
              revista.id AS revista_id, 
              revista.titulo AS revista_titulo
          FROM artigo
          LEFT JOIN revista ON artigo.revista_id = revista.id
          WHERE artigo.id = ?;
        `;

      const [resultados] = await db.execute(query, [artigoId]);

      if (resultados.length === 0) {
        return null; // Retorna null se o artigo não for encontrado
      }

      return resultados[0]; // Retorna o primeiro resultado encontrado
    } catch (error) {
      throw new Error("Erro ao buscar artigo: " + error.message);
    }
  }

  static async atualizarArtigo(artigoId, dados) {
    try {
      const { dataenvio, datapublicacao, revista_id } = dados;
      const query = `
        UPDATE artigo
        SET 
            dataenvio = ?, 
            datapublicacao = ?, 
            revista_id = ?
        WHERE id = ?;
      `;
      const [resultado] = await db.execute(query, [
        dataenvio || null,
        datapublicacao || null,
        revista_id || null,
        artigoId,
      ]);
      if (resultado.affectedRows === 0) {
        return null; // Nenhum artigo foi atualizado
      }
      return { artigoId, dataenvio, datapublicacao, revista_id };
    } catch (error) {
      throw new Error("Erro ao atualizar artigo: " + error.message);
    }
  }

  static async deletarArtigo(artigoId) {
    try {
      const query = `
        DELETE FROM artigo
        WHERE id = ?;
      `;
      const [result] = await db.execute(query, [artigoId]);
      if (result.affectedRows === 0) {
        return null; // Nenhum artigo foi encontrado para deletar
      }
      return true; // Artigo deletado com sucesso
    } catch (error) {
      throw new Error("Erro ao deletar artigo: " + error.message);
    }
  }
  

}

module.exports = ArtigoService;
