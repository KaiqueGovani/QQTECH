const express = require('express');
const path = require('path');
const pool = require('../config/database');
const autenticarToken = require('../middlewares/autenticarToken');

const router = express.Router();

router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/common/templates.html'));
});

router.post('/criar', autenticarToken, async (req, res) => {
    try{
        const { nome, id_criador, extensao, campos} = req.body;

        const query = 'INSERT INTO template (nome, id_criador, data_criacao, extensao, status) VALUES ($1, $2, $3, current_timestamp, $4);'
        const values = [nome, id_criador, extensao, (req.permissao === 'admin') ? '0' : null];

        //Adiciona o template:
        const temp = await pool.query(query, values);
        res.json(temp);

        //Adiciona os campos:
        for (const campo of campos) {
            const query = 'INSERT INTO templateCampos (id'
        }

    } catch(error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao criar template'});
    }
    
    res.status(201).json({ mensagem: 'Template criado com sucesso' });
});

//app.use('/templates', autenticarToken, express.static(path.join(__dirname, '../frontend/common/templates.html')));

module.exports = router;