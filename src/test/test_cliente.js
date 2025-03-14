const fetch = require("node-fetch"); // Se precisar, instale com: npm install node-fetch

const BASE_URL = "http://localhost:3000/api/clientes";

async function criarCliente(nome) {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome }),
        });
        const data = await response.json();
        console.log("🟢 Criar Cliente:", data);
    } catch (error) {
        console.error("🔴 Erro ao criar Cliente:", error);
    }
}

async function buscarTodosClientes() {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        console.log("🟢 Todas os Clientes:", data);
    } catch (error) {
        console.error("🔴 Erro ao buscar todos Clientes:", error);
    }
}

async function buscarClientePorId(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        const data = await response.json();
        console.log("🟢 Buscar Cliente por ID:", data);
    } catch (error) {
        console.error("🔴 Erro ao buscar Cliente por ID:", error);
    }
}

async function buscarClientePorNome(nome) {
    try {
        const response = await fetch(`${BASE_URL}/nome/busca?nome=${nome}`);
        const data = await response.json();
        console.log("🟢 Buscar Cliente por Nome:", data);
    } catch (error) {
        console.error("🔴 Erro ao buscar Cliente por nome:", error);
    }
}

async function atualizarCliente(id, novoNome) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome: novoNome }),
        });
        const data = await response.json();
        console.log("🟢 Atualizar Cliente:", data);
    } catch (error) {
        console.error("🔴 Erro ao atualizar Cliente:", error);
    }
}

// 🚀 Executar os testes
(async () => {
    // await criarCliente("Cliente 2");
    await buscarTodosClientes();
    await buscarClientePorNome("Cl");
    await buscarClientePorId(1); // Substitua pelo ID correto
    // await atualizarCliente(1, "Cliente 1 Atualizado"); // Substitua pelo ID correto
})();
