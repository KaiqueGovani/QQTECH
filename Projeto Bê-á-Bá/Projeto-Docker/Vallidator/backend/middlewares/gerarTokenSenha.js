import jwt from 'jsonwebtoken';

const segredo = 'segredo';

function gerarTokenSenha(email) {
    const token = jwt.sign({ email, senha: true }, segredo, { expiresIn: '30d' });

    return token;
}