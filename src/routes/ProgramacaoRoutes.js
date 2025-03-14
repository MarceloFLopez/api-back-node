const express = require('express');
const router = express.Router();
const ProgramacaoController = require('../controllers/ProgramacaoController');

// Defina a rota corretamente com uma string para o caminho
router.post('/programacoes', ProgramacaoController.criarProgramacao);
router.get('/programacoes/:id', ProgramacaoController.buscarProgramacaoPorId);
router.get('/programacoes', ProgramacaoController.buscarTodasProgramacoes);
router.put('/programacoes/:id', ProgramacaoController.atualizarProgramacao);
router.delete('/programacoes/:id', ProgramacaoController.deletarProgramacao);

module.exports = router;
