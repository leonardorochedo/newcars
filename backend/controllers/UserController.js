const bcrypt = require('bcrypt')

const User = require('../models/User') // user database
const Car = require('../models/Car') // Car database

// Helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController {
    static async register(req, res) {
        
        const {name, email, phone, password, confirmpassword} = req.body

        // Validations
        if(!name) {
            res.status(422).json({message: 'O nome é obrigatório'})
            return
        }

        if(!email) {
            res.status(422).json({message: 'O e-mail é obrigatório'})
            return
        }

        if(!phone) {
            res.status(422).json({message: 'O telefone é obrigatório'})
            return
        }

        if(!password) {
            res.status(422).json({message: 'A senha é obrigatória'})
            return
        }

        if(!confirmpassword) {
            res.status(422).json({message: 'A confirmação de senha é obrigatória'})
            return
        }

        // check if passwords match
        if(password !== confirmpassword) {
            res.status(422).json({message: 'As senhas não batem!'})
            return
        }

        // check if user exists
        const userExists = await User.findOne({email: email})

        if(userExists) {
            res.status(422).json({message: 'Por favor, utilize outro e-mail!'})
            return
        }

        // create a password encrypted
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // create user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })

        try {
            const newUser = await user.save() // isert newUser
            
            // login user, incluindo um header de verificacao nele
            await createUserToken(newUser, req, res)
        } catch(err) {
            res.status(500).json({message: err})
        }
    }

    static async login(req, res) {
        const {email, password} = req.body

        // Validations
        if(!email) {
            res.status(422).json({message: 'O e-mail é obrigatório'})
            return
        }

        if(!password) {
            res.status(422).json({message: 'A senha é obrigatória'})
            return
        }

        // check if user exists
        const user = await User.findOne({email: email})

        if(!user) {
            res.status(404).json({message: 'Não há usuário cadastrado com esse email!'})
            return
        }

        // check if password match
        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch) {
            res.status(422).json({message: 'Email ou senha inválidos!'})
            return
        }

        // login user
        await createUserToken(user, req, res)
    }

    static async editUser(req, res) {
        
        const id = req.params.id

        // check if user exist
        const token = getToken(req)
        const user = await getUserByToken(token)

        const olderUser = user

        const {name, email, phone, password, confirmpassword} = req.body

        // validations
        if(!name) {
            res.status(422).json({message: 'O nome é obrigatório'})
            return
        }

        user.name = name

        if(!email) {
            res.status(422).json({message: 'O e-mail é obrigatório'})
            return
        }

        const userExistis = await User.findOne({email: email}) // search for user in mongo

        // check if email has already taken
        if(user.email !== email && userExistis) {
            res.status(422).json({message: 'Por favor, utiliza outro e-mail!'})
            return
        }

        user.email = email

        if(!phone) {
            res.status(422).json({message: 'O telefone é obrigatório!'})
            return
        }

        user.phone = phone

        if(password != confirmpassword) {
            res.status(422).json({message: 'As senhas são conferem!'})
            return
        } else if(password === confirmpassword && password != null) {

            // creating password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }

        // image
        let image = ""

        if(req.file.originalname) {
            // pegando a image da req em filename
            image = req.file.filename
        }

        user.image = image

        try {
            await User.findOneAndUpdate(
                {_id: user.id}, // where
                {$set: user}, // new data
                {new: true} // formating data
            )

            // atualizar os carros do usuarios
            await Car.updateMany({'user._id': user._id, 'user.name': olderUser.name}, {$set: {
                'user.name': user.name,
                'user.image': user.image,
                'user.phone': user.phone,
            }
            })

            res.status(200).json({
                message: "Usuário atualizado com sucesso!"
            })
        } catch (err) {
            res.status(500).json({message: err})
            return
        }

    }

    static async getUserById(req, res) {

        const id = req.params.id

        // get a user by id -password
        const user = await User.findById(id).select('-password')

        // check if user not exist
        if(!user) {
            res.status(404).json({message: 'Usuário não encontrado!'})
            return
        }

        res.status(200).json({ user })
    }

    static async deleteUser(req, res) {
        const id = req.params.id

        const user = await User.findById(id)

        // check if product not exist
        if(!user) {
            res.status(404).json({message: 'Usuário não encontrado!'})
            return
        }

        try {
            await User.deleteOne({id: id})
            res.status(202).json({message: 'Usuário deletado com sucesso!'})
        } catch(err) {
            res.status(500).json({message: err})
        }
    }

}