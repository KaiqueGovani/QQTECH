const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const usuariosRoutes = require('./routes/usuarios');
const templatesRoutes = require('./routes/templates');
const tiposRoutes = require('./routes/tipos');
const dbRoutes = require('./routes/db');
const adminRoutes = require('./routes/admin');
const autenticarToken = require('./middlewares/autenticarToken');
const verificarPermissao = require('./middlewares/verificarPermissao');
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

app.use('/db', dbRoutes);



app.get('/', autenticarToken, (req, res) => {
    console.log("Logado como " + req.id + " com permissão " + req.permissao);
    if (req.permissao === 'admin') {
        res.redirect('../admin/dashboard')
    } else {
        res.redirect('../templates')
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/login.html'));
})


app.use('/minha-conta', autenticarToken, express.static(path.join(__dirname, '../frontend/common/minha-conta.html')));

app.use('/common', autenticarToken, express.static(path.join(__dirname, '../frontend/common')));

//app.use('/admin', autenticarToken, verificarPermissao, express.static(path.join(__dirname, '../frontend/admin')));
app.use('/admin', autenticarToken, verificarPermissao, adminRoutes);

app.use('/usuarios', usuariosRoutes);
app.use('/templates', templatesRoutes);
app.use('/tipos', tiposRoutes);

// Inicia o Servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
