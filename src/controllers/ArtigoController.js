const ArtigoService = require("../service/ArtigoService");

class ArtigoController {
  // Método para criar um artigo
  static async criarArtigo(req, res) {
    try {
      const dados = req.body;

      // Chama o serviço para criar o artigo
      const artigo = await ArtigoService.criarArtigo(dados);

      // Retorna o artigo criado com status 201 (Created)
      res.status(201).json({
        message: "Artigo criado com sucesso",
        artigo: artigo,
      });
    } catch (error) {
      // Caso ocorra um erro, retorna a mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({
        message: "Erro ao criar artigo",
        error: error.message,
      });
    }
  }

  static async buscarTodosArtigos(req, res) {
    try {
      const artigos = await ArtigoService.buscarTodosArtigos();
      res.json(artigos);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar artigos", error: error.message });
    }
  }

  static async buscarArtigoPorId(req, res) {
    try {
      const { id } = req.params;
      const artigo = await ArtigoService.buscarArtigoPorId(id);
      if (!artigo) {
        return res.status(404).json({ message: "Artigo não encontrado" });
      }
      res.json(artigo);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar artigo", error: error.message });
    }
  }
  static async atualizarArtigo(req, res) {
    try {
      const { id } = req.params;
      const dados = req.body;
      const artigo = await ArtigoService.atualizarArtigo(id, dados);
      if (!artigo) {
        return res.status(404).json({ message: "Artigo não encontrado" });
      }
      res.json(artigo);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao atualizar artigo", error: error.message });
    }
  }
  static async deletarArtigo(req, res) {
    try {
      const { id } = req.params;
      const artigoDeletado = await ArtigoService.deletarArtigo(id);
  
      // Se o artigo não for encontrado
      if (!artigoDeletado) {
        return res.status(404).json({ message: "Artigo não encontrado" });
      }
  
      // Se o artigo foi deletado
      res.status(200).json({ message: "Artigo deletado com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao deletar artigo", error: error.message });
    }
  }
  
}
module.exports = ArtigoController;
