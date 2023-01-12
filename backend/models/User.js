const mongoose = require('../db/conn')
const { Schema } = mongoose

// Create a collection
const User = mongoose.model(
    'User',
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        image: {
            type: String
        }
    }, { timestamps: true } // createdAt and updatedAt
    )
)

module.exports = User