require('dotenv').config()
const mongoose = require('mongoose')

const { DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env; //Un poco de destructuring para traer nuestras credenciales desde las variables de entorno
const DB_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.m2bad.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(DB_URL, { //Metodo para conectar a la base de datos, tiene 3 parametros:
        useNewUrlParser: true, //Primero le pasamos la URI con las credenciales de acceso en DB_URL
        useUnifiedTopology: true //Segundo le pasamos un objeto con opciones de config, las que use yo son las basicas a usar para no tener problemas de conexion
    })
    .then(() => console.log('db is connected'))
    .catch(err => console.error(err))