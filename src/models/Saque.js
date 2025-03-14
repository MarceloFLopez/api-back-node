class Saque {
    constructor(id, data, plataforma, intermediador, banco, valor, prazo) {
      this.id = id;
      this.data = data;
      this.plataforma = plataforma;
      this.intermediador = intermediador;
      this.banco = banco;
      this.valor = valor;
      this.prazo = prazo;
    }
  }
  
  module.exports = Saque;
  