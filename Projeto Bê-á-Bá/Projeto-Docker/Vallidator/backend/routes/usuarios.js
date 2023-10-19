import { Router } from 'express';
import { hash, compare } from 'bcrypt';
import path from 'path';
import gerarToken from '../middlewares/gerarToken.js';
import pool from '../config/database.js';
import verificarPermissao from '../middlewares/verificarPermissao.js';
import autenticarToken from '../middlewares/autenticarToken.js';

const router = Router();

router.get('/dados', autenticarToken, async (req, res) => { // Pega os dados do usuario que está logado
    try {
        const query = 'SELECT * FROM usuario WHERE id = $1';
        const values = [req.id];

        const result = await pool.query(query, values);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao obter informações de usuário' });
    }
});

// ! Rota put para admin.

router.patch('/dados', autenticarToken, async (req, res) => { // Atualiza os dados do usuario que está logado
    try {
        const query = 'UPDATE usuario SET nome = $1, sobrenome = $2, telefone = $3 WHERE id = $4';
        const values = [req.body.nome, req.body.sobrenome, req.body.telefone, req.id];

        await pool.query(query, values);

        res.status(201).json({ mensagem: 'Dados atualizados com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({mensagem: 'Erro ao atualizar dados de usuário'});
    }
});

router.post('/criar', async (req, res) => {
    try {
        const { nome, sobrenome, telefone, email, senha, permissao } = req.body;

        const query = 'INSERT INTO usuario (nome, sobrenome, telefone, email, senha, permissao) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

        //Hash da senha
        const saltRounds = 10;
        const hashSenha = await hash(senha, saltRounds);

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
            const match = await compare(senha, usuario.senha);

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
                    res.redirect('../admin/dashboard')
                } else {
                    res.redirect('../templates')
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
});

router.post('/logout', async (req, res) => {
    res.clearCookie('token').json({ mensagem: 'Logout realizado com sucesso!' });
});

router.get('/listar', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuario ORDER BY id');
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
});

router.patch('/permissao', autenticarToken, verificarPermissao(), async(req, res) => {
    try {
        const query = "UPDATE usuario SET permissao = $1 WHERE id = $2";
        const {id, permissao} = req.body;
        const values = [permissao, id];

        await pool.query(query, values);

        res.status(201).json({mensagem: 'Permissão alterada com sucesso'});
    } catch (error) {
        console.error(error);
        res.status(500).json({mensagem: 'Erro ao alterar permissão'});
    }
});

export default router;
