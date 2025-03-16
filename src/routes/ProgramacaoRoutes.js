const express = require('express');
const router = express.Router();
const ProgramacaoController = require('../controllers/ProgramacaoController');
const authMiddleware = require('../middleware/authMiddleware')

// Defina a rota corretamente com uma string para o caminho
router.post('/programacoes',authMiddleware(['admin', 'user']), ProgramacaoController.criarProgramacao);
router.get('/programacoes/:id', authMiddleware(['admin', 'user']),ProgramacaoController.buscarProgramacaoPorId);
router.get('/programacoes',authMiddleware(['admin', 'user']), ProgramacaoController.buscarTodasProgramacoes);
router.put('/programacoes/:id',authMiddleware(['admin', 'user']), ProgramacaoController.atualizarProgramacao);
router.delete('/programacoes/:id', authMiddleware(['admin', 'user']),ProgramacaoController.deletarProgramacao);

module.exports = router;
