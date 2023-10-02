const jwt = require('jsonwebtoken');

const segredo = 'segredo';

module.exports = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        try {
            // Verifica o token
            const usuario = jwt.verify(token, segredo);

            // Adiciona o id e a permissão do usuário na requisição
            req.id = usuario.id;
            req.permissao = usuario.permissao;

            // Chama o próximo middleware
            next();
        } catch(error){
            res.status(403).json({ mensagem: 'Token inválido' });
        }
        
    } else {
        res.redirect('/login');
    }
}