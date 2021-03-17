require('dotenv').config()
const express = require('express')
const path = require('path')
const session = require('express-session')
const exphbs = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const flash = require('connect-flash')
const multer = require('multer')
const uuid = require('uuid') //se requiere la versión 4 para obtener un id aleatorio

// initializations
const app = express()

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
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
app.use(express.json())
app.use(express.urlencoded({ extended: false })) //para entender que datos está enviando el formulario
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/upload'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuid.v4() + path.extname(file.originalname));
    }
})
app.use(multer({ storage }).single('photo'));

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
const route = require('./routes/routes')
app.use('/', route)
app.use(express.static(path.join(__dirname, 'public')))

// server is listenning
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'))
})