// Em /routes/usuarios.js
const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/database');

const router = express.Router();

router.post('/criar', async (req, res) => {
  try {
    const { nome, sobrenome, telefone, email, senha, permissao } = req.body;

    const query = 'INSERT INTO usuario (nome, sobrenome, telefone, email, senha, permissao) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    
    //Hash da senha
    const hashSenha = await bcrypt.hash(senha, 10);

    //Valores para inserçao
    const values = [nome, sobrenome, telefone, email, hashSenha, permissao];



    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao criar usuário' });
  }
});

router.get('/listar', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuario');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao listar usuários' });
  }
});

router.delete('/deletar-todos', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM usuario');
        res.status(204).json({ mensagem: 'Todos os usuários apagados!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao apagar todos os usuários' })
    }
})

module.exports = router;
