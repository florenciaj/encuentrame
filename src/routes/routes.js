const router = require('express').Router() //el método Router permite tener un objeto que facilita la creación de rutas

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/iniciar-sesion', (req, res) => {
    res.render('users/signin')
})

router.get('/registrarse', (req, res) => {
    res.render('users/signup')
})

router.get('/perfil', (req, res) => {
    res.render('users/profile')
})

router.get('/publicar-mascota', (req, res) => {
    res.render('pets/registerPet')
})

router.get('/editar-post/:pet', (req, res) => {
    const { params: { pet } } = req
    res.render('pets/editPet', { petId: pet });
})

module.exports = router