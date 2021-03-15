const mongoose = require('mongoose')
const { Schema } = mongoose

const PetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    petType: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    colour: {
        type: Array,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
        default: "Perdido"
    },
    features: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('PetSchema', PetSchema)