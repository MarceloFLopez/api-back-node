const CategoriaService = require("../service/CategoriaService");

class CategoriaController {
  // Criar uma nova categoria
  static async criarCategoria(req, res) {
    try {
      const { nome } = req.body;
      if (!nome) {
        return res.status(400).json({ mensagem: "O nome da categoria é obrigatório!" });
      }
      const categoria = await CategoriaService.criarCategoria(nome);
      return res.status(201).json(categoria);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao criar categoria", erro: error.message });
    }
  }

  // Buscar todas as categorias
  static async buscarTodasCategorias(req, res) {
    try {
      const categorias = await CategoriaService.buscarTodasCategorias();
      return res.status(200).json(categorias);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao buscar categorias", erro: error.message });
    }
  }

  // Buscar categoria por ID
  static async buscarCategoriaPorId(req, res) {
    console.log("🔴 Método buscarCategoriaPorNome chamado!");
    try {
      const { id } = req.params;
      const categoria = await CategoriaService.buscarCategoriaPorId(id);
      if (!categoria) {
        return res.status(404).json({ mensagem: "Categoria não encontrada!" });
      }
      return res.status(200).json(categoria);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao buscar categoria por ID", erro: error.message });
    }
  }

  // Buscar categoria por nome
  static async buscarCategoriaPorNome(req, res) {
    console.log("🟢 Método buscarCategoriaPorNome chamado!");
    try {
      const { nome } = req.query;
      if (!nome) {
        return res.status(400).json({ mensagem: "O nome da categoria é obrigatório na query!" });
      }
      const categorias = await CategoriaService.buscarCategoriaPorNome(nome);
      console.log(nome);
      return res.status(200).json(categorias);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao buscar categoria por nome", erro: error.message });
    }
  }

  // Atualizar categoria
  static async atualizarCategoria(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;
      if (!nome) {
        return res.status(400).json({ mensagem: "O novo nome da categoria é obrigatório!" });
      }
      const categoriaAtualizada = await CategoriaService.atualizarCategoria(id, nome);
      if (!categoriaAtualizada) {
        return res.status(404).json({ mensagem: "Categoria não encontrada!" });
      }
      return res.status(200).json(categoriaAtualizada);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao atualizar categoria", erro: error.message });
    }
  }
}

module.exports = CategoriaController;
