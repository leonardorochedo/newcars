const mongoose = require('../db/conn')
const { Schema } = mongoose

// Create a collection
const Car = mongoose.model(
    'Car',
    new Schema({
        model: {
            type: String,
            required: true
        },
        manufacturer: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        images: {
            type: Array,
            required: true
        },
        available: {
            type: Boolean
        },
        user: Object,
        buyer: Object
    }, { timestamps: true } // createdAt and updatedAt
    )
)

module.exports = Car