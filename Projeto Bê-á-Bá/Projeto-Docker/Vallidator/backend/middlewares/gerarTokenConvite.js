import jwt from 'jsonwebtoken';

const segredo = 'segredo';

function gerarTokenConvite(email) {
    const token = jwt.sign({ email }, segredo, { expiresIn: '30d' });

    return token;
}