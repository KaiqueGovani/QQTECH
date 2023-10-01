const express = require('express');
const pool = require('./config/database');
const usuariosRoutes = require('./routes/usuarios');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para processar JSON
app.use(express.json());

// Configurar rotas
app.use('/usuarios', usuariosRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
