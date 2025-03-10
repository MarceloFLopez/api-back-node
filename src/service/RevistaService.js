const db = require("../config/database");
const Revista = require("../models/Revista");

class RevistaService {
  static async criarRevista(dados) {
    try {
      const {
        titulo,
        pdfdata,
        edicao,
        chamadaprinciapl,
        palavrachave,
        numeropaginas,
        ean,
        isbn,
        bisac,
        descricao,
        periodicidade,
        precocapa,
        arquivoaberto,
        observacao,
        editoraId,
        autorId,
        categorias,
      } = dados;

      const query = `
              INSERT INTO revista (
                  titulo, pdfdata, edicao, chamadaprinciapl, palavrachave, numeropaginas,
                  ean, isbn, bisac, descricao, periodicidade, precocapa, arquivoaberto,
                  observacao, editora_id, autor_id
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const valores = [
        titulo || null,
        pdfdata || null,
        edicao || null,
        chamadaprinciapl || null,
        palavrachave || null,
        numeropaginas || null,
        ean || null,
        isbn || null,
        bisac || null,
        descricao || null,
        periodicidade || null,
        precocapa || null,
        arquivoaberto !== undefined ? arquivoaberto : null,
        observacao || null,
        editoraId,
        autorId,
      ];

      const [resultado] = await db.execute(query, valores);
      const revistaId = resultado.insertId;

      // Inserindo categorias na tabela de relacionamento
      if (categorias && categorias.length > 0) {
        for (const categoriaId of categorias) {
          await db.execute(
            "INSERT INTO revista_categoria (revista_id, categoria_id) VALUES (?, ?)",
            [revistaId, categoriaId]
          );
        }
      }

      return new Revista(
        revistaId,
        titulo,
        pdfdata,
        edicao,
        chamadaprinciapl,
        palavrachave,
        numeropaginas,
        ean,
        isbn,
        bisac,
        descricao,
        periodicidade,
        precocapa,
        arquivoaberto,
        observacao,
        editoraId,
        autorId,
        categorias
      );
    } catch (error) {
      throw new Error("Erro ao criar revista: " + error.message);
    }
  }
  //   static async criarRevista(dados) {
  //     try {
  //       const {
  //         titulo,
  //         pdfdata,
  //         edicao,
  //         chamadaprinciapl,
  //         palavrachave,
  //         numeropaginas,
  //         ean,
  //         isbn,
  //         bisac,
  //         descricao,
  //         periodicidade,
  //         precocapa,
  //         arquivoaberto,
  //         observacao,
  //         editoraId,
  //         autorId,
  //         categorias,
  //       } = dados;

  //       // Logando os dados para verificar os valores
  //       console.log("Dados recebidos:", dados);

  //       // Verifique se arquivoaberto está definido, caso contrário, use null
  //       const arquivoabertoFinal =
  //         arquivoaberto !== undefined ? arquivoaberto : null;

  //       const query = `
  //                     INSERT INTO revista (
  //                         titulo, pdfdata, edicao, chamadaprinciapl, palavrachave, numeropaginas,
  //                         ean, isbn, bisac, descricao, periodicidade, precocapa, arquivoaberto,
  //                         observacao, editora_id, autor_id
  //                     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  //                 `;

  //       const valores = [
  //         titulo || null,
  //         pdfdata || null,
  //         edicao || null,
  //         chamadaprinciapl || null,
  //         palavrachave || null,
  //         numeropaginas || null,
  //         ean || null,
  //         isbn || null,
  //         bisac || null,
  //         descricao || null,
  //         periodicidade || null,
  //         precocapa || null,
  //         arquivoabertoFinal,
  //         observacao || null,
  //         editoraId,
  //         autorId,
  //       ];

  //       // Logando a query e os valores para depuração
  //       console.log("Query SQL:", query);
  //       console.log("Valores:", valores);

  //       const [resultado] = await db.execute(query, valores);
  //       const revistaId = resultado.insertId;

  //       // Inserindo categorias na tabela de relacionamento
  //       if (categorias && categorias.length > 0) {
  //         for (const categoriaId of categorias) {
  //           await db.execute(
  //             "INSERT INTO revista_categoria (revista_id, categoria_id) VALUES (?, ?)",
  //             [revistaId, categoriaId]
  //           );
  //         }
  //       }

  //       return new Revista(
  //         revistaId,
  //         titulo,
  //         pdfdata,
  //         edicao,
  //         chamadaprinciapl,
  //         palavrachave,
  //         numeropaginas,
  //         ean,
  //         isbn,
  //         bisac,
  //         descricao,
  //         periodicidade,
  //         precocapa,
  //         arquivoabertoFinal,
  //         observacao,
  //         editoraId,
  //         autorId,
  //         categorias
  //       );
  //     } catch (error) {
  //       console.error("Erro no método criarRevista:", error.message);
  //       throw new Error("Erro ao criar revista: " + error.message);
  //     }
  //   }

  static async buscarPorId(id) {
    try {
      // Buscar os dados principais da revista
      const [revistaResult] = await db.execute(
        `
                SELECT * FROM revista WHERE id = ?
            `,
        [id]
      );

      if (revistaResult.length === 0) {
        throw new Error("Revista não encontrada");
      }

      const revista = revistaResult[0];

      // Buscar informações completas da editora
      const [editoraResult] = await db.execute(
        `SELECT * FROM editora WHERE id = ?`,
        [revista.editora_id]
      );

      const editora = editoraResult.length > 0 ? editoraResult[0] : null;

      // Buscar informações completas do autor
      const [autorResult] = await db.execute(
        `SELECT * FROM autor WHERE id = ?`,
        [revista.autor_id]
      );

      const autor = autorResult.length > 0 ? autorResult[0] : null;

      // Buscar categorias associadas à revista
      const [categoriasResult] = await db.execute(
        `
                SELECT c.id, c.nome 
                FROM categoria c
                INNER JOIN revista_categoria rc ON c.id = rc.categoria_id
                WHERE rc.revista_id = ?
            `,
        [id]
      );

      // Retornar os dados completos da revista, incluindo editora, autor e categorias
      return {
        id: revista.id,
        titulo: revista.titulo,
        pdfdata: revista.pdfdata,
        edicao: revista.edicao,
        chamadaprinciapl: revista.chamadaprinciapl,
        palavrachave: revista.palavrachave,
        numeropaginas: revista.numeropaginas,
        ean: revista.ean,
        isbn: revista.isbn,
        bisac: revista.bisac,
        descricao: revista.descricao,
        periodicidade: revista.periodicidade,
        precocapa: revista.precocapa,
        arquivoaberto: revista.arquivoaberto,
        observacao: revista.observacao,
        editora: editora, // Objeto completo da editora
        autor: autor, // Objeto completo do autor
        categorias: categoriasResult, // Array de categorias [{ id, nome }, { id, nome }]
      };
    } catch (error) {
      throw new Error("Erro ao buscar revista: " + error.message);
    }
  }

  // static async buscarPorNome(nome) {
  //     try {
  //         const query = `
  //             SELECT
  //                 r.*,
  //                 e.nome AS editora_nome,
  //                 a.nome AS autor_nome,
  //                 c.nome AS categoria_nome
  //             FROM revista r
  //             LEFT JOIN editora e ON r.editora_id = e.id
  //             LEFT JOIN autor a ON r.autor_id = a.id
  //             LEFT JOIN revista_categoria rc ON r.id = rc.revista_id
  //             LEFT JOIN categoria c ON rc.categoria_id = c.id
  //             WHERE r.titulo LIKE ?
  //         `;

  //         const [revistas] = await db.execute(query, [`%${nome}%`]);

  //         return revistas;
  //     } catch (error) {
  //         throw new Error("Erro ao buscar revistas por título: " + error.message);
  //     }
  // }

  static async buscarPorNome(nome) {
    try {
      const query = `
                SELECT 
                    r.id, 
                    r.titulo, 
                    r.pdfdata, 
                    r.edicao, 
                    r.chamadaprinciapl, 
                    r.palavrachave, 
                    r.numeropaginas, 
                    r.ean, 
                    r.isbn, 
                    r.bisac, 
                    r.descricao, 
                    r.periodicidade, 
                    r.precocapa, 
                    r.arquivoaberto, 
                    r.observacao,
                    e.id AS editora_id,
                    e.nome AS editora_nome,
                    a.id AS autor_id,
                    a.nome AS autor_nome,
                    c.id AS categoria_id,
                    c.nome AS categoria_nome
                FROM revista r
                LEFT JOIN editora e ON r.editora_id = e.id
                LEFT JOIN autor a ON r.autor_id = a.id
                LEFT JOIN revista_categoria rc ON r.id = rc.revista_id
                LEFT JOIN categoria c ON rc.categoria_id = c.id
                WHERE r.titulo LIKE ?
            `;

      const [revistas] = await db.execute(query, [`%${nome}%`]);

      // Organizando os resultados no formato desejado
      const revistasComDetalhes = revistas.map((revista) => {
        // Organizando a revista
        const revistaFormatada = {
          id: revista.id,
          titulo: revista.titulo,
          pdfdata: revista.pdfdata,
          edicao: revista.edicao,
          chamadaprinciapl: revista.chamadaprinciapl,
          palavrachave: revista.palavrachave,
          numeropaginas: revista.numeropaginas,
          ean: revista.ean,
          isbn: revista.isbn,
          bisac: revista.bisac,
          descricao: revista.descricao,
          periodicidade: revista.periodicidade,
          precocapa: revista.precocapa,
          arquivoaberto: revista.arquivoaberto,
          observacao: revista.observacao,
          editora: {
            id: revista.editora_id,
            nome: revista.editora_nome,
          },
          autor: {
            id: revista.autor_id,
            nome: revista.autor_nome,
          },
          categorias: [], // Inicializa um array de categorias
        };

        // Adiciona a categoria se existir
        if (revista.categoria_id && revista.categoria_nome) {
          revistaFormatada.categorias.push({
            id: revista.categoria_id,
            nome: revista.categoria_nome,
          });
        }

        return revistaFormatada;
      });

      return revistasComDetalhes;
    } catch (error) {
      throw new Error("Erro ao buscar revistas por título: " + error.message);
    }
  }

  static async buscarTodasRevistas() {
    try {
      const query = `
                SELECT 
                    r.*, 
                    e.nome AS editora_nome, 
                    a.nome AS autor_nome,
                    c.nome AS categoria_nome
                FROM revista r
                LEFT JOIN editora e ON r.editora_id = e.id
                LEFT JOIN autor a ON r.autor_id = a.id
                LEFT JOIN revista_categoria rc ON r.id = rc.revista_id
                LEFT JOIN categoria c ON rc.categoria_id = c.id
            `;

      const [revistas] = await db.execute(query);

      // Agrupando as categorias para cada revista
      const revistasComCategorias = revistas.map((revista) => {
        const categorias = revistas
          .filter((item) => item.id === revista.id)
          .map((item) => ({ id: item.categoria_id, nome: item.categoria_nome }))
          .filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.id === value.id)
          );

        return {
          ...revista,
          categorias: categorias,
        };
      });

      // Removendo campos repetidos das revistas (campos de categoria, editora, autor duplicados)
      const revistasFinal = revistasComCategorias.map((revista) => {
        const { editora_nome, autor_nome, categoria_nome, ...rest } = revista;
        return {
          ...rest,
          editora: {
            id: revista.editora_id,
            nome: revista.editora_nome,
          },
          autor: {
            id: revista.autor_id,
            nome: revista.autor_nome,
          },
          categorias: revista.categorias,
        };
      });

      return revistasFinal;
    } catch (error) {
      throw new Error("Erro ao buscar todas as revistas: " + error.message);
    }
  }

  //   static async atualizarRevista(id, dadosAtualizacao) {
  //     try {
  //       // Primeiramente, pegamos a revista existente para garantir que mantemos as outras informações
  //       const [revistaExistente] = await db.execute(
  //         "SELECT * FROM revista WHERE id = ?",
  //         [id]
  //       );

  //       if (revistaExistente.length === 0) {
  //         throw new Error("Revista não encontrada");
  //       }

  //       // Vamos montar o objeto de atualização com os dados passados, mas mantendo os campos não passados
  //       const camposParaAtualizar = {};
  //       const campos = [
  //         "titulo",
  //         "pdfdata",
  //         "edicao",
  //         "chamadaprinciapl",
  //         "palavrachave",
  //         "numeropaginas",
  //         "ean",
  //         "isbn",
  //         "bisac",
  //         "descricao",
  //         "periodicidade",
  //         "precocapa",
  //         "arquivoaberto",
  //         "observacao",
  //         "editora_id",
  //         "autor_id",
  //       ];

  //       campos.forEach((campo) => {
  //         if (dadosAtualizacao[campo] !== undefined) {
  //           camposParaAtualizar[campo] = dadosAtualizacao[campo];
  //         } else {
  //           camposParaAtualizar[campo] = revistaExistente[0][campo]; // Mantém os valores antigos
  //         }
  //       });

  //       // Agora, fazemos o update no banco de dados com os dados que foram passados
  //       let setQuery = Object.keys(camposParaAtualizar)
  //         .map((key) => `${key} = ?`)
  //         .join(", ");

  //       let values = Object.values(camposParaAtualizar);

  //       const query = `UPDATE revista SET ${setQuery} WHERE id = ?`;
  //       await db.execute(query, [...values, id]);

  //       // Retornar a revista atualizada
  //       return { id, ...camposParaAtualizar };
  //     } catch (error) {
  //       throw new Error("Erro ao atualizar revista: " + error.message);
  //     }
  //   }

  static async atualizarRevista(id, dadosAtualizacao) {
    try {
      // Primeiramente, pegamos a revista existente para garantir que mantemos as outras informações
      const [revistaExistente] = await db.execute(
        "SELECT * FROM revista WHERE id = ?",
        [id]
      );

      if (revistaExistente.length === 0) {
        throw new Error("Revista não encontrada");
      }

      // Vamos montar o objeto de atualização com os dados passados, mas mantendo os campos não passados
      const camposParaAtualizar = {};
      const campos = [
        "titulo",
        "pdfdata",
        "edicao",
        "chamadaprinciapl",
        "palavrachave",
        "numeropaginas",
        "ean",
        "isbn",
        "bisac",
        "descricao",
        "periodicidade",
        "precocapa",
        "arquivoaberto",
        "observacao",
        "editora_id",
        "autor_id",
      ];

      campos.forEach((campo) => {
        if (dadosAtualizacao[campo] !== undefined) {
          camposParaAtualizar[campo] = dadosAtualizacao[campo];
        } else {
          camposParaAtualizar[campo] = revistaExistente[0][campo]; // Mantém os valores antigos
        }
      });

      // Agora, fazemos o update no banco de dados com os dados que foram passados
      let setQuery = Object.keys(camposParaAtualizar)
        .map((key) => `${key} = ?`)
        .join(", ");

      let values = Object.values(camposParaAtualizar);

      const query = `UPDATE revista SET ${setQuery} WHERE id = ?`;
      await db.execute(query, [...values, id]);

      // Verificando e atualizando as categorias
      if (
        dadosAtualizacao.categorias &&
        dadosAtualizacao.categorias.length > 0
      ) {
        // Remover as categorias antigas
        await db.execute("DELETE FROM revista_categoria WHERE revista_id = ?", [
          id,
        ]);

        // Inserir as novas categorias
        for (const categoriaId of dadosAtualizacao.categorias) {
          await db.execute(
            "INSERT INTO revista_categoria (revista_id, categoria_id) VALUES (?, ?)",
            [id, categoriaId]
          );
        }
      }

      // Retornar a revista atualizada com as novas categorias
      return {
        id,
        ...camposParaAtualizar,
        categorias: dadosAtualizacao.categorias,
      };
    } catch (error) {
      throw new Error("Erro ao atualizar revista: " + error.message);
    }
  }

  static async deletarRevista(id) {
    try {
      // Primeiramente, vamos verificar se a revista existe
      const [revistaExistente] = await db.execute(
        "SELECT * FROM revista WHERE id = ?",
        [id]
      );
  
      if (revistaExistente.length === 0) {
        throw new Error("Revista não encontrada");
      }
  
      // Remover as categorias associadas à revista
      await db.execute("DELETE FROM revista_categoria WHERE revista_id = ?", [id]);
  
      // Remover a revista
      const query = "DELETE FROM revista WHERE id = ?";
      await db.execute(query, [id]);
  
      return { mensagem: "Revista deletada com sucesso!" };
    } catch (error) {
      console.error("Erro no método deletarRevista:", error.message);
      throw new Error("Erro ao deletar revista: " + error.message);
    }
  }
  
}

module.exports = RevistaService;
