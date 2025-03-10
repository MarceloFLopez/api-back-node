const fetch = require("node-fetch"); // Se precisar, instale com: npm install node-fetch

const BASE_URL = "http://localhost:3000/api/autores";

async function criarAutor(nome) {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome }),
        });
        const data = await response.json();
        console.log("🟢 Criar Autor:", data);
    } catch (error) {
        console.error("🔴 Erro ao criar autor:", error);
    }
}

async function buscarTodosAutores() {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        console.log("🟢 Todas os autores:", data);
    } catch (error) {
        console.error("🔴 Erro ao buscar todos autores:", error);
    }
}

async function buscarAutorPorId(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        const data = await response.json();
        console.log("🟢 Buscar Autor por ID:", data);
    } catch (error) {
        console.error("🔴 Erro ao buscar ator por ID:", error);
    }
}

async function buscarAutorPorNome(nome) {
    try {
        const response = await fetch(`${BASE_URL}/nome/busca?nome=${nome}`);
        const data = await response.json();
        console.log("🟢 Buscar Autor por Nome:", data);
    } catch (error) {
        console.error("🔴 Erro ao buscar autor por nome:", error);
    }
}

async function atualizarAutor(id, novoNome) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome: novoNome }),
        });
        const data = await response.json();
        console.log("🟢 Atualizar Autor:", data);
    } catch (error) {
        console.error("🔴 Erro ao atualizar autor:", error);
    }
}

// 🚀 Executar os testes
(async () => {
    await criarAutor("Tecnologia");
    await buscarTodosAutores();
    await buscarAutorPorNome("Tec");
    await buscarAutorPorId(1); // Substitua pelo ID correto
    await atualizarAutor(1, "Tech Atualizado"); // Substitua pelo ID correto
})();
