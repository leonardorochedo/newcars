const router = require('express').Router()

const CarController = require('../controllers/CarController')

// middlewares
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-uploader')

// rotas
router.post('/insert', verifyToken, imageUpload.array('images'), CarController.insertCar)
router.get('/:id', CarController.getCarById)
router.patch('/edit/:id', verifyToken, imageUpload.array('images'), CarController.editCar)
router.delete('/:id', verifyToken, CarController.deleteCar)
router.get('/', CarController.getAllCars)

module.exports = router