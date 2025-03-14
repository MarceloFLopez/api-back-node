const ProgramacaoService = require('../service/ProgramacaoService');

class ProgramacaoController {
  static async criarProgramacao(req, res) {
    try {
      const dados = req.body;
      const programacao = await ProgramacaoService.criarProgramacao(dados);
      res.status(201).json({
        message: "Programação criada com sucesso",
        data: programacao
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao criar programação",
        error: error.message
      });
    }
  }

  static async buscarTodasProgramacoes(req, res) {
    try {
      const programacoes = await ProgramacaoService.buscarTodasProgramacoes();  // Chama o serviço para buscar os dados.
      res.status(200).json(programacoes);  // Retorna a resposta no formato JSON.
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar as programações", error: error.message });
    }
  }

  static async buscarProgramacaoPorId(req, res) {
    try {
      const id = req.params.id;
      const programacao = await ProgramacaoService.buscarProgramcaoPorId(id);  // Chama o serviço para buscar os dados.
      if (!programacao) {
        return res.status(404).json({ message: "Programação não encontrada" });
      }
      res.status(200).json(programacao);  // Retorna a resposta no formato JSON.
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar a programação", error: error.message });
    }
  }
  static async atualizarProgramacao(req, res) {
    try {
      const id = req.params.id;
      const dados = req.body;
      const programacaoAtualizada = await ProgramacaoService.atualizarProgramacao(id, dados);  // Chama o serviço para atualizar os dados.
      if (!programacaoAtualizada) {
        return res.status(404).json({ message: "Programação não encontrada" });
      }
      res.status(200).json(programacaoAtualizada);  // Retorna a resposta no formato JSON.
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar a programação", error: error.message });
    }
  }
  static async deletarProgramacao(req, res) {
    try {
      const id = req.params.id;
      await ProgramacaoService.deletarProgramacao(id);  // Chama o serviço para deletar os dados.
      res.status(200).json({ message: "Programação deletada com sucesso" });  // Retorna a resposta com status 204 (No Content).
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar a programação", error: error.message });
    }
  }     
}

module.exports = ProgramacaoController;
