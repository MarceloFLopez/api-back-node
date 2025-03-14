class Artigo {
  constructor(id, dataenvio, datapublicacao, revista_id) {
    this.id = id;
    this.dataenvio = dataenvio;
    this.datapublicacao = datapublicacao;
    this.revista_id = revista_id;
  }
}

module.exports = Artigo;
