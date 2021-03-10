const router = require('express').Router() //el método Router permite tener un objeto que facilita la creación de rutas
const User = require('../models/User')
const userController = require('../controller/userController')

const passport = require('passport')

router.get('/users/signin', userController.renderSignIn)


router.get('/users/signup', (req, res) => {
    res.render('users/signup')
})

router.post('/users/signin', passport.authenticate('local', { //local es la forma en la que se va a autenticar el usuario
    successRedirect: '/',
    failureRedirect: '/users/signin',
    failureFlash: true
}))

router.post('/users/signup', async(req, res) => {
    const { name, email, password, confirm_password, number, conditions } = req.body
    const errors = []

    const regexCharacters = new RegExp("^[a-zA-Z ]+$")
    const regexNumbers = new RegExp("^[0-9]+$")

    if (!name || !email || !password || !confirm_password || !number)
        errors.push({ text: 'Deben completarse todos los campos' })

    if (!regexCharacters.test(name))
        errors.push({ text: 'Solo podés ingresar letras en tu nombre' })

    if (!regexNumbers.test(number))
        errors.push({ text: 'Solo podés ingresar números en tu número de contacto' })

    if (password != confirm_password)
        errors.push({ text: 'Las contraseñas no coinciden' })

    if (password.length < 4)
        errors.push({ text: 'La contraseña debe tener al menos 4 caracteres' })

    if (!conditions)
        errors.push({ text: 'Debes aceptar los términos y condiciones para registrarte' })

    const emailUser = await User.findOne({ email: email })
    if (emailUser) {
        errors.length = 0
        errors.push({ text: 'Ya se encuentra registrado un usuario con el mismo correo' })
    }

    if (errors.length > 0)
        res.render('users/signup', { errors, name, email, password, confirm_password, number })

    else {
        const newUser = new User({ name, email, password, number })
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save()
        req.flash('success_msg', 'Se ha creado tu usuario. ¡Ya puedes iniciar sesión!')
        res.redirect('/users/signin')
    }
})

router.get('/users/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router