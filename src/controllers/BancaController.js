const BancaService = require("../service/BancaService");

class BancaController {
  static async criarBanca(req, res) {
    try {
      const { nome, situacao, ativacaotitulo, formatopdf, prazomedio, site, comoacessar, formapagamento, beneficios, mediaassinantes } = req.body;
      const banca = await BancaService.criarBanca(nome, situacao, ativacaotitulo, formatopdf, prazomedio, site, comoacessar, formapagamento, beneficios, mediaassinantes);
      return res.status(201).json(banca);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao criar banca", erro: error.message });
    }
  }

  static async buscarTodasBancas(req, res) {
    try {
      const bancas = await BancaService.buscarTodasBancas();
      return res.status(200).json(bancas);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao buscar todas as bancas", erro: error.message });
    }
  }

  static async buscarBancaPorId(req, res) {
    try {
      const { id } = req.params;
      const banca = await BancaService.buscarBancaPorId(id);
      if (!banca) {
        return res.status(404).json({ mensagem: "Banca não encontrada!" });
      }
      return res.status(200).json(banca);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao buscar banca por ID", erro: error.message });
    }
  }

  static async buscarBancaPorNome(req, res) {
    try {
      const { nome } = req.query;
      if (!nome) {
        return res.status(400).json({ mensagem: "O parâmetro 'nome' é obrigatório na busca." });
      }
      const bancas = await BancaService.buscarBancaPorNome(nome);
      if (bancas.length === 0) {
        return res.status(404).json({ mensagem: "Nenhuma banca encontrada com esse nome." });
      }
      return res.status(200).json(bancas);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao buscar banca por nome", erro: error.message });
    }
}
static async atualizarBanca(req, res) {
  try {
      const { id } = req.params;
      const novosDados = req.body;

      if (!id) {
          return res.status(400).json({ mensagem: "ID da banca é obrigatório!" });
      }

      const bancaAtualizada = await BancaService.atualizarBanca(id, novosDados);

      if (!bancaAtualizada) {
          return res.status(404).json({ mensagem: "Banca não encontrada!" });
      }

      return res.status(200).json(bancaAtualizada);
  } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao atualizar banca", erro: error.message });
  }
}


  // static async atualizarBanca(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const { nome, situacao, ativacaotitulo, formatopdf, prazomedio, site, comoacessar, formapagamento, beneficios, mediaassinantes } = req.body;
  //     const bancaAtualizada = await BancaService.atualizarBanca(id, nome, situacao, ativacaotitulo, formatopdf, prazomedio, site, comoacessar, formapagamento, beneficios, mediaassinantes);
  //     if (!bancaAtualizada) {
  //       return res.status(404).json({ mensagem: "Banca não encontrada para atualização!" });
  //     }
  //     return res.status(200).json(bancaAtualizada);
  //   } catch (error) {
  //     return res.status(500).json({ mensagem: "Erro ao atualizar banca", erro: error.message });
  //   }
  // }

  static async deletarBanca(req, res) {
    try {
      const { id } = req.params;
      const sucesso = await BancaService.deletarBanca(id);
      if (!sucesso) {
        return res.status(404).json({ mensagem: "Banca não encontrada para exclusão!" });
      }
      return res.status(200).json({ mensagem: "Banca excluída com sucesso!" });
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao excluir banca", erro: error.message });
    }
  }
}

module.exports = BancaController;
