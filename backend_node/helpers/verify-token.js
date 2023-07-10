const jwt = require('jsonwebtoken')

const getToken = require('./get-token')

// middleware para validar o token
const checkToken = (req, res, next) => {

    // Validations
    if(!req.headers.authorization) { // caso nao tenha nenhum token ativo
        return res.status(401).json({
            message: 'Acesso negado!'
        })
    }

    const token = getToken(req) // caso tenha pega

    if(!token) { // se for null
        return res.status(401).json({
            message: 'Acesso negado!'
        })
    }

    try {
        const verified = jwt.verify(token, 'newcarssecret')
        req.user = verified
        next() // avancar
    } catch(err) {
        return res.status(400).json({
            message: 'Token inválido!'
        })
    }
}

module.exports = checkToken