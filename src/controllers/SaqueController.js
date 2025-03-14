const SaqueService = require("../service/SaqueService");

class SaqueController {
  // Criar um novo saque
  static async criarSaque(req, res) {
    try {
      const novoSaque = await SaqueService.criarSaque(req.body);
      return res.status(201).json({ message: "Saque criado com sucesso", saque: novoSaque });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Listar todos os saques
  static async listarTodosSaques(req, res) {
    try {
      const saques = await SaqueService.listarTodosSaques();
      return res.status(200).json(saques);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Buscar saque por ID
  static async buscarSaquePorId(req, res) {
    try {
      const { id } = req.params;
      const saque = await SaqueService.buscarSaquePorId(id);
      if (!saque) return res.status(404).json({ message: "Saque não encontrado" });
      return res.status(200).json(saque);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async buscarSaquePorPlataforma(req, res) {
    try {
      const { plataforma } = req.query; // Pega a plataforma da query string
      if (!plataforma) {
        return res.status(400).json({ message: "A plataforma é obrigatória" });
      }
      const saques = await SaqueService.buscarSaquePorPlataforma(plataforma);
      if (saques.length === 0) {
        return res.status(404).json({ message: "Nenhum saque encontrado para essa plataforma" });
      }
      return res.status(200).json(saques); // Retorna os saques encontrados
    } catch (error) {
      console.log(error); // Para depuração de erros
      return res.status(500).json({ message: "Erro ao buscar saques pela plataforma", error: error.message });
    }
  }

  // Editar saque
  static async editarSaque(req, res) {
    try {
      const { id } = req.params;
      const saqueAtualizado = await SaqueService.editarSaque(id, req.body);
      if (!saqueAtualizado) return res.status(404).json({ message: "Saque não encontrado" });
      return res.status(200).json({ message: "Saque atualizado com sucesso", saque: saqueAtualizado });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Deletar saque
  static async deletarSaque(req, res) {
    try {
      const { id } = req.params;
      const deletado = await SaqueService.deletarSaque(id);
      if (!deletado) return res.status(404).json({ message: "Saque não encontrado ou já deletado" });
      return res.status(200).json({ message: "Saque deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = SaqueController;
