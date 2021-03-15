const mongoose = require('mongoose')
const { Schema } = mongoose

const LossSchema = new Schema({
    place: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    petId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('LossSchema', LossSchema)