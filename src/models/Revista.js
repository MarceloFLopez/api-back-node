class Revista {
    constructor(id, titulo, pdfdata, edicao, chamadaprinciapl, palavrachave, numeropaginas, ean, isbn, bisac, descricao, periodicidade, precocapa, arquivoaberto, observacao, editoraId, autorId, categorias = []) {
        this.id = id;
        this.titulo = titulo;
        this.pdfdata = pdfdata;
        this.edicao = edicao;
        this.chamadaprinciapl = chamadaprinciapl;
        this.palavrachave = palavrachave;
        this.numeropaginas = numeropaginas;
        this.ean = ean;
        this.isbn = isbn;
        this.bisac = bisac;
        this.descricao = descricao;
        this.periodicidade = periodicidade;
        this.precocapa = precocapa;
        this.arquivoaberto = arquivoaberto;
        this.observacao = observacao;
        this.editoraId = editoraId;
        this.autorId = autorId;
        this.categorias = categorias; // Lista de categorias
    }

    toJSON() {
        return {
            id: this.id,
            titulo: this.titulo,
            pdfdata: this.pdfdata,
            edicao: this.edicao,
            chamadaprinciapl: this.chamadaprinciapl,
            palavrachave: this.palavrachave,
            numeropaginas: this.numeropaginas,
            ean: this.ean,
            isbn: this.isbn,
            bisac: this.bisac,
            descricao: this.descricao,
            periodicidade: this.periodicidade,
            precocapa: this.precocapa,
            arquivoaberto: this.arquivoaberto,
            observacao: this.observacao,
            editoraId: this.editoraId,
            autorId: this.autorId,
            categorias: this.categorias // Inclui a lista de categorias associadas
        };
    }
}

module.exports = Revista;
