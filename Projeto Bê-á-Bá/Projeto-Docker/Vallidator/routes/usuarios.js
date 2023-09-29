// Em /routes/usuarios.js
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.post('/criar', usuariosController.criarUsuario);
router.get('/listar', usuariosController.listarUsuarios);

module.exports = router;
