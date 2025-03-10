// models/Banca.js
class Banca {
    constructor(id, nome, situacao, ativacaoTitulo, formatoPdf, prazoMedio, site, comoAcessar, formaPagamento, beneficios, mediaAssinantes) {
      this.id = id;
      this.nome = nome;
      this.situacao = situacao;
      this.ativacaoTitulo = ativacaoTitulo;
      this.formatoPdf = formatoPdf;
      this.prazoMedio = prazoMedio;
      this.site = site;
      this.comoAcessar = comoAcessar;
      this.formaPagamento = formaPagamento;
      this.beneficios = beneficios;
      this.mediaAssinantes = mediaAssinantes;
    }
  }
  
  module.exports = Banca;
  