const express = require('express');
const pool = require('../config/database');

const router = express.Router();

router.get('/listar', async (req, res) => {
    try{
        const query = "SELECT * FROM tipos;"
        const tipos = await pool.query(query);

        res.status(200).json(tipos.rows);
    } catch(error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao listar tipos'});
    }
})

module.exports = router;