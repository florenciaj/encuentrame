require('dotenv').config()
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

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
app.use(express.json())

// routes
//le dice al servidor donde están las rutas que va a usar
const route = require('./routes/routes')
app.use('/', route)
app.use(express.static(path.join(__dirname, 'public')))

// server is listenning
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'))
})