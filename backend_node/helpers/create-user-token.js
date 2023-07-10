const jwt = require('jsonwebtoken')

const createUserToken = async(user ,req, res) => {

    // create a token, inseriando ele no user
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "newcarssecret")

    // return token
    res.status(200).json({
        message: "Você está autenticado",
        token,
        userId: user._id
    })
}

module.exports = createUserToken