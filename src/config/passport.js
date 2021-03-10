const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const User = require('../models/User')

passport.use(new localStrategy({
    usernameField: 'email' //parámtros para autenticar
}, async(email, password, done) => { //done es un callback que termina el proceso de autenticación
    const user = await User.findOne({ email: email })

    if (!user)
        return done(null, false, { message: 'No se encontró el usuario' }) //(error, usuario, mensaje)

    else {
        const match = await user.matchPassword(password)
        if (match)
            return done(null, user)

        else
            return done(null, false, { message: 'Email o contraseña incorrecto' })
    }
}))

passport.serializeUser((user, done) => { //serializeUser para autenticar un usuario una única vez, almacena en sesión su id
    done(null, user.id)
})

passport.deserializeUser((id, done) => { //deserializeUser genera un usuario con su id
    User.findById(id, (err, user) => {
        done(err, user)
    })
})