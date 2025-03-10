const fetch = require("node-fetch"); // Se precisar, instale com: npm install node-fetch
const BASE_URL = "http://localhost:3000/api/editoras";

async function criarEditora(nome) {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome }),
        });
        const data = await response.json();
        console.log("🟢 Criar Editora:", data);
    } catch (error) {
        console.error("🔴 Erro ao criar Editora:", error);
    }
}

async function buscarTodasEditoras() {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        console.log("🟢 Todas os editores:", data);
    } catch (error) {
        console.error("🔴 Erro ao buscar todos editores:", error);
    }
}

async function buscarEditoraPorId(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        const data = await response.json();
        console.log("🟢 Buscar Editora por ID:", data);
    } catch (error) {
        console.error("🔴 Erro ao buscar editora por ID:", error);
    }
}

async function buscarEditoraPorNome(nome) {
    try {
        const response = await fetch(`${BASE_URL}/nome/busca?nome=${nome}`);
        const data = await response.json();
        console.log("🟢 Buscar Editora por Nome:", data);
    } catch (error) {
        console.error("🔴 Erro ao buscar editor por nome:", error);
    }
}

async function atualizarEditora(id, novoNome) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome: novoNome }),
        });
        const data = await response.json();
        console.log("🟢 Atualizar Editora:", data);
    } catch (error) {
        console.error("🔴 Erro ao atualizar editor:", error);
    }
}

// 🚀 Executar os testes
(async () => {
    // await criarEditora("Editora teste 2");
    await buscarTodasEditoras();
    // await buscarEditoraPorNome("Tes");
    // await buscarEditoraPorId(1); // Substitua pelo ID correto
    // await atualizarEditora(2, "Editora Atualizado"); // Substitua pelo ID correto
})();
