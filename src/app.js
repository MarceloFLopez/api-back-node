const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const categoriaRoutes = require("../src/routes/CategoriaRoutes");
const autorRoutes = require("../src/routes/AutorRoutes");
const editoraRoutes = require("../src/routes/EditoraRoutes");
const clienteRoutes = require("../src/routes/ClienteRoutes");
const bancaRoutes = require("./routes/BancaRoutes");
const revistaRoutes = require("./routes/RevistaRoutes");
const artigoRoutes = require('./routes/ArtigoRoutes');
const programacaoRoutes = require("../src/routes/ProgramacaoRoutes");
const saqueRoutes = require("../src/routes/SaqueRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Registrar as rotas
app.use("/api", categoriaRoutes);
app.use("/api", autorRoutes);
app.use("/api", editoraRoutes);
app.use("/api", clienteRoutes);
app.use("/api", bancaRoutes);
app.use("/api", revistaRoutes);
app.use("/api", artigoRoutes);
app.use("/api", programacaoRoutes);
app.use("/api", saqueRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
