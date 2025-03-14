const db = require("../config/database"); // Certifique-se de importar a conexão do banco de dados corretamente
const Programacao = require("../models/Programacao");

class ProgramacaoService {
  static async criarProgramacao(dados) {
    try {
      const {
        revistaId,
        bancaId,
        prazoprogramacao,
        periodicidade,
        envio,
        asin,
        cid,
        status,
        envioftp,
        arquivoenviado,
        aprovacao,
        kit,
      } = dados;

      const query = `
        INSERT INTO programacao (
          revista_id,
          banca_id,
          prazoprogramacao,
          periodicidade,
          envio,
          asin,
          cid,
          status,
          envioftp,
          arquivoenviado,
          aprovacao,
          kit
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const valores = [
        revistaId || null,
        bancaId || null,
        prazoprogramacao || null,
        periodicidade || null,
        envio || null,
        asin || null,
        cid || null,
        status || null,
        envioftp || null,
        arquivoenviado || null,
        aprovacao || null,
        kit || null,
      ];

      const [resultado] = await db.execute(query, valores);
      const programacaoId = resultado.insertId;

      return new Programacao(
        programacaoId,
        revistaId,
        bancaId,
        prazoprogramacao,
        periodicidade,
        envio,
        asin,
        cid,
        status,
        envioftp,
        arquivoenviado,
        aprovacao,
        kit
      );
    } catch (error) {
      throw new Error("Erro ao criar programação: " + error.message);
    }
  }

  static async buscarTodasProgramacoes() {
    try {
      const query = `
        SELECT 
        p.id, 
        p.revista_id, 
        r.titulo AS revista_titulo,
        p.banca_id,
        b.nome as banca_nome, 
        p.prazoprogramacao, 
        p.periodicidade,
        p.envio, 
        p.asin, 
        p.cid, 
        p.status, 
        p.envioftp, 
        p.arquivoenviado, 
        p.aprovacao, 
        p.kit,
               r.*, b.*
        FROM programacao p
        LEFT JOIN revista r ON p.revista_id = r.id
        LEFT JOIN banca b ON p.banca_id = b.id;
      `;

      const [rows] = await db.execute(query); // Executando a query no banco de dados.

      return rows; // Retorna todas as programações com dados expandidos de revista e banca.
    } catch (error) {
      throw new Error("Erro ao buscar as programações: " + error.message);
    }
  }

  static async buscarProgramcaoPorId(id) {
    try {
      const [programacaoResult] = await db.execute(
        `SELECT * FROM programacao WHERE id =?`,
        [id]
      );

      if (programacaoResult.length === 0) {
        throw new Error("Programação não encontrada");
      }
      const programacao = programacaoResult[0];

      const [revistaResult] = await db.execute(
        `SELECT * FROM revista WHERE id =?`,
        [programacao.revista_id]
      );

      const revista = revistaResult[0];

      const [bancaResult] = await db.execute(
        `SELECT * FROM banca WHERE id =?`,
        [programacao.banca_id]
      );
      const banca = bancaResult[0];
      return {
        id: programacao.id,
        revistaId: programacao.revista_id,
        revistaTitulo: revista.titulo,
        bancaId: programacao.banca_id,
        bancaNome: banca.nome,
        prazoProgramacao: programacao.prazoprogramacao,
        periodicidade: programacao.periodicidade,
        envio: programacao.envio,
        asin: programacao.asin,
        cid: programacao.cid,
        status: programacao.status,
        envioFtp: programacao.envioftp,
        arquivoEnviado: programacao.arquivoenviado,
        aprovacao: programacao.aprovacao,
        kit: programacao.kit,
      };
    } catch (error) {
      throw new Error("Erro ao buscar a programação: " + error.message);
    }
  }

  static async atualizarProgramacao(id, dados) {
    try {
      const {
        revistaId,
        bancaId,
        prazoprogramacao,
        periodicidade,
        envio,
        asin,
        cid,
        status,
        envioftp,
        arquivoenviado,
        aprovacao,
        kit,
      } = dados;
      const query = `
        UPDATE programacao
        SET revista_id =?,
            banca_id =?,
            prazoprogramacao =?,
            periodicidade =?,
            envio =?,
            asin =?,
            cid =?,
            status =?,
            envioftp =?,
            arquivoenviado =?,
            aprovacao =?,
            kit =?
            WHERE id =?;
            `;
      const valores = [
        revistaId || null,
        bancaId || null,
        prazoprogramacao || null,
        periodicidade || null,
        envio || null,
        asin || null,
        cid || null,
        status || null,
        envioftp || null,
        arquivoenviado || null,
        aprovacao || null,
        kit || null,
        id,
      ];
      await db.execute(query, valores);
      return valores;
    } catch (error) {
      throw new Error("Erro ao atualizar programação: " + error.message);
    }
  }

  static async deletarProgramacao(id) {
    try {

      const [programacaoExistente] = await db.execute(
        `SELECT * FROM programacao WHERE id =?`,
        [id]
      )
      if (programacaoExistente.length === 0) {
        throw new Error("Programação não encontrada");
      }
      await db.execute(`DELETE FROM programacao WHERE id =?`, [id]);
      return { mensagem: "Programa deleado com sucesso!"}
    } catch (error) {
      throw new Error("Erro ao deletar programação: " + error.message);
    }
  }
}

module.exports = ProgramacaoService;
