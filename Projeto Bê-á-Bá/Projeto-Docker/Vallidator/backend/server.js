const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const usuariosRoutes = require('./routes/usuarios');
const autenticarToken = require('./middlewares/autenticarToken');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para processar JSON
app.use(express.json());
// Middleware para processar formulários HTML
app.use(express.urlencoded({ extended: true })); // Para analisar corpos de formulários HTML
// Midleware para processar cookies
app.use(cookieParser());

// Configurar rotas estáticas
app.use('/styles', express.static(path.join(__dirname, '../frontend/styles')));
app.use('/scripts', express.static(path.join(__dirname, '../frontend/scripts')));
app.use('/icons', express.static(path.join(__dirname, '../frontend/icons')));

app.get('/', autenticarToken, (req, res) => {
    console.log("Logado como " + req.id + " com permissão " + req.permissao);
    if (req.permissao === 'admin') {
        res.redirect('../admin/templates.html')
    } else {
        res.redirect('../common/templates.html')
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/login.html'));
})

app.use('/common', autenticarToken, express.static(path.join(__dirname, '../frontend/common')));

app.use('/usuarios', usuariosRoutes);

// Inicia o Servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
