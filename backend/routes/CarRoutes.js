const router = require('express').Router()

const CarController = require('../controllers/CarController')

// middlewares
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-uploader')

// rotas
router.post('/insert', verifyToken, imageUpload.array('images'), CarController.insertCar)
router.delete('/delete/:id', verifyToken, CarController.deleteCar)
router.patch('/edit/:id', verifyToken, imageUpload.array('images'), CarController.editCar)

router.get('/mycars', verifyToken, CarController.getAllUserCars)
router.patch('/sell/:id', verifyToken, CarController.sellCar)
router.patch('/resale/:id', verifyToken, CarController.resaleCar)

router.get('/:id', CarController.getCarById)
router.get('/', CarController.getAllCars)

module.exports = router