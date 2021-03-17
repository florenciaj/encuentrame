const router = require('express').Router() //el método Router permite tener un objeto que facilita la creación de rutas

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/signin', (req, res) => {
    res.render('users/signin')
})

router.get('/signup', (req, res) => {
    res.render('users/signup')
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router