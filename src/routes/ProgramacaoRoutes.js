const express = require('express');
const router = express.Router();
const ProgramacaoController = require('../controllers/ProgramacaoController');
const authMiddleware = require('../middleware/authMiddleware')

// Defina a rota corretamente com uma string para o caminho
router.post('/programacoes',authMiddleware(['manager', 'user']), ProgramacaoController.criarProgramacao);
router.get('/programacoes/:id', authMiddleware(['manager', 'user']),ProgramacaoController.buscarProgramacaoPorId);
router.get('/programacoes',authMiddleware(['manager', 'user']), ProgramacaoController.buscarTodasProgramacoes);
router.put('/programacoes/:id',authMiddleware(['manager', 'user']), ProgramacaoController.atualizarProgramacao);
router.delete('/programacoes/:id', authMiddleware(['manager', 'user']),ProgramacaoController.deletarProgramacao);

module.exports = router;
