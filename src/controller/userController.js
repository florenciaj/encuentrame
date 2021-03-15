const User = require('../models/User')
const passport = require('passport')


async function signup(req, res) {
    const { name, email, password, confirm_password, number } = req.body
    const errors = []

    const regexCharacters = new RegExp("^[a-zA-Z ]+$")
    const regexNumbers = new RegExp("^[0-9]+$")

    if (name && email && password && confirm_password && number) {

        const emailUser = await User.findOne({ email: email })
        if (emailUser) {
            errors.length = 0
            errors.push({ text: 'Ya se encuentra registrado un usuario con el mismo correo' })
            return res.status(400).json({ error: "Email already used" });
        }

        if (!regexCharacters.test(name)) {
            errors.push({ text: 'Solo podés ingresar letras en tu nombre' })
            res.status(400).json({ error: "Name contains numbers or special characters" });
        }

        if (!regexNumbers.test(number)) {
            errors.push({ text: 'Solo podés ingresar números en tu número de contacto' })
            res.status(400).json({ error: "Name contains letters or special characters" });
        }

        if (password.length < 4) {
            errors.push({ text: 'La contraseña debe tener al menos 4 caracteres' })
            res.status(400).json({ error: "Password is too short" });
        }

        if (password != confirm_password) {
            errors.push({ text: 'Las contraseñas no coinciden' })
            res.status(400).json({ error: "Passwords do not match" });
        }

        // if (!conditions) {
        //     errors.push({ text: 'Debes aceptar los términos y condiciones para registrarte' })
        //     res.status(400).json({ error: "Terms and conditions are not accepted" });
        // }

        if (errors.length > 0)
            res.render('users/signup', { errors, name, email, password, confirm_password, number })

        else {
            const newUser = new User({ name, email, password, number })
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            req.flash('success_msg', 'Se ha creado tu usuario. ¡Ya puedes iniciar sesión!')
            res.redirect('signin')
            return res.status(201).json({ pet: req.body })
        }
    } else {
        errors.push({ text: 'Deben completarse todos los campos' })
        return res.status(400).json({ error: "Not enough properties" });
    }
}


function renderToSignIn(req, res) {
    res.render('users/signin')
}

function renderToSignUp(req, res) {
    res.render('users/signup')
}

function authUser() {
    passport.authenticate('local', { //local es la forma en la que se va a autenticar el usuario
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
    })
}




module.exports = { renderToSignIn, renderToSignUp, authUser }