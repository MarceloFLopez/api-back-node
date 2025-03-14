class Programacao {
  constructor(id, revistaId, bancaId, prazoprogramacao, periodicidade, envio, asin, cid, status, envioftp, arquivoenviado, aprovacao, kit) {
    this.id = id;
    this.revistaId = revistaId;
    this.bancaId = bancaId;
    this.prazoprogramacao = prazoprogramacao;
    this.periodicidade = periodicidade;
    this.envio = envio;
    this.asin = asin;
    this.cid = cid;
    this.status = status;
    this.envioftp = envioftp;
    this.arquivoenviado = arquivoenviado;
    this.aprovacao = aprovacao;
    this.kit = kit;
  }
}

module.exports = Programacao;
