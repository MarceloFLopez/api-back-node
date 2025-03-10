const fetch = require("node-fetch"); // Se precisar, instale com: npm install node-fetch

const BASE_URL = "http://localhost:3000/api/bancas";

async function criarBanca(nome, situacao, ativacaotitulo, formatopdf, prazomedio, site, comoacessar, formapagamento, beneficios, mediaassinantes) {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                nome, 
                situacao, 
                ativacaotitulo, 
                formatopdf, 
                prazomedio, 
                site, 
                comoacessar, 
                formapagamento, 
                beneficios, 
                mediaassinantes 
            }),
        });
        const data = await response.json();
        console.log("🟢 Criar Banca:", data);
    } catch (error) {
        console.error("🔴 Erro ao criar banca:", error);
    }
}

async function buscarTodasBancas() {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        console.log("🟢 Todas as bancas:", data);
    } catch (error) {
        console.error("🔴 Erro ao buscar todas bancas:", error);
    }
}

async function buscarBancaPorId(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        const data = await response.json();
        console.log("🟢 Buscar Banca por ID:", data);
    } catch (error) {
        console.error("🔴 Erro ao buscar banca por ID:", error);
    }
}

async function buscarBancaPorNome(nome) {
    try {
        const response = await fetch(`${BASE_URL}/buscar?nome=${nome}`);
        const data = await response.json();
        console.log("🟢 Buscar Banca por Nome:", data);
    } catch (error) {
        console.error("🔴 Erro ao buscar banca por nome:", error);
    }
}

async function atualizarBanca(id, novoNome, novaSituacao) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                nome: novoNome, 
                situacao: novaSituacao 
            }),
        });
        const data = await response.json();
        console.log("🟢 Atualizar Banca:", data);
    } catch (error) {
        console.error("🔴 Erro ao atualizar banca:", error);
    }
}

// 🚀 Executar os testes
(async () => {
    // await criarBanca("Banca Exemplo", true, "Sim", "PDF", "30 dias", "www.exemplo.com", "Acesse pelo site", "Cartão de crédito", "Descontos", "5000 assinantes");
    await buscarTodasBancas();
    // await buscarBancaPorNome("Exemplo");
    // await buscarBancaPorId(1); // Substitua pelo ID correto
    // await atualizarBanca(1, "Banca Atualizada", false); // Substitua pelo ID correto
})();
