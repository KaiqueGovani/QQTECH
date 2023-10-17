const express = require('express');
const path = require('path');
const pool = require('../config/database');
const autenticarToken = require('../middlewares/autenticarToken');
const verificarPermissao = require('../middlewares/verificarPermissao');

const router = express.Router();

router.get('/', autenticarToken, async (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/common/templates.html'));
});

router.post('/criar', autenticarToken, async (req, res) => { //authenticarToken para verificar a permissão
    try{
        const { nome, id_criador, extensao, campos} = req.body;

        const query = `
            INSERT INTO template (
                nome, 
                id_criador, 
                data_criacao, 
                extensao, 
                status
            ) VALUES (
                $1, 
                $2, 
                timezone(\'America/Sao_Paulo\', current_timestamp), 
                $3, 
                $4
            ) RETURNING *;
        `
            
        const values = [nome, req.id, extensao, (req.permissao === 'admin') ? 0 : null];

        //Adiciona o template:
        const temp = await pool.query(query, values);

        //Adiciona os campos:
        for (let i = 0; i < campos.length; i++) {
            const query = `INSERT INTO templatesCampos (id_template, id_tipo, ordem, nome_campo, anulavel)
                           VALUES ($1, $2, $3, $4, $5);`
            const values = [temp.rows[0].id, campos[i].id_tipo, i+1, campos[i].nome_campo, campos[i].anulavel];

            await pool.query(query, values);
        }


        res.status(201).json({ mensagem: 'Template criado com sucesso', result: temp.rows[0] });

    } catch(error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao criar template'});
    }
});

router.get('/listar', autenticarToken, verificarPermissao, async (req, res) => {
    try{
        const query = `
            SELECT
                t.id,
                t.nome,
                t.id_criador,
                t.data_criacao,
                t.extensao,
                t.status,
                json_agg(json_build_object(
                    'ordem', tc.ordem,
                    'id_tipo', tp.id,
                    'nome_tipo', tp.tipo,
                    'nome_campo', tc.nome_campo,
                    'anulavel', tc.anulavel
                )) AS campos,
                u.nome AS nome_criador
            FROM
                template t
            JOIN
                templatescampos tc ON t.id = tc.id_template
            JOIN
                tipos tp ON tc.id_tipo = tp.id
            JOIN
                usuario u ON t.id_criador = u.id
            GROUP BY
                t.id, t.nome, t.id_criador, t.data_criacao, t.extensao, t.status, u.nome
            ORDER BY
                t.id;
        `
        const templates = await pool.query(query);

        res.status(200).json(templates.rows);
    } catch(error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao listar templates'});
    }
})

router.get('/ativos', autenticarToken, async (req, res) => {
    try {
        const query = `
            SELECT
                t.id,
                t.nome,
                t.id_criador,
                t.data_criacao,
                t.extensao,
                t.status,
                json_agg(json_build_object(
                    'ordem', tc.ordem,
                    'id_tipo', tp.id,
                    'nome_tipo', tp.tipo,
                    'nome_campo', tc.nome_campo,
                    'anulavel', tc.anulavel
                )) AS campos,
                u.nome AS nome_criador
            FROM
                template t
            JOIN
                templatescampos tc ON t.id = tc.id_template
            JOIN
                tipos tp ON tc.id_tipo = tp.id
            JOIN
                usuario u ON t.id_criador = u.id
            WHERE
                t.status = true
            GROUP BY
                t.id, t.nome, t.id_criador, t.data_criacao, t.extensao, t.status, u.nome
            ORDER BY
                t.id;
        `
                
        const templates = await pool.query(query);
        res.status(200).json(templates.rows);
    } catch(error) {
        console.log(error);
        res.status(500).json({ mensagem: 'Erro ao buscar templates ativos'});
    }
});

router.get('/buscar', async (req, res) => {
    try {
        const busca = req.query.busca;
        console.log(busca);
        const query = `SELECT * FROM template 
                       WHERE nome ILIKE \'%${busca}%\'
                       OR id::text ILIKE \'%${busca}%\';`

        const templates = await pool.query(query);

        res.status(200).json(templates.rows);
                       
    } catch(error) {
        console.log(error);
        res.status(500).json({ mensagem: 'Erro ao buscar templates'});
    }
});

router.put("/alterar", autenticarToken, verificarPermissao, async (req, res) => {
    try {
        const {id, nome, extensao, status, campos} = req.body;

        // Inicia a transação:
        await pool.query('BEGIN');

        const query = `
            UPDATE template 
            SET 
                nome = $1,  
                extensao = $2, 
                status = $3
            WHERE
                id = $4
        `

        const values = [nome, extensao, (status == null) ? 0 : status, id];

        //Atualiza o template:
        await pool.query(query, values); 
        console.log(`Template ${id} atualizado com sucesso`);

        //Deleta os campos antigos:
        const queryDelete = `DELETE FROM templatesCampos WHERE id_template = $1`;
        await pool.query(queryDelete, [id]);
        console.log(`Campos do template ${id} deletados com sucesso`);

        //Adiciona os campos:
        for (let i = 0; i < campos.length; i++) {
            const query = `INSERT INTO templatesCampos (id_template, id_tipo, ordem, nome_campo, anulavel)
                           VALUES ($1, $2, $3, $4, $5);`
            const values = [id, campos[i].id_tipo, i+1, campos[i].nome_campo, campos[i].anulavel];

            await pool.query(query, values);
        }

        // Finaliza a transação:
        await pool.query('COMMIT');

        res.status(201).json({ mensagem: 'Template atualizado com sucesso'});
    } catch(error) {
        // Cancela a transação:
        await pool.query('ROLLBACK');

        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao atualizar template'});
    }
});

router.patch('/status', autenticarToken, verificarPermissao, async (req, res) => {
    try {
        const query = "UPDATE template SET status = $1 WHERE id = $2";
        const {id, status} = req.body;
        const values = [status, id];

        await pool.query(query, values);

        res.status(201).json({ mensagem: 'Status do template atualizado com sucesso'});
    }   catch(error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao atualizar status do template'});
    }
});

module.exports = router;