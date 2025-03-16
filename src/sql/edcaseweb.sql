CREATE Table autor (
    id integer PRIMARY key AUTO_INCREMENT,
    nome VARCHAR(255)
)

CREATE Table categoria (
    id integer PRIMARY key AUTO_INCREMENT,
    nome VARCHAR(255)
)

CREATE Table cliente (
    id integer PRIMARY key AUTO_INCREMENT,
    nome VARCHAR(255)
)

CREATE Table editora (
    id integer PRIMARY key AUTO_INCREMENT,
    nome VARCHAR(255)
)

CREATE table banca (
    id integer PRIMARY key AUTO_INCREMENT,
    nome VARCHAR(255),
    situacao BOOLEAN,
    ativacaotitulo varchar(255),
    formatopdf varchar(255),
    prazomedio varchar(255),
    site varchar(255),
    comoacessar varchar(255),
    formapagamento varchar(255),
    beneficios varchar(255),
    mediaassinantes varchar(255)
)

CREATE TABLE revista (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NULL,
    pdfdata DATE NULL,
    edicao INT NULL,
    chamadaprinciapl TEXT NULL,
    palavrachave VARCHAR(255) NULL,
    numeropaginas INT NULL,
    ean BIGINT NULL,
    isbn VARCHAR(255) NULL,
    bisac VARCHAR(255) NULL,
    descricao TEXT NULL,
    periodicidade VARCHAR(255) NULL,
    precocapa FLOAT NULL,
    arquivoaberto BOOLEAN NULL,
    observacao TEXT NULL,
    editora_id INT NULL,
    autor_id INT NULL,
    FOREIGN KEY (editora_id) REFERENCES editora (id) ON DELETE SET NULL,
    FOREIGN KEY (autor_id) REFERENCES autor (id) ON DELETE SET NULL
);

CREATE TABLE revista_categoria (
    revista_id INT,
    categoria_id INT,
    PRIMARY KEY (revista_id, categoria_id),
    FOREIGN KEY (revista_id) REFERENCES revista (id) ON DELETE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES categoria (id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS artigo;

CREATE TABLE artigo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dataenvio DATE NULL,
    datapublicacao DATE NULL,
    revista_id INT NULL,
    FOREIGN KEY (revista_id) REFERENCES revista (id)
);

CREATE Table programacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    revista_id INT NULL,
    banca_id INT NULL,
    prazoprogramacao DATE NULL,
    periodicidade VARCHAR(255) NULL,
    envio VARCHAR(255) NULL,
    asin VARCHAR(255) NULL,
    cid VARCHAR(255) NULL,
    status BOOLEAN NULL,
    envioftp DATE NULL,
    arquivoenviado DATE NULL,
    aprovacao VARCHAR(255) NULL,
    kit VARCHAR(255) NULL,
    FOREIGN KEY (banca_id) REFERENCES banca (id),
    FOREIGN KEY (revista_id) REFERENCES revista (id)
)


DROP TABLE IF EXISTS saques;

CREATE TABLE saques (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data DATE  NULL,
    plataforma VARCHAR(255)  NULL,
    intermediador VARCHAR(255)  NULL,
    banco VARCHAR(255)  NULL,
    valor DECIMAL(10,2)  NULL,
    prazo VARCHAR(255)  NULL
);

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    role ENUM('user', 'manager', 'admin') DEFAULT 'user',
    ativo BOOLEAN DEFAULT false
);

