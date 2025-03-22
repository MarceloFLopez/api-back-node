const AutorService = require("../service/AutorService");

class AutorController {
  // Criar uma novo Autor
  static async criarAutor(req, res) {
    try {
      const { nome } = req.body;
      if (!nome) {
        return res.status(400).json({ mensagem: "O nome do Autor é obrigatório!" });
      }
      const autor = await AutorService.criarAutor(nome);
      return res.status(201).json(autor);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao criar autor", erro: error.message });
    }
  }

  // Buscar todas as autores
  static async buscarTodosAutores(req, res) {
    try {
      const autores = await AutorService.buscarTodosAutores();
      return res.status(200).json(autores);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao buscar autores", erro: error.message });
    }
  }

  // Buscar autor por ID
  static async buscarAutorPorId(req, res) {
    try {
      const { id } = req.params;
      const autor = await AutorService.buscarAutorPorId(id);
      if (!autor) {
        return res.status(404).json({ mensagem: "Autor não encontrada!" });
      }
      return res.status(200).json(autor);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao buscar autor por ID", erro: error.message });
    }
  }

  // Buscar autor por nome
  static async buscarAutorPorNome(req, res) {
    try {
      const { nome } = req.query;
      if (!nome) {
        return res.status(400).json({ mensagem: "O nome da Autor é obrigatório na query!" });
      }
      const autores = await AutorService.buscarAutorPorNome(nome);
      return res.status(200).json(autores);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao buscar autore por nome", erro: error.message });
    }
  }

  // Atualizar autores
  static async atualizarAutor(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;
      if (!nome) {
        return res.status(400).json({ mensagem: "O novo nome da Autor é obrigatório!" });
      }
      const autorAtualizado = await AutorService.atualizarAutor(id, nome);
      if (!autorAtualizado) {
        return res.status(404).json({ mensagem: "autor não encontrada!" });
      }
      return res.status(200).json(autorAtualizado);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao atualizar autor", erro: error.message });
    }
  }
}

module.exports = AutorController;
