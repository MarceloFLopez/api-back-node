const fetch = require("node-fetch"); // Se precisar, instale com: npm install node-fetch

const BASE_URL = "http://localhost:3000/api/categorias";

// Função para criar uma nova categoria
async function criarCategoria(nome) {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome }),
        });
        const data = await response.json();
        console.log("🟢 Criar Categoria:", data);
    } catch (error) {
        console.error("🔴 Erro ao criar categoria:", error);
    }
}

// Função para buscar todas as categorias
async function buscarTodasCategorias() {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        console.log("🟢 Todas as Categorias:", data);
    } catch (error) {
        console.error("🔴 Erro ao buscar todas categorias:", error);
    }
}

// Função para buscar uma categoria por ID
async function buscarCategoriaPorId(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        const data = await response.json();
        console.log("🟢 Buscar Categoria por ID:", data);
    } catch (error) {
        console.error("🔴 Erro ao buscar categoria por ID:", error);
    }
}

// Função para buscar uma categoria por nome
async function buscarCategoriaPorNome(nome) {
    try {
        const response = await fetch(`${BASE_URL}/nome/busca?nome=${nome}`);
        const data = await response.json();
        console.log("🟢 Buscar Categoria por Nome:", data);
    } catch (error) {
        console.error("🔴 Erro ao buscar categoria por nome:", error);
    }
}

// Função para atualizar uma categoria por ID
async function atualizarCategoria(id, novoNome) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome: novoNome }),
        });
        const data = await response.json();
        console.log("🟢 Atualizar Categoria:", data);
    } catch (error) {
        console.error("🔴 Erro ao atualizar categoria:", error);
    }
}

// 🚀 Executar os testes
(async () => {
    await criarCategoria("Tecnologia");
    await buscarTodasCategorias();
    await buscarCategoriaPorNome("Tec");
    await buscarCategoriaPorId(1); // Substitua pelo ID correto
    await atualizarCategoria(1, "Tech Atualizado"); // Substitua pelo ID correto
})();
