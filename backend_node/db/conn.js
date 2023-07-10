const mongoose = require('mongoose')

async function main() {
    mongoose.set('strictQuery', false)
    // Conection MongoDB
    await mongoose.connect('mongodb://localhost:27017/NewCars')
    console.log('Conectado ao Mongoose!')
}

main().catch((err) => console.log(err))

module.exports = mongoose