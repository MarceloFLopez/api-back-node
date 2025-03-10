const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const categoriaRoutes = require("../src/routes/CategoriaRoutes");
const autorRoutes = require("../src/routes/AutorRoutes");
const editoraRoutes = require("../src/routes/EditoraRoutes");
const clienteRoutes = require("../src/routes/ClienteRoutes");
const bancaRoutes = require("../src/routes/BancaRoutes");
const revistaRoutes = require("../src/routes/RevistaRoutes");

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
