const express = require('express');
const path = require('path');
const pool = require('../config/database');
const autenticarToken = require('../middlewares/autenticarToken');

const router = express.Router();

router.get('/', autenticarToken, async (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/common/templates.html'));
});

router.post('/criar', autenticarToken, async (req, res) => { //authenticarToken para verificar a permissão
    try{
        const { nome, id_criador, extensao, campos} = req.body;

        const query = 'INSERT INTO template (nome, id_criador, data_criacao, extensao, status) VALUES ($1, $2, current_timestamp, $3, $4);'
        const values = [nome, id_criador, extensao, (req.permissao === 'admin') ? 0 : null];

        //Adiciona o template:
        const temp = await pool.query(query, values);

        //Adiciona os campos:
        for (let i = 0; i < campos.length; i++) {
            const query = `INSERT INTO templateCampos (id_template, id_tipo, ordem, nome_campo, anulavel)
                           VALUES ($1, $2, $3, $4, $5);`
            const values = [temp.rows[0].id, campos[i-1]]
        }


        res.status(201).json({ mensagem: 'Template criado com sucesso' });

    } catch(error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao criar template'});
    }
});

router.get('/listar', async (req, res) => {
    try{
        const query = 'SELECT * FROM template;'
        const templates = await pool.query(query);

        res.status(200).json(templates.rows);
    } catch(error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao listar templates'});
    }
})

//app.use('/templates', autenticarToken, express.static(path.join(__dirname, '../frontend/common/templates.html')));

module.exports = router;