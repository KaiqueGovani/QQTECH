//? Analizar o a verificação pelo banco de dados ao inves do token ?
export default (req, res, next) => {
    if (req.permissao !== 'admin') {
        res.status(403).json({ mensagem: 'Você não tem permissão para acessar este recurso' });
    } else {
        next();
    }
}
