const multer = require('multer')
const path = require('path')

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {

        let folder = ""

        // separando se estamos na rota de users ou pets
        if(req.baseUrl.includes("users")) {
            folder = "users"
        } else if(req.baseUrl.includes("cars")) {
            folder = "cars"
        }

        cb(null, `public/images/${folder}`)

    },
    filename: function (req, file, cb) {
        cb(
            null,
            Date.now() +
            String(Math.floor(Math.random() * 100)) +
            path.extname(file.originalname))
    } // 34523423423.ext
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        // filter extension
        if(!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("Por favor, evie apenas jpg ou png!"))
        }
        cb(undefined, true)
    }
})

module.exports = { imageUpload }