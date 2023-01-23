const Car = require('../models/Car') // Car database

// helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class CarController {
    static async insertCar(req, res) {
        
        const {model, manufacturer, year, price, description, category} = req.body

        const images = req.files

        const available = true

        // Validations
        if(!model) {
            res.status(422).json({message: 'O modelo é obrigatório'})
            return
        }

        if(!manufacturer) {
            res.status(422).json({message: 'O fabricante é obrigatório'})
            return
        }

        if(!year) {
            res.status(422).json({message: 'O ano é obrigatória'})
            return
        }

        if(!price) {
            res.status(422).json({message: 'o preço é obrigatório'})
            return
        }

        if(!description) {
            res.status(422).json({message: 'A descrição é obrigatório'})
            return
        }

        if(!category) {
            res.status(422).json({message: 'A categoria é obrigatória'})
            return
        }

        if(images.length === 0) {
            res.status(422).json({
                message: 'A imagem é obrigatória!'
            })
        }

        // get a user own
        const token = getToken(req)
        const user = await getUserByToken(token)

        // create Car
        const car = new Car({
            model,
            manufacturer,
            year,
            price,
            description,
            category,
            available,
            images: [],
            user: {
                _id: user.id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        images.map((image) => {
            car.images.push(image.filename)
        })

        try {
            const newCar = await car.save() // insert newCar
            res.status(200).json({
                message: "Produto criado com sucesso!",
                newCar
            })
        } catch(err) {
            res.status(500).json({message: err})
        }
    }

    static async getCarById(req, res) {

        const id = req.params.id

        // get a Car by id
        const car = await Car.findById(id)

        // check if Car not exist
        if(!car) {
            res.status(404).json({message: 'Carro não encontrado!'})
            return
        }

        res.status(200).json({ car })
    }

    static async editCar(req, res) {
        
        const id = req.params.id

        const CarExistis = await Car.findOne({_id: id}) // search for Car in mongo

        if(!CarExistis) {
            res.status(404).json({message: "Carro não encontrado!"})
            return
        }

        const car = CarExistis

        // get a user own
        const token = getToken(req)
        const user = await getUserByToken(token)

        const CarOwner = car.user._id.toString() == user._id

        if(!CarOwner) {
            res.status(401).json({message: "Você não é autorizado para isso!"})
            return
        }
    
        // valores de entrada
        const {model, manufacturer, year, price, description, category} = req.body

        const images = req.files

        const available = true

        const updatedData = {}

        // validations
        if(!model) {
            res.status(422).json({message: 'O modelo é obrigatório'})
            return
        }

        car.model = model

        if(!manufacturer) {
            res.status(422).json({message: 'O fabricante é obrigatório'})
            return
        }

        car.manufacturer = manufacturer

        if(!year) {
            res.status(422).json({message: 'O ano é obrigatória'})
            return
        }

        car.year = year

        if(!price) {
            res.status(422).json({message: 'o preço é obrigatório'})
            return
        }

        car.price = price

        if(!description) {
            res.status(422).json({message: 'A descrição é obrigatório'})
            return
        }

        car.description = description

        if(!category) {
            res.status(422).json({message: 'A categoria é obrigatória'})
            return
        }

        car.category = category

        if(images.length === 0) {
            res.status(422).json({
                message: 'A imagem é obrigatória!'
            })
            return
        }

        if(images.length > 0) {
            updatedData.images = []
            car.images = [] // limpando as que ja tinham
            // adicionando o nome de cada imagem ao array
            images.map((image) => {
                car.images.push(image.filename)
            })
        }

        try {
            // returns Car updated data
            await Car.findOneAndUpdate(
                {_id: car._id}, // where
                {$set: car}, // new data
                {new: true} // formating data
            )

            res.status(200).json({
                message: "Carro atualizado com sucesso!"
            })
        } catch (err) {
            res.status(500).json({message: err})
            return
        }

    }

    static async sellCar(req, res) {
        
        const id = req.params.id

        const CarExistis = await Car.findOne({_id: id}) // search for Car in mongo

        if(!CarExistis) {
            res.status(404).json({message: "Carro não encontrado!"})
            return
        }

        const car = CarExistis

        const available = false

        car.available = available

        try {
            // returns Car updated data
            await Car.findOneAndUpdate(
                {_id: car._id}, // where
                {$set: car}, // new data
                {new: true} // formating data
            )

            res.status(200).json({
                message: "Carro vendido com sucesso!"
            })
        } catch (err) {
            res.status(500).json({message: err})
            return
        }

    }

    static async resaleCar(req, res) {
        
        const id = req.params.id

        const CarExistis = await Car.findOne({_id: id}) // search for Car in mongo

        if(!CarExistis) {
            res.status(404).json({message: "Carro não encontrado!"})
            return
        }

        const car = CarExistis

        const available = false

        car.available = true

        try {
            // returns Car updated data
            await Car.findOneAndUpdate(
                {_id: car._id}, // where
                {$set: car}, // new data
                {new: true} // formating data
            )

            res.status(200).json({
                message: "Carro disponível para venda novamente!"
            })
        } catch (err) {
            res.status(500).json({message: err})
            return
        }

    }

    static async deleteCar(req, res) {
        const id = req.params.id

        const car = await Car.findById(id)

        // check if Car not exist
        if(!car) {
            res.status(404).json({message: 'Carro não encontrado!'})
            return
        }

        try {
            await Car.deleteOne({id: id})
            res.status(202).json({message: 'Carro deletado com sucesso!'})
        } catch(err) {
            res.status(500).json({message: err})
        }
    }

    static async getAllCars(req, res) {
        const cars = await Car.find().sort('-createdAt')

        res.status(200).json({ cars })
    }

    static async getAllUserCars(req, res) {
        // get user by token
        const token = getToken(req)
        const user = await getUserByToken(token)

        const cars = await Car.find({ 'user._id': user._id.toString() }).sort('-createdAt')

        // send to frontend
        res.status(200).json({ cars })
    }
}