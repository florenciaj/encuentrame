require('dotenv').config()
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')

// initializations
const app = express()
require('./database')
require('./config/passport')

// settings
app.set('port', process.env.PORT || 3000) //se configura el puerto
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    //como exphbs es una función se le pasa un objeto de configuración con sus propiedades
    defaultLayout: 'main', //template donde está el diseño princial
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialDir: path.join(app.get('views'), 'partials'), //html que se puede reutilizar en las vistas
    extname: '.hbs' //para colocal que extensión van a tener los archivos
}))
app.set('view engine', '.hbs') //indica el motor de las vistas

// middlewares
app.use(express.urlencoded({ extended: false })) //express.urlencoded() sirve para entender la info de un formulario
app.use(methodOverride('_method')) //para que el formulario también tenga DELETE y PUT
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())


// settings

// global variables
app.use((req, res, next) => { //todas las vistas tienen acceso a flash, por lo que si el usuario navega a otra página le sigue mostrando el mensaje
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null //password cuando autentica a un usuario guarda su info en un objeto dentro de request
    next()
})


// routes
//le dice al servidor donde están las rutas que va a usar
app.use(require('./routes/index'))
app.use(require('./routes/users'))


// static files
app.use(express.static(path.join(__dirname, 'public')))

// server is listenning
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'))
})