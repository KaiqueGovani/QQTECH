const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const segredo = 'segredo';

function gerarToken(id, permissao) {
    const token = jwt.sign({ id, permissao }, segredo, { expiresIn: '1h' });

    return token;
}

module.exports = gerarToken;