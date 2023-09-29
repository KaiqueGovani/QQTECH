const express = require('express');
const app = express();
const conectarBanco = require('./config/database');
const usuariosRoutes = require('./routes/usuarios');
const port = process.env.PORT || 3000;

// Conectar ao banco de dados
conectarBanco();

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
