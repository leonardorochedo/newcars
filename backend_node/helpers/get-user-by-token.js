const jwt = require('jsonwebtoken')

const User = require('../models/User')

const getUserByToken = async (token) => {

    // validate
    if(!token) {
        return res.status(401).json({
            message: 'Acesso negado!'
        })
    }

    const decoded = jwt.verify(token, 'newcarssecret')

    const userId = decoded.id

    const user = await User.findOne({_id: userId}) // pegando o user pelo id pegado no token

    return user
}

module.exports = getUserByToken