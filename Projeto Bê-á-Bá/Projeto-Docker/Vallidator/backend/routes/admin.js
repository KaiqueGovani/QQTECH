const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/admin/dashboard.html'));
});

router.get('/usuarios', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/admin/usuarios.html'));
});

router.get('/templates', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/admin/templates.html'));
});

router.use(express.static(path.join(__dirname, '../../frontend/admin')));	

module.exports = router;