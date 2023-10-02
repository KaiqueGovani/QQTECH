const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const gerarToken = require('../middlewares/gerarToken');
const pool = require('../config/database');

const router = express.Router();

router.post('/criar', async (req, res) => {
    try {
        const { nome, sobrenome, telefone, email, senha, permissao } = req.body;

        const query = 'INSERT INTO usuario (nome, sobrenome, telefone, email, senha, permissao) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

        //Hash da senha
        const saltRounds = 10;
        const hashSenha = await bcrypt.hash(senha, saltRounds);

        //Valores para inserçao
        const values = [nome, sobrenome, telefone, email, hashSenha, permissao];

        //Execura a query e responde a requisição
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao criar usuário' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        const query = 'SELECT * FROM usuario WHERE email = $1';
        const values = [email];

        const result = await pool.query(query, values);
        const usuario = result.rows[0];

        if (usuario) {
            const match = await bcrypt.compare(senha, usuario.senha);

            if (match) {
                const token = gerarToken(usuario.id, usuario.permissao);

                // Salva o token em um cookie
                // Configuração do cookie
                const cookieConfig = {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000, // 1 dia em milissegundos
                };

                // Define o cookie
                res.cookie('token', token, cookieConfig);

                if (usuario.permissao === 'admin') {
                    res.redirect('../admin/templates.html')
                } else {
                    res.redirect('../common/templates.html')
                }
        
                //res.status(200).json({ mensagem: 'Login realizado com sucesso!', token: token, redirect: redirect, status: 200 });
            } else {
                res.status(401).json({ mensagem: 'Senha incorreta' });
            }
        } else {
            res.status(404).json({ mensagem: 'Email não encontrado' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensagem: 'Erro ao realizar o login' })
    }
})

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
