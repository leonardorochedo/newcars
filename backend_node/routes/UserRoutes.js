const router = require('express').Router()

const UserController = require('../controllers/UserController')

// middlewares
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-uploader')

// rotas
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/single', UserController.getUserByToken) // via token
router.get('/:id', UserController.getUserById)

// rotas que precisam de verificacao
router.patch(
   '/edit/:id', // rota
   verifyToken, // token de validacao
   imageUpload.single("image"), // mandando apenas uma para o helper salvar a imagem
   UserController.editUser // controller
)

router.delete(
   '/delete/:id',
   verifyToken,
   UserController.deleteUser)

module.exports = router