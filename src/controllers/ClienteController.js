const ClienteService = require("../service/ClienteService");

class ClienteController {
  // Criar uma novo cliente
  static async criarCliente(req, res) {
    try {
      const { nome } = req.body;
      if (!nome) {
        return res.status(400).json({ mensagem: "O nome do Cliente é obrigatório!" });
      }
      const Cliente = await ClienteService.criarCliente(nome);
      return res.status(201).json(Cliente);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao criar Cliente", erro: error.message });
    }
  }

  // Buscar todas as Clientes
  static async buscarTodosClientes(req, res) {
    try {
      const Clientes = await ClienteService.buscarTodosClientes();
      return res.status(200).json(Clientes);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao buscar Clientes", erro: error.message });
    }
  }


  static async buscarClientePorId(req, res) {
    try {
      const { id } = req.params;
      const cliente = await ClienteService.buscarClientePorId(id);
      if (!cliente) {
        return res.status(404).json({ mensagem: "Cliente não encontrada!" });
      }
      return res.status(200).json(cliente);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao buscar cliente por ID", erro: error.message });
    }
  }

  // Buscar cliente por nome
  static async buscarClientePorNome(req, res) {
    try {
      const { nome } = req.query;
      if (!nome) {
        return res.status(400).json({ mensagem: "O nome da cliente é obrigatório na query!" });
      }
      const clientes = await ClienteService.buscarClientePorNome(nome);
      return res.status(200).json(clientes);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao buscar cliente por nome", erro: error.message });
    }
  }

  // Atualizar clientes
  static async atualizarCliente(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;
      if (!nome) {
        return res.status(400).json({ mensagem: "O novo nome da cliente é obrigatório!" });
      }
      const clienteAtualizado = await ClienteService.atualizarCliente(id, nome);
      if (!clienteAtualizado) {
        return res.status(404).json({ mensagem: "cliente não encontrada!" });
      }
      return res.status(200).json(clienteAtualizado);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao atualizar cliente", erro: error.message });
    }
  }
}

module.exports = ClienteController;
