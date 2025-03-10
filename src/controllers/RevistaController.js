const RevistaService = require("../service/RevistaService");
const db = require("../config/database");

class RevistaController {
    static async criarRevista(req, res) {
        
        try {
            const {
                titulo, pdfdata, edicao, chamadaprinciapl, palavrachave,
                numeropaginas, ean, isbn, bisac, descricao, periodicidade,
                precocapa, arquivoaberto, observacao, editoraId, autorId, categorias
            } = req.body;

            // Validação para garantir que os valores obrigatórios existam
            if (!titulo || !editoraId || !autorId) {
                return res.status(400).json({ mensagem: "Título, Editora ID e Autor ID são obrigatórios!" });
            }

            // Substituir valores undefined por null
            const dados = {
                titulo: titulo || null,
                pdfdata: pdfdata || null,
                edicao: edicao || null,
                chamadaprinciapl: chamadaprinciapl || null,
                palavrachave: palavrachave || null,
                numeropaginas: numeropaginas || null,
                ean: ean || null,
                isbn: isbn || null,
                bisac: bisac || null,
                descricao: descricao || null,
                periodicidade: periodicidade || null,
                precocapa: precocapa || null,
                arquivoaberto: arquivoaberto !== undefined ? arquivoaberto : null,
                observacao: observacao || null,
                editoraId: editoraId || null,
                autorId: autorId || null,
                categorias: categorias || []
            };

            const revistaCriada = await RevistaService.criarRevista(dados);
            return res.status(201).json(revistaCriada);
            
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro ao criar revista", erro: error.message });
        }
    }
    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ mensagem: "O ID da revista é obrigatório!" });
            }

            const revista = await RevistaService.buscarPorId(id);

            if (!revista) {
                return res.status(404).json({ mensagem: "Revista não encontrada!" });
            }

            return res.status(200).json(revista);
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro ao buscar revista", erro: error.message });
        }
    }

    static async buscarPorNome(req, res) {
        try {
            const { nome } = req.query;

            if (!nome) {
                return res.status(400).json({ mensagem: "O nome da revista é obrigatório para a busca!" });
            }

            const revistas = await RevistaService.buscarPorNome(nome) ;

            if (revistas.length === 0) {
                return res.status(404).json({ mensagem: "Nenhuma revista encontrada com esse título." });
            }

            return res.status(200).json(revistas);
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro ao buscar revista por título", erro: error.message });
        }
    }

    static async buscarTodasRevistas(req, res) {
        try {
            const revistas = await RevistaService.buscarTodasRevistas();
            return res.status(200).json(revistas);
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro ao buscar todas as revistas", erro: error.message });
        }
    }

    static async atualizarRevista(req, res) {
        try {
            const { id } = req.params; // Pegamos o ID da revista da URL
            const dadosAtualizacao = req.body; // Pegamos os dados para atualização do corpo da requisição

            const revistaAtualizada = await RevistaService.atualizarRevista(id, dadosAtualizacao);
            return res.status(200).json(revistaAtualizada);
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro ao atualizar revista", erro: error.message });
        }
    }

    static async deletarRevista(req, res) {
        try {
            const { id } = req.params;
            const sucesso = await RevistaService.deletarRevista(id);
            if (!sucesso) {
                return res.status(404).json({ mensagem: "Revista não encontrada para exclusão!" });
            }
            return res.status(200).json({ mensagem: "Revista excluída com sucesso!" });
            } catch (error) {
            return res.status(500).json({ mensagem: "Erro ao excluir revista", erro: error.message });
        
            }
    }
    
}

module.exports = RevistaController;
