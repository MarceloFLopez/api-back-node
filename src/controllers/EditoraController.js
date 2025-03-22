const EditoraService = require("../service/EditoraService");

class EditoraController {
  static async criarEditora(req, res) {
    try {
      const { nome } = req.body;
      if (!nome) {
        return res.status(400).json({ mensagem: "O nome do Editora é obrigatório!" });
      }
      const editora = await EditoraService.criarEditora(nome);
      return res.status(201).json(editora);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao criar editora", erro: error.message });
    }
  }

  static async buscarTodasEditoras(req, res) {
    try {
      const editores = await EditoraService.buscarTodasEditoras();
      return res.status(200).json(editores);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao buscar editores", erro: error.message });
    }
  }

  static async buscarEditoraPorId(req, res) {
    try {
      const { id } = req.params;
      const editora = await EditoraService.buscarEditoraPorId(id);
      if (!editora) {
        return res.status(404).json({ mensagem: "Editora não encontrada!" });
      }
      return res.status(200).json(editora);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao buscar editora por ID", erro: error.message });
    }
  }

  static async buscarEditoraPorNome(req, res) {
    try {
      const { nome } = req.query;
      if (!nome) {
        return res.status(400).json({ mensagem: "O nome da Editora é obrigatório na query!" });
      }
      const editores = await EditoraService.buscarEditoraPorId(nome);
      return res.status(200).json(editores);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao buscar editores por nome", erro: error.message });
    }
  }

  static async atualizarEditora(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;
      if (!nome) {
        return res.status(400).json({ mensagem: "O novo nome da Editora é obrigatório!" });
      }
      const editoraAtualizado = await EditoraService.atualizarEditora(id, nome);
      if (!editoraAtualizado) {
        return res.status(404).json({ mensagem: "editora não encontrada!" });
      }
      return res.status(200).json(editoraAtualizado);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao atualizar editora", erro: error.message });
    }
  }
}

module.exports = EditoraController;
