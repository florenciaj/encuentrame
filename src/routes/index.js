const router = require('express').Router() //el método Router permite tener un objeto que facilita la creación de rutas

router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router