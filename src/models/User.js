const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
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
    number: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

//métodos
UserSchema.methods.encryptPassword = async(password) => {
    //genera un hash x veces
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

//compara la contraseña con la que está en la base de datos
UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('UserSchema', UserSchema)